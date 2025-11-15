import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check, ArrowLeft, BookOpen, Star, Award, Users, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { productsAPI, cartAPI, getSessionId } from '../api/client';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getBySlug(slug);
      setProduct(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        toast({
          title: "Product not found",
          description: "This product doesn't exist.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const sessionId = getSessionId();
      await cartAPI.addItem(sessionId, {
        product_id: product.id,
        quantity: 1
      });
      
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
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex justify-center items-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-gray-600">Product not found</p>
            <Button onClick={() => navigate('/products')} className="mt-4">
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock table of contents based on product
  const getTableOfContents = () => {
    if (product.slug === 'software-system-design') {
      return [
        'Introduction to System Design',
        'Scalability Fundamentals',
        'Database Design & Optimization',
        'Caching Strategies',
        'Load Balancing Techniques',
        'Microservices Architecture',
        'API Design Best Practices',
        'Real-World Case Studies: Uber, Instagram, Netflix',
        'System Design Interview Patterns',
        'Advanced Topics & Trade-offs'
      ];
    } else if (product.slug === 'software-architecture-patterns') {
      return [
        'Introduction to Software Architecture',
        'Layered Architecture Pattern',
        'Event-Driven Architecture',
        'Microservices Architecture',
        'Space-Based Architecture',
        'Service-Oriented Architecture (SOA)',
        'Comparing Architecture Patterns',
        'Making Trade-off Decisions',
        'Real-World Implementation Examples',
        'Best Practices & Anti-Patterns'
      ];
    } else {
      return [
        'Foundations of Software Design',
        'SOLID Principles in Depth',
        'Design Patterns Catalog',
        'Architectural Patterns',
        'Code Quality & Refactoring',
        'Testing Strategies',
        'Performance Optimization',
        'Security Best Practices',
        'Real-World Case Studies',
        'Advanced Design Techniques'
      ];
    }
  };

  const tableOfContents = getTableOfContents();

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex flex-col space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="text-center border-blue-200">
                  <CardContent className="p-4">
                    <Users className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900">1000+</p>
                    <p className="text-xs text-gray-600">Engineers</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-blue-200">
                  <CardContent className="p-4">
                    <Star className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900">4.8/5</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-blue-200">
                  <CardContent className="p-4">
                    <Download className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900">Instant</p>
                    <p className="text-xs text-gray-600">Download</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Award className="h-5 w-5 text-blue-700" />
                <span className="text-sm font-semibold text-blue-700">BESTSELLER</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b">
                <span className="text-gray-400 line-through text-2xl">
                  ₹{product.original_price}
                </span>
                <span className="text-4xl font-bold text-blue-700">
                  ₹{product.current_price}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(((product.original_price - product.current_price) / product.original_price) * 100)}% OFF
                </span>
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {product.long_description}
              </p>

              {/* What You'll Learn */}
              <div className="mb-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-700" />
                  What You'll Learn:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-gray-900 font-semibold text-lg py-7 transition-all transform hover:scale-105 shadow-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now - Instant Access
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold text-lg py-7 transition-all"
                >
                  Add to Cart
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section - Table of Contents & Preview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="contents" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="contents" className="text-base">Table of Contents</TabsTrigger>
              <TabsTrigger value="preview" className="text-base">Book Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="contents">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What's Inside This eBook?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tableOfContents.map((chapter, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 font-medium">{chapter}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Sample Pages Preview
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sample page images - Using placeholder images */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={`https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=600&h=800&fit=crop`}
                        alt="Book preview page 1"
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-4 bg-white">
                        <p className="text-sm font-semibold text-gray-900">Chapter Introduction</p>
                        <p className="text-xs text-gray-600">Clear explanations with diagrams</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={`https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&h=800&fit=crop`}
                        alt="Book preview page 2"
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-4 bg-white">
                        <p className="text-sm font-semibold text-gray-900">Visual Flowcharts</p>
                        <p className="text-xs text-gray-600">Easy-to-understand system diagrams</p>
                      </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={`https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=800&fit=crop`}
                        alt="Book preview page 3"
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-4 bg-white">
                        <p className="text-sm font-semibold text-gray-900">Code Examples</p>
                        <p className="text-xs text-gray-600">Real-world implementations</p>
                      </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=800&fit=crop`}
                        alt="Book preview page 4"
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-4 bg-white">
                        <p className="text-sm font-semibold text-gray-900">Case Studies</p>
                        <p className="text-xs text-gray-600">Industry-proven patterns</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">
                      Get instant access to all 100+ pages with detailed explanations, diagrams, and code examples!
                    </p>
                    <Button
                      onClick={handleBuyNow}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-gray-900 font-semibold"
                    >
                      Get Full Access Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose This eBook?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Expert-Vetted Content
                </h3>
                <p className="text-gray-600 text-sm">
                  Written by senior engineers from top tech companies with years of real-world experience
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Practical & Actionable
                </h3>
                <p className="text-gray-600 text-sm">
                  No fluff - just actionable insights you can apply immediately in your projects
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Interview-Ready
                </h3>
                <p className="text-gray-600 text-sm">
                  Perfect preparation for technical interviews at FAANG and top tech companies
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  How quickly will I receive the eBook after purchase?
                </h3>
                <p className="text-gray-600">
                  Instantly! You'll receive a download link immediately after completing your purchase. No waiting required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  What format is the eBook in?
                </h3>
                <p className="text-gray-600">
                  The eBook is available in PDF format, which is compatible with all devices - computers, tablets, and smartphones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  Is this suitable for beginners?
                </h3>
                <p className="text-gray-600">
                  This eBook is designed for software engineers with basic programming knowledge. It covers topics from fundamentals to advanced concepts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  Can I access the eBook on multiple devices?
                </h3>
                <p className="text-gray-600">
                  Yes! Once purchased, you can download and read the eBook on as many devices as you like. There are no restrictions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
