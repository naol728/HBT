import {
    Menu,
    Bell,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hook";
import ReferralLink from "@/components/ReferralLink";

interface DashboardNavbarProps {
    onOpenSidebar: () => void;
}

export default function DashboardNavbar({

    onOpenSidebar,
}: DashboardNavbarProps) {
    const user = useAppSelector((state) => state?.auth.user)

    return (
        <header
            className="
                sticky
                top-0
                z-30
                h-16
                border-b
                border-border
                bg-background/90
                backdrop-blur
            "
        >
            <div className="flex h-full items-center justify-between px-4 sm:px-6">

                {/* Left */}
                <div className="flex min-w-0 items-center gap-3">

                    {/* Sidebar Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={onOpenSidebar}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="min-w-0">
                        <h1 className="truncate text-base font-semibold sm:text-lg">
                            Dashboard
                        </h1>

                        <p className="hidden text-xs text-muted-foreground sm:block">
                            Welcome back {user?.first_name.toUpperCase()} 👋
                        </p>

                        <p className="text-xs text-muted-foreground sm:hidden">
                            Welcome  {user?.first_name.toUpperCase()}👋
                        </p>
                    </div>

                </div>

                {/* Right */}
                <div className="flex items-center gap-1 sm:gap-2">



                    {/* Notifications */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                    >
                        <Bell className="h-5 w-5" />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
                    </Button>

                    {/* User */}
                    <ReferralLink to="/dashboard/profile">
                        <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                            <AvatarFallback className="text-xs font-semibold">
                                NM
                            </AvatarFallback>
                        </Avatar>
                    </ReferralLink>


                </div>

            </div>
        </header>
    );
}