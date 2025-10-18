import React from "react";
import { Sparkles, Users, ClipboardCheck, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-pink-300" />,
    title: "AI-Powered Hiring",
    desc: "Leverage AI-driven tools to identify, rank, and match the best candidates for each role.",
  },
  {
    icon: <Users className="w-8 h-8 text-pink-300" />,
    title: "Collaborative Recruiting",
    desc: "Seamlessly manage your entire recruitment process with your team in one platform.",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-pink-300" />,
    title: "Custom Assessments",
    desc: "Build tailored assessments to evaluate the technical and cultural fit of each candidate.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-pink-300" />,
    title: "Data-Driven Insights",
    desc: "Gain valuable analytics and insights to improve your hiring strategies and decision-making.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-600 via-purple-700 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Powerful Features, Built for Growth
        </h2>
        <p className="text-pink-100 max-w-2xl mx-auto mb-12">
          Streamline your hiring process and empower your HR team with
          next-generation tools for smarter decisions.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-lg"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-pink-100 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
