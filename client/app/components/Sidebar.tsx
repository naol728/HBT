import {
    LayoutDashboard,
    Users,
    BookOpen,
    Wallet,
    Bell,
    User,
    GraduationCap,
    Gift,
    LogOut,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { NavLink } from "react-router";
import ReferralNavLink from "./ReferralNavLink";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Button } from '@/components/ui/button';
import { logout } from "@/store/slices/authSlice";

const sections = [
    {
        title: "Main",
        items: [
            {
                label: "Overview",
                icon: LayoutDashboard,
                to: "/dashboard",
            },
            {
                label: "My Team",
                icon: Users,
                to: "/dashboard/team",
                badge: "3/4",
            },
            {
                label: "Buy Courses",
                icon: BookOpen,
                to: "/dashboard/orders",
            },
            {
                label: "Commissions",
                icon: Wallet,
                to: "/dashboard/commissions",
                badge: "New",
            },
        ],
    },

    {
        title: "Grow",
        items: [
            {
                label: "Training Center",
                icon: GraduationCap,
                to: "/dashboard/training",
            },
            {
                label: "Referrals",
                icon: Gift,
                to: "/dashboard/referrals",
            },
        ],
    },

    {
        title: "Account",
        items: [
            {
                label: "Wallet",
                icon: Wallet,
                to: "/dashboard/wallet",
            },
            {
                label: "Profile",
                icon: User,
                to: "/dashboard/profile",
            },
            {
                label: "Announcement",
                icon: Bell,
                to: "/dashboard/announcement",
                badge: "2",
            },
        ],
    },
];

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};

export default function Sidebar({
    open,
    onClose,
}: SidebarProps) {
    const { loading, isAuthenticated, user } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch()
    return (
        <>
            {/* Mobile Overlay */}
            <div
                onClick={onClose}
                className={cn(
                    "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
                    open
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                )}
            />
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64",
                    "flex flex-col",
                    "overflow-y-auto scrollbar-hide",
                    "border-r border-border bg-card",
                    "transition-transform duration-300",
                    "lg:translate-x-0",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo */}

                <div className="flex items-center gap-3 border-b border-border px-6 py-6">
                    <img
                        src="/logo.jpg"
                        className="h-8 w-8 rounded-md object-cover"
                    />

                    <div>
                        <h3 className="font-bold text-sm">
                            HBT
                            <span className="text-primary"> · TalentBridge</span>
                        </h3>
                    </div>
                </div>

                {/* Navigation */}


                <div className="flex-1 overflow-y-auto px-3 py-5">
                    {sections.map((section) => (
                        <div key={section.title} className="mb-8">
                            <p
                                className="
                mb-3
                px-3
                text-[11px]
                uppercase
                tracking-[0.2em]
                text-muted-foreground
                font-semibold
              "
                            >
                                {section.title}
                            </p>

                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <ReferralNavLink
                                            key={item.label}
                                            to={item.to}
                                            onClick={onClose}
                                            className={({ isActive }) =>
                                                cn(
                                                    "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                                                    isActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )
                                            }
                                        >
                                            <Icon className="mr-3 h-5 w-5" />

                                            <span>{item.label}</span>

                                            {item.badge && (
                                                <Badge
                                                    className="ml-auto"
                                                    variant={
                                                        item.badge === "New"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </ReferralNavLink>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <Separator />

                {/* User */}

                <div className="p-4">
                    <ReferralNavLink
                        to="/dashboard/profile"
                        className="
            flex
            items-center
            gap-3
            rounded-lg
            p-3
            transition-colors
            hover:bg-muted
          "
                    >
                        <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                NM
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <p className="text-sm font-semibold">
                                {user?.first_name.toUpperCase() + " " + user?.last_name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {user?.level}
                            </p>
                        </div>
                    </ReferralNavLink>

                    <Button
                        onClick={() => dispatch(logout())}
                        variant={"destructive"}
                        className="
            mt-3
            flex
            items-center
            gap-3
            rounded-lg
            px-3
            py-2.5
            text-sm
            text-destructive
          w-full
        
          "
                    >
                        <LogOut className="h-4 w-4" />

                        Sign Out
                    </Button>

                    <p className="mt-5 text-center text-[10px] text-muted-foreground">
                        Powered by{" "}
                        <span className="font-semibold text-primary">
                            TalentBridge Ethiopia
                        </span>
                    </p>
                </div>
            </aside>
        </>
    );
}