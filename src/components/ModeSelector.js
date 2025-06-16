import React from 'react';
import { motion } from 'framer-motion';

const ModeSelector = ({ mode, setMode }) => (
  <div className="mb-8">
    <label className="block mb-2 font-semibold text-left text-gray-700">Mode</label>
    <div className="relative w-full flex bg-gray-200 rounded-full overflow-hidden">
      
      {/* Only render motion.div if mode is selected */}
      {mode && (
        <motion.div
          className="absolute top-0 bottom-0 bg-blue-500 rounded-full"
          initial={false}
          animate={{
            left: mode === 'DRIVE' ? '0%' : mode === 'COMMUTE' ? '50%' : '0%',
            width: '50%'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      
      <button
        className={`w-1/2 py-3 z-10 font-semibold ${mode === 'DRIVE' ? 'text-white' : 'text-gray-800'}`}
        onClick={() => setMode('DRIVE')}
      >
        Drive
      </button>
      <button
        className={`w-1/2 py-3 z-10 font-semibold ${mode === 'COMMUTE' ? 'text-white' : 'text-gray-800'}`}
        onClick={() => setMode('COMMUTE')}
      >
        Commute
      </button>
    </div>
  </div>
);

export default ModeSelector;
