import {
    Users,
    Wallet,
    TrendingUp,
    GraduationCap,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const widgets = [
    {
        title: "Total Team",
        value: "124",
        icon: Users,
        change: "+12%",
        positive: true,
    },
    {
        title: "Commissions",
        value: "ETB 18,450",
        icon: Wallet,
        change: "+25%",
        positive: true,
    },
    {
        title: "Monthly Sales",
        value: "76",
        icon: TrendingUp,
        change: "-5%",
        positive: false,
    },
    {
        title: "Courses",
        value: "8",
        icon: GraduationCap,
        change: "+3",
        positive: true,
    },
];

const commissions = [
    {
        name: "Course Purchase",
        amount: "ETB 500",
        status: "Paid",
        date: "Today",
    },
    {
        name: "Referral Bonus",
        amount: "ETB 250",
        status: "Pending",
        date: "Yesterday",
    },
    {
        name: "Leadership Bonus",
        amount: "ETB 800",
        status: "Paid",
        date: "2 days ago",
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">

            admin dashboard

        </div>
    );
}