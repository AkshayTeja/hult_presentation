"use client";

import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export function CompetitiveSection() {
  const competitors = [
    {
      name: "Google Pay",
      budgetLock: false,
      carbonTrack: false,
      autoOffset: false,
      upi: true,
    },
    {
      name: "CRED",
      budgetLock: false,
      carbonTrack: false,
      autoOffset: false,
      upi: false,
    },
    {
      name: "Jupiter",
      budgetLock: true,
      carbonTrack: false,
      autoOffset: false,
      upi: true,
    },
    {
      name: "Klima",
      budgetLock: false,
      carbonTrack: true,
      autoOffset: true,
      upi: false,
    },
    {
      name: "VerdePay",
      budgetLock: true,
      carbonTrack: true,
      autoOffset: true,
      upi: true,
      highlight: true,
    },
  ];

  const advantages = [
    "First-mover advantage in carbon-conscious UPI space",
    "Behavioral locks prevent overspending automatically",
    "Seamless UPI integration with instant carbon tracking",
    "Automated round-off offsetting requires zero effort",
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
          Our Competitive Edge
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg"
        >
          The only app combining financial discipline with environmental impact
        </motion.p>

        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 overflow-x-auto">
              <h3 className="text-2xl font-bold mb-6 text-card-foreground">
                Feature Comparison
              </h3>
              <div className="min-w-[600px]">
                <div className="grid grid-cols-5 gap-4 mb-4 font-semibold text-muted-foreground">
                  <div>Platform</div>
                  <div className="text-center">Budget Lock</div>
                  <div className="text-center">Carbon Track</div>
                  <div className="text-center">Auto Offset</div>
                  <div className="text-center">UPI Native</div>
                </div>
                {competitors.map((comp, index) => (
                  <div
                    key={comp.name}
                    className={`grid grid-cols-5 gap-4 py-4 border-t border-border items-center ${
                      comp.highlight ? "bg-primary/5 -mx-4 px-4" : ""
                    }`}
                  >
                    <div
                      className={`font-semibold ${
                        comp.highlight ? "text-primary" : "text-card-foreground"
                      }`}
                    >
                      {comp.name}
                    </div>
                    <div className="flex justify-center">
                      {comp.budgetLock ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {comp.carbonTrack ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {comp.autoOffset ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {comp.upi ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-card-foreground">
                Unfair Advantages
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-primary/10">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">
                      {advantage}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
