import React from 'react';
import { BookOpen, Users, Target, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-blue-700" />,
      title: 'Expert Knowledge',
      description: 'Curated content from industry experts with decades of experience in software engineering and system design.'
    },
    {
      icon: <Users className="h-12 w-12 text-blue-700" />,
      title: 'Community Driven',
      description: 'Join thousands of software professionals who are advancing their careers with our comprehensive resources.'
    },
    {
      icon: <Target className="h-12 w-12 text-blue-700" />,
      title: 'Practical Focus',
      description: 'Real-world case studies and interview-focused examples that you can apply immediately in your work.'
    },
    {
      icon: <Award className="h-12 w-12 text-blue-700" />,
      title: 'Quality Assured',
      description: 'Every eBook is thoroughly reviewed and updated to reflect the latest industry standards and best practices.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-400 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About BookBlaze
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Empowering software professionals with industry-leading resources for digital transformation
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            BookBlaze is dedicated to providing high-quality, industry-focused IT resources that help software professionals and organizations navigate the complexities of digital transformation. Our comprehensive eBooks are designed to bridge the gap between theoretical knowledge and practical application.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that continuous learning is the key to success in the ever-evolving tech landscape. That's why we've created a collection of carefully crafted eBooks that cover everything from fundamental concepts to advanced system design principles.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose BookBlaze?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Our Story
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Founded by experienced software engineers and architects, BookBlaze emerged from a simple observation: there was a significant gap between academic knowledge and the practical skills needed to excel in real-world software engineering roles.
            </p>
            <p>
              Our team has worked at leading tech companies including Google, Microsoft, Amazon, and many startups. We've conducted hundreds of technical interviews and mentored countless engineers. This experience has given us unique insights into what it takes to succeed in the industry.
            </p>
            <p>
              Today, BookBlaze serves thousands of software professionals worldwide, helping them advance their careers, ace technical interviews, and build better software systems. Our eBooks are trusted by engineers at top tech companies and used by teams building the next generation of innovative products.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-300 to-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Join thousands of professionals who are transforming their careers with BookBlaze
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
