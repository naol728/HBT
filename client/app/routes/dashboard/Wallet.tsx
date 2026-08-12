
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    CalendarDays,
    CheckCircle2,
    CreditCard,
    Landmark,
    Wallet as WalletIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const withdrawalHistory = [
    {
        method: "CBE Bank Transfer",
        amount: 2000,
        account: "****4821",
        date: "Jul 15, 2026",
        status: "Completed",
    },
    {
        method: "Telebirr",
        amount: 1280,
        account: "0912****78",
        date: "Jun 28, 2026",
        status: "Completed",
    },
];

export default function Wallet() {
    const handleWithdraw = () => {
        console.log("Withdraw clicked");
    };

    const handleAddBank = () => {
        console.log("Add bank account clicked");
    };

    return (
        <div className="w-full space-y-6">
            {/* =====================================================
          BALANCE + STATISTICS
      ====================================================== */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Available Balance */}
                <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-card via-card to-primary/5">
                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

                    <CardContent className="relative p-6 sm:p-8">
                        <div className="mb-2 flex items-center gap-2">
                            <WalletIcon className="h-4 w-4 text-muted-foreground" />

                            <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                                Available Balance
                            </span>
                        </div>

                        <div className="mb-1 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                            Birr 8,240
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Commissions earned to date
                        </p>

                        <Separator className="my-6" />

                        <div className="flex flex-wrap gap-3">
                            <Button

                                onClick={handleAddBank}
                                className="gap-2"
                            >
                                <CreditCard className="h-4 w-4" />
                                Deposit
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleWithdraw}
                                className="gap-2"
                            >
                                <ArrowUpFromLine className="h-4 w-4" />
                                Withdraw
                            </Button>

                        </div>
                    </CardContent>
                </Card>

                {/* Monthly Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {/* This Month */}
                    <Card>
                        <CardContent className="flex items-center justify-between p-5">
                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                                    This Month
                                </p>

                                <p className="text-2xl font-bold text-foreground">
                                    Birr 3,840
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Current month earnings
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                <CalendarDays className="h-5 w-5 text-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Withdrawn */}
                    <Card>
                        <CardContent className="flex items-center justify-between p-5">
                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                                    Total Withdrawn
                                </p>

                                <p className="text-2xl font-bold text-foreground">
                                    Birr 3,280
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Successfully withdrawn
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
                                <Landmark className="h-5 w-5 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* =====================================================
          WITHDRAWAL HISTORY
      ====================================================== */}
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-base">
                                Withdrawal History
                            </CardTitle>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Your recent withdrawal transactions
                            </p>
                        </div>

                        <div className="hidden rounded-lg bg-muted/50 p-2 sm:flex">
                            <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    {/* Desktop table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full">
                            <thead>
                                <tr className="border-y border-border bg-muted/30">
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Method
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Amount
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Account
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Date
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {withdrawalHistory.map((withdrawal, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-border/50 last:border-0 transition-colors hover:bg-muted/20"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                                                    {withdrawal.method.includes("Bank") ? (
                                                        <Landmark className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </div>

                                                <span className="text-sm font-medium text-foreground">
                                                    {withdrawal.method}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-destructive">
                                                -Birr {withdrawal.amount.toLocaleString()}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs text-muted-foreground">
                                                {withdrawal.account}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm text-muted-foreground">
                                                {withdrawal.date}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Badge
                                                variant="outline"
                                                className="gap-1 border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
                                            >
                                                <CheckCircle2 className="h-3 w-3" />
                                                {withdrawal.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-3 p-4 md:hidden">
                        {withdrawalHistory.map((withdrawal, index) => (
                            <Card
                                key={index}
                                className="border-border/60 bg-muted/20"
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                                                {withdrawal.method.includes("Bank") ? (
                                                    <Landmark className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {withdrawal.method}
                                                </p>

                                                <p className="mt-1 font-mono text-xs text-muted-foreground">
                                                    {withdrawal.account}
                                                </p>
                                            </div>
                                        </div>

                                        <Badge
                                            variant="outline"
                                            className="gap-1 border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
                                        >
                                            <CheckCircle2 className="h-3 w-3" />
                                            Completed
                                        </Badge>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Date
                                            </p>

                                            <p className="mt-1 text-sm">
                                                {withdrawal.date}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground">
                                                Amount
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-destructive">
                                                -Birr {withdrawal.amount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}