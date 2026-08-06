import ReferralLink from "@/components/ReferralLink";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            alert("Login successful!");
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <div className="auth-page">
            {/* LEFT PANEL */}
            <div className="auth-left">
                <div className="auth-left-bg"></div>

                <div className="auth-left-content">
                    <span className="section-label">
                        Powered by TalentBridge Ethiopia
                    </span>

                    <h2>
                        Your Team is <span className="rose">Growing</span> Without You
                    </h2>

                    <p>
                        Sign in to check your commissions, track your team's sales, and
                        collect your earnings — all from one place.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: 32,
                            marginTop: 40,
                            paddingTop: 32,
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    color: "var(--gold)",
                                }}
                            >
                                3,200+
                            </div>

                            <div
                                style={{
                                    fontSize: "0.72rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    color: "var(--text-muted)",
                                }}
                            >
                                Active Distributors
                            </div>
                        </div>

                        <div>
                            <div
                                style={{
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    color: "var(--gold)",
                                }}
                            >
                                Birr 2M+
                            </div>

                            <div
                                style={{
                                    fontSize: "0.72rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    color: "var(--text-muted)",
                                }}
                            >
                                Commissions Paid
                            </div>
                        </div>

                        <div>
                            <div
                                style={{
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    color: "var(--gold)",
                                }}
                            >
                                98%
                            </div>

                            <div
                                style={{
                                    fontSize: "0.72rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    color: "var(--text-muted)",
                                }}
                            >
                                Payout Rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="auth-right">
                <Link to="/" className="auth-logo">
                    <img
                        src="/assets/images/talentbridge-logo.jpg"
                        alt="TalentBridge Ethiopia"
                        style={{
                            height: 38,
                            width: "auto",
                            borderRadius: 4,
                        }}
                    />

                    <div className="auth-logo-text" style={{ fontSize: "1rem" }}>
                        HBT<span> · TalentBridge</span>
                    </div>
                </Link>

                <h2 className="auth-title">Sign In</h2>

                <p className="auth-subtitle">
                    Access your distributor dashboard
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email Address or Phone
                        </label>

                        <div className="input-icon">
                            <span className="icon">✉</span>

                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>

                        <div className="input-icon has-toggle">
                            <span className="icon">🔒</span>

                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                            >
                                👁
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 24,
                        }}
                    >
                        <div className="form-check">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        <Link
                            to="/forgot-password"
                            style={{
                                fontSize: ".82rem",
                                color: "var(--gold)",
                            }}
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="btn btn-rose btn-full btn-lg"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In to Dashboard"}
                    </Button>
                </form>

                <div className="auth-switch">
                    Don't have an account?{" "}
                    <ReferralLink to="/signup">Join for free</ReferralLink>
                </div>

                <p
                    style={{
                        fontSize: ".72rem",
                        color: "var(--text-muted)",
                        marginTop: 32,
                        lineHeight: 1.6,
                        textAlign: "center",
                    }}
                >
                    By signing in you agree to our{" "}
                    <Link to="/terms" style={{ color: "var(--gold)" }}>
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" style={{ color: "var(--gold)" }}>
                        Privacy Policy
                    </Link>
                    .
                </p>

                <p
                    style={{
                        fontSize: ".68rem",
                        color: "var(--text-muted)",
                        marginTop: 16,
                        textAlign: "center",
                        opacity: 0.6,
                    }}
                >
                    HBT — Hustlers Business Team · Powered by{" "}
                    <strong style={{ color: "var(--gold)" }}>
                        TalentBridge Ethiopia
                    </strong>
                </p>
            </div>
        </div>
    );
}