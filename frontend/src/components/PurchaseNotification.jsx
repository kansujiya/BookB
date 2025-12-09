import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';

const PurchaseNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState(null);
  const [usedIndices, setUsedIndices] = useState([]);

  // 40 Recent purchases data with diverse names and locations
  const recentPurchases = [
    { customerName: 'Rajesh K.', productName: 'Software System Design', timeAgo: '2 minutes ago', location: 'Mumbai, India' },
    { customerName: 'Priya S.', productName: 'Software Architecture Patterns', timeAgo: '5 minutes ago', location: 'Bangalore, India' },
    { customerName: 'Amit P.', productName: 'Foundations of Software Design Volume 2', timeAgo: '8 minutes ago', location: 'Delhi, India' },
    { customerName: 'Sneha M.', productName: 'Software System Design', timeAgo: '12 minutes ago', location: 'Pune, India' },
    { customerName: 'Vikram R.', productName: 'Software Architecture Patterns', timeAgo: '15 minutes ago', location: 'Hyderabad, India' },
    { customerName: 'Anita D.', productName: 'Foundations of Software Design Volume 2', timeAgo: '18 minutes ago', location: 'Chennai, India' },
    { customerName: 'Karthik V.', productName: 'Software System Design', timeAgo: '22 minutes ago', location: 'Coimbatore, India' },
    { customerName: 'Divya N.', productName: 'Software Architecture Patterns', timeAgo: '25 minutes ago', location: 'Ahmedabad, India' },
    { customerName: 'Rohan B.', productName: 'Software System Design', timeAgo: '30 minutes ago', location: 'Kolkata, India' },
    { customerName: 'Kavya L.', productName: 'Foundations of Software Design Volume 2', timeAgo: '35 minutes ago', location: 'Jaipur, India' },
    { customerName: 'Aditya G.', productName: 'Software Architecture Patterns', timeAgo: '40 minutes ago', location: 'Noida, India' },
    { customerName: 'Meera J.', productName: 'Software System Design', timeAgo: '45 minutes ago', location: 'Lucknow, India' },
    { customerName: 'Sanjay T.', productName: 'Foundations of Software Design Volume 2', timeAgo: '48 minutes ago', location: 'Surat, India' },
    { customerName: 'Pooja W.', productName: 'Software Architecture Patterns', timeAgo: '52 minutes ago', location: 'Indore, India' },
    { customerName: 'Arjun M.', productName: 'Software System Design', timeAgo: '1 hour ago', location: 'Chandigarh, India' },
    { customerName: 'Ritika S.', productName: 'Software Architecture Patterns', timeAgo: '1 hour ago', location: 'Nagpur, India' },
    { customerName: 'Nikhil A.', productName: 'Foundations of Software Design Volume 2', timeAgo: '1 hour ago', location: 'Bhopal, India' },
    { customerName: 'Ishita R.', productName: 'Software System Design', timeAgo: '1 hour ago', location: 'Vadodara, India' },
    { customerName: 'Rahul K.', productName: 'Software Architecture Patterns', timeAgo: '2 hours ago', location: 'Gurgaon, India' },
    { customerName: 'Anjali P.', productName: 'Software System Design', timeAgo: '2 hours ago', location: 'Kochi, India' },
    { customerName: 'Deepak S.', productName: 'Foundations of Software Design Volume 2', timeAgo: '2 hours ago', location: 'Patna, India' },
    { customerName: 'Tanvi B.', productName: 'Software Architecture Patterns', timeAgo: '3 hours ago', location: 'Raipur, India' },
    { customerName: 'Manish G.', productName: 'Software System Design', timeAgo: '3 hours ago', location: 'Ludhiana, India' },
    { customerName: 'Shreya V.', productName: 'Foundations of Software Design Volume 2', timeAgo: '3 hours ago', location: 'Agra, India' },
    { customerName: 'Varun T.', productName: 'Software Architecture Patterns', timeAgo: '4 hours ago', location: 'Nashik, India' },
    { customerName: 'Nisha K.', productName: 'Software System Design', timeAgo: '4 hours ago', location: 'Faridabad, India' },
    { customerName: 'Akash M.', productName: 'Foundations of Software Design Volume 2', timeAgo: '4 hours ago', location: 'Meerut, India' },
    { customerName: 'Riya D.', productName: 'Software Architecture Patterns', timeAgo: '5 hours ago', location: 'Rajkot, India' },
    { customerName: 'Suresh P.', productName: 'Software System Design', timeAgo: '5 hours ago', location: 'Varanasi, India' },
    { customerName: 'Neha L.', productName: 'Foundations of Software Design Volume 2', timeAgo: '5 hours ago', location: 'Jodhpur, India' },
    { customerName: 'Gaurav R.', productName: 'Software Architecture Patterns', timeAgo: '6 hours ago', location: 'Amritsar, India' },
    { customerName: 'Sakshi J.', productName: 'Software System Design', timeAgo: '6 hours ago', location: 'Gwalior, India' },
    { customerName: 'Abhishek W.', productName: 'Foundations of Software Design Volume 2', timeAgo: '6 hours ago', location: 'Vijayawada, India' },
    { customerName: 'Tanya N.', productName: 'Software Architecture Patterns', timeAgo: '7 hours ago', location: 'Mysore, India' },
    { customerName: 'Harish A.', productName: 'Software System Design', timeAgo: '7 hours ago', location: 'Ranchi, India' },
    { customerName: 'Simran C.', productName: 'Foundations of Software Design Volume 2', timeAgo: '7 hours ago', location: 'Aurangabad, India' },
    { customerName: 'Yash B.', productName: 'Software Architecture Patterns', timeAgo: '8 hours ago', location: 'Dhanbad, India' },
    { customerName: 'Preeti H.', productName: 'Software System Design', timeAgo: '8 hours ago', location: 'Jabalpur, India' },
    { customerName: 'Mohit F.', productName: 'Foundations of Software Design Volume 2', timeAgo: '8 hours ago', location: 'Kota, India' },
    { customerName: 'Swati E.', productName: 'Software Architecture Patterns', timeAgo: '9 hours ago', location: 'Udaipur, India' }
  ];

  useEffect(() => {
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

      // Schedule next notification with random time between 30 seconds to 3 minutes
      const randomDelay = Math.random() * 150000 + 30000; // 30000ms to 180000ms (30s to 3min)
      timeoutId = setTimeout(() => {
        showNotification();
      }, randomDelay);
    };

    // Show first notification after 8 seconds
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 8000);

    return () => {
      clearTimeout(initialTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [usedIndices]);

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
