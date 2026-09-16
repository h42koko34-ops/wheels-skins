import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export default function Branches({ BRANCHES_DATA }) {
  return (
    <section id="branches" className="relative py-16 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-black mb-2 uppercase tracking-wider text-white">Installation <span className="text-[#E3211C]">Centers</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BRANCHES_DATA.map((branch) => (
          <div 
            key={branch.id} 
            className="group relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(227,33,28,0.15)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-8 h-1 bg-zinc-700 group-hover:bg-[#E3211C] transition-colors" />
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#E3211C] group-hover:border-[#E3211C]/30 group-hover:shadow-[0_0_10px_rgba(227,33,28,0.2)] transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm uppercase tracking-wide">{branch.name}</h3>
                  <span className="text-[11px] text-zinc-500 font-medium">{branch.address}</span>
                </div>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-medium">{branch.hours}</p>
            </div>

            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-zinc-900 hover:bg-[#E3211C] text-zinc-400 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-zinc-800 hover:border-[#E3211C]"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}