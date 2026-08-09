import React, { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import ReferralLink from "@/components/ReferralLink";
import { Eye, EyeOff, Lock, Gift, ArrowLeft, ArrowRight, Mail, Phone, Flame, CheckCircle2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import { useAppDispatch } from "@/store/hook";
import { loginSuccess } from "@/store/slices/authSlice";
import { useNavigate } from "react-router";
import { withReferral } from "@/components/withReferral";


const REGIONS = [
    "Addis Ababa",
    "Oromia",
    "Amhara",
    "Tigray",
    "SNNPR",
    "Somali",
    "Afar",
    "Benishangul-Gumuz",
    "Gambela",
    "Harari",
    "Dire Dawa",
    "Sidama",
    "Southwest Ethiopia",
];

const STRENGTH_LEVELS = [
    { width: "25%", text: "Weak", color: "#ef4444" },
    { width: "50%", text: "Fair", color: "#f59e0b" },
    { width: "75%", text: "Good", color: "#3b82f6" },
    { width: "100%", text: "Strong", color: "#22c55e" },
];

const SummaryRow = ({ label, value, highlight, success }: any) => (
    <div className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-medium ${highlight ? "text-primary" : ""} ${success ? "text-emerald-600" : ""}`}>
            {value}
        </span>
    </div>
);

export default function Signup() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isStepValid, setIsStepValid] = useState(false);
    const [referredBy, setReferredBy] = useState("");
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        region: "",
        password: "",
        passwordConfirm: "",
        referby: "",
        terms: false,
        age: false,
    });


    const { mutateAsync, isPending } = useMutation({
        mutationFn: signUp,

        onSuccess: (response) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            dispatch(
                loginSuccess({
                    token: response.token,
                    user: response.data,
                })
            );

            toast.success(response.message);
            navigate(withReferral("/dashboard"));

        },

        onError: (error: any) => {
            toast.error(
                error?.message ??
                "Registration failed."
            );
        },
    });
    const validateStep = () => {
        if (step === 1) {
            return (
                form.firstName.trim() &&
                form.lastName.trim() &&
                /^[0-9]{9}$/.test(form.phone) &&
                form.region.trim()
            );
        }
        if (step === 2) {
            return (
                form.password.length >= 8 &&
                form.password === form.passwordConfirm
            );
        }
        if (step === 3) {
            return form.terms && form.age;
        }
        return false;
    };

    const getStepValidationError = () => {
        if (step === 1) {
            if (!form.firstName.trim()) return "First name is required.";
            if (!form.lastName.trim()) return "Last name is required.";
            if (!form.phone.trim()) return "Phone number is required.";
            if (!/^[0-9]{9}$/.test(form.phone)) return "Phone number must be exactly 9 digits.";
            if (!form.region.trim()) return "Please select your region.";
        }
        if (step === 2) {
            if (form.password.length < 8) return "Password must be at least 8 characters.";
            if (form.password !== form.passwordConfirm) return "Passwords do not match.";
        }
        if (step === 3) {
            if (!form.terms) return "Please accept the Terms of Service.";
            if (!form.age) return "You must confirm that you are at least 18 years old.";
        }
        return "Please complete all required fields.";
    };

    const nextStep = () => {
        if (!validateStep()) {
            toast.error(getStepValidationError());
            return;
        }
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const previousStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    useEffect(() => {
        setIsStepValid(Boolean(validateStep()));
    }, [form, step]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref");
        if (ref) {
            setReferredBy(ref);
            setForm(prev => ({ ...prev, referby: ref }));
        }
    }, []);

    const updateField = (field: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const rawValue = e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        const value = field === "phone"
            ? String(rawValue).replace(/[^0-9]/g, "").slice(0, 9)
            : rawValue;

        setForm((prev) => ({ ...prev, [field]: value }));
    };



    const passwordStrength = () => {
        const val = form.password;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^a-zA-Z0-9]/.test(val)) score++;
        return STRENGTH_LEVELS[Math.max(0, score - 1)];
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.terms) {
            return toast.error("Please accept the Terms of Service.");
        }

        if (!form.age) {
            return toast.error("You must confirm that you are at least 18 years old.");
        }

        await mutateAsync(form);

    };


    const strength = passwordStrength();

    // Handle region change
    const handleRegionChange = (value: string | null) => {
        setForm(prev => ({ ...prev, region: value ?? "" }));
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-background">
            {/* LEFT PANEL */}
            <div className="hidden lg:flex flex-1">
                <LeftPanel />
            </div>

            {/* FORM */}
            <div className="w-full lg:w-[480px] xl:w-[520px] min-h-screen bg-card flex flex-col justify-center px-5 sm:px-8 lg:px-10 xl:px-12 py-8 overflow-y-auto border-border lg:border-l">
                <Logo />

                <div className="mt-6 mb-7">
                    <h2 className="text-2xl sm:text-3xl font-bold">Create Account</h2>
                    <p className="text-sm text-muted-foreground mt-2">Step {step} of 3</p>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input
                                    placeholder="Mekdes"
                                    value={form.firstName}
                                    onChange={updateField("firstName")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input
                                    placeholder="Tadesse"
                                    value={form.lastName}
                                    onChange={updateField("lastName")}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <div className="flex">
                                <div className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-border bg-muted/10 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4 mr-2" />
                                    +251
                                </div>
                                <Input
                                    className="flex-1 rounded-l-none"
                                    type="tel"
                                    placeholder="987654321"
                                    value={form.phone}
                                    onChange={updateField("phone")}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Enter your 9-digit phone number without the country code, e.g. 987654321.</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Region / City</Label>
                            <Select
                                value={form.region || undefined}
                                onValueChange={handleRegionChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select your region" />
                                </SelectTrigger>
                                <SelectContent>
                                    {REGIONS.map((region) => (
                                        <SelectItem key={region} value={region}>
                                            {region}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                disabled
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                            <Button
                                type="button"
                                size="lg"
                                onClick={nextStep}
                                disabled={!isStepValid}
                            >
                                Continue
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>


                        <div className="space-y-2">
                            <Label>Create Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-10 pr-10"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    value={form.password}
                                    onChange={updateField("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {form.password && (
                                <div className="space-y-2">
                                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-300"
                                            style={{
                                                width: strength.width,
                                                backgroundColor: strength.color
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs" style={{ color: strength.color }}>
                                        {strength.text} password
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-10"
                                    type="password"
                                    placeholder="Repeat password"
                                    value={form.passwordConfirm}
                                    onChange={updateField("passwordConfirm")}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Referral Code
                                <span className="ml-1 text-muted-foreground text-xs">(optional)</span>
                            </Label>
                            <div className="relative">
                                <Gift className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-10"
                                    placeholder="e.g. MEKDES123"
                                    value={form.referby}
                                    disabled={true}
                                    onChange={updateField("referby")}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={previousStep}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                            <Button
                                type="button"
                                size="lg"
                                onClick={nextStep}
                                disabled={!isStepValid}
                            >
                                Continue
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card className="p-5 bg-muted/40">
                            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
                                Account Summary
                            </h3>
                            <div className="space-y-3 text-sm">
                                <SummaryRow
                                    label="Name"
                                    value={`${form.firstName} ${form.lastName}`}
                                />
                                <SummaryRow
                                    label="Region"
                                    value={form.region || "Not selected"}
                                />


                                {form.referby && (
                                    <SummaryRow
                                        label="Referred By"
                                        value={form.referby}
                                        highlight
                                    />
                                )}
                            </div>
                        </Card>

                        <Card className="p-4 border-primary/20 bg-primary/5">
                            <div className="flex gap-3 items-start">
                                <Flame className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-sm mb-1">
                                        How you'll grow
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        After joining, invite friends using your referral
                                        link. When{" "}
                                        <strong className="text-primary">
                                            4 of your referrals become active
                                        </strong>
                                        , your group is formed and you automatically become
                                        a{" "}
                                        <strong className="text-primary">
                                            Team Leader
                                        </strong>
                                        {" "}earning 5% on everything they sell.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="terms"
                                    checked={form.terms}
                                    onCheckedChange={(checked) => {
                                        setForm(prev => ({ ...prev, terms: checked as boolean }));
                                    }}
                                />
                                <Label
                                    htmlFor="terms"
                                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                                >
                                    I agree to the{" "}
                                    <a href="#" className="text-primary hover:underline">
                                        Terms of Service
                                    </a>
                                    ,{" "}
                                    <a href="#" className="text-primary hover:underline">
                                        Privacy Policy
                                    </a>
                                    , and{" "}
                                    <a href="#" className="text-primary hover:underline">
                                        Distributor Agreement
                                    </a>
                                </Label>
                            </div>

                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="age"
                                    checked={form.age}
                                    onCheckedChange={(checked) => {
                                        setForm(prev => ({ ...prev, age: checked as boolean }));
                                    }}
                                />
                                <Label
                                    htmlFor="age"
                                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                                >
                                    I confirm I am 18 years or older and legally permitted
                                    to operate in Ethiopia.
                                </Label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={previousStep}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                            >


                                < CheckCircle2 className="mr-2 h-4 w-4" />
                                {isPending ? "Creating account..." : "Create Account"}


                            </Button>
                        </div>
                    </form>
                )}

                {/* Login Link */}
                <p className="text-center text-sm text-muted-foreground mt-8">
                    Already have an account?{" "}
                    <ReferralLink
                        to="/login"
                        className="font-semibold text-primary hover:underline"
                    >
                        Sign In
                    </ReferralLink>
                </p>

                <div className="mt-8 text-center space-y-3">
                    <p className="text-xs text-muted-foreground">
                        By creating an account you agree to our
                        <a href="#" className="ml-1 text-primary hover:underline">
                            Terms
                        </a>
                    </p>
                    <p className="text-xs text-muted-foreground">
                        HBT — Hustlers Business Team · Powered by
                        <span className="text-primary ml-1 font-semibold">
                            TalentBridge Ethiopia
                        </span>
                    </p>
                </div>
            </div>
        </div >
    );
}