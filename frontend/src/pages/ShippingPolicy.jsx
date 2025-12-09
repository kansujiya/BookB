import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Shipping Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                 As BookBlaze specializes in digital resources, no physical shipping fees apply. Upon confirmation of your purchase, an email containing your secure download link will be sent to the address provided. Please ensure that your contact information is accurate.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                While delivery is typically completed within one hour, please allow up to 24 hours for processing in rare instances. If you do not receive the link within this timeframe, we recommend checking your spam or junk folder before contacting our support team at{' '}
                <a href="mailto:sell@bookblaze.org" className="text-blue-700 hover:text-blue-800 underline">
                  sell@bookblaze.org
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
