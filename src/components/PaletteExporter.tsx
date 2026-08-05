import React, { useState } from 'react';
import { brandKit } from '../lib/brandKit';

export default function PaletteExporter() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const getTailwindBlock = () => {
    const list = brandKit.colors.map(c => {
      const key = `brand-${c.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      return `        "${key}": "#${c.hex}",`;
    }).join('\n');
    return `colors: {\n${list}\n      }`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800 mb-1">Color Systems Repository</h2>
        <p className="text-sm text-slate-400">Omni-channel production assets specs</p>
      </div>

      <div className="flex-grow overflow-y-auto space-y-3 mb-6">
        {brandKit.colors.map((color) => (
          <div key={color.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition">
            <div className="w-12 h-12 rounded-lg shadow-inner flex-shrink-0" style={{ backgroundColor: `#${color.hex}` }} />
            <div className="flex-grow min-w-0">
              <h3 className="text-sm font-semibold text-slate-800 truncate">{color.name}</h3>
              <p className="text-xs text-slate-400 truncate">{color.area}</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <button
                onClick={() => triggerCopy(`#${color.hex}`, color.name + '-hex')}
                className="text-xs font-mono px-2 py-0.5 bg-slate-50 text-slate-500 rounded hover:bg-slate-100 transition"
              >
                {copiedId === color.name + '-hex' ? '✓ Copied' : `#${color.hex}`}
              </button>
              <button
                onClick={() => triggerCopy(color.cmyk, color.name + '-cmyk')}
                className="text-xs font-mono px-2 py-0.5 bg-orange-50 text-orange-600 rounded hover:bg-orange-100 transition"
              >
                {copiedId === color.name + '-cmyk' ? '✓ Copied' : 'CMYK Profile'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tailwind Object Extension</h3>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed border border-slate-800">
          {getTailwindBlock()}
        </pre>
      </div>
    </div>
  );
}
