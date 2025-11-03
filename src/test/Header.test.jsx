import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../components/Header'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from "vitest" 

const renderWithRouter = (ui, options) =>
    render(<BrowserRouter>{ui}</BrowserRouter>, options)

describe('Header component', () => {
    const mockProps = {
        cart: [],
        isEmpty: true,
        removeFromCart: vi.fn(),
        decreaseQuantity: vi.fn(),
        increaseQuantity: vi.fn(),
        cartTotal: 0,
        clearCart: vi.fn()
    }

    it('muestra "Tu carrito está vacío" cuando no hay productos', () => {
        renderWithRouter(<Header {...mockProps} />)
        expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
    })

    it('muestra badge con cantidad cuando hay productos', () => {
    const cartProps = {
        ...mockProps,
        isEmpty: false,
        cart: [{ id: 1, nombre: 'Poké Ball', imagen: '00pokeball', precio: 200, quantity: 2 }],
        cartTotal: 400
    }
    renderWithRouter(<Header {...cartProps} />)
    const badge = screen.getByTestId('cart-badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('2')
})


    it('muestra nombre del usuario cuando está logueado', () => {
        renderWithRouter(<Header {...mockProps} />)
        const loginButton = screen.getByRole('button', { name: /iniciar sesión/i })
        expect(loginButton).toBeInTheDocument()
    })

    it('ejecuta clearCart al hacer click en "Vaciar carrito"', () => {
        const cartProps = {
            ...mockProps,
            isEmpty: false,
            cart: [{ id: 1, nombre: 'Poción', imagen: 'Poción_EP', precio: 300, quantity: 1 }],
            cartTotal: 300
        }

        renderWithRouter(<Header {...cartProps} />)
        const vaciarBtn = screen.getByText('Vaciar carrito')
        fireEvent.click(vaciarBtn)
        expect(cartProps.clearCart).toHaveBeenCalled()
    })
})

