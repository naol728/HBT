import React from 'react';
import {
    Building2,
    Globe,
    Users,
    Briefcase,
    ShoppingBag,
    UserPlus,
    Mail,
    Flame,
    Trophy,
    ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tiers = [
    {
        level: "Company",
        icon: Building2,
        description: "National Director",
        color: "from-primary/20 to-primary/10 border-primary/30",
        iconBg: "bg-primary/20",
        iconColor: "text-primary",
        width: "w-full max-w-[240px]",
    },
    {
        level: "Regional Leaders",
        icon: Globe,
        description: "12 across Ethiopia · 2% regional bonus",
        color: "from-blue-500/15 to-blue-600/10 border-blue-500/25",
        iconBg: "bg-blue-500/15",
        iconColor: "text-blue-400",
        width: "w-full max-w-[320px]",
    },
    {
        level: "Team Leaders",
        icon: Users,
        description: "Unlocked at 4 active referrals · 5% leadership bonus",
        color: "from-cyan-500/15 to-cyan-600/10 border-cyan-500/25",
        iconBg: "bg-cyan-500/15",
        iconColor: "text-cyan-400",
        width: "w-full max-w-[400px]",
    },
    {
        level: "Hustlers",
        icon: Briefcase,
        description: "Direct distributors · 25% commission",
        color: "from-amber-500/15 to-amber-600/10 border-amber-500/25",
        iconBg: "bg-amber-500/15",
        iconColor: "text-amber-400",
        width: "w-full max-w-[480px]",
    },
    {
        level: "Customers",
        icon: ShoppingBag,
        description: "End buyers of HBT course packages",
        color: "from-emerald-500/15 to-emerald-600/10 border-emerald-500/25",
        iconBg: "bg-emerald-500/15",
        iconColor: "text-emerald-400",
        width: "w-full max-w-[560px]",
    },
];

const steps = [
    {
        icon: UserPlus,
        title: "You Join",
        description: "Sign up under a Regional Leader or existing distributor.",
        emoji: "👤",
    },
    {
        icon: Mail,
        title: "Invite Others",
        description: "Share your referral link with friends, family, and your network.",
        emoji: "📨",
    },
    {
        icon: Flame,
        title: "4 Active Members",
        description: "Once 4 of your referrals become active distributors, your group unlocks.",
        emoji: "🔥",
    },
    {
        icon: Trophy,
        title: "Team Leader",
        description: "You become a Team Leader and earn 5% on every sale your team makes.",
        emoji: "🏆",
    },
];

export default function BusinessModel() {
    return (
        <section className="py-20 relative overflow-hidden" id="levels">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <Badge
                        variant="secondary"
                        className="mb-4 px-5 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full"
                    >
                        THE BUSINESS MODEL
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        A Clear <span className="text-primary">Pyramid Structure</span>
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Every level has a clear path forward. Start as a Hustler and grow into a Regional Leader.
                    </p>
                </div>

                {/* Pyramid Tiers - Pyramid Style */}
                <div className="flex flex-col items-center mb-16">
                    <div className="flex flex-col items-center w-full">
                        {tiers.map((tier, index) => (
                            <React.Fragment key={tier.level}>
                                {/* Tier Card */}
                                <div className={`
                                    ${tier.width} 
                                    mx-auto
                                    transform transition-all duration-300 
                                    hover:scale-105 hover:shadow-xl hover:shadow-primary/10
                                    ${index === 0 ? 'z-10' : ''}
                                    ${index === tiers.length - 1 ? 'z-0' : ''}
                                `}>
                                    <div className={`
                                        flex items-center gap-4 p-5 border-2 rounded-xl
                                        bg-gradient-to-r ${tier.color}
                                        transition-all duration-300
                                        ${index === 0 ? 'border-primary/40 shadow-lg shadow-primary/10' : 'border-border/60'}
                                        ${index === 0 ? 'bg-primary/10' : 'bg-card/50 backdrop-blur-sm'}
                                    `}>
                                        <div className={`
                                            flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                                            ${tier.iconBg} ${tier.iconColor}
                                            border-2 ${tier.color.split(' ')[2] || 'border-border'}
                                            ${index === 0 ? 'border-primary/30' : ''}
                                        `}>
                                            <tier.icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                                <h3 className={`
                                                    text-base font-bold
                                                    ${index === 0 ? 'text-primary' : 'text-foreground'}
                                                `}>
                                                    {tier.level}
                                                </h3>
                                                <span className="text-xs text-muted-foreground font-medium">
                                                    {tier.description}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Level indicator */}
                                        <div className="flex-shrink-0">
                                            <span className={`
                                                text-xs font-bold px-2 py-1 rounded-full
                                                ${index === 0 ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}
                                            `}>
                                                Level {tiers.length - index}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow between tiers */}
                                {index < tiers.length - 1 && (
                                    <div className="relative py-2 flex justify-center">
                                        <div className="relative flex flex-col items-center">
                                            {/* Vertical line */}
                                            <div className="w-0.5 h-6 bg-gradient-to-b from-primary/40 to-primary/10" />
                                            <ChevronDown className="h-5 w-5 text-primary/30 -mt-0.5" />
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 flex justify-center">
                                                <div className="w-8 h-8 bg-primary/5 rounded-full blur-xl" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Pyramid base decoration */}
                    <div className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-2" />
                    <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mt-1" />
                </div>

                {/* How Groups Form */}
                <div className="mx-auto max-w-5xl">
                    <Card className="border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-8 sm:p-10">
                            <div className="text-center mb-10">
                                <Badge
                                    variant="secondary"
                                    className="mb-4 px-5 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full"
                                >
                                    HOW GROUPS FORM
                                </Badge>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                                    Invite 4 → Become a <span className="text-primary">Team Leader</span>
                                </h3>
                                <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                                    When your direct referrals reach 4 active members, your group is formed
                                    and you automatically become a Team Leader with a 5% leadership bonus
                                    on your team's sales.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.title}
                                        className="group relative p-6 text-center rounded-xl border-2 border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                                    >
                                        {/* Step number */}
                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                                            {index + 1}
                                        </div>

                                        {/* Icon */}
                                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                                            <span className="text-2xl">{step.emoji}</span>
                                        </div>

                                        {/* Content */}
                                        <h4 className="text-sm font-semibold mb-1.5 text-foreground">
                                            {step.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Decorative line */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary/20 group-hover:w-2/3 transition-all duration-300" />
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-10 text-center">
                                <Button
                                    size="lg"
                                    className="group px-8 py-6 h-auto text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 rounded-full hover:scale-105"
                                >
                                    Start Your Journey Today
                                    <UserPlus className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}