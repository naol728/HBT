import React, { useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, Users, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import ReferralLink from '../ReferralLink';
import { useAppSelector } from '@/store/hook';

export default function Hero() {
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // Simple counter animation for stats
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-counter');

    const animateCounter = (counter: Element) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const duration = 2000;
      const step = Math.max(1, Math.floor(target / 60));
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target + (counter.getAttribute('data-suffix') || '');
          return;
        }
        counter.textContent = current + (counter.getAttribute('data-suffix') || '');
        requestAnimationFrame(updateCounter);
      };

      updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCounter(counter);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 3200,
      label: "Active Distributors",
      icon: Users,
      suffix: "",
    },
    {
      value: 12,
      label: "Regional Leaders",
      icon: Award,
      suffix: "",
    },
    {
      value: 35,
      label: "Max Commission",
      icon: TrendingUp,
      suffix: "%",
    },
    {
      value: 8,
      label: "Regions Covered",
      icon: Globe,
      suffix: "",
    },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20"
      id="opportunity"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Powered by TalentBridge Ethiopia
            </span>
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Build Your Business with{' '}
            <em className="text-primary not-italic relative">
              HBT Courses
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 rounded-full" />
            </em>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Join a growing community of young entrepreneurs selling practical business
            and personal development course packages. Earn commissions, lead a team,
            and create lasting income.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <ReferralLink to={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button
                size="lg"
                className="group text-base px-8 py-6 h-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </ReferralLink>
            <a href="#levels">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 h-auto border-2"
              >
                Explore Levels
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-2 p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div
                      ref={el => { statRefs.current[index] = el }}
                      className="stat-counter text-2xl sm:text-3xl font-bold text-foreground"
                      data-target={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -top-40 -right-40 h-80 w-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}