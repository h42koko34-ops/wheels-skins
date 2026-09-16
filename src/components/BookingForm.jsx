import React from 'react';
import { MapPin, CalendarDays, ChevronLeft, Search, Zap } from 'lucide-react';

export default function BookingForm({
  handleBookingSubmit, selectedBranch, setSelectedBranch, BRANCHES_DATA,
  appointmentDate, setAppointmentDate, appointmentTime, setAppointmentTime, TIME_SLOTS, todayStr, triggerDatePicker, dateInputRef,
  customerName, setCustomerName, customerPhone, setCustomerPhone,
  isBrandDropdownOpen, setIsBrandDropdownOpen, brandSearch, setBrandSearch, filteredBrands, selectedBrand, setSelectedBrand,
  setSelectedModel, setCustomModelInput, isModelDropdownOpen, setIsModelDropdownOpen, modelSearch, setModelSearch, currentBrandModels, selectedModel, customModelInput,
  selectedWheel, selectedGear, selectedHandbrake, totalPrice
}) {
  return (
    <section id="booking" className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto z-10 text-center">
      <h2 className="text-2xl sm:text-3xl font-black mb-3 uppercase tracking-wider text-white">System <span className="text-[#E3211C]">Initialize</span></h2>
      <p className="text-zinc-500 text-xs sm:text-sm mb-8 font-semibold uppercase tracking-widest">Complete form to transmit data</p>

      <form className="relative space-y-6 text-right bg-zinc-950/70 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-zinc-800/80 shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden" onSubmit={handleBookingSubmit}>
        <div className="absolute top-0 right-0 w-16 h-1 bg-red-600 shadow-[0_0_15px_rgba(227,33,28,0.8)]" />
        <div className="absolute top-0 right-0 w-1 h-16 bg-red-600 shadow-[0_0_15px_rgba(227,33,28,0.8)]" />
        
        <div className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-black bg-[#E3211C] text-white">01</span>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-300">Select Center *</label>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BRANCHES_DATA.map((b) => (
              <button
                type="button"
                key={b.id}
                onClick={() => setSelectedBranch(b.name)}
                className={`p-3 text-xs font-bold rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  selectedBranch === b.name ? 'bg-red-600/10 border-[#E3211C] text-white shadow-[0_0_15px_rgba(227,33,28,0.2)]' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{b.name}</span>
              </button>
            ))}
          </div>

          {selectedBranch && (
            <div className="mt-5 p-4 bg-[#050505] border border-zinc-800/80 rounded-xl space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Appointment Date</label>
                  <div onClick={triggerDatePicker} className="relative w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#E3211C]/50 rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all group">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="w-4 h-4 text-zinc-400 group-hover:text-[#E3211C] transition-colors" />
                      <span className="text-xs font-bold text-white tracking-wider">{appointmentDate}</span>
                    </div>
                    <input ref={dateInputRef} type="date" value={appointmentDate} min={todayStr} onChange={(e) => setAppointmentDate(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [color-scheme:dark]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Time Slot *</label>
                  <select value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 hover:border-[#E3211C]/50 rounded-lg p-3 text-xs text-white font-bold outline-none focus:border-[#E3211C] transition-all cursor-pointer [color-scheme:dark] appearance-none">
                    {TIME_SLOTS.map((slot) => (<option key={slot} value={slot}>{slot}</option>))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`space-y-5 transition-all duration-300 ${!selectedBranch ? 'opacity-30 pointer-events-none select-none grayscale' : 'opacity-100'}`}>
          <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-3">
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-black bg-zinc-800 text-zinc-400">02</span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Driver & Vehicle Data</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Full Name *</label>
              <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-xs text-white focus:border-[#E3211C] focus:bg-zinc-900 outline-none transition-all font-medium placeholder-zinc-700" placeholder="ENTER NAME..." />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Comms (Phone) *</label>
              <input type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-xs text-white focus:border-[#E3211C] focus:bg-zinc-900 outline-none transition-all font-medium placeholder-zinc-700" placeholder="01XXXXXXXXX" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Brand *</label>
            <div onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-xs text-white flex items-center justify-between cursor-pointer hover:border-zinc-600 transition-all">
              <span className={selectedBrand ? 'text-white font-bold uppercase tracking-wider' : 'text-zinc-600 uppercase tracking-widest'}>{selectedBrand ? selectedBrand : 'SELECT BRAND...'}</span>
              <ChevronLeft className={`w-4 h-4 text-zinc-500 transition-transform ${isBrandDropdownOpen ? '-rotate-90 text-white' : ''}`} />
            </div>
            {isBrandDropdownOpen && (
              <div className="absolute z-30 top-full mt-2 w-full bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-2 max-h-60 flex flex-col">
                <div className="relative mb-2">
                  <input type="text" value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} placeholder="SEARCH..." className="w-full bg-[#050505] border border-zinc-800 rounded-lg py-2.5 pl-3 pr-8 text-xs text-white outline-none focus:border-[#E3211C] uppercase" autoFocus />
                  <Search className="w-3.5 h-3.5 text-zinc-600 absolute right-3 top-3" />
                </div>
                <div className="overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredBrands.map((item) => (
                    <div key={item.brand} onClick={() => { setSelectedBrand(item.brand); setSelectedModel(''); setCustomModelInput(''); setIsBrandDropdownOpen(false); }} className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide rounded hover:bg-red-600/10 hover:text-white cursor-pointer flex items-center justify-between text-zinc-400 transition">
                      <span>{item.brand}</span>{selectedBrand === item.brand && <Zap className="w-3.5 h-3.5 text-[#E3211C]" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {selectedBrand && (
            <div className="relative animate-in fade-in duration-200">
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Model *</label>
              <div onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-xs text-white flex items-center justify-between cursor-pointer hover:border-zinc-600 transition-all">
                <span className={selectedModel ? 'text-white font-bold uppercase tracking-wider' : 'text-zinc-600 uppercase tracking-widest'}>{selectedModel === 'other' ? 'CUSTOM MODEL INPUT' : (selectedModel || 'SELECT MODEL...')}</span>
                <ChevronLeft className={`w-4 h-4 text-zinc-500 transition-transform ${isModelDropdownOpen ? '-rotate-90 text-white' : ''}`} />
              </div>
              {isModelDropdownOpen && (
                <div className="absolute z-20 top-full mt-2 w-full bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-2 max-h-56 flex flex-col">
                  <div className="relative mb-2">
                    <input type="text" value={modelSearch} onChange={(e) => setModelSearch(e.target.value)} placeholder="SEARCH MODEL..." className="w-full bg-[#050505] border border-zinc-800 rounded-lg py-2.5 pl-3 pr-8 text-xs text-white outline-none focus:border-[#E3211C] uppercase" autoFocus />
                    <Search className="w-3.5 h-3.5 text-zinc-600 absolute right-3 top-3" />
                  </div>
                  <div className="overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {currentBrandModels.map((model) => (
                      <div key={model} onClick={() => { setSelectedModel(model); setIsModelDropdownOpen(false); }} className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide rounded hover:bg-red-600/10 hover:text-white cursor-pointer flex items-center justify-between text-zinc-400 transition">
                        <span>{model}</span>{selectedModel === model && <Zap className="w-3.5 h-3.5 text-[#E3211C]" />}
                      </div>
                    ))}
                    <div onClick={() => { setSelectedModel('other'); setIsModelDropdownOpen(false); }} className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide rounded hover:bg-zinc-800 text-amber-500 cursor-pointer border-t border-zinc-800/50 mt-1">+ CUSTOM INPUT</div>
                  </div>
                </div>
              )}
              {selectedModel === 'other' && (
                <div className="mt-3">
                  <input type="text" required value={customModelInput} onChange={(e) => setCustomModelInput(e.target.value)} placeholder="ENTER SPECIFIC MODEL YEAR..." className="w-full bg-zinc-900/50 border border-amber-500/30 rounded-lg p-3 text-xs text-white outline-none focus:border-amber-500 uppercase" />
                </div>
              )}
            </div>
          )}

          <div className="bg-[#050505] p-5 rounded-xl border border-zinc-800/80 text-[11px] font-bold uppercase tracking-wider space-y-2 text-zinc-400 shadow-inner">
            <div className="flex justify-between"><span>Wheel: {selectedWheel.name}</span><span className="text-white">{selectedWheel.priceText}</span></div>
            {selectedGear !== 'none' && <div className="flex justify-between"><span>Gear: {selectedGear === 'dotted' ? 'Dotted' : 'Plain'}</span><span>+250 EGP</span></div>}
            {selectedHandbrake === 'handbrake' && <div className="flex justify-between"><span>Handbrake Cover</span><span>+150 EGP</span></div>}
            <div className="pt-3 border-t border-zinc-800/50 flex justify-between text-sm text-[#E3211C] drop-shadow-[0_0_8px_rgba(227,33,28,0.5)]"><span>Total Amount:</span><span>{totalPrice} EGP</span></div>
          </div>

          <button type="submit" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }} className="relative w-full group bg-white text-black font-black py-4 px-6 uppercase tracking-widest transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] overflow-hidden mt-4 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] cursor-pointer">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.944.558 3.766 1.523 5.309L2.094 22l4.82-1.406a9.98 9.98 0 0 0 5.117 1.437h.004c5.536 0 10.031-4.495 10.031-10.031C22.066 6.495 17.571 2 12.031 2zm0 18.234h-.003a8.196 8.196 0 0 1-4.172-1.141l-.3-.178-3.109.906.836-3.023-.195-.312A8.17 8.17 0 0 1 3.844 12.03c0-4.516 3.672-8.188 8.188-8.188 4.516 0 8.188 3.672 8.188 8.188 0 4.516-3.672 8.203-8.189 8.203zm4.492-6.133c-.246-.125-1.461-.723-1.688-.805-.227-.082-.391-.125-.555.125s-.641.805-.785.969-.289.184-.535.063c-.246-.125-1.043-.387-1.988-1.23-.734-.656-1.23-1.465-1.375-1.711-.145-.246-.016-.379.109-.504.109-.109.246-.289.367-.434.125-.145.164-.246.246-.41.082-.164.043-.309-.02-.434-.063-.125-.555-1.336-.762-1.832-.2-.48-.406-.418-.555-.426-.145-.008-.309-.008-.473-.008s-.434.063-.66.309c-.227.246-.867.848-.867 2.07 0 1.223.891 2.406 1.012 2.57.125.164 1.754 2.676 4.246 3.754.594.258 1.059.41 1.422.527.598.191 1.141.164 1.57.102.48-.07 1.461-.598 1.668-1.176.207-.578.207-1.074.145-1.176-.063-.102-.227-.164-.473-.285z"/></svg>
            <span>Transmit to WhatsApp</span>
          </button>
        </div>
      </form>
    </section>
  );
}