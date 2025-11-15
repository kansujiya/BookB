import React from 'react';

const PricingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Pricing Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Our products are priced based on the depth of content, specialization, and included resources. We offer a variety of pricing tiers to fit different needs and budgets. Prices are clearly displayed on individual product pages and may be subject to promotional discounts or bundled offers.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                We strive to maintain competitive pricing for high-quality digital resources. All transactions are processed securely, and prices are exclusive of applicable taxes, which will be shown at checkout.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify our pricing at any time without prior notice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPolicy;
