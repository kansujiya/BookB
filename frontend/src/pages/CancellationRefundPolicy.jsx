import React from 'react';

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Cancellation/Refund Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Digital Delivery
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Products are delivered instantly via email download link. Orders are typically processed within one hour but may take up to 24 hours. This email serves as your receipt and access point. We monitor server logs to prevent download abuse and reserve the right to terminate access if abnormal activity is detected.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Refund Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At BookBlaze (www.bookblaze.org), we sell non-tangible, irrevocable digital goods. Therefore, we generally do not issue refunds once the product has been sent. By purchasing, you acknowledge that the sale is final.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                Exceptions (Defective Products)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We will only consider a refund or exchange if:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                  <strong>Non-Delivery:</strong> You did not receive the download link within 24 hours of purchase.
                </li>
                <li>
                  <strong>Major Defects:</strong> The file is corrupt, empty, or fundamentally different from the description.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                Claims for Defects
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Claims regarding download or unzipping issues must be submitted to{' '}
                <a href="mailto:sell@bookblaze.org" className="text-blue-700 hover:text-blue-800 underline">
                  sell@bookblaze.org
                </a>{' '}
                within 24 hours of purchase. Failure to contact us within this window implies a successful download and acceptance of the product.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Software Compatibility
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                It is the customer's responsibility to ensure they have the necessary software to open standard files (PDF, ZIP, DOCX). We do not offer refunds/exchanges due to incompatibility with your specific third-party software (e.g., WinZip, MS Office) or web hosting environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
