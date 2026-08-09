import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Users,
  Rocket,
  CheckCircle2,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Sparkles,
    label: "Sell practical HBT course packages",
    color: "text-amber-400",
  },
  {
    icon: TrendingUp,
    label: "Develop real sales & leadership skills",
    color: "text-blue-400",
  },
  {
    icon: Target,
    label: "Earn fair income",
    color: "text-emerald-400",
  },
  {
    icon: Rocket,
    label: "All from your phone",
    color: "text-purple-400",
  },
];

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl shadow-primary/5">
          <CardContent className="p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              {/* Badge */}
              <Badge
                variant="secondary"
                className="mb-6 px-5 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full inline-flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Ready to Start?
              </Badge>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 max-w-3xl mx-auto">
                "We create opportunities for{' '}
                <span className="text-primary relative">
                  Ethiopian youth
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 rounded-full" />
                </span>
                {' '}to build sustainable businesses."
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Sell practical HBT course packages, develop real sales and leadership skills,
                and earn fair income — all from your phone.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/20 transition-colors group"
                    >
                      <div className={`
                        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                        bg-primary/10 group-hover:bg-primary/20 transition-colors
                      `}>
                        <Icon className={`h-4 w-4 ${feature.color}`} />
                      </div>
                      <span className="text-sm text-foreground">{feature.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="group px-8 py-6 h-auto text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 rounded-full bg-primary hover:bg-primary/90"
                >
                  Join For Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 h-auto text-base border-2 rounded-full hover:bg-primary/5 transition-all duration-300"
                >
                  Sign In
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>No upfront fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Instant access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Flexible schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Community support</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}