import React, { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import { products, testimonials, companyLogos, heroBook } from '../mockData';
import { useToast } from '../hooks/use-toast';

const Home = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Book Image */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative">
                <img
                  src={heroBook.image}
                  alt="Master Software Design"
                  className="w-full max-w-md h-auto object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600 mb-6">
                {heroBook.title}
              </h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-gray-900 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-900 font-medium">{heroBook.subtitle}</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-gray-900 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">{heroBook.description}</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-gray-900 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">
                    {heroBook.features.join(' | ')}
                  </span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-6 rounded-md transition-colors"
                onClick={() => window.scrollTo({ top: document.getElementById('products')?.offsetTop - 100, behavior: 'smooth' })}
              >
                GET STARTED
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Must Have Guide For
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Every Software Professional
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {companyLogos.map((logo) => (
              <div key={logo.id} className="flex justify-center items-center">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling eBooks Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Best Selling eBooks
          </h2>
          <p className="text-center text-gray-600 mb-12">
            These are our all-time Business Explained Champions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600 mb-12">
            What Readers Say?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.slice(3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-6 rounded-md transition-colors"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600 mb-6">
            More about our business eBooks
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Learn more about why our business eBooks are the right choice for you!
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600 mb-6">
              Discover the Best Resources for Digital Transformation
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Discover the ultimate collection of resources <span className="font-semibold">for Software professionals</span>, entrepreneurs, and corporate leaders looking to sharpen their knowledge and lead their organizations in Digital Transformation. Whether you're on the hunt for the latest insights or timeless knowledge, our extensive library of business eBooks ensures you have the tools you need to thrive in the competitive business landscape.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
