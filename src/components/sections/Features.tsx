import React from "react";
import { motion } from "framer-motion"; // for animation

const Features: React.FC = () => {
  return (
    <motion.section
      id="features"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative bg-gradient-to-b from-purple-800 via-indigo-900 to-purple-950 text-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center gap-5 mb-8">
          <span className="md:w-40 sm:w-25 w-12 h-[2px] bg-gradient-to-r from-transparent to-pink-500 rounded-full"></span>
          <p className="border md:text-base sm:text-sm text-xs md:px-8 sm:px-6 px-4 py-2 rounded-full drop-shadow-md font-bold uppercase border-pink-500 text-pink-400">
            Features
          </p>
          <span className="md:w-40 sm:w-25 w-12 h-[2px] bg-gradient-to-r from-pink-500 to-transparent rounded-full"></span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Streamline Your Hiring Workflow From Start To Finish
        </h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg mb-16">
          Comprehensive tools designed to make every step of your recruitment process
          more efficient and effective.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {[
          {
            title: "Easy To Post Hiring",
            desc: "Create and publish job listings in minutes. Help you reach the right talent quickly.",
            icon: "💼",
          },
          {
            title: "Manage Candidates",
            desc: "Track, review, and organize applicants. Gain full visibility into every stage of the hiring pipeline.",
            icon: "👥",
          },
          {
            title: "Assessment Tools",
            desc: "Evaluate candidates with powerful assessment features to make data-driven hiring decisions.",
            icon: "🧠",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:scale-105 transition-transform shadow-lg hover:shadow-purple-600/30"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Features;
