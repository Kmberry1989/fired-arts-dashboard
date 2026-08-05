import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Sparkles, Loader2, Bookmark } from 'lucide-react';

export default function CopyGenerator() {
  const [prompt, setPrompt] = useState('');
  const [format, setFormat] = useState('Instagram Caption');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResult('');
    setSaved(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, format }),
      });
      const data = await res.json();
      setResult(data.result || 'Failed to generate brand copy.');
    } catch (err) {
      setResult('Error connecting to the generation engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToFirebase = async () => {
    if (!result || saved) return;
    try {
      await addDoc(collection(db, 'marketing_copy'), {
        prompt,
        format,
        content: result,
        createdAt: serverTimestamp(),
      });
      setSaved(true);
    } catch (err) {
      alert('Error saving copy variant to history database.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-500" /> Phoenix AI Copywriter
        </h2>
        <p className="text-sm text-slate-400 mb-6">Generate kiln-tempered brand copy variants</p>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Asset Destination</label>
            <select 
              value={format} 
              onChange={(e) => setFormat(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 text-slate-700 font-medium"
            >
              <option>Instagram Caption</option>
              <option>Email Subject Line</option>
              <option>Studio Event Headline</option>
              <option>SMS Text Blast</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Campaign Topic</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Weekend masterclass on porcelain throw techniques..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm h-24 focus:outline-none focus:border-orange-500 resize-none text-slate-700"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium p-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ignite Engine'}
          </button>
        </form>
      </div>

      {result && (
        <div className="mt-6 pt-6 border-t border-slate-100 animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">Output Variant</span>
            <button 
              onClick={handleSaveToFirebase}
              className={`text-xs font-medium flex items-center gap-1.5 px-2 py-1 rounded transition ${saved ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              <Bookmark className="w-3 h-3" /> {saved ? 'Saved to Cloud' : 'Save Copy'}
            </button>
          </div>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-40 overflow-y-auto">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
