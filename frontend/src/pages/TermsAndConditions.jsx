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
                Welcome to BookBlaze! These terms and conditions outline the rules and regulations for using our website at{' '}
                <a href="https://bookblaze.org" className="text-blue-700 hover:text-blue-800 underline">
                  bookblaze.org
                </a>
                . By using the website, you agree to these provisions. If you do not agree, please discontinue use immediately.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                Once a product is purchased, the customer is eligible for updates for one year. To continue receiving updates, you must resubscribe. Our products are created by experienced professionals to provide accurate and practical information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Authorized Use of Website
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                You are authorized to use our services in good faith. You agree not to use the services for fraudulent or unlawful purposes, or in a way that could damage our interests or rights. You also agree not to interfere with the website's function, impersonate others, or use automated systems like robots to access or copy any part of the site. You are responsible for having the necessary equipment and software to use our services. The rights granted to you are personal and cannot be assigned to third parties without our written consent.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Notifications and Emails
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                By providing your email address, you consent to us using it to send service-related notices and promotional messages. We may send other notifications via email or by posting them on the website. We are not responsible for any automatic filtering that may be applied to these emails by you or your network provider.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Intellectual Property & Usage
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The material in our resources is carefully curated from wide range of sources, research papers, industry case studies, and other reference materials.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                What makes our product unique is the substantial effort invested in organizing, simplifying, and presenting this knowledge in a clear, logical, and easy-to-consume format — specifically designed for software professionals.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not claim exclusive ownership of the raw materials or publicly available information used in the resources. Instead, we charge a nominal fee for the time, expertise, and effort involved in collating, structuring, and designing this content into a more cohesive learning resource.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our objective is to save you countless hours of searching and organizing while helping you accelerate your learning curve and apply system design, architecture, and AI concepts effectively.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 font-semibold">
                All imagery, typefaces, and graphic designs are royalty-free and are integral parts of the products we offer. Distributing or using these separately from the product designs is prohibited and will be considered a violation of these terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Validity of Purchase
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                You can download your purchased resource within one year of the purchase date. Once downloaded, you will receive updates for one year. If you fail to download the resource, BookBlaze will not provide a refund or compensation. If you want to continue receiving updates after the year is up, you must renew the product at its current price.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Product Resources
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The resources available on the website remain the sole property of BookBlaze. Any use of the content without permission or a standard license from the site shall be a violation of the Intellectual Property Rights of the company and is therefore prohibited.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Product Modifications
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                When you download a product under the standard license, you have the right to modify, alter, or change it as you see fit for your personal use. However, BookBlaze is not obligated to do any redesign of the product for your benefit.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Errors, Corrections, and Changes
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We do not guarantee that the site will be error-free or free from viruses or other harmful components. We also don't guarantee that the information will be accurate or timely. We may amend the features, functionality, or content of the site at any time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Unlawful Activities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We reserve the right to investigate and take action on any complaints or violations of this agreement, including reporting suspected unlawful activity to law enforcement and disclosing necessary information like your profile details, email addresses, and IP addresses.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Linking to Third-Party Sources
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We reserve the right to insist that any link to our site be discontinued. Our site and product downloads may contain links to other websites, but we have no control or responsibility over third-party sites, nor do we endorse or sponsor them.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Return and Refund Policies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The digital products on our site are provided on an "as is" basis. They are not subject to return or refund, except under specific circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                  <strong>Non-delivery:</strong> If you do not receive a product due to mailing issues with the email provider, you must submit a claim within seven days from the order date.
                </li>
                <li>
                  <strong>Download/Unzipping problems:</strong> Contact our Technical Support Team within three days regarding these issues.
                </li>
                <li>
                  <strong>Major defects:</strong> If a major defect significantly hinders use, you may be reimbursed with another product of similar value. We may request temporary access to your system for troubleshooting, and refusal to provide access will disqualify you from reimbursement.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Liability Disclaimer
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                BookBlaze is not liable for damages that may arise from your use or inability to use our services and products, including direct, indirect, or consequential damages. You are solely responsible for your own accounts, passwords, and related access. Our total liability for any claims related to our site or products will not exceed $100.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
