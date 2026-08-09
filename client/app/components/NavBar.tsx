import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import ReferralLink from "@/components/ReferralLink";
import { useAppSelector } from "@/store/hook";

const navItems = [
    {
        label: "Opportunity",
        href: "#opportunity",
    },
    {
        label: "Levels",
        href: "#levels",
    },
    {
        label: "Earnings",
        href: "#compensation",
    },
    {
        label: "How It Works",
        href: "#how",
    },
    {
        label: "Courses",
        href: "#products",
    },
];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    /* =========================================
       SCROLL
    ========================================= */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /* =========================================
       CLOSE MOBILE MENU ON DESKTOP
    ========================================= */
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header
            className={`
                fixed inset-x-0 top-0 z-50
                transition-all duration-300
                ${scrolled
                    ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-xl"
                    : "bg-background/80 backdrop-blur-md"
                }
            `}
        >
            <nav className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
                <div className="flex h-[80px] items-center justify-between">

                    {/* =========================================
                        LOGO
                    ========================================= */}
                    <ReferralLink
                        to="/"
                        onClick={closeMenu}
                        className="flex shrink-0 items-center gap-3"
                    >
                        <img
                            src="/logo.jpg"
                            alt="TalentBridge Ethiopia"
                            className="h-12 w-auto rounded object-contain"
                        />

                        <div className="text-xl font-bold tracking-tight text-foreground">
                            HBT
                            <span className="text-primary">
                                {" "}
                                · TalentBridge
                            </span>
                        </div>
                    </ReferralLink>

                    {/* =========================================
                        DESKTOP NAVIGATION
                    ========================================= */}
                    <div className="hidden lg:flex lg:items-center lg:gap-2">
                        {navItems.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className={`
                                    relative rounded-md
                                    px-5 py-2.5
                                    text-base font-medium
                                    transition-colors
                                    ${index === 0
                                        ? "text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }
                                `}
                            >
                                {item.label}

                                {index === 0 && (
                                    <span className="absolute inset-x-5 -bottom-1 h-0.5 rounded-full bg-primary" />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* =========================================
                        DESKTOP ACTIONS
                    ========================================= */}
                    <div className="hidden items-center gap-3 lg:flex">

                        {isAuthenticated ? (
                            /* AUTHENTICATED */
                            <ReferralLink to="/dashboard">
                                <Button
                                    size="default"
                                    className="px-7 py-2.5 text-base"
                                >
                                    Dashboard
                                </Button>
                            </ReferralLink>
                        ) : (
                            /* NOT AUTHENTICATED */
                            <>
                                <ReferralLink to="/login">
                                    <Button
                                        variant="outline"
                                        size="default"
                                        className="px-6 py-2.5 text-base"
                                    >
                                        Sign In
                                    </Button>
                                </ReferralLink>

                                <ReferralLink to="/signup">
                                    <Button
                                        size="default"
                                        className="px-7 py-2.5 text-base"
                                    >
                                        Join Now
                                    </Button>
                                </ReferralLink>
                            </>
                        )}

                    </div>

                    {/* =========================================
                        MOBILE MENU BUTTON
                    ========================================= */}
                    <Button
                        variant="ghost"
                        size="default"
                        className="h-12 w-12 lg:hidden"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={
                            isOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>

                {/* =========================================
                    MOBILE MENU
                ========================================= */}
                <div
                    className={`
                        overflow-hidden
                        transition-all duration-300
                        lg:hidden
                        ${isOpen
                            ? "max-h-[700px] opacity-100"
                            : "max-h-0 opacity-0"
                        }
                    `}
                >
                    <div className="border-t border-border py-6">

                        {/* Navigation */}
                        <div className="flex flex-col gap-1.5">
                            {navItems.map((item, index) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={`
                                        rounded-lg
                                        px-5 py-4
                                        text-base font-medium
                                        transition-colors
                                        ${index === 0
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }
                                    `}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* =====================================
                            MOBILE AUTH ACTIONS
                        ===================================== */}
                        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">

                            {isAuthenticated ? (
                                /* AUTHENTICATED */
                                <ReferralLink
                                    to="/dashboard"
                                    onClick={closeMenu}
                                    className="w-full"
                                >
                                    <Button className="h-12 w-full text-base">
                                        Dashboard
                                    </Button>
                                </ReferralLink>
                            ) : (
                                /* NOT AUTHENTICATED */
                                <>
                                    <Link
                                        to="/login"
                                        onClick={closeMenu}
                                        className="w-full"
                                    >
                                        <Button
                                            variant="outline"
                                            className="h-12 w-full text-base"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>

                                    <ReferralLink
                                        to="/signup"
                                        onClick={closeMenu}
                                        className="w-full"
                                    >
                                        <Button className="h-12 w-full text-base">
                                            Join Now
                                        </Button>
                                    </ReferralLink>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

