// src/components/ToastContext.jsx
import { createContext, useContext, useState } from "react";
import GlobalToast from "./GlobalToast.jsx";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("success");

    const showToast = (msg, type = "success") => {
        setMessage(msg);
        setVariant(type);
        setShow(true);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <GlobalToast
                show={show}
                message={message}
                variant={variant}
                onClose={() => setShow(false)}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
