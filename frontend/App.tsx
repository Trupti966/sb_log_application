import React, { useState } from 'react';
import { checkHealth, getEntries, Entry } from './services/client';
import { EntryCard } from './components/EntryCard';

export default function App() {

  // Health check state
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Entries state
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entriesStatus, setEntriesStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleTestBackend = async () => {
    setStatus('loading');
    setResponseMessage('');

    try {
      const data = await checkHealth();
      setResponseMessage(data);
      setStatus('success');
    } catch {
      setResponseMessage("Cannot reach backend");
      setStatus('error');
    }
  };

  const handleLoadEntries = async () => {
    setEntriesStatus('loading');

    try {
      const data = await getEntries();
      setEntries(data);
      setEntriesStatus('success');
    } catch {
      setEntriesStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6 font-sans text-gray-800">

      {/* BOX 1: BACKEND TEST UI */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 mb-8">

        <h1 className="text-3xl font-extrabold text-indigo-600 mb-2">Trupti's Library</h1>
        <p className="text-gray-500 mb-8 font-medium">Full-stack practice app</p>

        <button
          onClick={handleTestBackend}
          disabled={status === 'loading'}
          className={`w-full py-3.5 px-6 rounded-xl text-white font-bold text-lg transition-all duration-200 transform shadow-md
            ${status === 'loading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-[0.98]'
            }`}
        >
          {status === 'loading' ? 'Checking...' : 'Test Backend'}
        </button>

        {/* Backend Response Box */}
        <div className="mt-8 text-left">
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            Backend Response
          </label>

          <div className={`w-full p-4 rounded-xl bg-gray-50 border-2 min-h-[120px] flex items-center justify-center text-center transition-colors duration-300
            ${status === 'error' ? 'border-red-200 bg-red-50' : ''}
            ${status === 'success' ? 'border-green-300 bg-green-50' : ''}
          `}>
            {status === 'idle' && <span className="text-gray-400 italic text-sm">Click the button to test connection</span>}
            {status === 'loading' && <span className="text-indigo-500 font-semibold">Checking...</span>}
            {status === 'success' && <p className="text-green-700 font-mono text-sm break-all">{responseMessage}</p>}
            {status === 'error' && <p className="text-red-500 font-semibold">{responseMessage}</p>}
          </div>
        </div>
      </div>

      {/* BOX 2: ENTRIES UI */}
      <div className="max-w-md w-full">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-xl font-bold text-gray-800">My Library</h2>

          <button
            onClick={handleLoadEntries}
            disabled={entriesStatus === 'loading'}
            className="bg-white border border-gray-200 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {entriesStatus === 'loading' ? 'Loading...' : 'Load Entries'}
          </button>
        </div>

        {entriesStatus === 'error' && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-center text-sm mb-4">
            Failed to load entries. Check backend connection.
          </div>
        )}

        <div className="space-y-4">
          {entries.map(entry => (
            <EntryCard key={entry.id} entry={entry} />
          ))}

          {entriesStatus === 'success' && entries.length === 0 && (
            <div className="text-center py-8 text-gray-400 italic">No entries found</div>
          )}
        </div>
      </div>

    </div>
  );
}
