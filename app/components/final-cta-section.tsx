"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function FinalCTASection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="w-12 h-12 text-primary-foreground" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Let&apos;s Build VerdePay Together
          </h2>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 text-balance">
            Join the waitlist to be among the first to experience conscious
            spending and help shape the future of sustainable payments in India.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-14 px-6 text-lg bg-background/95 border-0 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-background text-foreground hover:bg-background/90 text-lg font-semibold group whitespace-nowrap"
            >
              Join Waitlist
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.form>

          <p className="text-primary-foreground/70 mt-6 text-sm">
            No spam. Unsubscribe anytime. Join 10,000+ early adopters.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
