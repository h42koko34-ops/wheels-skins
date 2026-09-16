import React, { useState, useMemo, useRef } from 'react';

// استدعاء قاعدة بيانات السيارات من الملف المستقل
import { CAR_DATABASE } from './carDate';

// استدعاء المكونات (Components)
import Navbar from './components/Navbar';
import HeroPricing from './components/HeroPricing';
import Configurator from './components/Configurator';
import Branches from './components/Branches';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import ImageModal from './components/ImageModal';

// استدعاء صور الطارات المنفردة والميكسات
import wheelPlain from './wheel-plain.png';
import wheelDotted from './wheel-dotted.png';
import wheelCarbon from './wheel-carbon.png';
import wheelForged from './wheel-forged.png';
import wheelAlcantara from './wheel-alcantara.png';
import wheelCarbonPlain from './wheel-carbon-plain.png';
import wheelPlainDotted from './wheel-plain-dotted.png';
import wheelCarbonAlcantara from './wheel-carbon-alcantara.png';
import wheelCarbonDotted from './wheel-carbon-dotted.png';
import wheelAlcantaraDotted from './wheel-alcantara-dotted.png';
import wheelAlcantaraForged from './wheel-alcantara-forged.png';
import wheelForgedPlain from './wheel-forged-plain.png';
import wheelForgedDotted from './wheel-forged-dotted.png';

