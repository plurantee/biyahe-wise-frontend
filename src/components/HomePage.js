import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import ModeSelector from './ModeSelector';
import TripForm from './TripForm';
import ResultDrawer from './ResultDrawer';
import HowItWorks from './HowItWorks';
import { useSearchParams } from 'react-router-dom';
import { auth, googleProvider, appleProvider } from '../services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const HomePage = () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';
  const [searchParams] = useSearchParams();
  const originQP = searchParams.get("origin");
  const destinationQP = searchParams.get("destination");

  const title = (originQP && destinationQP)
    ? `How to get from ${originQP} to ${destinationQP} - BiyaheWise`
    : 'BiyaheWise - Trip Cost & Commute Estimator Philippines';

  const [mode, setMode] = useState(() => (originQP && destinationQP) ? 'COMMUTE' : '');
  const [form, setForm] = useState({
    origin: originQP || '',
    destination: destinationQP || '',
    dateTime: (originQP && destinationQP) ? 'NOW' : '',
    carModel: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('estimate');
  const [history, setHistory] = useState([]);

  const formatLocation = (text) => {
    if (!text) return '';
    return text.split(',')[0].trim();
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { ...form, mode };
      const token = localStorage.getItem('token');

      const res = await axios.post(
        `${API_BASE_URL}/api/estimate`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setResult(res.data);
    } catch (error) {
      console.error('Error fetching estimate:', error);
      if (error.response && error.response.status === 401) {
        alert('Authentication error. Please login again.');
      } else {
        alert('Failed to fetch estimate');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${API_BASE_URL}/api/estimate/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    if (originQP && destinationQP) {
      handleSubmit();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
        setUser(user);
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && activeTab === 'history') {
      loadHistory();
    }
  }, [user, activeTab]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      setUser(result.user);
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      setUser(result.user);
    } catch (err) {
      console.error("Apple login error:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Estimate cost, routes, and travel time from ${originQP || 'anywhere'} to ${destinationQP || 'anywhere'}`} />
        <link rel="canonical" href={`https://biyahewise.com/how-to-get?origin=${originQP}&destination=${destinationQP}`} />
      </Helmet>
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <section id="form-section" className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white border border-blue-300 rounded-3xl shadow-2xl w-full max-w-3xl p-10">

            <div className="flex justify-center mb-8">
              <img src="/logo.png" alt="BiyaheWise Logo" className="h-12" />
            </div>

            {!user ? (
              <div className="flex flex-col gap-4">
                {/* (unchanged login buttons here) */}
                <button 
                  onClick={handleGoogleLogin} 
                  className="flex items-center justify-center gap-3 w-full py-2 bg-blue-600 text-white rounded-full font-semibold text-base"
                >
                  <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.6-34-4.7-50.3H272v95.1h146.9c-6.3 33.6-25.1 61.9-53.6 81v67.3h86.6c50.7-46.7 81.6-115.5 81.6-193.1z"/>
                    <path fill="#34a853" d="M272 544.3c72.7 0 133.7-24 178.2-65.1l-86.6-67.3c-24.1 16.2-55 25.7-91.6 25.7-70.5 0-130.3-47.6-151.7-111.2H32.8v69.9C76.5 475.2 167.8 544.3 272 544.3z"/>
                    <path fill="#fbbc04" d="M120.3 326.4c-10.1-29.6-10.1-61.4 0-91l-87.5-69.9C4.3 213.1-9.7 255.1-9.7 300s14 86.9 38.5 124.5l91.5-69.9z"/>
                    <path fill="#ea4335" d="M272 108.3c39.6-.6 77.5 14 106.5 40.7l79.8-79.8C417 24 346.6-1.4 272 0 167.8 0 76.5 69.1 32.8 175.5l91.5 69.9C141.7 155.9 201.5 108.3 272 108.3z"/>
                  </svg>
                  <span>Login with Google</span>
                </button>
                {/*
                <button 
                  onClick={handleAppleLogin} 
                  className="flex items-center justify-center gap-3 w-full py-2 bg-black text-white rounded-full font-semibold text-base"
                >
                  <svg className="w-5 h-5" viewBox="0 0 848 1000" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M682 533c2-118 103-174 108-177-59-87-149-99-180-101-77-8-149 45-187 45s-98-44-161-43c-82 1-158 48-200 122-86 150-22 372 62 494 41 59 89 125 152 122 61-3 84-39 158-39s94 39 161 38c67-1 109-60 150-119 47-67 66-132 67-136-1-1-129-50-130-199zM568 185c34-42 57-100 50-158-48 2-106 32-140 74-31 36-58 94-51 149 54 4 107-27 141-65z"/>
                  </svg>
                  <span>Login with Apple</span>
                </button>
                */}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="font-semibold text-gray-700">Welcome, {user.displayName}</p>
                  <button onClick={handleLogout} className="text-sm text-red-500 font-semibold">Logout</button>
                </div>

                {/* Tabs */}
                <div className="flex mb-6">
                  <button
                    className={`flex-1 py-2 rounded-l-full ${activeTab === 'estimate' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    onClick={() => setActiveTab('estimate')}
                  >
                    Estimate
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-r-full ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    onClick={() => setActiveTab('history')}
                  >
                    History
                  </button>
                </div>

                {/* Render Tabs */}
                {activeTab === 'estimate' && (
                  <>
                    <ModeSelector mode={mode} setMode={setMode} />
                    {mode && (
                      <TripForm
                        mode={mode}
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                      />
                    )}
                  </>
                )}

                {activeTab === 'history' && (
                  <div className="flex flex-col gap-3">
                    {history.length === 0 ? (
                      <p>No history yet.</p>
                    ) : (
                      history.map((entry, idx) => (
                        <button 
                          key={idx} 
                          className="py-2 px-4 bg-blue-100 text-blue-700 rounded-full font-medium"
                          onClick={() => {
                            try {
                              setResult(JSON.parse(entry.response));
                            } catch {
                              alert("Failed to parse saved response.");
                            }
                          }}
                        >
                          {formatLocation(entry.origin)} → {formatLocation(entry.destination)}
                        </button>
                      ))
                    )}
                  </div>
                )}

              </>
            )}
          </div>
        </section>

        <ResultDrawer result={result} setResult={setResult} mode={mode} />
        <HowItWorks setMode={setMode} setForm={setForm} handleSubmit={handleSubmit} />

        <footer className="bg-blue-900 text-white text-center p-6">
          © 2025 BiyaheWise. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default HomePage;
