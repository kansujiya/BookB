import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PurchaseNotification from "./components/PurchaseNotification";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PricingPolicy from "./pages/PricingPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CancellationRefundPolicy from "./pages/CancellationRefundPolicy";
import { Toaster } from "./components/ui/toaster";
import { cartAPI, getSessionId } from "./api/client";

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = useCallback(async () => {
    try {
      const sessionId = getSessionId();
      const response = await cartAPI.getCart(sessionId);
      const cart = response.data;
      const count = cart.items && Array.isArray(cart.items) 
        ? cart.items.reduce((total, item) => total + item.quantity, 0)
        : 0;
      setCartCount(count);
    } catch (error) {
      // Silently fail - cart might not exist yet
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    updateCartCount();
    
    // Listen for storage events (when cart is updated)
    window.addEventListener('storage', updateCartCount);
    
    // Listen for custom cart update event
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, [updateCartCount]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pricing-policy" element={<PricingPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />
        </Routes>
        <Footer />
        <PurchaseNotification />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
