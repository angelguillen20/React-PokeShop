// src/test/FormularioLogin.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { FormularioLogin } from "../components/FormularioLogin";

describe("FormularioLogin", () => {
    let mockOnClose, mockOnLoginSuccess, mockOnSwitchToRegister;

    beforeEach(() => {
        mockOnClose = vi.fn();
        mockOnLoginSuccess = vi.fn();
        mockOnSwitchToRegister = vi.fn();
    });

    test("renderiza correctamente cuando show es true", () => {
        render(
            <FormularioLogin
                show={true}
                onClose={mockOnClose}
                onLoginSuccess={mockOnLoginSuccess}
                onSwitchToRegister={mockOnSwitchToRegister}
            />
        );

        expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/ingresa tu usuario/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/ingresa tu contraseña/i)).toBeInTheDocument();
    });

    test("no renderiza nada cuando show es false", () => {
        const { container } = render(
            <FormularioLogin
                show={false}
                onClose={mockOnClose}
                onLoginSuccess={mockOnLoginSuccess}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });

    test("muestra error si los campos están vacíos y se intenta enviar", async () => {
        render(
            <FormularioLogin
                show={true}
                onClose={mockOnClose}
                onLoginSuccess={mockOnLoginSuccess}
            />
        );

        // Buscar específicamente el botón de submit por su rol y nombre accesible
        const submitButton = screen.getByRole("button", { name: /iniciar sesión/i });

        // Simular el click en el botón
        fireEvent.click(submitButton);

        // Aquí asumimos que tu hook useLoginForm genera mensajes como "usuario requerido", etc.
        expect(await screen.findByText(/usuario requerido/i)).toBeInTheDocument();
        expect(await screen.findByText(/contraseña requerida/i)).toBeInTheDocument();
    });

    test("permite mostrar y ocultar la contraseña", () => {
        render(
            <FormularioLogin
                show={true}
                onClose={mockOnClose}
                onLoginSuccess={mockOnLoginSuccess}
            />
        );

        const passwordInput = screen.getByPlaceholderText(/ingresa tu contraseña/i);
        const toggleButton = screen.getByLabelText(/mostrar contraseña/i);

        // Inicialmente tipo password
        expect(passwordInput).toHaveAttribute("type", "password");

        // Click para mostrar
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "text");

        // Click para ocultar
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "password");
    });

    test("llama a onSwitchToRegister cuando se hace click en 'Regístrate'", () => {
        render(
            <FormularioLogin
                show={true}
                onClose={mockOnClose}
                onLoginSuccess={mockOnLoginSuccess}
                onSwitchToRegister={mockOnSwitchToRegister}
            />
        );

        const link = screen.getByText(/regístrate/i);
        fireEvent.click(link);
        expect(mockOnSwitchToRegister).toHaveBeenCalled();
    });
});
