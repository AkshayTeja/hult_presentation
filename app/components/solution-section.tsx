"use client";

import { Card } from "@/components/ui/card";
import { Lock, Leaf, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

export function SolutionSection() {
  const features = [
    {
      icon: Lock,
      title: "Smart Budget Lock",
      description:
        "App automatically locks after you hit your daily spending limit with guilt-free modals to protect your streak",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Leaf,
      title: "Real-Time Carbon Tracking",
      description:
        "See the CO₂ impact of every transaction instantly and make informed sustainable choices",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: RotateCw,
      title: "Auto Round-Off Offset",
      description:
        "Transaction round-offs automatically fund verified carbon offset projects seamlessly",
      color: "text-primary",
      bgColor: "bg-primary/10",
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
          Conscious Spending Made Automatic
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg"
        >
          Three powerful features that work together seamlessly
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.05]">
                <div className={`p-4 rounded-xl ${feature.bgColor} w-fit mb-6`}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
