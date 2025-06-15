import React from 'react';

const HowItWorks = ({ setMode, setForm, handleSubmit }) => {

  const handleExample = () => {
    setMode('COMMUTE');
    setForm({
      origin: 'SM North',
      destination: 'SM Fairview',
      dateTime: 'Sometime next week morning',
      carModel: ''
    });

    setTimeout(() => {
      // Scroll to form section
      document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });

      // Wait for scroll and form update before submit
      setTimeout(() => {
        handleSubmit();
      }, 400);
    }, 300);
  };

  return (
    <section id="how-it-works" className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-12 bg-white">
        <div className="max-w-lg text-left">
          <h2 className="text-4xl font-bold mb-6 text-blue-700">How does BiyaheWise work?</h2>
          <p className="text-lg mb-4 text-gray-800">
            BiyaheWise helps you plan trips smarter by estimating travel cost for both driving and commuting.
          </p>
          <p className="text-lg text-gray-700">
            We analyze distance, routes, fuel, traffic, and public transport options to give you reliable trip estimates.
          </p>

          <button 
            onClick={handleExample}
            className="mt-8 px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-full font-semibold transition duration-300 hover:bg-blue-600 hover:text-white"
          >
            Try Example
          </button>
        </div>
      </div>
      <div className="flex-1 bg-blue-500"></div>
    </section>
  );
};

export default HowItWorks;
