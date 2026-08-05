import React, { useState, useRef } from 'react';
import { brandKit } from '../lib/brandKit';

export default function BrandCanvas() {
  const [bgType, setBgType] = useState<'light' | 'dark' | 'grid'>('light');
  const [customBg, setCustomBg] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setCustomBg(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const isDarkBackground = bgType === 'dark' || customBg !== null;
  const scriptTextFill = isDarkBackground ? '#FFFFFF' : '#343538';

  const downloadOptimizedSVG = () => {
    if (!svgRef.current) return;
    const svgString = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fired-arts-logo-${bgType}-optimized.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Dynamic Asset Sandbox</h2>
          <p className="text-sm text-slate-400">Contextual alignment checker & SVG output engine</p>
        </div>
        <button 
          onClick={downloadOptimizedSVG}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all"
        >
          Export Active SVG
        </button>
      </div>

      <div 
        className="w-full h-80 rounded-xl relative flex items-center justify-center overflow-hidden border border-slate-200"
        style={{
          backgroundColor: bgType === 'light' ? '#FFFFFF' : bgType === 'dark' ? '#0A0A0C' : 'transparent',
          backgroundImage: bgType === 'grid' 
            ? 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)' 
            : customBg ? `url(${customBg})` : 'none',
          backgroundSize: bgType === 'grid' ? '20px 20px' : 'cover',
          backgroundPosition: 'center'
        }}
      >
        <svg 
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 450" 
          className="w-80 h-auto drop-shadow-md select-none"
        >
          <defs>
            <linearGradient id="phoenix-fire" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#E32328" />
              <stop offset="50%" stopColor="#F26C21" />
              <stop offset="100%" stopColor="#FBC21C" />
            </linearGradient>
            <linearGradient id="cool-wings" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#692975" />
              <stop offset="100%" stopColor="#283891" />
            </linearGradient>
          </defs>
          <path d="M150,180 Q210,80 230,130 Q250,50 290,120" fill="none" stroke="url(#phoenix-fire)" strokeWidth="18" strokeLinecap="round" />
          <path d="M220,150 Q280,220 320,190" fill="none" stroke="url(#cool-wings)" strokeWidth="12" strokeLinecap="round" />
          <text x="50" y="320" fontFamily="Georgia, serif" fontSize="64" fontStyle="italic" fontWeight="bold" fill={scriptTextFill}>Fired Arts</text>
          <text x="310" y="350" fontFamily="Arial, sans-serif" fontSize="20" letterSpacing="6" fontWeight="900" fill="#C83E26">STUDIO</text>
        </svg>

        {customBg && (
          <button 
            onClick={() => setCustomBg(null)}
            className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md"
          >
            Clear Upload
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <button onClick={() => { setBgType('light'); setCustomBg(null); }} className={`p-2.5 rounded-xl border text-sm font-medium transition ${bgType === 'light' && !customBg ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>White Backing</button>
        <button onClick={() => { setBgType('dark'); setCustomBg(null); }} className={`p-2.5 rounded-xl border text-sm font-medium transition ${bgType === 'dark' && !customBg ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Black Backing</button>
        <button onClick={() => { setBgType('grid'); setCustomBg(null); }} className={`p-2.5 rounded-xl border text-sm font-medium transition ${bgType === 'grid' && !customBg ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Transparent Grid</button>
        <label className="p-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer text-center block overflow-hidden text-ellipsis whitespace-nowrap">
          Upload Context Image
          <input type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
}
