import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
const About = () => {
    const navigate = useNavigate();
    return (_jsxs("section", { id: "about", className: "flex flex-col gap-12 items-center py-16 lg:py-24 bg-gradient-to-b from-purple-700 via-indigo-700 to-pink-600 text-white", children: [_jsxs("div", { className: "flex items-center gap-5", children: [_jsx("span", { className: "md:w-40 sm:w-25 w-12 h-[2px] bg-gradient-to-r from-transparent via-pink-300 to-white rounded-full" }), _jsx("p", { className: "border md:text-base sm:text-sm text-xs md:px-8 sm:px-6 px-4 py-2 rounded-full font-bold uppercase border-pink-300 text-white shadow-lg bg-white/10 backdrop-blur-sm", children: "Our Platform" }), _jsx("span", { className: "md:w-40 sm:w-25 w-12 h-[2px] bg-gradient-to-r from-white via-pink-300 to-transparent rounded-full" })] }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Find Your Strategic Workforce Planning Partners From Today" }), _jsx("p", { className: "text-lg text-pink-100 mb-8 leading-relaxed", children: "Empower your hiring team with data-driven tools to attract, assess, and retain top talent efficiently." }), _jsx("div", { className: "space-y-4 mb-8", children: [
                                        {
                                            title: "Smart Job Management",
                                            desc: "Create, manage, and track job postings with our intuitive platform designed for efficient recruitment.",
                                        },
                                        {
                                            title: "Candidate Pipeline Management",
                                            desc: "Streamline your candidate workflow with advanced tracking, communication tools, and application management.",
                                        },
                                        {
                                            title: "Comprehensive Assessment Tools",
                                            desc: "Create and manage candidate assessments with our powerful evaluation system to find the right fit for your roles.",
                                        },
                                    ].map((item, i) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md", children: _jsx("svg", { className: "w-3 h-3 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white mb-1", children: item.title }), _jsx("p", { className: "text-pink-100", children: item.desc })] })] }, i))) }), _jsx(Button, { variant: "default", size: "lg", onClick: () => navigate("/hr-login"), className: "bg-white text-purple-700 hover:bg-pink-100 font-semibold transition-all", children: "Sign in for Demo" })] }), _jsx("div", { className: "w-full flex justify-center border-2 border-white/30 rounded-2xl overflow-hidden shadow-lg", children: _jsx("img", { className: "opacity-90", src: "/about.png", alt: "About" }) })] }) })] }));
};
export default About;
