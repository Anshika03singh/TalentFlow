import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup"; // ✅ animated counter
import { Button } from "../../components/ui/Button";
import { COMPANY_INFO, PLATFORM_STATS } from "../../utils/constants";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative flex flex-col gap-5 items-center overflow-hidden py-24 lg:py-40 bg-gradient-to-br from-purple-600/60 via-pink-500/40 to-indigo-600/60"
    >
      {/* Glowing background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/50 via-pink-400/40 to-indigo-600/50 blur-3xl opacity-80 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-purple-500/30 blur-[120px] rounded-full -z-20" />

      {/* Title Section */}
      <div className="flex items-center gap-5 z-10">
        <span className="md:w-40 sm:w-25 w-12 h-[2px] bg-gradient-to-r from-pink-300 to-indigo-500 rounded-full"></span>
        <p className="border border-white/30 bg-white/10 backdrop-blur-md md:text-base sm:text-sm text-xs md:px-8 sm:px-6 px-4 py-2 rounded-full font-semibold uppercase tracking-wider text-white/90">
          About Our Platform
        </p>
        <span className="md:w-40 sm:w-25 w-12 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-300 rounded-full"></span>
      </div>

      {/* Animated Stats */}
      <motion.div
        className="flex justify-center lg:justify-end mt-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
          {PLATFORM_STATS.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-2xl md:p-10 p-6 shadow-lg border border-white/30 text-center transition-transform"
            >
              <div className="text-5xl font-extrabold text-white mb-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                <CountUp end={stat.value} duration={2.5} separator="," suffix="+" />
              </div>
              <div className="text-indigo-200 text-sm font-medium mb-3 uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="mt-2 text-xs text-pink-100/80 leading-snug">
                {index === 0
                  ? "Recruiters and hiring managers trust our tools to simplify decision-making and reduce time-to-hire."
                  : "Join forward-thinking companies building better teams through structured, data-driven recruitment."}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Button Section */}
      <div className="mt-12">
        <Button
          onClick={() => navigate("/features")}
          className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-300/30 transition-all duration-300"
        >
          Explore Features
        </Button>
      </div>
    </section>
  );
};

export default Hero;
