"use client";

import { Card } from "@/components/ui/card";
import { Users, Target, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export function MarketSection() {
  const stats = [
    {
      icon: Users,
      value: "950M",
      label: "UPI Users",
      subtext: "57% YoY growth",
      color: "text-primary",
    },
    {
      icon: Target,
      value: "280M",
      label: "Target Audience",
      subtext: "Millennials & Gen Z",
      color: "text-primary",
    },
    {
      icon: DollarSign,
      value: "₹60T",
      label: "Spending Power",
      subtext: "Annual consumer spending",
      color: "text-accent",
    },
  ];

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance"
        >
          Massive Market Opportunity
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg"
        >
          India&apos;s digital payment revolution creates unprecedented
          opportunities
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.05]">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-xl bg-muted">
                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  {stat.label}
                </h3>
                <p className="text-muted-foreground">{stat.subtext}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
