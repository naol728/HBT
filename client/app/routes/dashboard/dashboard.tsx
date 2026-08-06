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



            {/* Widgets */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {widgets.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Card
                            key={item.title}
                            className="transition-all hover:border-primary/40"
                        >
                            <CardHeader className="flex flex-row items-start justify-between pb-2">

                                <div
                                    className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary/10
                  text-primary
                "
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div
                                    className={`flex items-center gap-1 text-sm font-semibold ${item.positive
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    {item.positive ? (
                                        <ArrowUpRight className="h-4 w-4" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4" />
                                    )}

                                    {item.change}
                                </div>

                            </CardHeader>

                            <CardContent>

                                <p className="text-3xl font-bold">
                                    {item.value}
                                </p>

                                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                                    {item.title}
                                </p>

                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Progress */}

            <div className="grid gap-6 lg:grid-cols-2">

                <Card>

                    <CardHeader>
                        <CardTitle>
                            Team Progress
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5">

                        <div>

                            <div className="mb-2 flex justify-between text-sm">
                                <span>Level Completion</span>
                                <span>75%</span>
                            </div>

                            <Progress value={75} />

                        </div>

                        <div>

                            <div className="mb-2 flex justify-between text-sm">
                                <span>Monthly Goal</span>
                                <span>40%</span>
                            </div>

                            <Progress value={40} />

                        </div>

                        <div>

                            <div className="mb-2 flex justify-between text-sm">
                                <span>Referral Target</span>
                                <span>92%</span>
                            </div>

                            <Progress value={92} />

                        </div>

                    </CardContent>

                </Card>

                <Card>

                    <CardHeader>
                        <CardTitle>
                            Quick Statistics
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-2 gap-4">

                        <div className="rounded-lg border p-4">
                            <p className="text-3xl font-bold">
                                18
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Direct Referrals
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-3xl font-bold">
                                64
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Team Members
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-3xl font-bold">
                                ETB 4,250
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Wallet
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-3xl font-bold">
                                #4
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Rank
                            </p>
                        </div>

                    </CardContent>

                </Card>

            </div>

            {/* Table */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Recent Commissions
                    </CardTitle>
                </CardHeader>

                <CardContent className="overflow-x-auto">

                    <Table>

                        <TableHeader>

                            <TableRow>

                                <TableHead>Source</TableHead>

                                <TableHead>Amount</TableHead>

                                <TableHead>Status</TableHead>

                                <TableHead>Date</TableHead>

                            </TableRow>

                        </TableHeader>

                        <TableBody>

                            {commissions.map((row) => (
                                <TableRow key={row.name}>

                                    <TableCell className="font-medium">
                                        {row.name}
                                    </TableCell>

                                    <TableCell>
                                        {row.amount}
                                    </TableCell>

                                    <TableCell>

                                        <Badge
                                            variant={
                                                row.status === "Paid"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {row.status}
                                        </Badge>

                                    </TableCell>

                                    <TableCell>
                                        {row.date}
                                    </TableCell>

                                </TableRow>
                            ))}

                        </TableBody>

                    </Table>

                </CardContent>

            </Card>

        </div>
    );
}