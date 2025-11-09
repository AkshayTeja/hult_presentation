"use client";

import { Card } from "@/components/ui/card";
import {
  Clock,
  Coffee,
  UtensilsCrossed,
  Shield,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

export function UserJourneySection() {
  const journey = [
    {
      time: "8 AM",
      icon: Clock,
      title: "Set Daily Budget",
      description: "₹1,000 daily limit",
      badge: "12-day streak",
      color: "text-accent",
    },
    {
      time: "10 AM",
      icon: Coffee,
      title: "Morning Coffee",
      description: "₹150 spent • 0.4kg CO₂",
      badge: "₹850 remaining",
      color: "text-primary",
    },
    {
      time: "2 PM",
      icon: UtensilsCrossed,
      title: "Lunch Purchase",
      description: "₹320 spent • 2.1kg CO₂",
      badge: "Lower-emission option suggested",
      color: "text-primary",
    },
    {
      time: "7 PM",
      icon: Shield,
      title: "Budget Protected",
      description: "₹680 purchase blocked",
      badge: "Streak saved!",
      color: "text-chart-1",
    },
    {
      time: "9 PM",
      icon: MessageSquare,
      title: "Daily Report",
      description: "WhatsApp summary sent",
      badge: "13-day streak • 89% offset",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance"
        >
          A Day in the Life with VerdePay
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg"
        >
          See how VerdePay helps you stay on track throughout your day
        </motion.p>

        <div className="max-w-4xl mx-auto space-y-6">
          {journey.map((step, index) => (
            <motion.div
              key={step.time}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:translate-x-2">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-3 rounded-lg bg-muted`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <span className="text-sm font-mono font-bold text-muted-foreground">
                      {step.time}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-card-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {step.badge}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
