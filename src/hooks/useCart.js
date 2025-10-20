/**
 * Hook personalizado de React (useCart)
 * Gestiona todo el estado y la lógica de un carrito de compras
 * con persistencia en localStorage.
 */

import { useMemo, useState, useEffect } from "react";
import { db_Pokeballs } from "../data/db_Pokeballs";
import { db_Potions } from "../data/db_Potions";
import { db_MTs } from "../data/db_MTs";

const CART_KEY = "shopping_cart"; // Clave para localStorage



export const db = [...db_Pokeballs, ...db_Potions,...db_MTs];

export const useCart = () => {
    const [data] = useState(db);

    //Cargar carrito desde localStorage al iniciar
    const initialCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    /** Agregar producto al carrito */
    function addToCart(item) {
        const itemExists = cart.findIndex((p) => p.id === item.id);
        if (itemExists >= 0) {
            // Ya existe → aumentar cantidad
            if (cart[itemExists].quantity >= MAX_ITEMS) return;
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        } else {
            // Nuevo producto
            setCart([...cart, { ...item, quantity: 1,}]);
        }
    }

    /** Eliminar producto */
    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((p) => p.id !== id));
    }

    /** Aumentar cantidad */
    function increaseQuantity(id) {
        const updatedCart = cart.map((item) =>
            item.id === id && item.quantity < MAX_ITEMS
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);
    }

    /**  Disminuir cantidad */
    function decreaseQuantity(id) {
        const updatedCart = cart.map((item) =>
            item.id === id && item.quantity > MIN_ITEMS
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCart(updatedCart);
    }

    /**  Vaciar carrito */
    function clearCart() {
        setCart([]);
    }

    /**Guardar automáticamente en localStorage cada vez que cambia el carrito */
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    /**  Propiedades derivadas */
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * (item.precio ?? 0), 0),
    [cart]
);


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    };
};
