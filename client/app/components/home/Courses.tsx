import React from 'react';
import {
  TrendingUp,
  Brain,
  Briefcase,
  Rocket,
  ArrowRight,
  Sparkles,
  ShoppingCart,
  Star,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const products = [
  {
    icon: "📈",
    category: "Marketing",
    name: "Digital Marketing Starter",
    price: "Birr 800",
    earnings: "Birr 200",
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/30",
    iconBg: "bg-rose-500/20",
    gradient: "from-rose-900/30 to-rose-950/20",
  },
  {
    icon: "🧠",
    category: "Personal Development",
    name: "Mindset & Growth Course",
    price: "Birr 600",
    earnings: "Birr 150",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    gradient: "from-emerald-900/30 to-emerald-950/20",
  },
  {
    icon: "💼",
    category: "Sales",
    name: "Sales Mastery Program",
    price: "Birr 1,000",
    earnings: "Birr 250",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconBg: "bg-blue-500/20",
    gradient: "from-blue-900/30 to-blue-950/20",
  },
  {
    icon: "🚀",
    category: "Bundle",
    name: "HBT Full Hustler Pack",
    price: "Birr 2,000",
    earnings: "Birr 500",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    iconBg: "bg-amber-500/20",
    gradient: "from-amber-900/30 to-amber-950/20",
    featured: true,
  },
];

export default function Courses() {
  return (
    <section className="py-20 relative overflow-hidden" id="products">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
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
            Our Course Packages
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Knowledge That <span className="text-primary">Pays You Back</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Sell practical, youth-focused course packages on marketing, sales, and personal growth —
            and earn 25% on every sale.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className={`
                group relative overflow-hidden border-2 transition-all duration-300 
                bg-card/50 backdrop-blur-sm
                hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2
                ${product.featured
                  ? 'border-primary/40 shadow-lg shadow-primary/10 bg-gradient-to-b from-primary/5 to-transparent'
                  : 'border-border/60 hover:border-primary/20'
                }
              `}
            >
              {/* Gradient background */}
              <div className={`
                absolute inset-0 bg-gradient-to-b ${product.gradient} 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
              `} />

              {/* Top gradient line */}
              <div className={`
                absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${product.featured ? 'opacity-100' : ''}
              `} />

              <CardContent className="p-6 relative z-10">
                {/* Icon */}
                <div className={`
                  mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl 
                  ${product.iconBg}
                  border-2 ${product.color.split(' ')[2] || 'border-border'}
                  text-3xl
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  {product.icon}
                </div>

                {/* Category */}
                <div className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">
                  {product.category}
                </div>

                {/* Name */}
                <h4 className="text-base font-semibold mb-3 text-foreground leading-tight">
                  {product.name}
                </h4>

                {/* Price */}
                <div className="flex items-baseline gap-2 justify-center mb-1">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <span className="text-xs text-muted-foreground">Retail</span>
                </div>

                {/* Earnings */}
                <div className="text-sm text-muted-foreground mb-4">
                  You earn <span className="text-primary font-semibold">{product.earnings}</span>
                </div>

                {/* Commission badge */}
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 w-full justify-center py-1.5">
                  <Zap className="h-3 w-3 mr-1" />
                  25% Commission
                </Badge>

                {/* Featured badge */}
                {product.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30">
                      Best Value
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-2 mb-4 border border-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Start selling these courses today</span>
          </div>
          <div>
            <Button
              size="lg"
              className="group px-8 py-6 h-auto text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 rounded-full"
            >
              Join to See Full Course Catalog
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}