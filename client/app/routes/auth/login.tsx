
import ReferralLink from "@/components/ReferralLink";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { signIn } from "@/api/auth";
import { withReferral } from "@/components/withReferral";
import { useAppDispatch } from "@/store/hook";
import { loginSuccess } from "@/store/slices/authSlice";

export default function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const dispatch = useAppDispatch()
    const loginMutation = useMutation({
        mutationFn: signIn,

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

            toast.success("Login successful!", {
                description: "Welcome back to your dashboard.",
            });

            /*
             * If your backend returns a token, store it here.
             *
             * Example:
             * localStorage.setItem("token", response.token);
             */

            if (remember) {
                localStorage.setItem("rememberLogin", "true");
            } else {
                localStorage.removeItem("rememberLogin");
            }

            navigate(withReferral("/dashboard"));
        },

        onError: (error: any) => {
            console.error("Login error:", error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Invalid phone number or password.";

            toast.error("Login failed", {
                description: message,
            });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedPhone = phone.trim();

        if (!trimmedPhone) {
            toast.error("Phone number is required");
            return;
        }

        if (!/^[0-9]{9}$/.test(trimmedPhone)) {
            toast.error("Phone number must be 9 digits, e.g. 987654321");
            return;
        }

        if (!password.trim()) {
            toast.error("Password is required");
            return;
        }

        loginMutation.mutate({
            phone: trimmedPhone,
            password,
        });
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-background">
            {/* =====================================================
                LEFT PANEL
            ====================================================== */}

            <div className="relative hidden min-h-screen flex-1 flex-col justify-end overflow-hidden p-8 md:flex lg:p-14">
                {/* Background */}
                <div className="absolute inset-0">
                    <img
                        src="/logo.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                    <div className="absolute inset-0 bg-background/20" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-lg">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Powered by TalentBridge Ethiopia
                    </span>

                    <h2 className="mt-2 text-3xl font-bold text-foreground lg:text-4xl">
                        Your Team is{" "}
                        <span className="text-primary">Growing</span>{" "}
                        Without You
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        Sign in to check your commissions, track your team's
                        sales, and collect your earnings — all from one place.
                    </p>

                    {/* Statistics */}
                    <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/50 pt-8 sm:flex sm:gap-8">
                        <div>
                            <div className="text-xl font-bold text-primary sm:text-2xl">
                                3,200+
                            </div>

                            <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                                Active Distributors
                            </div>
                        </div>

                        <div>
                            <div className="text-xl font-bold text-primary sm:text-2xl">
                                Birr 2M+
                            </div>

                            <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                                Commissions Paid
                            </div>
                        </div>

                        <div>
                            <div className="text-xl font-bold text-primary sm:text-2xl">
                                98%
                            </div>

                            <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                                Payout Rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                RIGHT PANEL
            ====================================================== */}

            <div className="flex min-h-screen w-full flex-col justify-center overflow-y-auto bg-card p-6 sm:p-10 md:w-[480px] md:p-12 lg:p-14">
                {/* Logo */}
                <ReferralLink
                    to="/"
                    className="mb-8 flex items-center gap-2.5 sm:mb-10"
                >
                    <img
                        src="/logo.jpg"
                        alt="TalentBridge Ethiopia"
                        className="h-[38px] w-auto rounded object-contain"
                    />

                    <div className="text-base font-bold text-foreground">
                        HBT
                        <span className="text-primary">
                            {" "}
                            · TalentBridge
                        </span>
                    </div>
                </ReferralLink>

                {/* Header */}
                <div>
                    <h2 className="mb-1.5 text-2xl font-bold text-foreground">
                        Sign In
                    </h2>

                    <p className="mb-8 text-sm text-muted-foreground">
                        Access your dashboard
                    </p>
                </div>

                {/* =================================================
                    FORM
                ================================================== */}

                <form onSubmit={handleSubmit} noValidate>

                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="flex">
                            <div className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-border bg-muted/10 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 mr-2" />
                                +251
                            </div>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    const digitsOnly = rawValue.replace(/[^0-9]/g, "");
                                    setPhone(digitsOnly.slice(0, 9));
                                }}
                                placeholder="987654321"
                                autoComplete="tel"
                                disabled={loginMutation.isPending}
                                className="h-11 bg-background/50 pl-10 text-foreground placeholder:text-muted-foreground/60"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Enter your 9-digit phone number without the country code, e.g. 987654321.</p>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <Label
                            htmlFor="password"
                            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                            Password
                        </Label>

                        <div className="relative mt-2">
                            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />

                            <Input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                disabled={loginMutation.isPending}
                                className="h-11 bg-background/50 pl-10 pr-11 text-foreground placeholder:text-muted-foreground/60"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                disabled={loginMutation.isPending}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember + Forgot */}
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <Checkbox
                                id="remember"
                                checked={remember}
                                onCheckedChange={(checked) =>
                                    setRemember(checked === true)
                                }
                                disabled={
                                    loginMutation.isPending
                                }
                            />

                            <Label
                                htmlFor="remember"
                                className="cursor-pointer text-sm text-muted-foreground"
                            >
                                Remember me
                            </Label>
                        </div>


                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="h-11 w-full"
                    >
                        {loginMutation.isPending
                            ? "Signing in..."
                            : "Sign In to Dashboard"}
                    </Button>
                </form>

                {/* Register */}
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <ReferralLink
                        to="/signup"
                        className="font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                        Join for free
                    </ReferralLink>
                </div>

                {/* Terms */}


                {/* Footer */}
                <p className="mt-4 text-center text-[0.65rem] text-muted-foreground/50">
                    HBT — Hustlers Business Team · Powered by{" "}
                    <strong className="text-primary">
                        TalentBridge Ethiopia
                    </strong>
                </p>
            </div>
        </div>
    );
}