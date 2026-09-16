import React from 'react';
import { X } from 'lucide-react';

export default function ImageModal({ modalImage, setModalImage }) {
  if (!modalImage) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-300"
      onClick={() => setModalImage(null)}
    >
      <button 
        className="absolute top-8 right-8 text-zinc-500 hover:text-white bg-zinc-900 hover:bg-[#E3211C] p-3 rounded-lg border border-zinc-800 transition-all shadow-[0_0_15px_rgba(227,33,28,0)] hover:shadow-[0_0_15px_rgba(227,33,28,0.5)] cursor-pointer"
        onClick={() => setModalImage(null)}
      >
        <X className="w-6 h-6" />
      </button>

      <div 
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <img 
          src={modalImage.src} 
          alt={modalImage.title} 
          className="relative z-10 max-w-full max-h-[70vh] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
        />
        
        <div className="mt-8 relative bg-zinc-950/80 backdrop-blur-md px-8 py-4 rounded-xl border border-zinc-800 flex items-center gap-4">
          <div className="absolute top-0 right-0 w-4 h-0.5 bg-red-600" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">{modalImage.title}</h3>
          <span className="w-px h-4 bg-zinc-800" />
          <span className="text-[#E3211C] font-black text-sm drop-shadow-[0_0_8px_rgba(227,33,28,0.5)]">{modalImage.price}</span>
        </div>
      </div>
    </div>
  );
}