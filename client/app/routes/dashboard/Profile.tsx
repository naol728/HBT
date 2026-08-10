
import { useRef, useState } from "react";
import {
    Camera,
    CheckCircle2,
    Copy,
    FileCheck2,
    FileImage,
    IdCard,
    Loader2,
    MapPin,
    Phone,
    ShieldCheck,
    Upload,
    UserRound,
    Users,
} from "lucide-react";

import { useAppSelector } from "@/store/hook";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

type KycFileType = "identity" | "selfie";

export default function Profile() {
    const { user, loading } = useAppSelector(
        (state) => state.auth
    );

    const identityInputRef = useRef<HTMLInputElement>(null);
    const selfieInputRef = useRef<HTMLInputElement>(null);

    const [identityFile, setIdentityFile] =
        useState<File | null>(null);

    const [selfieFile, setSelfieFile] =
        useState<File | null>(null);

    const [uploading, setUploading] =
        useState<KycFileType | null>(null);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <UserRound className="mb-4 h-10 w-10 text-muted-foreground" />

                        <h2 className="text-lg font-semibold">
                            Profile unavailable
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            We couldn't load your profile information.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const fullName =
        `${user.first_name} ${user.last_name} `.trim();

    const initials =
        `${user.first_name?.charAt(0) ?? ""}${user.last_name?.charAt(0) ?? ""} `
            .toUpperCase();

    const levelLabel =
        user.level.charAt(0).toUpperCase() +
        user.level.slice(1);

    const roleLabel =
        user.role.charAt(0).toUpperCase() +
        user.role.slice(1);

    const copyReferralCode = async () => {
        try {
            await navigator.clipboard.writeText(
                "https://hbt-chi.vercel.app/?ref=" + user.referral_code
            );

            toast.success("Referral code copied!");
        } catch {
            toast.error("Unable to copy referral code.");
        }
    };

    const handleFileSelect = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: KycFileType
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Please upload a JPG, PNG, WEBP, or PDF file."
            );

            event.target.value = "";
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            toast.error(
                "File size must be less than 5MB."
            );

            event.target.value = "";
            return;
        }

        if (type === "identity") {
            setIdentityFile(file);
        } else {
            setSelfieFile(file);
        }

        toast.success(
            type === "identity"
                ? "Identity document selected."
                : "Selfie selected."
        );
    };

    const uploadKycDocument = async (
        type: KycFileType
    ) => {
        const file =
            type === "identity"
                ? identityFile
                : selfieFile;

        if (!file) {
            toast.error(
                type === "identity"
                    ? "Please select your identity document."
                    : "Please select your selfie."
            );

            return;
        }

        try {
            setUploading(type);

            /*
             * TODO:
             *
             * Connect this to your backend KYC endpoint.
             *
             * Example:
             *
             * const formData = new FormData();
             * formData.append("document", file);
             * formData.append("type", type);
             *
             * await apiClient.post(
             *     "/kyc/upload",
             *     formData,
             *     {
             *         headers: {
             *             "Content-Type":
             *                 "multipart/form-data",
             *         },
             *     }
             * );
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 1200)
            );

            toast.success(
                type === "identity"
                    ? "Identity document uploaded successfully."
                    : "Selfie uploaded successfully."
            );
        } catch {
            toast.error(
                "Upload failed. Please try again."
            );
        } finally {
            setUploading(null);
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">

            {/* =====================================================
                PAGE HEADER
            ===================================================== */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    My Profile
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your personal information and verify
                    your identity.
                </p>
            </div>

            {/* =====================================================
                PROFILE + PERSONAL INFORMATION
            ===================================================== */}
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

                {/* PROFILE CARD */}
                <Card className="overflow-hidden">

                    {/* Banner */}
                    <div className="h-28 bg-gradient-to-r from-primary/30 via-primary/10 to-background" />

                    <CardContent className="relative px-6 pb-6">

                        {/* Avatar */}
                        <div className="-mt-12 mb-5 flex items-end justify-between">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                                <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <Badge
                                variant="secondary"
                                className="mb-2 gap-1.5 capitalize"
                            >
                                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                {levelLabel}
                            </Badge>
                        </div>

                        {/* Name */}
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-xl font-bold">
                                    {fullName}
                                </h2>

                                <Badge
                                    variant="outline"
                                    className="capitalize"
                                >
                                    {roleLabel}
                                </Badge>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">

                                <span className="flex items-center gap-1.5">
                                    <Phone className="h-3.5 w-3.5" />
                                    {user.phone}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {user.region}
                                </span>

                            </div>
                        </div>

                        {/* Stats */}
                        <div className="my-6 grid grid-cols-2 divide-x rounded-lg border bg-muted/30 sm:grid-cols-3">

                            <div className="p-4 text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {user.total_referrals}
                                </div>

                                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Referrals
                                </div>
                            </div>

                            <div className="p-4 text-center">
                                <div className="text-2xl font-bold">
                                    {levelLabel}
                                </div>

                                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Current Level
                                </div>
                            </div>

                            <div className="col-span-2 border-t p-4 text-center sm:col-span-1 sm:border-t-0">
                                <div className="flex items-center justify-center gap-1.5 text-2xl font-bold">
                                    <Users className="h-5 w-5 text-primary" />
                                    {user.total_referrals}
                                </div>

                                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Team Members
                                </div>
                            </div>

                        </div>

                        {/* Referral */}
                        <div className="rounded-lg border bg-muted/30 p-4">

                            <div className="mb-2 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold">
                                        Your Referral Code
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        Share this code to invite new distributors.
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={copyReferralCode}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Input
                                    value={"https://hbt-chi.vercel.app/?ref=" + user.referral_code}
                                    readOnly
                                    className="font-mono font-semibold"
                                />

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={copyReferralCode}
                                >
                                    Copy
                                </Button>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* PERSONAL INFORMATION */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Personal Information
                        </CardTitle>

                        <CardDescription>
                            Your account information.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">

                        <div className="grid gap-4 sm:grid-cols-2">

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    First Name
                                </label>

                                <Input
                                    value={user.first_name}
                                    readOnly
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Last Name
                                </label>

                                <Input
                                    value={user.last_name}
                                    readOnly
                                />
                            </div>

                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Phone
                            </label>

                            <Input
                                value={user.phone}
                                readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Region
                            </label>

                            <Select
                                value={user.region}
                                disabled
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value={user.region}>
                                        {user.region}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            <div className="rounded-lg border bg-muted/30 p-4">
                                <p className="text-xs text-muted-foreground">
                                    Account Role
                                </p>

                                <p className="mt-1 font-semibold capitalize">
                                    {user.role}
                                </p>
                            </div>

                            <div className="rounded-lg border bg-muted/30 p-4">
                                <p className="text-xs text-muted-foreground">
                                    Distributor Level
                                </p>

                                <p className="mt-1 font-semibold capitalize text-primary">
                                    {user.level}
                                </p>
                            </div>

                        </div>

                    </CardContent>
                </Card>
            </div>

            {/* =====================================================
                KYC VERIFICATION
            ===================================================== */}
            <Card>

                <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />

                                <CardTitle className="text-base">
                                    Identity Verification
                                </CardTitle>
                            </div>

                            <CardDescription className="mt-1">
                                Verify your identity to unlock full
                                account and withdrawal features.
                            </CardDescription>
                        </div>

                        <Badge
                            variant="secondary"
                            className="w-fit gap-1.5"
                        >
                            <span className="h-2 w-2 rounded-full bg-yellow-500" />
                            Verification Pending
                        </Badge>

                    </div>
                </CardHeader>

                <CardContent>

                    <div className="grid gap-4 md:grid-cols-2">

                        {/* =================================================
                            IDENTITY DOCUMENT
                        ================================================= */}
                        <KycUploadCard
                            title="Identity Card / Passport"
                            description="Upload your Kebele ID, national ID, or passport."
                            icon={
                                <IdCard className="h-7 w-7" />
                            }
                            file={identityFile}
                            uploading={uploading === "identity"}
                            inputRef={identityInputRef}
                            onSelect={(event) =>
                                handleFileSelect(
                                    event,
                                    "identity"
                                )
                            }
                            onUpload={() =>
                                uploadKycDocument(
                                    "identity"
                                )
                            }
                        />

                        {/* =================================================
                            SELFIE
                        ================================================= */}
                        <KycUploadCard
                            title="Selfie with ID"
                            description="Take a clear selfie while holding your identity document."
                            icon={
                                <Camera className="h-7 w-7" />
                            }
                            file={selfieFile}
                            uploading={uploading === "selfie"}
                            inputRef={selfieInputRef}
                            onSelect={(event) =>
                                handleFileSelect(
                                    event,
                                    "selfie"
                                )
                            }
                            onUpload={() =>
                                uploadKycDocument(
                                    "selfie"
                                )
                            }
                        />

                    </div>

                    {/* Security Notice */}
                    <div className="mt-5 flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">

                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                        <div>
                            <p className="text-sm font-medium">
                                Your documents are secure
                            </p>

                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                Your identity documents are only used
                                for verification and account security.
                                Accepted formats are JPG, PNG, WEBP,
                                and PDF up to 5MB.
                            </p>
                        </div>

                    </div>

                </CardContent>
            </Card>

        </div>
    );
}

