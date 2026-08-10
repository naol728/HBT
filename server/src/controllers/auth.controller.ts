import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { supabase } from "../config/supabase";
import { generateToken } from "../utils/jwt";

export const submitKyc = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized.",
      });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const identityDocument = files?.identity_document?.[0];
    const selfie = files?.selfie?.[0];

    if (!identityDocument) {
      return res.status(400).json({
        status: false,
        message: "Identity document is required.",
      });
    }

    if (!selfie) {
      return res.status(400).json({
        status: false,
        message: "Selfie is required.",
      });
    }

    // Check whether user already has a KYC submission
    const { data: existingKyc, error: existingError } = await supabase
      .from("kyc_verifications")
      .select("id, status")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingError) {
      console.error(existingError);

      return res.status(500).json({
        status: false,
        message: "Failed to check existing KYC.",
      });
    }

    if (existingKyc?.status === "approved") {
      return res.status(400).json({
        status: false,
        message: "Your identity is already verified.",
      });
    }

    if (existingKyc?.status === "pending") {
      return res.status(400).json({
        status: false,
        message: "Your KYC verification is already under review.",
      });
    }

    /*
     * Generate unique paths.
     *
     * Example:
     * kyc/user-id/identity/uuid.jpg
     * kyc/user-id/selfie/uuid.jpg
     */

    const identityExtension =
      identityDocument.originalname.split(".").pop() || "jpg";

    const selfieExtension = selfie.originalname.split(".").pop() || "jpg";

    const identityPath = `${user.id}/identity/${crypto.randomUUID()}.${identityExtension}`;

    const selfiePath = `${user.id}/selfie/${crypto.randomUUID()}.${selfieExtension}`;

    // Upload identity document
    const { error: identityUploadError } = await supabase.storage
      .from("kyc")
      .upload(identityPath, identityDocument.buffer, {
        contentType: identityDocument.mimetype,
        upsert: false,
      });

    if (identityUploadError) {
      console.error("Identity upload error:", identityUploadError);

      return res.status(500).json({
        status: false,
        message: "Failed to upload identity document.",
      });
    }

    // Upload selfie
    const { error: selfieUploadError } = await supabase.storage
      .from("kyc")
      .upload(selfiePath, selfie.buffer, {
        contentType: selfie.mimetype,
        upsert: false,
      });

    if (selfieUploadError) {
      console.error("Selfie upload error:", selfieUploadError);

      // Remove identity document if selfie upload fails
      await supabase.storage.from("kyc").remove([identityPath]);

      return res.status(500).json({
        status: false,
        message: "Failed to upload selfie.",
      });
    }

    /*
     * Do NOT make the bucket public.
     *
     * Store the storage paths in the database.
     */

    let kyc;

    if (existingKyc?.status === "rejected") {
      // Update rejected KYC submission
      const { data, error } = await supabase
        .from("kyc_verifications")
        .update({
          identity_document_url: identityPath,
          selfie_url: selfiePath,
          status: "pending",
          rejection_reason: null,
          submitted_at: new Date().toISOString(),
          reviewed_at: null,
          reviewed_by: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingKyc.id)
        .select()
        .single();

      if (error) {
        console.error("KYC update error:", error);

        // Clean uploaded files
        await supabase.storage.from("kyc").remove([identityPath, selfiePath]);

        return res.status(500).json({
          status: false,
          message: "Failed to submit KYC.",
        });
      }

      kyc = data;
    } else {
      // Create new KYC submission
      const { data, error } = await supabase
        .from("kyc_verifications")
        .insert({
          user_id: user.id,
          identity_document_url: identityPath,
          selfie_url: selfiePath,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        console.error("KYC insert error:", error);

        // Clean uploaded files
        await supabase.storage.from("kyc").remove([identityPath, selfiePath]);

        return res.status(500).json({
          status: false,
          message: "Failed to submit KYC.",
        });
      }

      kyc = data;
    }

    return res.status(201).json({
      status: true,
      message:
        "KYC documents uploaded successfully and are pending verification.",
      data: kyc,
    });
  } catch (error) {
    console.error("Submit KYC error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
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
