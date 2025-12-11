import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                At BookBlaze.org, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you visit our website or purchase our digital resources. By using our website, you consent to the practices described in this policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information in two ways:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                  <strong>Information You Provide:</strong> When you register, purchase a product, or contact us, we collect personal details such as your name, email address, phone number, and billing address ("Order Information").
                </li>
                <li>
                  <strong>Automated Collection:</strong> When you visit our site, we automatically collect data about your device, including your web browser, IP address, time zone, and cookies installed on your device. We also track how you interact with the site, such as the pages you view and the search terms you use ("Device Information").
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected data for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                  <strong>Order Fulfillment:</strong> To process payments, deliver digital downloads, and send invoices or order confirmations.
                </li>
                <li>
                  <strong>Communication:</strong> To provide customer support and send you important updates or promotional offers (based on your preferences).
                </li>
                <li>
                  <strong>Site Optimization:</strong> We use Device Information (specifically IP addresses) to screen for potential fraud and to generate analytics that help us improve our website's performance and user experience.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                3. Cookies & Log Files
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Like most websites, we use log files and cookies to analyze trends and administer the site. These technologies track non-personally identifiable information, such as browser type and exit pages. You can disable cookies through your individual browser settings, though this may affect your ability to use certain features of the site.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                4. Third-Party Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We may employ third-party companies (such as payment processors or analytics providers) to facilitate our services. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                5. Data Retention & Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We maintain your Order Information for our records unless you explicitly ask us to delete this information. We do not alter our data collection practices when we see a Do Not Track signal from your browser.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                6. Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For more information about our privacy practices, or if you have questions, please contact us at{' '}
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

export default PrivacyPolicy;
