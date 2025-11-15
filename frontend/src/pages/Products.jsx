import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import { useToast } from '../hooks/use-toast';
import { productsAPI, cartAPI, getSessionId } from '../api/client';

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      toast({
        title: "Error loading products",
        description: "Please refresh the page to try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = useCallback(async (product) => {
    try {
      const sessionId = getSessionId();
      await cartAPI.addItem(sessionId, {
        product_id: product.id,
        quantity: 1
      });
      
      // Trigger custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast({
        title: "Added to cart!",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our eBooks Collection
          </h1>
          <p className="text-lg text-gray-600">
            Explore our comprehensive library of software engineering eBooks
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(products) && products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
