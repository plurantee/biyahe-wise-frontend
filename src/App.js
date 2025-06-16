import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ModeSelector from './components/ModeSelector';
import TripForm from './components/TripForm';
import ResultDrawer from './components/ResultDrawer';
import HowItWorks from './components/HowItWorks';

function App() {
  const [mode, setMode] = useState('');
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    dateTime: '',
    carModel: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { ...form, mode };
      const res = await axios.post(
        'https://api.biyahewise.com/api/estimate',
        payload
      );
      setResult(res.data);
    } catch (error) {
      console.error('Error fetching estimate:', error);
      alert('Failed to fetch estimate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <section id="form-section" className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white border border-blue-300 rounded-3xl shadow-2xl w-full max-w-3xl p-10">

          {/* LOGO INSIDE FORM */}
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="BiyaheWise Logo" className="h-12" />
          </div>

          <ModeSelector mode={mode} setMode={setMode} />

          {mode && (
            <TripForm
              mode={mode}
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          )}

          <button
            type="button"
            className="w-full py-3 mt-6 bg-white text-blue-600 border border-blue-600 rounded-full font-semibold transition duration-300 hover:bg-blue-600 hover:text-white"
            onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How does it work?
          </button>
        </div>
      </section>

      <ResultDrawer result={result} setResult={setResult} mode={mode} />
      <HowItWorks 
        setMode={setMode} 
        setForm={setForm} 
        handleSubmit={handleSubmit} 
      />
      
      <footer className="bg-blue-900 text-white text-center p-6">
        © 2025 BiyaheWise. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
