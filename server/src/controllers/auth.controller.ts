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

    // ==========================================
    // 1. Validate required fields
    // ==========================================
    if (!phone || !firstName || !lastName || !password || !region || !referby) {
      return res.status(400).json({
        status: false,
        message: "All fields are required, including referral code.",
      });
    }

    // ==========================================
    // 2. Check if phone already exists
    // ==========================================
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (existingUserError) {
      console.error("Existing user check error:", existingUserError);

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

    // ==========================================
    // 3. Find and validate referral code
    // ==========================================
    const { data: referrer, error: referralError } = await supabase
      .from("users")
      .select("id, referral_code")
      .eq("referral_code", referby.trim())
      .maybeSingle();

    if (referralError) {
      console.error("Referral validation error:", referralError);

      return res.status(500).json({
        status: false,
        message: "Failed to validate referral code.",
      });
    }

    // Referral code does not exist
    if (!referrer) {
      return res.status(400).json({
        status: false,
        message: "Invalid referral code.",
      });
    }

    const referredBy = referrer.id;

    // ==========================================
    // 4. Count users already registered
    //    using this referral
    // ==========================================
    const { count: referralCount, error: countError } = await supabase
      .from("users")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("referred_by", referredBy);

    if (countError) {
      console.error("Referral count error:", countError);

      return res.status(500).json({
        status: false,
        message: "Failed to check referral limit.",
      });
    }

    // ==========================================
    // 5. Maximum 4 users per referral code
    // ==========================================
    if ((referralCount ?? 0) >= 4) {
      return res.status(400).json({
        status: false,
        message: "This referral code has already been used by 4 users.",
      });
    }

    // ==========================================
    // 6. Hash password
    // ==========================================
    const password_hash = await bcrypt.hash(password, 12);

    // ==========================================
    // 7. Create user
    // ==========================================
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({
        phone,
        first_name: firstName,
        last_name: lastName,
        region,
        password_hash,

        // Store the referrer's user ID
        referred_by: referredBy,
      })
      .select("*")
      .single();

    if (userError) {
      console.error("Create user error:", userError);

      return res.status(500).json({
        status: false,
        message: "Failed to create account.",
      });
    }

    // ==========================================
    // 8. Reward referrer
    // ==========================================
    const { error: rewardError } = await supabase.rpc("reward_referrer", {
      referrer_id: referredBy,
    });

    if (rewardError) {
      console.error("Reward referrer error:", rewardError);

      // User was already created, so don't fail signup.
      // You can retry the reward separately.
    }

    // ==========================================
    // 9. Generate JWT
    // ==========================================
    const token = generateToken(user.id);

    // ==========================================
    // 10. Response
    // ==========================================
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
      .select("*")
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
