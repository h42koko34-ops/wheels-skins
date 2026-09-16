import React from 'react';
import { Zap, ShieldCheck, AlertTriangle } from 'lucide-react';
import heroBg from '../hero-bg.jpg';

export default function HeroPricing() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-center px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/70 to-[#050505] backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4 px-4 py-1.5 bg-red-600/10 border border-red-500/30 rounded-full backdrop-blur-md">
          <Zap className="w-3 h-3 text-[#E3211C]" />
          <span className="text-[#E3211C] font-bold tracking-widest text-[10px] uppercase">
            Handcrafted Steering Wheel Wraps
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-wide drop-shadow-2xl">
          WHEELS SKINS: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">AUTOMOTIVE ART</span>    
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-2xl font-medium">
          صمّم طارتك الفاخرة بنفسك وشاهد شكل الفتيس والهاند بريك بأعلى جودة تفصيل يدوي
        </p>

        <div id="pricing" className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl my-6">
          
          <div className="group relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(227,33,28,0.15)] overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-8 h-1 bg-red-600 shadow-[0_0_10px_rgba(227,33,28,0.8)]" />
            <div className="absolute top-0 right-0 w-1 h-8 bg-red-600 shadow-[0_0_10px_rgba(227,33,28,0.8)]" />
            <div>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold block mb-1">Standard / Mix</span>
              <p className="text-xs text-zinc-300 mb-2 font-semibold">سادة - منقط - كاربون - فورجيد</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg sm:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">400 ج.م</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800/50 text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E3211C]" /> 1 Year Warranty
            </div>
          </div>

          <div className="group relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-8 h-1 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            <div className="absolute top-0 right-0 w-1 h-8 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            <div>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold block mb-1">Premium Alcantara</span>
              <p className="text-xs text-zinc-300 mb-2 font-semibold">خامة أصلية فاخرة</p>
              <div className="text-lg sm:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">450 ج.م</div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800/50 text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> No Warranty
            </div>
          </div>

          <div className="group relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(227,33,28,0.15)] overflow-hidden flex flex-col justify-between">
            <div className="absolute bottom-0 left-0 w-8 h-1 bg-red-600 shadow-[0_0_10px_rgba(227,33,28,0.8)]" />
            <div className="absolute bottom-0 left-0 w-1 h-8 bg-red-600 shadow-[0_0_10px_rgba(227,33,28,0.8)]" />
            <div>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold block mb-1">Gear Shifter</span>
              <p className="text-xs text-zinc-300 mb-2 font-semibold">سادة أو منقط</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg sm:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">250 ج.م</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800/50 text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E3211C]" /> 1 Year Warranty
            </div>
          </div>

          <div className="group relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(227,33,28,0.15)] overflow-hidden flex flex-col justify-between">
            <div className="absolute bottom-0 left-0 w-8 h-1 bg-red-600 shadow-[0_0_10px_rgba(227,33,28,0.8)]" />
            <div className="absolute bottom-0 left-0 w-1 h-8 bg-red-600 shadow-[0_0_10px_rgba(227,33,28,0.8)]" />
            <div>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold block mb-1">Handbrake</span>
              <p className="text-xs text-zinc-300 mb-2 font-semibold">تفصيل يدوي متقن</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg sm:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">150 ج.م</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800/50 text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E3211C]" /> 1 Year Warranty
            </div>
          </div>
        </div>

        <a 
          href="#configurator" 
          style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
          className="mt-8 relative group bg-white text-black font-black px-10 py-4 uppercase tracking-widest transition-all duration-300 hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
        >
          Launch Configurator
        </a>
      </div>
    </section>
  );
}