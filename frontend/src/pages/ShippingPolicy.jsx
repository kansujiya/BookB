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
                Since BookBlaze offers digital resources, there are no physical shipping charges. Upon successful completion of your purchase, you will receive an email with a link to download your resource(s). Please ensure you provide a valid email address.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                The download link typically occurs within 1 hour, but in some instances, may take up to 24 hours. If you do not receive the link within this timeframe, please check your spam or junk folder.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                For further assistance, please contact us at{' '}
                <a href="mailto:sell@bookblaze.org" className="text-blue-700 hover:text-blue-800 underline">
                  sell@bookblaze.org
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
