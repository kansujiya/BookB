import React, { useState, useEffect, useCallback } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import { heroBook } from '../mockData';
import { useToast } from '../hooks/use-toast';
import { productsAPI, cartAPI, testimonialsAPI, getSessionId } from '../api/client';

const Home = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, testimonialsRes] = await Promise.all([
        productsAPI.getAll(),
        testimonialsAPI.getAll()
      ]);
      
      setProducts(productsRes.data);
      setTestimonials(testimonialsRes.data);
    } catch (error) {
      toast({
        title: "Error loading data",
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
    <div className="min-h-screen bg-white">
      {/* Best Selling eBooks Section - Moved to top */}
      <section id="products" className="py-16 pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Best Selling eBooks
          </h2>
          <p className="text-center text-gray-600 mb-12">
            These are our all-time Business Explained Champions.
          </p>
          
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
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-12">
            What Readers Say?
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {Array.isArray(testimonials) && testimonials.slice(0, 3).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {Array.isArray(testimonials) && testimonials.slice(3).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </>
          )}
          
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-gray-900 font-semibold text-lg px-8 py-6 rounded-md transition-colors"
              onClick={() => window.scrollTo({ top: document.getElementById('products')?.offsetTop - 100, behavior: 'smooth' })}
            >
              Get Your Copy Now!
            </Button>
          </div>
        </div>
      </section>

      {/* More Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-6">
            More about our business eBooks
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Learn more about why our business eBooks are the right choice for you!
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-6">
              Discover the Best Resources for Digital Transformation
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Discover the ultimate collection of resources <span className="font-semibold">for Software professionals</span>, entrepreneurs, and corporate leaders looking to sharpen their knowledge and lead their organizations in Digital Transformation. Whether you're on the hunt for the latest insights or timeless knowledge, our extensive library of business eBooks ensures you have the tools you need to thrive in the competitive business landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Success Cases Section - Company Logos */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Must Have Guide For Every Software Professional
            </h2>
            <p className="text-gray-600 text-lg">
              Trusted by professionals from leading tech companies worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center">
            <div className="flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1661347998423-b15d37d6f61e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ29zfGVufDB8fHx8MTc2MDcwMDEwM3ww&ixlib=rb-4.1.0&q=85"
                alt="Samsung"
                loading="lazy"
                className="h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1661347998996-dcf102498c63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHx0ZWNoJTIwY29tcGFueSUyMGxvZ29zfGVufDB8fHx8MTc2MDcwMDEwM3ww&ixlib=rb-4.1.0&q=85"
                alt="TikTok"
                loading="lazy"
                className="h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1760386129108-d17b9cdfc4fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHx0ZWNoJTIwY29tcGFueSUyMGxvZ29zfGVufDB8fHx8MTc2MDcwMDEwM3ww&ixlib=rb-4.1.0&q=85"
                alt="Audible"
                loading="lazy"
                className="h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://images.pexels.com/photos/7202944/pexels-photo-7202944.jpeg"
                alt="Logitech"
                loading="lazy"
                className="h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg"
                alt="Tesla"
                loading="lazy"
                className="h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
