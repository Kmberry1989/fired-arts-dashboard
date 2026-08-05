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
return colors: {\n + brandKit.colors.map(c => 'brand-${c.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}' : '${c.hex}',).join('\n') + \n};
};
return (

Color Systems Repository
Omni-channel production assets specs
{brandKit.colors.map((color) => (

<div className="w-12 h-12 rounded-lg shadow-inner flex-shrink-0" style={{ backgroundColor: color.hex }} />

{color.name}
{color.area}

<button
onClick={() => triggerCopy(color.hex, color.name + '-hex')}
className="text-xs font-mono px-2 py-0.5 bg-slate-50 text-slate-500 rounded hover:bg-slate-100"
>
{copiedId === color.name + '-hex' ? '✓ Copied' : color.hex}

<button
onClick={() => triggerCopy(color.cmyk, color.name + '-cmyk')}
className="text-xs font-mono px-2 py-0.5 bg-orange-50 text-orange-600 rounded hover:bg-orange-100"
>
{copiedId === color.name + '-cmyk' ? '✓ Copied' : 'CMYK Profile'}




))}
Tailwind Object Extension

{getTailwindBlock()}



);
}
