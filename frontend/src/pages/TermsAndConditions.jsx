import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Terms and Conditions
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Welcome to BookBlaze. These Terms and Conditions govern your use of our website, bookblaze.org. By accessing or using our services, you agree to be bound by these terms. If you do not agree, please discontinue use immediately.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                1. License & Updates
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Upon purchase, you are granted a non-exclusive, non-transferable license to use the product. Customers are eligible to receive product updates for one (1) year from the date of purchase. To continue receiving updates after this period, you must renew your license at the current price.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                2. Authorized Use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use our services only for lawful purposes. You must not:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Use the website in any way that violates applicable laws or regulations.</li>
                <li>Impersonate any person or entity.</li>
                <li>Use automated systems (robots, spiders, scrapers) to access the site without permission.</li>
                <li>Interfere with the proper working of the website.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                3. Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Content Curation:</strong> Our resources are curated from a wide range of professional sources, research papers, and industry case studies. While we do not claim exclusive ownership of underlying public domain information, the unique structure, simplification, logical presentation, and design of these resources are the intellectual property of BookBlaze.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Usage:</strong> You are paying for the expertise and effort required to collate and structure this information into a cohesive learning resource.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Assets:</strong> All imagery, typography, and graphic elements are integral parts of the product. Extracting or distributing these assets separately from the product is prohibited.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                4. Notifications
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                By providing your email address, you consent to receive service-related notices and promotional messages. We are not responsible for automatic filtering applied by your email provider.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                5. Product Modifications & Ownership
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All resources remain the property of BookBlaze. When you download a product, you may modify it for your personal use. However, BookBlaze is not obligated to customize or redesign products for individual customers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                6. Validity of Purchase
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                You must download your resource within one year of purchase. If you fail to download the file within this timeframe, BookBlaze is not liable to provide a refund.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                7. Refund Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our digital products are provided on an "as is" basis and are generally non-refundable, with the following exceptions:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                  <strong>Non-delivery:</strong> If you do not receive the download link due to technical issues, you must contact us within 7 days.
                </li>
                <li>
                  <strong>Technical Defects:</strong> If a file is corrupt or cannot be unzipped, please contact Technical Support within 3 days.
                </li>
                <li>
                  <strong>Major Defects:</strong> If a defect significantly hinders the product's use, we may offer a replacement. We require your full cooperation in troubleshooting (e.g., providing screenshots) to validate the claim. Refusal to cooperate implies that the product is working as intended.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                8. Liability Disclaimer
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                BookBlaze is not liable for any direct, indirect, or consequential damages arising from the use of our products. You are solely responsible for the security of your accounts. Our total liability for any claim shall not exceed $100.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                9. Modifications to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We reserve the right to investigate violations of this agreement and to update these terms, pricing, or site content at any time without prior notice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
