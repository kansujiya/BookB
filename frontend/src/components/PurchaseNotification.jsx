import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';

const PurchaseNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState(null);

  // Mock purchase data
  const recentPurchases = [
    {
      customerName: 'Rajesh from Mumbai',
      productName: 'Software System Design',
      timeAgo: '2 minutes ago',
      location: 'Mumbai, India'
    },
    {
      customerName: 'Priya from Bangalore',
      productName: 'Software Architecture Patterns',
      timeAgo: '5 minutes ago',
      location: 'Bangalore, India'
    },
    {
      customerName: 'Amit from Delhi',
      productName: 'Foundations of Software Design Volume 2',
      timeAgo: '8 minutes ago',
      location: 'Delhi, India'
    },
    {
      customerName: 'Sneha from Pune',
      productName: 'Software System Design',
      timeAgo: '12 minutes ago',
      location: 'Pune, India'
    },
    {
      customerName: 'Vikram from Hyderabad',
      productName: 'Software Architecture Patterns',
      timeAgo: '15 minutes ago',
      location: 'Hyderabad, India'
    },
    {
      customerName: 'Anita from Chennai',
      productName: 'Foundations of Software Design Volume 2',
      timeAgo: '18 minutes ago',
      location: 'Chennai, India'
    }
  ];

  useEffect(() => {
    const showNotification = () => {
      // Pick a random purchase
      const randomPurchase = recentPurchases[Math.floor(Math.random() * recentPurchases.length)];
      setCurrentPurchase(randomPurchase);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 5000);

    // Show notification every 15-25 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 10000 + 15000); // Random between 15-25 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible || !currentPurchase) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 animate-slide-in-left"
      style={{
        animation: 'slideInLeft 0.5s ease-out'
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl p-4 max-w-sm border-l-4 border-green-500">
        <div className="flex items-start space-x-3">
          <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
            <ShoppingBag className="h-5 w-5 text-green-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {currentPurchase.customerName}
            </p>
            <p className="text-sm text-gray-600 truncate">
              purchased <span className="font-medium text-gray-900">{currentPurchase.productName}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {currentPurchase.timeAgo}
            </p>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseNotification;
