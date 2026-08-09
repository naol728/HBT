import React from 'react';
import {
  UserPlus,
  ShoppingBag,
  Share2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReferralLink from '../ReferralLink';
import { useAppSelector } from '@/store/hook';

const steps = [
  {
    number: "01",
    title: "Register",
    description: "Create your account, choose your entry level, and get your unique referral link instantly.",
    icon: UserPlus,
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    number: "02",
    title: "Buy a Package",
    description: "Browse HBT course packages — marketing, sales, mindset, leadership — and purchase at member price.",
    icon: ShoppingBag,
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    number: "03",
    title: "Sell & Invite",
    description: "Sell to customers, share your referral link, and build your team as your network grows.",
    icon: Share2,
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    number: "04",
    title: "Earn & Lead",
    description: "Hit 4 active referrals, become a Team Leader, and earn on every sale your team makes.",
    icon: TrendingUp,
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
];

export default function HowItWorks() {
  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  return (
    <section className="py-20 relative overflow-hidden" id="how">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 px-5 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full"
          >
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Simple. Fast. <span className="text-primary">Rewarding.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started takes less than 5 minutes. Here's your path from sign-up to earning.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-2 border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Step number background */}
              <div className="absolute -top-8 -right-8 text-7xl font-bold text-muted-foreground/5 select-none">
                {step.number}
              </div>

              <CardContent className="p-6 text-center relative z-10">
                {/* Number Circle */}
                <div className={`
                  mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full 
                  ${step.iconBg} ${step.iconColor}
                  border-2 ${step.color.split(' ')[2] || 'border-border'}
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <span className="text-xl font-bold">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Title */}
                <h4 className="text-base font-semibold mb-2 text-foreground">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-3/4 transition-all duration-500" />

                {/* Step indicator */}
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="text-xs bg-background/50">
                    Step {index + 1}/4
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection lines between steps (desktop only) */}
        <div className="hidden lg:block relative mt-[-30px] mb-[-30px] z-0">
          <div className="max-w-3xl mx-auto px-12">
            <div className="relative flex justify-between">
              {steps.slice(0, -1).map((_, index) => (
                <div key={index} className="flex-1 flex items-center">
                  <div className="w-full h-0.5 bg-gradient-to-r from-primary/20 to-primary/5" />
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 rounded-full bg-primary/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-2 mb-4 border border-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Start your journey today</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ReferralLink to={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button
                size="lg"
                className="group text-base px-8 py-6 h-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </ReferralLink>
            <ReferralLink to={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button
                size="lg"
                className="group text-base px-8 py-6 h-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </ReferralLink>
          </div>
        </div>
      </div>
    </section>
  );
}