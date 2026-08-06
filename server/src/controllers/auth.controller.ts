import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { supabase } from "../config/supabase";
import { generateToken } from "../utils/jwt";

export const me = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized.",
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select(`*`)
      .eq("id", req.user.id)
      .maybeSingle();

    if (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to fetch user.",
      });
    }

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
export const signUp = async (req: Request, res: Response) => {
  try {
    const { phone, firstName, lastName, password, region, referby } = req.body;

    // Validate required fields
    if (!phone || !firstName || !lastName || !password || !region || !referby) {
      return res.status(400).json({
        status: false,
        message: "All required fields are required.",
      });
    }

    // Check if phone already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (existingUserError) {
      return res.status(500).json({
        status: false,
        message: "Failed to check existing user.",
      });
    }

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "Phone number already exists.",
      });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Find referrer (optional)
    let referredBy: string | null = null;

    if (referby) {
      const { data: referrer, error: referralError } = await supabase
        .from("users")
        .select("id")
        .eq("referral_code", referby)
        .maybeSingle();

      if (referralError) {
        return res.status(500).json({
          status: false,
          message: "Failed to validate referral code.",
        });
      }

      if (!referrer) {
        return res.status(400).json({
          status: false,
          message: "Invalid referral code.",
        });
      }

      referredBy = referrer.id;
    }

    // Create user
    const { data: user, error } = await supabase
      .from("users")
      .insert({
        phone,
        first_name: firstName,
        last_name: lastName,
        region,
        password_hash,
        referred_by: referredBy,
      })
      .select("*")
      .single();

    if (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to create account.",
      });
    }

    // Reward the referrer (optional)
    if (referredBy) {
      await supabase.rpc("reward_referrer", {
        referrer_id: referredBy,
      });
    }

    const token = generateToken(user.id);

    return res.status(201).json({
      status: true,
      message: "Account created successfully.",
      token,
      data: user,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
/* 
data needed to sign in 
phone ,
password,
*/
export const signIn = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
      return res.status(400).json({
        status: false,
        message: "Phone and password are required.",
      });
    }

    // Find user
    const { data: user, error } = await supabase
      .from("users")
      .select(
        `
        id,
        phone,
        first_name,
        last_name,
        age,
        region,
        referral_code,
        total_referrals,
        password_hash,
        created_at
      `,
      )
      .eq("phone", phone)
      .maybeSingle();

    if (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to sign in.",
      });
    }

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid phone or password.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid phone or password.",
      });
    }

    // Generate JWT
    const token = await generateToken(user.id);

    // Remove password hash before sending response
    const { password_hash, ...userData } = user;

    return res.status(200).json({
      status: true,
      message: "Login successful.",
      token,
      data: userData,
    });
  } catch (error) {
    console.error("Sign In Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
