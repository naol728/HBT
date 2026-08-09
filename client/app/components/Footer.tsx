import React from 'react';
import { Link } from 'react-router';
import {
  ChevronRight,
  Heart,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { Badge } from '@/components/ui/badge';

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Our Mission", href: "#" },
  { label: "Products", href: "#products" },
  { label: "Careers", href: "#" },
];

const distributorLinks = [
  { label: "Join Now", href: "/signup" },
  { label: "Career Levels", href: "#levels" },
  { label: "Compensation", href: "#compensation" },
  { label: "Sign In", href: "/login" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:info@talentbridgeethiopia.com" },
  { icon: Phone, label: "Phone", href: "tel:+251911234567" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background/95 backdrop-blur-sm">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.jpg"
                  alt="TalentBridge Ethiopia"
                  className="h-10 w-auto rounded-lg object-contain"
                />
                <div className="text-base font-bold tracking-tight text-foreground">
                  HBT
                  <span className="text-primary"> · TalentBridge</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Empowering Ethiopian youth to build sustainable businesses by selling
                practical course packages on marketing, sales, and personal growth —
                with a fair, transparent earning system.
              </p>

              {/* Powered by badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border/50 mb-4">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Powered by
                </span>
                <span className="text-sm font-bold text-primary">
                  TalentBridge Ethiopia
                </span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h5 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>Company</span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
              </h5>
              <ul className="space-y-2.5">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Distributor Links */}
            <div>
              <h5 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>Distributors</span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
              </h5>
              <ul className="space-y-2.5">
                {distributorLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h5 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>Support</span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
              </h5>
              <ul className="space-y-2.5">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>© 2026 HBT — Hustlers Business Team</span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1">
                  Powered by
                  <span className="text-primary font-medium">TalentBridge Ethiopia</span>
                  <span className="ml-1">🇪🇹</span>
                </span>
              </div>

              <Badge variant="outline" className="text-[10px] bg-muted/30 border-border/50 text-muted-foreground px-3 py-1">
                <Heart className="h-3 w-3 text-primary mr-1 fill-primary/20" />
                Building Ethiopian Youth
              </Badge>
            </div>

            <div className="mt-3 text-center sm:text-left">
              <p className="text-[10px] text-muted-foreground/60">
                All earnings are product-sales based. Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </footer>
  );
}