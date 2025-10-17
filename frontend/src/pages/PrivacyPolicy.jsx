import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 py-16">
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
                BookBlaze respects your privacy. This policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our site,{' '}
                <a href="https://bookblaze.org" className="text-yellow-600 hover:text-yellow-700 underline">
                  bookblaze.org
                </a>
                .
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                This policy applies only to our online activities and the information you share or that we collect on our website. It does not apply to information collected offline or through other channels. By using our website, you consent to this Privacy Policy and agree to its terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We make it clear what personal information we ask you to provide and why. When you contact us directly, we may collect information like your name, email, phone number, and the content of your message. When you register for an account, we may ask for your name, company name, address, email, and telephone number.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit the site, we automatically collect certain information, which we call "Device Information". This includes your web browser, time zone, cookies, and information about the pages and products you view and how you interact with the site. When you make a purchase, we collect "Order Information," which includes your name, billing and shipping addresses, email, and phone number. "Personal Information" refers to both Device and Order Information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your Order Information to fulfill orders, process payments, and provide invoices and order confirmations. We also use it to communicate with you, screen for potential fraud, and, based on your preferences, provide you with information or advertising about our products.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We use Device Information to screen for potential risk and fraud (especially your IP address) and to improve and optimize our site. We also use the information we collect to operate and maintain our website, understand how you use it, develop new products, and communicate with you for customer service or marketing purposes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Log Files, Cookies, and Third-Party Policies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use log files and cookies to collect non-personally identifiable information like your IP address, browser type, and pages visited. This is used for analyzing trends and optimizing the user experience.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our site may use third-party ad servers or networks that use technologies like cookies to measure advertising effectiveness and personalize content. We have no access to or control over these third-party cookies. We advise you to consult the respective privacy policies of these third parties for more detailed information. You can disable cookies through your browser settings.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We do not alter our data collection practices based on a "Do Not Track" signal from your browser. We will retain your Order Information unless you ask us to delete it. We may update this policy periodically to reflect changes in our practices or for other operational or legal reasons.
              </p>

              <p className="text-gray-700 leading-relaxed">
                If you have questions about our privacy practices or wish to make a complaint, please contact us at{' '}
                <a href="mailto:sell@bookblaze.org" className="text-yellow-600 hover:text-yellow-700 underline">
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
