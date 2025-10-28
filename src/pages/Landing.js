import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Features from "../components/sections/Features";
import JobExplore from "../components/sections/JobExplore";
import Layout from "../components/layout/Layout";
const Landing = () => {
    return (_jsx(_Fragment, { children: _jsxs(Layout, { children: [_jsx(Hero, {}), _jsx(About, {}), _jsx(Features, {}), _jsx(JobExplore, {})] }) }));
};
export default Landing;
