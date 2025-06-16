import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResultDrawer = ({ result, setResult, mode }) => (
  <AnimatePresence>
    {result && (
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 100 }}
        className="fixed right-0 top-0 h-full w-full sm:w-1/3 bg-white shadow-xl p-8 overflow-y-auto z-50 rounded-l-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Result</h2>

        <div>
          {result.options.map((option, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-lg font-bold mb-2">{option.optionTitle}</h3>
              
              <p className="mb-1">Time: {option.estimatedTimeMinutes} minutes</p>
              <p className="mb-1">Cost: ₱{option.estimatedCostPHP}</p>
              { mode=='DRIVE' && (
                <p className="mb-1">Estimated Liters of Gas: {result.estimatedLitersUsed}L</p>
              )}
              <div className="mt-2">
                {option.steps.map((step, stepIdx) => (
                  <p key={stepIdx} className="text-sm text-gray-600 mb-1">• {step.description}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full" onClick={() => setResult(null)}>Close</button>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ResultDrawer;