/* ============================================================
   KYC UPLOAD CARD
============================================================ */

interface KycUploadCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    file: File | null;
    uploading: boolean;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onSelect: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onUpload: () => void;
}

function KycUploadCard({
    title,
    description,
    icon,
    file,
    uploading,
    inputRef,
    onSelect,
    onUpload,
}: KycUploadCardProps) {
    return (
        <div className="rounded-xl border bg-card p-5">

            <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>

                <div className="min-w-0 flex-1">

                    <h3 className="font-semibold">
                        {title}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {description}
                    </p>

                </div>

            </div>

            {/* Hidden input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={onSelect}
                className="hidden"
            />

            {/* Upload Area */}
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-5 flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
            >

                {file ? (
                    <>
                        <FileCheck2 className="h-8 w-8 text-primary" />

                        <p className="mt-3 max-w-full truncate text-sm font-medium">
                            {file.name}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Upload className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <p className="mt-3 text-sm font-medium">
                            Click to upload
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            JPG, PNG, WEBP or PDF · Max 5MB
                        </p>
                    </>
                )}

            </button>

            {/* Upload button */}
            {file && (
                <Button
                    type="button"
                    onClick={onUpload}
                    disabled={uploading}
                    className="mt-3 w-full"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Document
                        </>
                    )}
                </Button>
            )}

        </div>
    );
}
