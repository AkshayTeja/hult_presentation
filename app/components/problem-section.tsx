"use client";

import { Card } from "@/components/ui/card";
import { TrendingDown, Cloud } from "lucide-react";
import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance"
        >
          The Dual Crisis We&apos;re Solving
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg"
        >
          Financial overspending and environmental impact are interconnected
          problems
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-destructive/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-destructive/10">
                  <TrendingDown className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground">
                  Financial Overspending
                </h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-destructive">
                    68%
                  </span>
                  <span>of Indians exceed their monthly budgets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-destructive">
                    ₹4,200
                  </span>
                  <span>average monthly overspend per person</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-destructive">
                    43%
                  </span>
                  <span>of overspending comes from impulse transactions</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Cloud className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground">
                  Environmental Impact
                </h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-primary">2.4B</span>
                  <span>tons of carbon footprint from Indian consumers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-primary">60%</span>
                  <span>of emissions come from consumption patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-primary">73%</span>
                  <span>want eco-friendly payment options</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
