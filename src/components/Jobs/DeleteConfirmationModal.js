import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, jobTitle, }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-emerald-200 rounded-lg p-6 max-w-md w-full mx-4", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Delete Job" }), _jsxs("p", { className: "text-gray-600 mb-6", children: ["Are you sure you want to delete \"", jobTitle, "\"? This action cannot be undone."] }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded text-gray-600 hover:text-gray-800", children: "Cancel" }), _jsx("button", { onClick: onConfirm, className: "px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700", children: "Delete" })] })] }) }));
};