// الداتا الثابتة
const BRANCHES_DATA = [
  { id: 'tagamoa', name: 'فرع التجمع الأول', address: 'التجمع الأول - القاهرة الجديدة', mapUrl: 'https://maps.app.goo.gl/A2C3nhtRV2G4wzrV6', hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً' },
  { id: 'zayed', name: 'فرع الشيخ زايد', address: 'الشيخ زايد - الجيزة', mapUrl: 'https://maps.app.goo.gl/Fhuvy5cCjKJtLxwz8', hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً' },
  { id: 'nasr_city', name: 'فرع مدينة نصر', address: 'مدينة نصر - القاهرة', mapUrl: 'https://maps.app.goo.gl/Kp2SejydEA8aDt5Q6', hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً' }
];

const TIME_SLOTS = [
  '12:00 م', '12:30 م', '01:00 م', '01:30 م', '02:00 م', '02:30 م', '03:00 م', '03:30 م',
  '04:00 م', '04:30 م', '05:00 م', '05:30 م', '06:00 م', '06:30 م', '07:00 م', '07:30 م',
  '08:00 م', '08:30 م', '09:00 م', '09:30 م', '10:00 م'
];

export default function WheelsSkinsApp() {
  const wheelOptions = [
    { id: 'plain', name: 'طارة: جلد سادة', price: 400, priceText: '400 ج.م', image: wheelPlain },
    { id: 'dotted', name: 'طارة: جلد منقط', price: 400, priceText: '400 ج.م', image: wheelDotted },
    { id: 'carbon', name: 'طارة: جلد كاربون', price: 400, priceText: '400 ج.م', image: wheelCarbon },
    { id: 'forged', name: 'طارة: جلد فورجيد', price: 400, priceText: '400 ج.م', image: wheelForged },
    { id: 'alcantara', name: 'طارة: جلد الكنتارا', price: 450, priceText: '450 ج.م', note: 'بدون ضمان', image: wheelAlcantara },
    { id: 'carbon_plain', name: 'ميكس: (كاربون + سادة)', price: 400, priceText: '400 ج.م', image: wheelCarbonPlain },
    { id: 'plain_dotted', name: 'ميكس: (سادة + منقط)', price: 400, priceText: '400 ج.م', image: wheelPlainDotted },
    { id: 'carbon_alcantara', name: 'ميكس: (كاربون + الكنتارا)', price: 450, priceText: '450 ج.م', image: wheelCarbonAlcantara },
    { id: 'carbon_dotted', name: 'ميكس: (كاربون + منقط)', price: 400, priceText: '400 ج.م', image: wheelCarbonDotted },
    { id: 'alcantara_dotted', name: 'ميكس: (الكنتارا + منقط)', price: 450, priceText: '450 ج.م', image: wheelAlcantaraDotted },
    { id: 'alcantara_forged', name: 'ميكس: (الكنتارا + فورجيد)', price: 450, priceText: '450 ج.م', image: wheelAlcantaraForged },
    { id: 'forged_plain', name: 'ميكس: (فورجيد + سادة)', price: 400, priceText: '400 ج.م', image: wheelForgedPlain },
    { id: 'forged_dotted', name: 'ميكس: (فورجيد + منقط)', price: 400, priceText: '400 ج.م', image: wheelForgedDotted },
  ];

  const threadColors = [
    { name: 'أحمر', hex: '#E3211C' }, { name: 'أزرق', hex: '#1D4ED8' }, { name: 'أسود', hex: '#18181B' },
    { name: 'بيج', hex: '#D4B996' }, { name: 'لبني', hex: '#38BDF8' }, { name: 'أصفر', hex: '#EAB308' },
    { name: 'أخضر', hex: '#16A34A' }, { name: 'رمادي', hex: '#9CA3AF' }, { name: 'بني', hex: '#78350F' }
  ];

  const [selectedWheel, setSelectedWheel] = useState(wheelOptions[0]);
  const [selectedThread, setSelectedThread] = useState(threadColors[0]);
  const [selectedGear, setSelectedGear] = useState('none');
  const [selectedHandbrake, setSelectedHandbrake] = useState('none');
  const [modalImage, setModalImage] = useState(null);

  const totalPrice = useMemo(() => {
    let sum = selectedWheel.price;
    if (selectedGear === 'dotted' || selectedGear === 'plain') sum += 250;
    if (selectedHandbrake === 'handbrake') sum += 150;
    return sum;
  }, [selectedWheel, selectedGear, selectedHandbrake]);

  const dateInputRef = useRef(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(todayStr);
  const [appointmentTime, setAppointmentTime] = useState(TIME_SLOTS[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const [brandSearch, setBrandSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);

  const [modelSearch, setModelSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [customModelInput, setCustomModelInput] = useState('');

  const filteredBrands = useMemo(() => {
    if (!CAR_DATABASE) return [];
    if (!brandSearch.trim()) return CAR_DATABASE;
    return CAR_DATABASE.filter(c => c.brand.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [brandSearch]);

  const currentBrandModels = useMemo(() => {
    if (!selectedBrand || !CAR_DATABASE) return [];
    const brandData = CAR_DATABASE.find(b => b.brand === selectedBrand);
    if (!brandData) return [];
    if (!modelSearch.trim()) return brandData.models;
    return brandData.models.filter(m => m.toLowerCase().includes(modelSearch.toLowerCase()));
  }, [selectedBrand, modelSearch]);

  const triggerDatePicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedBranch) return alert('من فضلك اختر الفرع أولاً.');
    if (!appointmentDate || !appointmentTime) return alert('من فضلك حدد ميعاد وساعة التركيب.');
    
    const finalModel = selectedModel === 'other' ? customModelInput : selectedModel;
    if (!customerName || !customerPhone || !selectedBrand || !finalModel) return alert('من فضلك أكمل جميع بيانات السيارة والاتصال.');

    const gearText = selectedGear === 'dotted' ? 'مقبض فتيس منقط (+250 ج.م)' : (selectedGear === 'plain' ? 'مقبض فتيس سادة (+250 ج.م)' : 'بدون فتيس');
    const handbrakeText = selectedHandbrake === 'handbrake' ? 'كسوة هاند بريك (+150 ج.م)' : 'بدون هاند بريك';

    const message = `*طلب حجز موعد جديد - WheelsSkins*%0A` +
      `--------------------------------%0A` +
      `*الفرع المختار:* ${encodeURIComponent(selectedBranch)}%0A` +
      `*تاريخ الميعاد:* ${encodeURIComponent(appointmentDate)}%0A` +
      `*الساعة:* ${encodeURIComponent(appointmentTime)}%0A` +
      `--------------------------------%0A` +
      `*الاسم:* ${encodeURIComponent(customerName)}%0A` +
      `*رقم الهاتف:* ${encodeURIComponent(customerPhone)}%0A` +
      `*السيارة:* ${encodeURIComponent(selectedBrand)} - ${encodeURIComponent(finalModel)}%0A` +
      `--------------------------------%0A` +
      `*كسوة الطارة:* ${encodeURIComponent(selectedWheel.name)}%0A` +
      `*لون الخياطة:* ${encodeURIComponent(selectedThread.name)}%0A` +
      `*الفتيس:* ${encodeURIComponent(gearText)}%0A` +
      `*الهاند بريك:* ${encodeURIComponent(handbrakeText)}%0A` +
      `--------------------------------%0A` +
      `*إجمالي المبلغ:* ${totalPrice} ج.م`;

    window.open(`https://wa.me/201202738020?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-['Cairo'] antialiased selection:bg-[#E3211C] selection:text-white relative overflow-hidden pb-20" dir="rtl">
      
      {/* Subtle Cyber Dots Background */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-[#E3211C]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* استدعاء المكونات وتمرير الداتا (Props) إليها */}
      <Navbar />
      <HeroPricing />
      
      <Configurator 
        wheelOptions={wheelOptions} threadColors={threadColors} 
        selectedWheel={selectedWheel} setSelectedWheel={setSelectedWheel} 
        selectedThread={selectedThread} setSelectedThread={setSelectedThread} 
        selectedGear={selectedGear} setSelectedGear={setSelectedGear} 
        selectedHandbrake={selectedHandbrake} setSelectedHandbrake={setSelectedHandbrake} 
        totalPrice={totalPrice} setModalImage={setModalImage} 
      />

      <Branches BRANCHES_DATA={BRANCHES_DATA} />

      <BookingForm 
        handleBookingSubmit={handleBookingSubmit} selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} BRANCHES_DATA={BRANCHES_DATA}
        appointmentDate={appointmentDate} setAppointmentDate={setAppointmentDate} appointmentTime={appointmentTime} setAppointmentTime={setAppointmentTime} TIME_SLOTS={TIME_SLOTS} todayStr={todayStr} triggerDatePicker={triggerDatePicker} dateInputRef={dateInputRef}
        customerName={customerName} setCustomerName={setCustomerName} customerPhone={customerPhone} setCustomerPhone={setCustomerPhone}
        isBrandDropdownOpen={isBrandDropdownOpen} setIsBrandDropdownOpen={setIsBrandDropdownOpen} brandSearch={brandSearch} setBrandSearch={setBrandSearch} filteredBrands={filteredBrands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
        setSelectedModel={setSelectedModel} setCustomModelInput={setCustomModelInput} isModelDropdownOpen={isModelDropdownOpen} setIsModelDropdownOpen={setIsModelDropdownOpen} modelSearch={modelSearch} setModelSearch={setModelSearch} currentBrandModels={currentBrandModels} selectedModel={selectedModel} customModelInput={customModelInput}
        selectedWheel={selectedWheel} selectedGear={selectedGear} selectedHandbrake={selectedHandbrake} totalPrice={totalPrice}
      />

      <Footer />
      
      <ImageModal modalImage={modalImage} setModalImage={setModalImage} />

      {/* Global CSS Injector */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(24, 24, 27, 0.5); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #E3211C; }
      `}} />
    </div>
  );
}