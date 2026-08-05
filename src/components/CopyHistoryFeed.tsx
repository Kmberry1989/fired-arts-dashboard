import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { History, Calendar, Clipboard, Check } from 'lucide-react';

interface HistoryItem {
  id: string;
  prompt: string;
  format: string;
  content: string;
  createdAt: any;
}

export default function CopyHistoryFeed() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'marketing_copy'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: HistoryItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as HistoryItem);
      });
      setHistory(items);
      setLoading(false);
    }, (error) => {
      console.error("Firestore real-time subscription failed:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full min-h-64">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
          <History className="w-5 h-5 text-orange-500" /> Saved Copy History
        </h2>
        <p className="text-sm text-slate-400">Real-time cloud backup of successful campaigns</p>
      </div>

      <div className="flex-grow overflow-y-auto space-y-4 max-h-[400px] pr-2">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-slate-400 text-sm">
            Synchronizing cloud feed...
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-300 text-center">
            <p className="text-sm font-medium">No saved variants found</p>
            <p className="text-xs max-w-[200px] mt-0.5">Click "Save Copy" inside the AI panel to pin your first variant.</p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition bg-slate-50/40 relative group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-900 text-slate-100 px-2 py-0.5 rounded mr-2">
                    {item.format}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> 
                    {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.content, item.id)}
                  className="text-slate-400 hover:text-orange-600 transition p-1 rounded hover:bg-white border border-transparent hover:border-slate-100"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Clipboard className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs font-semibold text-slate-500 truncate mb-1">
                Prompt: "{item.prompt}"
              </p>
              <p className="text-xs text-slate-700 font-sans leading-relaxed whitespace-pre-wrap pl-2 border-l-2 border-orange-500/40">
                {item.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
