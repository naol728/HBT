import React from 'react';
import {
  Star,
  Quote,
  Users,
  TrendingUp,
  Award,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "Mekdes T.",
    initials: "MT",
    role: "Team Leader",
    location: "Addis Ababa",
    quote: "Within 3 months I reached Team Leader. My team of 4 sells courses every week and I earn from their sales too. HBT changed my life.",
    rating: 5,
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    gradient: "from-amber-500/10 to-amber-600/5",
  },
  {
    name: "Biruk H.",
    initials: "BH",
    role: "Senior Hustler",
    location: "Hawassa",
    quote: "I was skeptical at first but the courses sell themselves. Real value, practical skills — my customers keep buying new packages every month.",
    rating: 5,
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    name: "Yemi A.",
    initials: "YA",
    role: "Hustler",
    location: "Bahir Dar",
    quote: "The HBT app makes everything easy. I track my commissions, see my team's activity, and sell course packages from my phone.",
    rating: 5,
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    gradient: "from-purple-500/10 to-purple-600/5",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden">
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
            Distributor Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            What Our <span className="text-primary">Entrepreneurs Say</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-2 border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Gradient overlay */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${testimonial.gradient} 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
              `} />

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="p-6 relative z-10">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-12 w-12 text-primary" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-muted-foreground italic mb-6 min-h-[80px]">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  {/* Avatar */}
                  <div className={`
                    flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-primary/20 to-primary/10
                    border-2 ${testimonial.color.split(' ')[2] || 'border-border'}
                    font-bold text-primary text-sm
                  `}>
                    {testimonial.initials}
                  </div>

                  {/* Author Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{testimonial.role}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verification badge */}
                <div className="absolute bottom-4 right-4">
                  <Badge variant="outline" className="text-[10px] bg-background/50 border-primary/20 text-primary/60">
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats / CTA Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-primary">3,200+</div>
                  <div className="text-sm text-muted-foreground">Active Distributors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Regional Leaders</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Regions Covered</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="group px-8 py-6 h-auto text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 rounded-full"
                >
                  Join Our Community
                  <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 h-auto text-base border-2 rounded-full"
                >
                  Read More Stories
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}