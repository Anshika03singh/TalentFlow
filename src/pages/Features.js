import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sparkles, Users, ClipboardCheck, BarChart3 } from "lucide-react";
const features = [
    {
        icon: _jsx(Sparkles, { className: "w-8 h-8 text-pink-300" }),
        title: "AI-Powered Hiring",
        desc: "Leverage AI-driven tools to identify, rank, and match the best candidates for each role.",
    },
    {
        icon: _jsx(Users, { className: "w-8 h-8 text-pink-300" }),
        title: "Collaborative Recruiting",
        desc: "Seamlessly manage your entire recruitment process with your team in one platform.",
    },
    {
        icon: _jsx(ClipboardCheck, { className: "w-8 h-8 text-pink-300" }),
        title: "Custom Assessments",
        desc: "Build tailored assessments to evaluate the technical and cultural fit of each candidate.",
    },
    {
        icon: _jsx(BarChart3, { className: "w-8 h-8 text-pink-300" }),
        title: "Data-Driven Insights",
        desc: "Gain valuable analytics and insights to improve your hiring strategies and decision-making.",
    },
];
const Features = () => {
    return (_jsx("section", { className: "py-20 bg-gradient-to-b from-pink-600 via-purple-700 to-indigo-700 text-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Powerful Features, Built for Growth" }), _jsx("p", { className: "text-pink-100 max-w-2xl mx-auto mb-12", children: "Streamline your hiring process and empower your HR team with next-generation tools for smarter decisions." }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => (_jsxs("div", { className: "p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-lg", children: [_jsx("div", { className: "flex justify-center mb-4", children: feature.icon }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: feature.title }), _jsx("p", { className: "text-pink-100 text-sm", children: feature.desc })] }, index))) })] }) }));
};
export default Features;
