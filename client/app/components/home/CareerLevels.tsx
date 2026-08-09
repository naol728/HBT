import React from 'react';
import {
  Rocket,
  Star,
  Crown,
  Globe,
  Building2,
  Check,
  Zap,
  TrendingUp,
  Users,
  Award,
  BarChart3,
  Sparkles,
  Medal,
  Target,
  Gift,
  Shield,
  Briefcase,
  Trophy,
  MapPin,
  Network
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const levels = [
  {
    level: 1,
    title: "Hustler",
    icon: Rocket,
    emoji: "🚀",
    commission: "25%",
    commissionLabel: "On every direct sale",
    requirement: "Register and purchase your starter course package.",
    features: [
      "Access to full course catalog",
      "Personal referral link",
      "Training content access",
      "Mobile app access"
    ],
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    level: 2,
    title: "Senior Hustler",
    icon: Star,
    emoji: "⭐",
    commission: "25%",
    commissionLabel: "+ Performance bonuses",
    requirement: "Consistent monthly course sales targets met.",
    features: [
      "Everything in Level 1",
      "Monthly performance bonus",
      "Priority access to new courses",
      "Senior badge & recognition"
    ],
    color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  },
  {
    level: 3,
    title: "Team Leader",
    icon: Crown,
    emoji: "👑",
    commission: "5%",
    commissionLabel: "On all team sales",
    requirement: "Recruit & activate 4 direct members.",
    features: [
      "25% on your own course sales",
      "5% leadership bonus on team",
      "Group dashboard & analytics",
      "Mentor team members",
      "Leadership training program"
    ],
    featured: true,
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    level: 4,
    title: "Regional Leader",
    icon: Globe,
    emoji: "🌍",
    commission: "2%",
    commissionLabel: "On all regional sales",
    requirement: "Build and lead multiple successful teams.",
    features: [
      "All previous level perks",
      "2% regional bonus on all sales",
      "Regional dashboard access",
      "12 positions available nationally"
    ],
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    level: 5,
    title: "National Director",
    icon: Building2,
    emoji: "🏢",
    commission: "—",
    commissionLabel: "Company leadership",
    requirement: "Oversee national operations & all regions.",
    features: [
      "Full national network visibility",
      "Strategic growth oversight",
      "Product line development",
      "Company equity participation"
    ],
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/30",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  },
];

export default function CareerLevels() {
  return (
    <section className="py-20 relative overflow-hidden" id="levels-detail">
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
            Career Path
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            5 Levels of <span className="text-primary">Growth</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Every level unlocks higher commissions, greater responsibility, and stronger earning potential.
          </p>
        </div>

        {/* First Row - Levels 1-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {levels.slice(0, 3).map((level) => (
            <LevelCard key={level.level} level={level} />
          ))}
        </div>

        {/* Second Row - Levels 4-5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {levels.slice(3, 5).map((level) => (
            <LevelCard key={level.level} level={level} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LevelCard({ level }: { level: typeof levels[0] }) {
  return (
    <Card className={`
      group relative overflow-hidden transition-all duration-300 
      border-2 bg-card/50 backdrop-blur-sm
      hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1
      ${level.featured
        ? 'border-primary/40 shadow-lg shadow-primary/10 bg-gradient-to-b from-primary/5 to-transparent'
        : 'border-border/60 hover:border-primary/20'
      }
    `}>
      {/* Top gradient line */}
      <div className={`
        absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${level.featured ? 'opacity-100' : ''}
      `} />

      <CardContent className="p-6 sm:p-8 text-center">
        {/* Level Number */}
        <div className={`
          text-xs font-bold uppercase tracking-wider mb-2
          ${level.featured ? 'text-primary' : 'text-muted-foreground'}
        `}>
          {level.featured ? 'Level 3 — Most Achievable' : `Level ${level.level}`}
        </div>

        {/* Icon */}
        <div className={`
          mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl 
          ${level.iconBg} ${level.iconColor}
          border ${level.color.split(' ')[2] || 'border-border'}
          group-hover:scale-110 transition-transform duration-300
        `}>
          <span className="text-2xl">{level.emoji}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-1 text-foreground">
          {level.title}
        </h3>

        {/* Commission */}
        <div className="mt-4 mb-1">
          <span className={`
            text-3xl font-bold
            ${level.featured ? 'text-primary' : 'text-foreground'}
          `}>
            {level.commission}
          </span>
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
          {level.commissionLabel}
        </div>

        {/* Requirement */}
        <div className="bg-muted/50 rounded-lg p-3 text-left text-sm text-muted-foreground mb-4 border border-border/50">
          <span className="font-medium text-foreground">📋 Requirement:</span> {level.requirement}
        </div>

        {/* Features */}
        <div className="text-left space-y-2 mb-6">
          {level.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {level.level <= 2 && (
          <Button
            variant="outline"
            className="w-full group-hover:border-primary/50 transition-colors"
          >
            Get Started
          </Button>
        )}
        {level.level === 3 && (
          <Button
            className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300"
          >
            Unlock This Level
          </Button>
        )}
        {level.level >= 4 && (
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
            disabled
          >
            Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  );
}