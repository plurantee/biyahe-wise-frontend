import React from 'react';
import AutocompleteInput from './AutocompleteInput';

const TripForm = ({ mode, form, setForm, handleChange, handleSubmit, loading }) => {
  const handleResolvedOrigin = (place) => {
    setForm(prev => ({ ...prev, origin: place.display_name }));
  };

  const handleResolvedDestination = (place) => {
    setForm(prev => ({ ...prev, destination: place.display_name }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold">Origin</label>
          <AutocompleteInput onSelect={handleResolvedOrigin} placeholder="Example: SM North EDSA" defaultValue={form.origin} />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Destination</label>
          <AutocompleteInput onSelect={handleResolvedDestination} placeholder="Example: Glorietta 5" defaultValue={form.destination} />
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

      <button type="submit" disabled={loading}
        className="w-full p-4 mt-8 bg-blue-600 text-white rounded-full font-semibold transition duration-300 hover:bg-white hover:text-blue-600 border border-blue-600">
        {loading ? 'Estimating...' : 'Estimate Trip'}
      </button>
    </form>
  );
};

export default TripForm;