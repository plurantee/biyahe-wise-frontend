import React from 'react';

const TripForm = ({ mode, form, handleChange, handleSubmit, loading }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-semibold">Origin</label>
        <input className="w-full p-4 border border-gray-300 rounded-full" name="origin" placeholder="Example: SM North EDSA" value={form.origin} onChange={handleChange} />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Destination</label>
        <input className="w-full p-4 border border-gray-300 rounded-full" name="destination" placeholder="Example: Glorietta 5" value={form.destination} onChange={handleChange} />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Date and Time</label>
        <input className="w-full p-4 border border-gray-300 rounded-full" name="dateTime" placeholder="Example: Tomorrow 8PM" value={form.dateTime} onChange={handleChange} />
      </div>
      {mode === 'DRIVE' && (
        <div>
          <label className="block mb-2 font-semibold">Car Model and Year</label>
          <input className="w-full p-4 border border-gray-300 rounded-full" name="carModel" placeholder="Example: Honda City RS 2022" value={form.carModel} onChange={handleChange} />
        </div>
      )}
    </div>

    <button onClick={handleSubmit} disabled={loading}
      className="w-full p-4 mt-8 bg-blue-600 text-white rounded-full font-semibold transition duration-300 hover:bg-white hover:text-blue-600 border border-blue-600">
      {loading ? 'Estimating...' : 'Estimate Trip'}
    </button>
  </>
);

export default TripForm;
