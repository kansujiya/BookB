import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';

const PurchaseNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState(null);
  const [usedIndices, setUsedIndices] = useState([]);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real purchases from database
  useEffect(() => {
    const fetchRecentPurchases = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/recent-purchases`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setRecentPurchases(data);
          }
        }
      } catch (error) {
        console.error('Error fetching recent purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPurchases();
    // Refresh purchases every 5 minutes to get latest orders
    const refreshInterval = setInterval(fetchRecentPurchases, 300000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    // Don't show notifications if still loading or no purchases
    if (loading || recentPurchases.length === 0) {
      return;
    }

    let timeoutId;

    const getUniquePurchase = () => {
      let availableIndices = [];
      for (let i = 0; i < recentPurchases.length; i++) {
        if (!usedIndices.includes(i)) {
          availableIndices.push(i);
        }
      }

      // Reset if all purchases have been shown
      if (availableIndices.length === 0) {
        setUsedIndices([]);
        availableIndices = recentPurchases.map((_, i) => i);
      }

      // Pick a random index from available ones
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setUsedIndices(prev => [...prev, randomIndex]);
      return recentPurchases[randomIndex];
    };

    const showNotification = () => {
      // Get a unique purchase
      const randomPurchase = getUniquePurchase();
      setCurrentPurchase(randomPurchase);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      // Generate truly random delay between 1 minute (60000ms) to 20 minutes (1200000ms)
      // Using Math.floor to ensure integer milliseconds
      const minDelay = 60000;  // 1 minute
      const maxDelay = 1200000;  // 20 minutes
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      
      console.log(`Next notification in ${Math.floor(randomDelay / 60000)} minutes and ${Math.floor((randomDelay % 60000) / 1000)} seconds`);
      
      timeoutId = setTimeout(() => {
        showNotification();
      }, randomDelay);
    };

    // Show first notification after 1-5 minutes (random)
    const firstDelay = Math.floor(Math.random() * 240000) + 60000; // 1-5 minutes
    console.log(`First notification will appear in ${Math.floor(firstDelay / 60000)} minutes and ${Math.floor((firstDelay % 60000) / 1000)} seconds`);
    
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, firstDelay);

    return () => {
      clearTimeout(initialTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [usedIndices, recentPurchases, loading]);

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
