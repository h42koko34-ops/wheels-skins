import React from 'react';
import { ChevronLeft, Zap } from 'lucide-react';
import gearDotted from '../gear-dotted.png';
import gearPlain from '../gear-plain.png';
import handbrakeCover from '../handbrake.png';

export default function Configurator({
  wheelOptions, threadColors, 
  selectedWheel, setSelectedWheel, 
  selectedThread, setSelectedThread, 
  selectedGear, setSelectedGear, 
  selectedHandbrake, setSelectedHandbrake, 
  totalPrice, setModalImage
}) {
  return (
    <section id="configurator" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-4xl font-black mb-2 uppercase tracking-wider text-white">Cockpit <span className="text-[#E3211C]">Setup</span></h2>
        <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest font-semibold">اختر الطارة ثم حدد مقبض الفتيس أو الهاند بريك</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-950/50 backdrop-blur-xl p-6 sm:p-10 rounded-2xl border border-zinc-800/80 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 space-y-12 relative min-h-[400px]">
          <div className="absolute top-[40%] w-72 h-20 bg-red-600/10 rounded-[100%] blur-xl animate-pulse pointer-events-none" />
          <div className="absolute top-[45%] w-60 h-10 border border-red-500/20 rounded-[100%] drop-shadow-[0_0_15px_rgba(227,33,28,0.5)] pointer-events-none" />
          <div className="absolute top-[48%] w-32 h-4 border border-red-500/40 rounded-[100%] drop-shadow-[0_0_25px_rgba(227,33,28,0.8)] pointer-events-none" />

          <div 
            className="relative z-10 group w-[300px] sm:w-[380px] flex items-center justify-center cursor-pointer transform transition-transform duration-700 hover:scale-105"
            onClick={() => setModalImage({ src: selectedWheel.image, title: selectedWheel.name, price: selectedWheel.priceText })}
          >
            <img 
              key={selectedWheel.id}
              src={selectedWheel.image} 
              alt={selectedWheel.name} 
              className="w-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.9)]"
            />
            <div className="absolute -bottom-8 bg-zinc-950/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-700/80 flex items-center gap-3 text-xs shadow-[0_0_15px_rgba(0,0,0,0.8)]">
              <span className="font-bold text-white">{selectedWheel.name}</span>
              <span className="text-zinc-600">|</span>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-zinc-800 inline-block" style={{ backgroundColor: selectedThread.hex, boxShadow: `0 0 10px ${selectedThread.hex}` }}></span>
            </div>
          </div>

          {(selectedGear !== 'none' || selectedHandbrake !== 'none') && (
            <div className="w-full max-w-sm grid grid-cols-2 gap-4 animate-in fade-in zoom-in duration-500 z-10 mt-8">
              {selectedGear !== 'none' && (
                <div 
                  onClick={() => setModalImage({ src: selectedGear === 'dotted' ? gearDotted : gearPlain, title: selectedGear === 'dotted' ? 'مقبض فتيس منقط' : 'مقبض فتيس سادة', price: '250 ج.م' })}
                  className="relative bg-zinc-950/80 border border-zinc-800 hover:border-[#E3211C]/50 p-4 rounded-xl flex flex-col items-center text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(227,33,28,0.15)] overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-4 h-0.5 bg-red-600" />
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 block mb-2">Gear Selected</span>
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img src={selectedGear === 'dotted' ? gearDotted : gearPlain} alt="الفتيس" className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              )}
              {selectedHandbrake === 'handbrake' && (
                <div 
                  onClick={() => setModalImage({ src: handbrakeCover, title: 'كسوة هاند بريك هاند ميد', price: '150 ج.م' })}
                  className="relative bg-zinc-950/80 border border-zinc-800 hover:border-[#E3211C]/50 p-4 rounded-xl flex flex-col items-center text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(227,33,28,0.15)] overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-4 h-0.5 bg-red-600" />
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 block mb-2">Handbrake Selected</span>
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img src={handbrakeCover} alt="الهاند بريك" className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="group relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:border-zinc-700">
            <div className="absolute top-0 right-0 w-8 h-1 bg-zinc-700" />
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-300">1. Steering Material</label>
              <span className="text-xs font-black text-white bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{selectedWheel.priceText}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {wheelOptions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedWheel(item)}
                  className={`py-2.5 px-3 text-xs font-bold rounded-lg border text-right transition-all flex items-center justify-between ${
                    selectedWheel.id === item.id ? 'border-[#E3211C] bg-red-600/10 text-white shadow-[0_0_15px_rgba(227,33,28,0.15)]' : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  <span className="truncate">{item.name}</span>
                  {selectedWheel.id === item.id && <Zap className="w-3.5 h-3.5 text-[#E3211C]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="group relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:border-zinc-700">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-300">2. Stitching Color</label>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">{selectedThread.name}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {threadColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedThread(color)}
                  style={{ backgroundColor: color.hex, clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
                  className={`h-10 w-10 transition-all flex items-center justify-center border-2 ${
                    selectedThread.name === color.name ? 'scale-110 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="group relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:border-zinc-700">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest block mb-4">3. Cockpit Accessories</label>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block mb-2 font-bold tracking-widest">Gear Shifter</span>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setSelectedGear('none')} className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all ${selectedGear === 'none' ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-white'}`}> None </button>
                  <button type="button" onClick={() => setSelectedGear('dotted')} className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all ${selectedGear === 'dotted' ? 'border-[#E3211C] bg-red-600/10 text-[#E3211C] shadow-[0_0_10px_rgba(227,33,28,0.2)]' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-white'}`}> Dotted (+250) </button>
                  <button type="button" onClick={() => setSelectedGear('plain')} className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all ${selectedGear === 'plain' ? 'border-[#E3211C] bg-red-600/10 text-[#E3211C] shadow-[0_0_10px_rgba(227,33,28,0.2)]' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-white'}`}> Plain (+250) </button>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-800/50">
                <span className="text-[10px] uppercase text-zinc-500 block mb-2 font-bold tracking-widest">Handbrake Cover</span>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setSelectedHandbrake('none')} className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all ${selectedHandbrake === 'none' ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-white'}`}> None </button>
                  <button type="button" onClick={() => setSelectedHandbrake('handbrake')} className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all ${selectedHandbrake === 'handbrake' ? 'border-[#E3211C] bg-red-600/10 text-[#E3211C] shadow-[0_0_10px_rgba(227,33,28,0.2)]' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-white'}`}> Handbrake Wrap (+150) </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#050505] p-4 rounded-xl border border-zinc-800/80 flex items-center justify-between shadow-inner">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Total Est.</span>
              <span className="text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{totalPrice} <span className="text-sm text-[#E3211C]">EGP</span></span>
            </div>
            <a href="#booking" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }} className="py-3 px-6 bg-[#E3211C] hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(227,33,28,0.4)] hover:shadow-[0_0_25px_rgba(227,33,28,0.6)]">
              <span>Proceed</span>
              <ChevronLeft className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}