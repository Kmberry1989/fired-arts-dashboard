'use client';
// Trigger build verification
import React from 'react';
import BrandCanvas from '../components/BrandCanvas';
import PaletteExporter from '../components/PaletteExporter';
import CopyGenerator from '../components/CopyGenerator';
import CopyHistoryFeed from '../components/CopyHistoryFeed';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Fired Arts Brand Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Asset management and deployment interface for marketing managers.</p>
        </div>
        <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-orange-100">
          v1.0.0 Active Core Kit
        </div>
      </header>
      <main className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BrandCanvas />
          </div>
          <div className="lg:col-span-1">
            <PaletteExporter />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CopyGenerator />
          </div>
          <div className="lg:col-span-2">
            <CopyHistoryFeed />
          </div>
        </div>
      </main>
    </div>
  );
}
