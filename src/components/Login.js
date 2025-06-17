import React from 'react';
import { auth, googleProvider, appleProvider } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import HowItWorks from './HowItWorks';

const Login = ({ setUser }) => {
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

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white border border-blue-300 rounded-3xl shadow-2xl w-full max-w-3xl p-10">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="BiyaheWise Logo" className="h-12" />
        </div>

        {/* Login Buttons */}
        <div className="flex flex-col gap-4">
          <button onClick={handleGoogleLogin} className="w-full py-3 bg-blue-600 text-white rounded-full font-semibold">
            Login with Google
          </button>

          <button onClick={handleAppleLogin} className="w-full py-3 bg-black text-white rounded-full font-semibold">
            Login with Apple
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-20 w-full max-w-5xl">
        <HowItWorks />
      </div>

      <footer className="bg-blue-900 text-white text-center p-6 w-full">
        © 2025 BiyaheWise. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
