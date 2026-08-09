import React from 'react';
import {
  Rocket,
  Users,
  Globe,
  TrendingUp,
  DollarSign,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const compensationTiers = [
  {
    icon: Rocket,
    label: "Direct Sale",
    commission: "25%",
    subtitle: "Hustler Commission",
    description: "You keep 25% of every course package sale you make — directly in your wallet.",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Users,
    label: "Leadership Bonus",
    commission: "5%",
    subtitle: "Team Leader Bonus",
    description: "Earn 5% on every sale made by members of your team, every day.",
    featured: true,
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/40",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Globe,
    label: "Regional Bonus",
    commission: "2%",
    subtitle: "Regional Leader Bonus",
    description: "Regional Leaders earn 2% on all sales across their entire region.",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
];

const calculationData = [
  {
    label: "Your personal course sales",
    description: "Birr 5,000 in course packages sold · 25% commission",
    amount: "Birr 1,250",
    color: "text-amber-400",
  },
  {
    label: "Team of 4 selling Birr 4,000 each",
    description: "Birr 16,000 team total · 5% leadership bonus",
    amount: "Birr 800",
    color: "text-amber-400",
  },
];

export default function Compensation() {
  return (
    <section className="py-20 relative overflow-hidden" id="compensation">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 px-5 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full"
          >
            Compensation Plan
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Fair. Transparent. <span className="text-primary">Real Income.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            All rewards are tied directly to product sales — ensuring a sustainable and honest income for every distributor.
          </p>
        </div>

        {/* Compensation Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {compensationTiers.map((tier, index) => (
            <Card
              key={index}
              className={`
                group relative overflow-hidden border-2 transition-all duration-300 
                bg-card/50 backdrop-blur-sm
                hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1
                ${tier.featured
                  ? 'border-primary/40 shadow-lg shadow-primary/10 bg-gradient-to-b from-primary/5 to-transparent'
                  : 'border-border/60 hover:border-primary/20'
                }
              `}
            >
              {/* Top gradient line */}
              <div className={`
                absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${tier.featured ? 'opacity-100' : ''}
              `} />

              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className={`
                  mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl 
                  ${tier.iconBg} ${tier.iconColor}
                  border-2 ${tier.color.split(' ')[2] || 'border-border'}
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <tier.icon className="h-8 w-8" />
                </div>

                {/* Label */}
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  {tier.label}
                </div>

                {/* Commission */}
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-1">
                  {tier.commission}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                  {tier.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tier.description}
                </p>

                {/* Featured badge */}
                {tier.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                      Featured
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Example Calculation */}
        <Card className="max-w-3xl mx-auto border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <Badge
                variant="secondary"
                className="mb-4 px-5 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full"
              >
                Example Calculation
              </Badge>
              <h3 className="text-2xl font-bold">Team Leader Monthly Earnings</h3>
            </div>

            <div className="space-y-4">
              {calculationData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-primary flex-shrink-0">
                    {item.amount}
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-lg bg-primary/10 border-2 border-primary/30">
                <div>
                  <div className="text-base font-bold text-foreground">
                    Total Monthly Earnings
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Personal + leadership bonus combined
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary flex-shrink-0">
                  Birr 2,050
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Company retains the remaining margin to cover operating costs and growth.
              All rewards are course-sales based.
            </p>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="group px-8 py-6 h-auto text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 rounded-full"
              >
                Start Earning Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}