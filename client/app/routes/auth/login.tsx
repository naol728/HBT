import ReferralLink from "@/components/ReferralLink";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert("Login successful!");
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex overflow-hidden">
            {/* LEFT PANEL */}
            <div className="flex-1 relative flex flex-col justify-end p-14 min-h-screen">
                <div className="absolute inset-0 z-0 bg-[url('/logo.jpg')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-lg">
                    <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                        Powered by TalentBridge Ethiopia
                    </span>

                    <h2 className="text-3xl font-bold mt-2 text-foreground">
                        Your Team is <span className="text-primary">Growing</span> Without You
                    </h2>

                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                        Sign in to check your commissions, track your team's sales, and
                        collect your earnings — all from one place.
                    </p>

                    <div className="flex gap-8 mt-10 pt-8 border-t border-border/50">
                        <div>
                            <div className="text-2xl font-bold text-primary">3,200+</div>
                            <div className="text-xs uppercase tracking-wider text-muted-foreground">
                                Active Distributors
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-primary">Birr 2M+</div>
                            <div className="text-xs uppercase tracking-wider text-muted-foreground">
                                Commissions Paid
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-primary">98%</div>
                            <div className="text-xs uppercase tracking-wider text-muted-foreground">
                                Payout Rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-[480px] min-h-screen bg-card flex flex-col justify-center p-14 overflow-y-auto">
                <ReferralLink to="/" className="flex items-center gap-2.5 mb-10">
                    <img
                        src="/logo.jpg"
                        alt="TalentBridge Ethiopia"
                        className="h-[38px] w-auto rounded"
                    />
                    <div className="text-base font-bold text-foreground">
                        HBT<span className="text-primary"> · TalentBridge</span>
                    </div>
                </ReferralLink>

                <h2 className="text-2xl font-bold mb-1.5 text-foreground">Sign In</h2>
                <p className="text-sm text-muted-foreground mb-8">
                    Access your dashboard
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <Label htmlFor="tel" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                            Phone
                        </Label>
                        <div className="relative mt-2">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                            <Input
                                id="tel"
                                type="tel"
                                placeholder="2519--------"
                                required
                                className="pl-10 bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                            Password
                        </Label>
                        <div className="relative mt-2">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                                className="pl-10 pr-11 bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5">
                            <Checkbox
                                id="remember"
                                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                                Remember me
                            </Label>
                        </div>

                        <Link
                            to="/forgot-password"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In to Dashboard"}
                    </Button>
                </form>

                <div className="text-center mt-6 text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <ReferralLink to="/signup" className="text-primary font-semibold hover:text-primary/80">
                        Join for free
                    </ReferralLink>
                </div>

                <p className="text-xs text-muted-foreground/70 mt-8 leading-relaxed text-center">
                    By signing in you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:text-primary/80">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:text-primary/80">
                        Privacy Policy
                    </Link>
                    .
                </p>

                <p className="text-[0.65rem] text-muted-foreground/50 mt-4 text-center">
                    HBT — Hustlers Business Team · Powered by{" "}
                    <strong className="text-primary">TalentBridge Ethiopia</strong>
                </p>
            </div>
        </div>
    );
}