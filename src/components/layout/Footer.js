import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Logo from "../ui/Logo";
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const footerLinks = {
        product: [
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "API", href: "#api" },
        ],
        company: [
            { name: "About", href: "#about" },
            { name: "Blog", href: "#blog" },
            { name: "Careers", href: "#careers" },
        ],
        resources: [
            { name: "Help Center", href: "#help" },
            { name: "Documentation", href: "#docs" },
            { name: "Status", href: "#status" },
        ],
        legal: [
            { name: "Privacy Policy", href: "#privacy" },
            { name: "Terms of Service", href: "#terms" },
            { name: "Cookie Policy", href: "#cookies" },
        ],
    };
    return (_jsx("footer", { className: "bg-gray-50 border-t border-gray-200", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "flex flex-col justify-evenly sm:flex-row gap-8 lg:gap-12", children: [_jsxs("div", { className: "flex-1 lg:max-w-md", children: [_jsx(Logo, { className: "mb-4" }), _jsx("p", { className: "text-gray-600 text-sm mb-6 leading-relaxed", children: "Transform your hiring process with smarter, faster, data-driven technology. From sourcing to onboarding, streamline every step." }), _jsxs("div", { className: "flex space-x-4", children: [_jsx("a", { href: "#", className: "text-gray-400 hover:text-emerald-600 transition-colors", "aria-label": "Twitter", children: _jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" }) }) }), _jsx("a", { href: "#", className: "text-gray-400 hover:text-emerald-600 transition-colors", "aria-label": "LinkedIn", children: _jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }) })] })] }), _jsx("div", { className: "flex justify-evenly lg:flex-none", children: _jsxs("div", { className: "grid grid-cols-3 gap-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4", children: "Product" }), _jsx("ul", { className: "space-y-3", children: footerLinks.product.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-gray-600 hover:text-emerald-600 sm:text-sm text-xs transition-colors", children: link.name }) }, link.name))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4", children: "Company" }), _jsx("ul", { className: "space-y-3", children: footerLinks.company.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-gray-600 hover:text-emerald-600 sm:text-sm text-xs transition-colors", children: link.name }) }, link.name))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4", children: "Support" }), _jsx("ul", { className: "space-y-3", children: footerLinks.resources.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-gray-600 hover:text-emerald-600 sm:text-sm text-xs transition-colors", children: link.name }) }, link.name))) })] })] }) })] }), _jsxs("div", { className: "border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center", children: [_jsxs("p", { className: "text-gray-400 text-sm", children: ["\u00A9 ", currentYear, " TalentFlow. All rights reserved."] }), _jsx("div", { className: "mt-4 md:mt-0", children: _jsx("ul", { className: "flex space-x-6", children: footerLinks.legal.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-gray-400 hover:text-emerald-600 sm:text-sm text-xs transition-colors", children: link.name }) }, link.name))) }) })] })] }) }));
};
export default Footer;
