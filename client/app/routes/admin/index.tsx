import { Outlet } from "react-router";
import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ProtectedRoute types={["admin"]}>
            <div className="min-h-screen bg-background">

                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Content */}
                <div
                    className="
                        flex
                        min-h-screen
                        flex-col
                        transition-all
                        duration-300
                        lg:ml-64
                    "
                >
                    <DashboardNavbar
                        onOpenSidebar={() => setSidebarOpen(true)}
                    />

                    <main
                        className="
                            flex-1
                            overflow-x-hidden
                            p-4
                            sm:p-5
                            lg:p-6
                        "
                    >
                        <div className="mx-auto w-full max-w-7xl">
                            <Outlet />
                        </div>
                    </main>
                </div>

            </div>
        </ProtectedRoute>
    );
}