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
                Pricing for our product suite is determined by content comprehensiveness, specialization, and
                accompanying resources. We offer a tiered pricing structure designed to accommodate diverse financial
                and operational requirements. Current rates are explicitly listed on respective product pages and may
                reflect promotional incentives or package deals.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                We are committed to offering competitive rates for premium digital assets. All financial transactions are
                encrypted and secure. Please note that advertised rates are exclusive of applicable taxes, which are
                calculated upon checkout.              </p>

              <p className="text-gray-700 leading-relaxed">
                We retain the right to adjust pricing structures at our sole discretion and without prior notification.              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPolicy;
