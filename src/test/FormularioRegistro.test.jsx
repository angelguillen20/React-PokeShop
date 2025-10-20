import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioRegistro } from '../components/FormularioRegistro';
import { describe, it, vi, expect } from 'vitest';

describe('FormularioRegistro', () => {
    const mockOnClose = vi.fn();
    const mockOnRegisterSuccess = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('no renderiza cuando show es false', () => {
        render(
            <FormularioRegistro
                show={false}
                onClose={mockOnClose}
                onRegisterSuccess={mockOnRegisterSuccess}
            />
        );

        expect(screen.queryByText(/registro/i)).not.toBeInTheDocument();
    });

    it('renderiza correctamente cuando show es true', () => {
        render(
            <FormularioRegistro
                show={true}
                onClose={mockOnClose}
                onRegisterSuccess={mockOnRegisterSuccess}
            />
        );

        // Título del modal
        expect(screen.getByText(/registro/i)).toBeInTheDocument();

        // Inputs
        expect(screen.getByPlaceholderText(/ingresa tu usuario/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/ingresa tu correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/ingresa tu contraseña/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/confirma tu contraseña/i)).toBeInTheDocument();

        // Botón
        expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
    });

    it('llama a onClose al hacer click en overlay', () => {
        render(
            <FormularioRegistro
                show={true}
                onClose={mockOnClose}
                onRegisterSuccess={mockOnRegisterSuccess}
            />
        );

        const overlay = screen.getByText(/registro/i).closest('.modal-overlay');
        fireEvent.click(overlay);

        expect(mockOnClose).toHaveBeenCalled();
    });

    
});
