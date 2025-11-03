import { Toast, ToastContainer } from "react-bootstrap";

export default function GlobalToast({ show, message, variant, onClose }) {
    return (
        <ToastContainer position="bottom-end" className="p-3">
            <Toast
                bg={variant}
                onClose={onClose}
                show={show}
                delay={2000}
                autohide
            >
                <Toast.Body className="text-white fw-bold">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
