"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export function RevenueSection() {
  const streams = [
    {
      number: "1",
      title: "Brand Collaborations",
      description:
        "Partner with eco-conscious brands like MamaEarth, Swiggy Green for promotional campaigns",
      example: "Featured eco-friendly options in app",
    },
    {
      number: "2",
      title: "Merchant Partnerships",
      description:
        "Commission from merchants who offer carbon-neutral delivery and sustainable products",
      example: "Green merchant badge program",
    },
    {
      number: "3",
      title: "Carbon Offset Provider",
      description:
        "Earn 5-10% commission from verified carbon offset projects funded through user contributions",
      example: "Reforestation, renewable energy",
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
          Sustainable Revenue Streams
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg"
        >
          Multiple monetization channels aligned with our mission
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {streams.map((stream, index) => (
            <motion.div
              key={stream.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.05]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {stream.number}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground">
                    {stream.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {stream.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <span className="text-sm font-medium text-primary">
                    Example:{" "}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stream.example}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
