"use client";

import { Button } from "@/components/ui/button";
import { Leaf, ArrowRight, X, TrendingUp, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Types
interface EmissionFactor {
  base: number;
  fixed: number;
  icon: string;
  label: string;
}

interface CarbonData {
  category: string;
  icon: string;
  amount: number;
  carbonGenerated: number;
  roundOffAmount: number;
  carbonOffset: number;
  offsetPercentage: number;
  netCarbon: number;
}

interface Scenario {
  id: number;
  name: string;
  amount: number;
  category: string;
  time: string;
}

interface Transaction extends Scenario {
  carbonData: CarbonData;
  exceeded?: boolean;
}

// Carbon Calculator Logic
const EMISSION_FACTORS: Record<string, EmissionFactor> = {
  food_delivery: {
    base: 0.6,
    fixed: 1.8,
    icon: "🍔",
    label: "Food Delivery",
  },
  restaurant: {
    base: 0.4,
    fixed: 0.2,
    icon: "☕",
    label: "Restaurant/Café",
  },
  grocery: {
    base: 0.3,
    fixed: 0.5,
    icon: "🛒",
    label: "Grocery Store",
  },
  ecommerce: {
    base: 0.8,
    fixed: 2.5,
    icon: "📦",
    label: "Online Shopping",
  },
  ride_sharing: {
    base: 0.15,
    fixed: 1.2,
    icon: "🚗",
    label: "Uber/Ola/Taxi",
  },
};

const CARBON_CREDIT_PRICE_PER_KG = 0.1; // ₹0.10 per kg CO₂

function calculateCarbonFootprint(
  amount: number,
  category: string = "general"
): CarbonData {
  const factor = EMISSION_FACTORS[category] || EMISSION_FACTORS.restaurant;

  // Step 1: Calculate total carbon generated
  const carbonKg = (amount / 100) * factor.base + factor.fixed;

  // Step 2: Round-off details
  const roundedAmount = Math.ceil(amount);
  const roundOffAmount = parseFloat((roundedAmount - amount).toFixed(2));

  // Step 3: Convert ₹ round-off into carbon offset potential
  const carbonOffsetPossible = roundOffAmount / CARBON_CREDIT_PRICE_PER_KG;

  // Step 4: Limit percentage to 100%
  const offsetPercentage = Math.min(
    (carbonOffsetPossible / carbonKg) * 100,
    100
  );

  // ✅ Step 5: Don’t let tiny values round down to 0 — show at least 0.01 kg
  const formattedOffset =
    carbonOffsetPossible < 0.01
      ? 0.01
      : parseFloat(carbonOffsetPossible.toFixed(2));

  // ✅ Step 6: Compute net carbon properly
  const netCarbon = Math.max(
    parseFloat((carbonKg - formattedOffset).toFixed(2)),
    0
  );

  return {
    category: factor.label,
    icon: factor.icon,
    amount: parseFloat(amount.toFixed(2)),
    carbonGenerated: parseFloat(carbonKg.toFixed(2)),
    roundOffAmount,
    carbonOffset: formattedOffset,
    offsetPercentage: parseFloat(offsetPercentage.toFixed(1)),
    netCarbon,
  };
}

// Transaction scenarios
const SCENARIOS: Scenario[] = [
  {
    id: 1,
    name: "Morning Coffee",
    amount: 150,
    category: "restaurant",
    time: "10:00 AM",
  },
  {
    id: 2,
    name: "Lunch Delivery",
    amount: 320,
    category: "food_delivery",
    time: "2:00 PM",
  },
  {
    id: 3,
    name: "Grocery Shopping",
    amount: 450,
    category: "grocery",
    time: "5:00 PM",
  },
  {
    id: 4,
    name: "Online Shopping",
    amount: 680,
    category: "ecommerce",
    time: "7:00 PM",
  },
  {
    id: 5,
    name: "Uber Ride",
    amount: 180,
    category: "ride_sharing",
    time: "9:00 PM",
  },
];

export function HeroSection() {
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [budget, setBudget] = useState<number>(1000);
  const [spent, setSpent] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showCarbonModal, setShowCarbonModal] = useState<boolean>(false);
  const [showGuiltModal, setShowGuiltModal] = useState<boolean>(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);
  const [streak, setStreak] = useState<number>(12);

  const resetSimulator = (): void => {
    setCurrentStep(0);
    setBudget(1000);
    setSpent(0);
    setTransactions([]);
    setShowCarbonModal(false);
    setShowGuiltModal(false);
    setCurrentTransaction(null);
  };

  const handleTransaction = (scenario: Scenario): void => {
    const remaining = budget - spent;
    const carbonData = calculateCarbonFootprint(
      scenario.amount,
      scenario.category
    );

    if (scenario.amount > remaining) {
      // Budget exceeded - show guilt modal
      setCurrentTransaction({ ...scenario, carbonData, exceeded: true });
      setShowGuiltModal(true);
    } else {
      // Show carbon impact
      setCurrentTransaction({ ...scenario, carbonData, exceeded: false });
      setShowCarbonModal(true);

      setTimeout(() => {
        setSpent(spent + scenario.amount);
        setTransactions([...transactions, { ...scenario, carbonData }]);
        setShowCarbonModal(false);
        setCurrentStep(currentStep + 1);
      }, 3000);
    }
  };

  const cancelTransaction = (): void => {
    setShowGuiltModal(false);
    setStreak(streak + 1);
    setCurrentStep(currentStep + 1);
  };

  const totalCarbon = transactions.reduce(
    (sum, tx) => sum + tx.carbonData.carbonGenerated,
    0
  );
  const totalOffset = transactions.reduce(
    (sum, tx) => sum + tx.carbonData.carbonOffset,
    0
  );
  const offsetPercentage =
    totalCarbon > 0 ? ((totalOffset / totalCarbon) * 100).toFixed(1) : "0";

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-accent to-primary">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl" />
        </motion.div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Leaf className="w-12 h-12 text-primary-foreground" />
            <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground">
              VerdePay
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-primary-foreground mb-4 text-balance"
          >
            The World&apos;s First Carbon-Conscious UPI App
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance"
          >
            Pay sustainably. Save money. Save the planet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6"
              onClick={() => {
                resetSimulator();
                setShowSimulator(true);
              }}
            >
              Try Transaction Simulator
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Transaction Simulator Modal */}
      <AnimatePresence>
        {showSimulator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSimulator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Transaction Simulator
                </h2>
                <button
                  onClick={() => setShowSimulator(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Budget Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Daily Budget</p>
                  <p className="text-2xl font-bold text-green-600">₹{budget}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Spent</p>
                  <p className="text-2xl font-bold text-blue-600">₹{spent}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Remaining</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{budget - spent}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">Streak</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {streak} days 🔥
                  </p>
                </div>
              </div>

              {/* Transaction Scenarios */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Select a Transaction:
                </h3>
                {SCENARIOS.map((scenario, index) => (
                  <motion.button
                    key={scenario.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleTransaction(scenario)}
                    disabled={index !== currentStep}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      index < currentStep
                        ? "bg-gray-100 opacity-50 cursor-not-allowed"
                        : index === currentStep
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 hover:shadow-lg"
                        : "bg-gray-50 opacity-30 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">
                          {EMISSION_FACTORS[scenario.category]?.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {scenario.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {scenario.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ₹{scenario.amount}
                        </p>
                        {index < currentStep && (
                          <p className="text-sm text-green-600 font-medium">
                            ✓ Completed
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Transaction Summary */}
              {transactions.length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Daily Summary
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Carbon</p>
                      <p className="text-xl font-bold text-purple-600">
                        {totalCarbon.toFixed(2)} kg CO₂
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Offset</p>
                      <p className="text-xl font-bold text-green-600">
                        {offsetPercentage}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Net Impact</p>
                      <p className="text-xl font-bold text-blue-600">
                        {(totalCarbon - totalOffset).toFixed(2)} kg
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep >= SCENARIOS.length && (
                <div className="mt-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl"
                  >
                    <h3 className="text-2xl font-bold mb-2">
                      🎉 Day Complete!
                    </h3>
                    <p className="text-lg">
                      You stayed under budget and offset {offsetPercentage}% of
                      your carbon!
                    </p>
                    <p className="mt-2">Streak: {streak} days 🔥</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carbon Impact Modal */}
      <AnimatePresence>
        {showCarbonModal && currentTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
            >
              <div className="text-6xl mb-4">
                {currentTransaction.carbonData.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentTransaction.name}
              </h3>
              <p className="text-3xl font-bold text-green-600 mb-4">
                ₹{currentTransaction.amount}
              </p>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl mb-4">
                <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Carbon Impact
                </p>
                <p className="text-4xl font-bold text-orange-600 mb-2">
                  {currentTransaction.carbonData.carbonGenerated} kg CO₂
                </p>
                <p className="text-sm text-gray-600">
                  Round-off: +₹{currentTransaction.carbonData.roundOffAmount} →
                  Offsets {currentTransaction.carbonData.carbonOffset} kg
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Offset Percentage</p>
                <p className="text-2xl font-bold text-green-600">
                  {currentTransaction.carbonData.offsetPercentage}%
                </p>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Processing transaction...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guilt Modal */}
      <AnimatePresence>
        {showGuiltModal && currentTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl max-w-md w-full p-8 text-center border-4 border-red-400"
            >
              <AlertTriangle className="w-20 h-20 text-red-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-red-600 mb-4">
                Budget Exceeded! 🚨
              </h3>

              <div className="bg-white p-6 rounded-xl mb-4">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  You&apos;re trying to spend:
                </p>
                <p className="text-4xl font-bold text-red-600 mb-4">
                  ₹{currentTransaction.amount}
                </p>
                <p className="text-gray-600">
                  But you only have ₹{budget - spent} left!
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Environmental Impact of this purchase:
                </p>
                <p className="text-3xl font-bold text-orange-600 mb-2">
                  {currentTransaction.carbonData.carbonGenerated} kg CO₂
                </p>
                <p className="text-sm text-gray-600">
                  ≈ Driving{" "}
                  {(
                    currentTransaction.carbonData.carbonGenerated * 4.3
                  ).toFixed(1)}{" "}
                  km
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={cancelTransaction}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
                >
                  Cancel Purchase & Save Streak 🔥
                </Button>
                <p className="text-sm text-gray-600">
                  Your {streak} day streak is safe! Keep going! 💪
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                VerdePay is helping you make conscious spending decisions
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
