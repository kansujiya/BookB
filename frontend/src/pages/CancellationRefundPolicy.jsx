import React from 'react';

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 py-16">
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
                Product Download
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our products are currently delivered by Internet download only. After your purchase has been approved we will process your order. Orders are typically processed within one (1) hour but could take as long as twenty four (24) hours to complete. Once your order has been processed we will send you a confirmation email using the email address you provided on our order form.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This email will serve as your electronic purchase receipt and will contain the information you need to access our product downloads.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Downloads from our servers are closely monitored to ensure you are able to successfully access our products. While we are flexible and allow you to complete a reasonable number of downloads we will not tolerate download abuse. We reserve the right to terminate your access to our download servers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Refund Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At BookBlaze (www.bookblaze.org), we are committed to your satisfaction with our non-tangible, irrevocable digital goods. Once your order is complete and the product is made accessible via email, we typically do not offer refunds except for below conditions:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                a. Eligibility for Refunds
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Refunds are available under these conditions:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>The service has not yet started at the time of the refund request.</li>
                <li>BookBlaze is unable to provide the agreed-upon services due to unforeseen circumstances.</li>
                <li>A cancellation request is made within the eligible timeframe as mentioned in the Cancellation Policy.</li>
                <li>You can request a refund within 7 days of the purchase date if you are unsatisfied with the service.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                b. Refund Processing Timeline
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Approved refunds will be processed within 7 to 14 business days from the date of approval. Refunds are issued to the original payment method. Any processing or transaction fees from payment gateways may be non-refundable.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                c. Non-Refundable Situations
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Refunds will not be provided in the following cases:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Once the service has been delivered or substantially completed.</li>
                <li>If the cancellation request is made after the stipulated period.</li>
                <li>If you fail to provide the necessary inputs or cooperation for service execution.</li>
                <li>For promotional or discounted services explicitly marked as non-refundable.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                Download and Unzipping Issues
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                It may happen so that you are having problems while downloading the product or its unzipping. Claims regarding such issues must be submitted within 24 hours. If you do not properly contact us during this period, you agree that we may construe silence as a successful download of the product with no further right of redress or refund for a "download issue" reason.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                In case the if you have not able unzip the product, please contact us immediately. We will be happy to mail you the product to download. Please contact us on{' '}
                <a href="mailto:sell@bookblaze.org" className="text-blue-700 hover:text-blue-800 underline">
                  sell@bookblaze.org
                </a>{' '}
                for the same.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Please note that we do not bear any responsibility and therefore we do not satisfy any refund/return/exchange requests based on incompatibility of our products with some third-party software (such as Winzip / Winrar / MS Word / MS Excel / PowerPoint etc.) other than those which are specified as compatible in a description available on the sales page of each product. We don't guarantee that our products are fully compatible with any third-party programs (including web host) and we do not provide support for third-party applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
