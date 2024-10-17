import React from 'react';
import { Users, Award, Clock, Building2 } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    {
      icon: <Users size={24} className="text-indigo-500" />,
      number: "1000+",
      label: "Happy Clients"
    },
    {
      icon: <Award size={24} className="text-indigo-500" />,
      number: "5+",
      label: "Years Experience"
    },
    {
      icon: <Clock size={24} className="text-indigo-500" />,
      number: "24/7",
      label: "Support"
    },
    {
      icon: <Building2 size={24} className="text-indigo-500" />,
      number: "5+",
      label: "Locations"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to ShopIn, where shopping meets convenience and style! We’re more than just an
          online store – we’re a community of people who believe in providing quality products that make your everyday life better.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8">
            At ShopIn, our mission is simple: to make online shopping easy, reliable, and enjoyable. We’re committed to providing not just great products but also an outstanding customer experience.
             From fast shipping to responsive support, we aim to exceed your expectations every step of the way.
            </p>
          </div>
        </div>

        {/* Why Choose Us? Section */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Us?
            </h2>
            <ul className="text-lg text-gray-600 mb-8">
            <li>Quality Products: We source only the best products that meet our high standards of quality and durability.</li>
            <li>Affordable Prices: We believe that great products shouldn’t break the bank, which is why we offer competitive prices across all our collections.</li>
            <li>Customer Satisfaction: Your satisfaction is our top priority. Our team is always here to assist you, ensuring that every purchase is a positive experience.</li>
            <li>Fast & Secure Shipping: We deliver your orders quickly and securely, right to your doorstep.</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
            {[
              {
                name: "Mohammed Boukar",
                position: "CEO & CO-Founder",
                description: "2+ years of industry experience"
              },
              {
                name: "Mostafa Rafiki",
                position: "CO-Founder",
                description: "Expert in technological innovations"
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200">
                  <img
                    src="/images/logo.png"
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-indigo-600 mb-2">{member.position}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;