import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size) => {
    const productId = product._id || product.id;
    const existingItem = cartItems.find(
      item => (item._id || item.id) === productId && item.size === size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          (item._id || item.id) === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, size, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter(item => !((item._id || item.id) === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems(
      cartItems.map(item =>
        (item._id || item.id) === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

