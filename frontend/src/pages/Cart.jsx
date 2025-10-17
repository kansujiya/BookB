import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { cartAPI, getSessionId, productsAPI } from '../api/client';

const Cart = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const sessionId = getSessionId();
      const response = await cartAPI.getCart(sessionId);
      const cartData = response.data;
      setCart(cartData);

      // Fetch product details for each cart item
      if (cartData.items && cartData.items.length > 0) {
        const productsResponse = await productsAPI.getAll();
        const allProducts = productsResponse.data;
        
        const itemsWithDetails = cartData.items.map(item => {
          const product = allProducts.find(p => p.id === item.product_id);
          return {
            ...product,
            quantity: item.quantity,
            price_at_time: item.price_at_time
          };
        });
        setCartItems(itemsWithDetails);
      }
    } catch (error) {
      // Silently handle errors
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const sessionId = getSessionId();
      await cartAPI.removeItem(sessionId, productId);
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.id !== productId));
      
      // Trigger cart count update
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const sessionId = getSessionId();
      
      if (newQuantity <= 0) {
        await handleRemoveItem(productId);
        return;
      }
      
      await cartAPI.updateItem(sessionId, productId, newQuantity);
      
      // Update local state
      setCartItems(prev => prev.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
      
      // Trigger cart count update
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity.",
        variant: "destructive",
      });
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.current_price * item.quantity), 0);
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce((total, item) => total + (item.original_price * item.quantity), 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Proceeding to checkout...",
    });
    // In a real app, this would navigate to a checkout page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex justify-center items-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              onClick={() => navigate('/products')}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
              size="lg"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-40 sm:h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-2xl font-bold text-yellow-600 mb-4">
                        ₹{item.current_price}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="hover:bg-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="hover:bg-gray-200"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                    <span className="font-semibold">₹{calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="font-semibold text-green-600">
                      -₹{calculateOriginalTotal() - calculateSubtotal()}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-yellow-600">₹{calculateSubtotal()}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg py-6 transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  onClick={() => navigate('/products')}
                  variant="outline"
                  className="w-full mt-3 border-gray-300 hover:bg-gray-50"
                >
                  Continue Shopping
                </Button>

                <div className="mt-6 text-sm text-gray-600 text-center">
                  <p>Instant digital delivery after purchase</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
