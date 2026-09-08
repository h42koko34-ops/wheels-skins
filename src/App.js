import React, { useState, useMemo, useRef } from 'react';
import { 
  Calendar, ChevronLeft, MapPin, AlertTriangle, X, ZoomIn, 
  Search, Check, ExternalLink, Clock, ShieldCheck, CalendarDays
} from 'lucide-react';

// استدعاء اللوجو وخلفية الهيدر
import logo from './logo.png';
import heroBg from './hero-bg.jpg';

// استدعاء صور الطارات المنفردة
import wheelPlain from './wheel-plain.png';
import wheelDotted from './wheel-dotted.png';
import wheelCarbon from './wheel-carbon.png';
import wheelForged from './wheel-forged.png';
import wheelAlcantara from './wheel-alcantara.png';

// استدعاء صور الميكسات
import wheelCarbonPlain from './wheel-carbon-plain.png';
import wheelPlainDotted from './wheel-plain-dotted.png';
import wheelCarbonAlcantara from './wheel-carbon-alcantara.png';
import wheelCarbonDotted from './wheel-carbon-dotted.png';
import wheelAlcantaraDotted from './wheel-alcantara-dotted.png';
import wheelAlcantaraForged from './wheel-alcantara-forged.png';
import wheelForgedPlain from './wheel-forged-plain.png';
import wheelForgedDotted from './wheel-forged-dotted.png';

// استدعاء صور مقبض الفتيس والهاند بريك
import gearDotted from './gear-dotted.png';
import gearPlain from './gear-plain.png';
import handbrakeCover from './handbrake.png';

// بيانات الفروع مع روابط اللوكيشن الرسمية لخرائط جوجل
const BRANCHES_DATA = [
  {
    id: 'tagamoa',
    name: 'فرع التجمع الأول',
    address: 'التجمع الأول - القاهرة الجديدة',
    mapUrl: 'https://maps.app.goo.gl/A2C3nhtRV2G4wzrV6',
    hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً'
  },
  {
    id: 'zayed',
    name: 'فرع الشيخ زايد',
    address: 'الشيخ زايد - الجيزة',
    mapUrl: 'https://maps.app.goo.gl/Fhuvy5cCjKJtLxwz8',
    hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً'
  },
  {
    id: 'nasr_city',
    name: 'فرع مدينة نصر',
    address: 'مدينة نصر - القاهرة',
    mapUrl: 'https://maps.app.goo.gl/Kp2SejydEA8aDt5Q6',
    hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً'
  }
];

// قائمة المواعيد كل نصف ساعة من 12 ظهراً حتى 10 مساءً
const TIME_SLOTS = [
  '12:00 م', '12:30 م',
  '01:00 م', '01:30 م',
  '02:00 م', '02:30 م',
  '03:00 م', '03:30 م',
  '04:00 م', '04:30 م',
  '05:00 م', '05:30 م',
  '06:00 م', '06:30 م',
  '07:00 م', '07:30 م',
  '08:00 م', '08:30 م',
  '09:00 م', '09:30 م',
  '10:00 م'
];

// قاعدة بيانات ماركات وموديلات السيارات
const CAR_DATABASE = [
  {
    brand: 'Hyundai (هيونداي)',
    models: [
      'Accent RB (أكسنت آر بي)',
      'Accent HCI (أكسنت إتش سي آي)',
      'Elantra MD (إلنترا إم دي)',
      'Elantra AD (إلنترا إيه دي)',
      'Elantra CN7 (إلنترا سي إن 7)',
      'Elantra HD (إلنترا إتش دي)',
      'Tucson (توسان)',
      'Verna (فيرنا)',
      'I10 (آي 10)',
      'I20 (آي 20)',
      'Creta (كريتا)',
      'Matrix (ماتريكس)',
      'Bayon (بايون)'
    ]
  },
  {
    brand: 'Kia (كيا)',
    models: [
      'Cerato Forte (سيراتو فورتي)',
      'Cerato K3 (سيراتو كيه 3)',
      'Grand Cerato (جراند سيراتو)',
      'Sportage (سبورتاج)',
      'Rio (ريو)',
      'Picanto (بيكانتو)',
      'Carens (كارنز)',
      'Xceed (إكسيد)',
      'Sorento (سورينتو)',
      'Pegas (بيجاس)'
    ]
  },
  {
    brand: 'Nissan (نيسان)',
    models: [
      'Sunny N16 (صني الشكل القديم N16)',
      'Sunny N17 (صني الشكل الجديد N17)',
      'Qashqai (قشقاي)',
      'Sentra (سنترا)',
      'Juke (جوك)',
      'Tiida (تيدا)',
      'X-Trail (إكس تريل)'
    ]
  },
  {
    brand: 'Toyota (تويوتا)',
    models: [
      'Corolla (كورولا)',
      'Yaris (ياريس)',
      'Fortuner (فورتشنر)',
      'C-HR (سي إتش آر)',
      'Belta (بيلتا)',
      'Rumion (روميون)',
      'Land Cruiser (لاند كروزر)',
      'Camry (كامري)'
    ]
  },
  {
    brand: 'Mercedes-Benz (مرسيدس)',
    models: [
      'C180 (سي 180)',
      'C200 (سي 200)',
      'E200 (إي 200)',
      'E250 (إي 250)',
      'E300 (إي 300)',
      'A-Class (إيه كلاس)',
      'CLA (سي إل إيه)',
      'GLA (جي إل إيه)',
      'GLC (جي إل سي)',
      'GLE (جي إل إي)',
      'S-Class (إس كلاس)',
      'G-Class (جي كلاس)'
    ]
  },
  {
    brand: 'BMW (بي إم دبليو)',
    models: [
      '316 / 318 / 320 - E46 (الفئة الثالثة E46)',
      '316 / 318 / 320 - E90 (الفئة الثالثة E90)',
      '318 / 320 / 328 - F30 (الفئة الثالثة F30)',
      '320 / 330 - G20 (الفئة الثالثة G20)',
      '520 / 523 / 525 - E60 (الفئة الخامسة E60)',
      '520 / 528 / 535 - F10 (الفئة الخامسة F10)',
      '520 / 530 - G30 (الفئة الخامسة G30)',
      '1 Series (الفئة الأولى)',
      '2 Series (الفئة الثانية)',
      '4 Series Gran Coupe (الفئة الرابعة)',
      'X1 (إكس 1)',
      'X3 (إكس 3)',
      'X4 (إكس 4)',
      'X5 (إكس 5)',
      'X6 (إكس 6)'
    ]
  },
  {
    brand: 'Volkswagen (فولكس فاجن)',
    models: [
      'Golf 5 (جولف 5)',
      'Golf 6 (جولف 6)',
      'Golf 7 (جولف 7)',
      'Golf 8 (جولف 8)',
      'Passat B6 (باسات B6)',
      'Passat B7 (باسات B7)',
      'Passat B8 (باسات B8)',
      'Jetta (جيتا)',
      'Tiguan (تيجوان)',
      'Polo (بولو)',
      'Arteon (أرتيون)',
      'T-Roc (تي روك)',
      'CC (سي سي)'
    ]
  },
  {
    brand: 'Skoda (سكودا)',
    models: [
      'Octavia A4 (أوكتافيا A4)',
      'Octavia A5 (أوكتافيا A5)',
      'Octavia A7 (أوكتافيا A7)',
      'Octavia A8 (أوكتافيا A8)',
      'Kodiaq (كودياك)',
      'Superb (سوبيرب)',
      'Karoq (كاروك)',
      'Fabia (فابيا)',
      'Kamiq (كاميك)',
      'Rapid (رابد)',
      'Scala (سكالا)'
    ]
  },
  {
    brand: 'Seat (سيات)',
    models: [
      'Leon (ليون)',
      'Ibiza (إبيزا)',
      'Ateca (أتيكا)',
      'Tarraco (تاراكو)',
      'Arona (أرونا)',
      'Toledo (توليدو)'
    ]
  },
  {
    brand: 'Audi (أودي)',
    models: [
      'A3 (إيه 3)',
      'A4 (إيه 4)',
      'A5 (إيه 5)',
      'A6 (إيه 6)',
      'Q2 (كيو 2)',
      'Q3 (كيو 3)',
      'Q5 (كيو 5)',
      'Q7 (كيو 7)'
    ]
  },
  {
    brand: 'Chevrolet (شيفروليه)',
    models: [
      'Optra (أوبترا)',
      'Aveo (أفيو)',
      'Cruze (كروز)',
      'Lanos (لانوس)',
      'Captiva (كابتيفا)',
      'Sonic (سونيك)'
    ]
  },
  {
    brand: 'Chery (شيري)',
    models: [
      'Tiggo 3 (تيجو 3)',
      'Tiggo 4 (تيجو 4)',
      'Tiggo 7 (تيجو 7)',
      'Tiggo 7 Pro (تيجو 7 برو)',
      'Tiggo 8 (تيجو 8)',
      'Tiggo 8 Pro (تيجو 8 برو)',
      'Arrizo 5 (أريزو 5)',
      'Envy (إنفي)'
    ]
  },
  {
    brand: 'MG (إم جي)',
    models: [
      'MG 5 (إم جي 5)',
      'MG 6 (إم جي 6)',
      'MG ZS (إم جي زد إس)',
      'MG RX5 (إم جي آر إكس 5)',
      'MG HS (إم جي إتش إس)',
      'MG One (إم جي وان)',
      'MG 4 (إم جي 4)'
    ]
  },
  {
    brand: 'Renault (رينو)',
    models: [
      'Megane (ميجان)',
      'Logan (لوجان)',
      'Duster (داستر)',
      'Sandero (سانديرو)',
      'Stepway (ستيب واي)',
      'Kadjar (كادجار)',
      'Fluence (فلونس)',
      'Clio (كليو)',
      'Austral (أوسترال)'
    ]
  },
  {
    brand: 'Peugeot (بيجو)',
    models: [
      '301 (بيجو 301)',
      '208 (بيجو 208)',
      '2008 (بيجو 2008)',
      '308 (بيجو 308)',
      '3008 (بيجو 3008)',
      '508 (بيجو 508)',
      '5008 (بيجو 5008)'
    ]
  },
  {
    brand: 'Fiat (فيات)',
    models: [
      'Tipo (تيبو)',
      'Punto (بونتو)',
      'Grande Punto (جراند بونتو)',
      '500 (فيات 500)',
      '500X (فيات 500 إكس)',
      'Linea (لينيا)',
      'Siena (سيينا)'
    ]
  },
  {
    brand: 'Mitsubishi (ميتسوبيشي)',
    models: [
      'Lancer بومة (لانسر بومة)',
      'Lancer شارك (لانسر شارك)',
      'Eclipse Cross (إكليبس كروس)',
      'Attrage (أتراج)',
      'Mirage (ميراج)',
      'Outlander (أوتلاندر)',
      'Xpander (إكسباندر)'
    ]
  },
  {
    brand: 'Honda (هوندا)',
    models: ['Civic (سيفيك)', 'City (سيتي)', 'CR-V (سي آر في)', 'HR-V (إتش آر في)', 'Accord (أكورد)']
  },
  {
    brand: 'Mazda (مازدا)',
    models: ['Mazda 3 (مازدا 3)', 'Mazda 2 (مازدا 2)', 'Mazda 6 (مازدا 6)', 'CX-3 (سي إكس 3)', 'CX-5 (سي إكس 5)']
  },
  {
    brand: 'Opel (أوبل)',
    models: ['Astra (أسترا)', 'Insignia (إنسيجنيا)', 'Corsa (كورسا)', 'Crossland (كروس لاند)', 'Grandland (جراند لاند)', 'Mokka (موكا)', 'Vectra (فيكترا)']
  },
  {
    brand: 'Geely (جيلي)',
    models: ['Coolray (كول راي)', 'Emgrand (إمجراند)', 'Okavango (أوكافانجو)', 'Geometry C (جيومتري سي)', 'GX3 Pro (جي إكس 3 برو)', 'Starray (ستار راي)']
  },
  {
    brand: 'BYD (بي واي دي)',
    models: ['F3 (إف 3)', 'L3 (إل 3)', 'Song Plus (سونج بلس)', 'Atto 3 (أتو 3)', 'Seal (سيل)']
  },
  {
    brand: 'Jeep (جيب)',
    models: ['Grand Cherokee (جراند شيروكي)', 'Wrangler (رانجلر)', 'Renegade (رينيجيد)', 'Compass (كومباس)']
  },
  {
    brand: 'Ford (فورد)',
    models: ['Focus (فوكس)', 'Fiesta (فييستا)', 'EcoSport (إيكوسبورت)', 'Kuga (كوجا)', 'Fusion (فيوجن)']
  },
  {
    brand: 'Suzuki (سوزوكي)',
    models: ['Swift (سويفت)', 'Dzire (ديزاير)', 'Ciaz (سياز)', 'Baleno (بالينو)', 'Vitara (فيتارا)', 'Jimny (جيمني)', 'Ertiga (أرتيجا)', 'Alto (ألتو)', 'Fronx (فرونكس)']
  }
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
    { name: 'أحمر', hex: '#E3211C' },
    { name: 'أزرق', hex: '#1D4ED8' },
    { name: 'أسود', hex: '#18181B' },
    { name: 'بيج', hex: '#D4B996' },
    { name: 'لبني', hex: '#38BDF8' },
    { name: 'أصفر', hex: '#EAB308' },
    { name: 'أخضر', hex: '#16A34A' },
    { name: 'رمادي', hex: '#9CA3AF' },
    { name: 'بني', hex: '#78350F' }
  ];

  const [selectedWheel, setSelectedWheel] = useState(wheelOptions[0]);
  const [selectedThread, setSelectedThread] = useState(threadColors[0]);
  
  const [selectedGear, setSelectedGear] = useState('none');
  const [selectedHandbrake, setSelectedHandbrake] = useState('none');

  const totalPrice = useMemo(() => {
    let sum = selectedWheel.price;
    if (selectedGear === 'dotted' || selectedGear === 'plain') sum += 250;
    if (selectedHandbrake === 'handbrake') sum += 150;
    return sum;
  }, [selectedWheel, selectedGear, selectedHandbrake]);

  const [modalImage, setModalImage] = useState(null);

  // مرجع لحقل التاريخ لفتحه فور الضغط
  const dateInputRef = useRef(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
    if (!brandSearch.trim()) return CAR_DATABASE;
    return CAR_DATABASE.filter(c => 
      c.brand.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [brandSearch]);

  const currentBrandModels = useMemo(() => {
    if (!selectedBrand) return [];
    const brandData = CAR_DATABASE.find(b => b.brand === selectedBrand);
    if (!brandData) return [];
    if (!modelSearch.trim()) return brandData.models;
    return brandData.models.filter(m => 
      m.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [selectedBrand, modelSearch]);

  // دالة فتح تقويم التاريخ فور الضغط على البوكس
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
    if (!selectedBranch) {
      alert('من فضلك اختر الفرع أولاً.');
      return;
    }
    if (!appointmentDate || !appointmentTime) {
      alert('من فضلك حدد ميعاد وساعة التركيب.');
      return;
    }
    const finalModel = selectedModel === 'other' ? customModelInput : selectedModel;
    if (!customerName || !customerPhone || !selectedBrand || !finalModel) {
      alert('من فضلك أكمل جميع بيانات السيارة والاتصال.');
      return;
    }

    const gearText = selectedGear === 'dotted' ? 'مقبض فتيس منقط (+250 ج.م)' : (selectedGear === 'plain' ? 'مقبض فتيس سادة (+250 ج.م)' : 'بدون فتيس');
    const handbrakeText = selectedHandbrake === 'handbrake' ? 'كسوة هاند بريك (+150 ج.م)' : 'بدون هاند بريك';

    const message = `*طلب حجز موعد جديد - WheelSkins*%0A` +
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
    <div className="min-h-screen bg-[#0B0B0B] text-white font-['Cairo'] antialiased selection:bg-[#E3211C] selection:text-white" dir="rtl">
      
      {/* 1. القائمة العلوية مع أيقونات السوشيال ميديا الملونة الرسمية */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/75 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded overflow-hidden flex items-center justify-center bg-black border border-zinc-800">
            <img src={logo} alt="Wheels Skins" className="h-full w-full object-contain" />
          </div>
          <div className="text-right leading-tight">
            <div className="text-white font-bold text-lg tracking-wider flex items-center gap-1">
              WheelSkins <span className="text-[#E3211C] font-black">/</span>
            </div>
            <div className="text-xs text-zinc-400 font-medium">ويلز اسكنز</div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <a href="#hero" className="text-[#E3211C] font-bold transition">الرئيسيه</a>
          <a href="#pricing" className="hover:text-white transition">قائمة الأسعار</a>
          <a href="#configurator" className="hover:text-white transition">صمّم طارتك</a>
          <a href="#branches" className="hover:text-white transition">فروعنا واللوكيشن</a>
          <a href="#booking" className="hover:text-white transition">احجز موعدك</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a 
            href="https://www.facebook.com/share/1Dm5aEEjec/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="فيسبوك"
            className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <a 
            href="https://www.instagram.com/wheels_skins?stkn=cTNnMnV0dWc3ZXc=" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="إنستغرام"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a 
            href="https://wa.me/01202738020" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="واتساب"
            className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.944.558 3.766 1.523 5.309L2.094 22l4.82-1.406a9.98 9.98 0 0 0 5.117 1.437h.004c5.536 0 10.031-4.495 10.031-10.031C22.066 6.495 17.571 2 12.031 2zm0 18.234h-.003a8.196 8.196 0 0 1-4.172-1.141l-.3-.178-3.109.906.836-3.023-.195-.312A8.17 8.17 0 0 1 3.844 12.03c0-4.516 3.672-8.188 8.188-8.188 4.516 0 8.188 3.672 8.188 8.188 0 4.516-3.672 8.203-8.189 8.203zm4.492-6.133c-.246-.125-1.461-.723-1.688-.805-.227-.082-.391-.125-.555.125s-.641.805-.785.969-.289.184-.535.063c-.246-.125-1.043-.387-1.988-1.23-.734-.656-1.23-1.465-1.375-1.711-.145-.246-.016-.379.109-.504.109-.109.246-.289.367-.434.125-.145.164-.246.246-.41.082-.164.043-.309-.02-.434-.063-.125-.555-1.336-.762-1.832-.2-.48-.406-.418-.555-.426-.145-.008-.309-.008-.473-.008s-.434.063-.66.309c-.227.246-.867.848-.867 2.07 0 1.223.891 2.406 1.012 2.57.125.164 1.754 2.676 4.246 3.754.594.258 1.059.41 1.422.527.598.191 1.141.164 1.57.102.48-.07 1.461-.598 1.668-1.176.207-.578.207-1.074.145-1.176-.063-.102-.227-.164-.473-.285z"/>
            </svg>
          </a>

          <a 
            href="#booking" 
            className="bg-[#E3211C] hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded font-bold text-xs sm:text-sm transition flex items-center gap-1.5 mr-1"
          >
            <Calendar className="w-3.5 h-3.5" /> احجز الآن
          </a>
        </div>
      </nav>

      {/* 2. سكشن الهيرو والأسعار مع عبارة (ضمان سنة على الخامة والتركيب) */}
      <section 
        id="hero" 
        className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-center px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-[#E3211C] font-bold tracking-widest text-xs uppercase mb-3 px-3 py-1 bg-black/60 rounded-full border border-zinc-800">
            Handcrafted Steering Wheel Wraps
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            ويلز اسكنز: فن كسوة الطاره الهاند ميد
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base mb-6 max-w-2xl">
            صمّم طارتك الفاخرة بنفسك وشاهد شكل الفتيس والهاند بريك بأعلى جودة تفصيل يدوي
          </p>

          <div id="pricing" className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-4xl my-6">
            <div className="bg-zinc-900/90 border border-zinc-700/80 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 font-semibold block mb-1">كسوة الطارة والميكس</span>
                <p className="text-xs text-zinc-300 mb-1">(سادة - منقط - كاربون - فورجيد)</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg sm:text-2xl font-black text-[#E3211C]">400 ج.م</span>
                  <span className="text-xs text-zinc-500 line-through">450 ج.م</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-800 text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 inline" /> ضمان سنة على الخامة والتركيب
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-amber-500/40 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 font-semibold block mb-1">كسوة ألكنتارا</span>
                <p className="text-xs text-zinc-300 mb-1">خامة أصلية فاخرة</p>
                <div className="text-lg sm:text-2xl font-black text-white">450 ج.م</div>
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-amber-400 font-bold flex items-center justify-center gap-1">
                <AlertTriangle className="w-3 h-3 inline" /> لا يوجد ضمان للألكنتارا
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-700/80 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 font-semibold block mb-1">مقبض الفتيس</span>
                <p className="text-xs text-zinc-300 mb-1">(سادة أو منقط)</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg sm:text-2xl font-black text-[#E3211C]">250 ج.م</span>
                  <span className="text-xs text-zinc-500 line-through">300 ج.م</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-800 text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 inline" /> ضمان سنة على الخامة والتركيب
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-700/80 rounded-xl p-3 sm:p-4 text-center backdrop-blur-md shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 font-semibold block mb-1">كسوة هاند بريك</span>
                <p className="text-xs text-zinc-300 mb-1">تفصيل يدوي متقن</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg sm:text-2xl font-black text-[#E3211C]">150 ج.م</span>
                  <span className="text-xs text-zinc-500 line-through">200 ج.م</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-800 text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 inline" /> ضمان سنة على الخامة والتركيب
              </div>
            </div>
          </div>

          <a 
            href="#configurator" 
            className="inline-block bg-[#b8860b] hover:bg-[#996f08] text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105 mt-2"
          >
            اصنع تصميمك الخاص الآن
          </a>
        </div>
      </section>

      {/* 3. سكشن محاكي التخصيص */}
      <section id="configurator" className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">صمّم طارتك وشاهد إضافاتك</h2>
          <p className="text-zinc-400 text-sm sm:text-base">اختر الطارة ثم حدد مقبض الفتيس أو الهاند بريك وسيظهر شكل كل قطعة فوراً</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-950/80 p-6 sm:p-10 rounded-2xl border border-zinc-800">
          
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 space-y-6">
            <div 
              className="relative group w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full overflow-hidden border-2 bg-zinc-900/60 flex items-center justify-center p-6 shadow-2xl transition-all duration-300 cursor-pointer"
              style={{ borderColor: selectedThread.hex, boxShadow: `0 0 35px ${selectedThread.hex}33` }}
              onClick={() => setModalImage({ src: selectedWheel.image, title: selectedWheel.name, price: selectedWheel.priceText })}
              title="اضغط لتكبير الطارة"
            >
              <img 
                key={selectedWheel.id}
                src={selectedWheel.image} 
                alt={selectedWheel.name} 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.95)] transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute top-4 right-4 bg-black/70 p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
              
              <div className="absolute bottom-4 bg-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-700 flex items-center gap-2 text-xs">
                <span className="font-bold text-white">{selectedWheel.name}</span>
                <span className="text-[#E3211C] font-black">({selectedWheel.priceText})</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">الخياطة:</span>
                <span className="w-3 h-3 rounded-full border border-white/40 inline-block" style={{ backgroundColor: selectedThread.hex }}></span>
                <span className="font-bold text-white">{selectedThread.name}</span>
              </div>
            </div>

            {(selectedGear !== 'none' || selectedHandbrake !== 'none') && (
              <div className="w-full max-w-sm grid grid-cols-2 gap-3 animate-in fade-in duration-300">
                {selectedGear !== 'none' && (
                  <div 
                    onClick={() => setModalImage({
                      src: selectedGear === 'dotted' ? gearDotted : gearPlain,
                      title: selectedGear === 'dotted' ? 'مقبض فتيس منقط' : 'مقبض فتيس سادة',
                      price: '250 ج.م'
                    })}
                    className="bg-zinc-900 border border-zinc-700 hover:border-[#E3211C] p-3 rounded-xl flex flex-col items-center text-center cursor-pointer transition shadow-md group"
                  >
                    <span className="text-[10px] text-zinc-400 block mb-1">الفتيس المختار:</span>
                    <div className="w-20 h-20 overflow-hidden flex items-center justify-center p-1">
                      <img 
                        src={selectedGear === 'dotted' ? gearDotted : gearPlain} 
                        alt="الفتيس" 
                        className="max-w-full max-h-full object-contain filter drop-shadow group-hover:scale-105 transition"
                      />
                    </div>
                    <span className="text-xs font-bold text-white mt-1">
                      {selectedGear === 'dotted' ? 'فتيس منقط' : 'فتيس سادة'}
                    </span>
                    <span className="text-[10px] text-[#E3211C] font-semibold">250 ج.م (اضغط للتكبير)</span>
                  </div>
                )}

                {selectedHandbrake === 'handbrake' && (
                  <div 
                    onClick={() => setModalImage({
                      src: handbrakeCover,
                      title: 'كسوة هاند بريك هاند ميد',
                      price: '150 ج.م'
                    })}
                    className="bg-zinc-900 border border-zinc-700 hover:border-[#E3211C] p-3 rounded-xl flex flex-col items-center text-center cursor-pointer transition shadow-md group"
                  >
                    <span className="text-[10px] text-zinc-400 block mb-1">الهاند بريك المختار:</span>
                    <div className="w-20 h-20 overflow-hidden flex items-center justify-center p-1">
                      <img 
                        src={handbrakeCover} 
                        alt="الهاند بريك" 
                        className="max-w-full max-h-full object-contain filter drop-shadow group-hover:scale-105 transition"
                      />
                    </div>
                    <span className="text-xs font-bold text-white mt-1">كسوة هاند بريك</span>
                    <span className="text-[10px] text-[#E3211C] font-semibold">150 ج.م (اضغط للتكبير)</span>
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-zinc-500 flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" /> يمكنك الضغط على أي قطعة لمشاهدتها بالحجم الكامل
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-sm font-bold text-zinc-200">1. خامة وميكس الطارة (إجباري):</label>
                <span className="text-xs font-bold text-[#E3211C]">{selectedWheel.priceText}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {wheelOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedWheel(item)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border text-right transition flex items-center justify-between ${
                      selectedWheel.id === item.id 
                        ? 'border-[#E3211C] bg-[#E3211C]/20 text-white shadow-sm' 
                        : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                    {selectedWheel.id === item.id && <span className="w-2 h-2 rounded-full bg-[#E3211C] shrink-0 mr-1"></span>}
                  </button>
                ))}
              </div>

              {selectedWheel.note && (
                <div className="mt-2 text-xs text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" /> {selectedWheel.note}
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-sm font-bold text-zinc-200">2. لون خياطة الطارة:</label>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {selectedThread.name}
                </span>
              </div>
              
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
                {threadColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedThread(color)}
                    className={`h-8 w-8 rounded-full transition-transform flex items-center justify-center border-2 ${
                      selectedThread.name === color.name 
                        ? 'scale-110 border-white shadow-[0_0_12px_rgba(255,255,255,0.5)]' 
                        : 'border-zinc-700 opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/70 p-4 rounded-xl border border-zinc-800 space-y-4">
              <label className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider block">
                3. إضافات تفصيل اختياري (تظهر صورها مباشرة عند الاختيار):
              </label>

              <div>
                <span className="text-xs text-zinc-400 block mb-1.5 font-semibold">مقبض الفتيس:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGear('none')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedGear === 'none' 
                        ? 'bg-zinc-800 text-white border-zinc-600' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    بدون فتيس
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGear('dotted')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedGear === 'dotted' 
                        ? 'bg-[#E3211C] text-white border-[#E3211C] shadow-md shadow-red-900/40' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    فتيس منقط (+250)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGear('plain')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedGear === 'plain' 
                        ? 'bg-[#E3211C] text-white border-[#E3211C] shadow-md shadow-red-900/40' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    فتيس سادة (+250)
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80">
                <span className="text-xs text-zinc-400 block mb-1.5 font-semibold">كسوة الهاند بريك:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedHandbrake('none')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedHandbrake === 'none' 
                        ? 'bg-zinc-800 text-white border-zinc-600' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    بدون هاند بريك
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHandbrake('handbrake')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedHandbrake === 'handbrake' 
                        ? 'bg-[#E3211C] text-white border-[#E3211C] shadow-md shadow-red-900/40' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    كسوة هاند بريك (+150)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/60 p-3.5 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">الإجمالي التقديري:</span>
                <span className="text-xl font-black text-[#E3211C]">{totalPrice} ج.م</span>
              </div>
              <a
                href="#booking"
                className="py-2.5 px-5 bg-[#E3211C] hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-2 text-xs transition transform active:scale-95 shadow-lg shadow-red-900/30"
              >
                <span>متابعة الحجز</span>
                <ChevronLeft className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. سكشن الفروع مع روابط اللوكيشن */}
      <section id="branches" className="py-16 px-6 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">فروعنا واللوكيشن</h2>
          <p className="text-zinc-400 text-sm">اضغط على أي فرع لفتح موقعه المباشر على Google Maps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCHES_DATA.map((branch) => (
            <div 
              key={branch.id} 
              className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition shadow-lg"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-[#E3211C]/10 text-[#E3211C] border border-[#E3211C]/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{branch.name}</h3>
                    <span className="text-xs text-zinc-400">{branch.address}</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">{branch.hours}</p>
              </div>

              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-[#E3211C] text-zinc-300 hover:text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 border border-zinc-800 hover:border-[#E3211C]"
              >
                <span>فتح اللوكيشن على الخريطة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. سكشن حجز الموعد مع بوكس التاريخ التفاعلي الواضح */}
      <section id="booking" className="py-16 px-6 max-w-3xl mx-auto border-t border-zinc-900 text-center">
        <h2 className="text-2xl sm:text-3xl font-black mb-3">احجز موعدك الآن</h2>
        <p className="text-zinc-400 text-sm mb-8">اختر الفرع، وحدد الميعاد المناسب وسيتم نقلك مباشرة لتأكيد حجزك عبر واتساب</p>

        <form className="space-y-6 text-right bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-800" onSubmit={handleBookingSubmit}>
          
          <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-[#E3211C] text-white flex items-center justify-center text-xs font-black">1</span>
              <label className="text-sm font-bold text-white">اختر الفرع أولاً (إجباري) *</label>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BRANCHES_DATA.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setSelectedBranch(b.name)}
                  className={`p-3 text-xs font-bold rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                    selectedBranch === b.name 
                      ? 'bg-[#E3211C] text-white border-[#E3211C] shadow-lg shadow-red-900/30' 
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{b.name}</span>
                </button>
              ))}
            </div>

            {/* بوكس التاريخ التفاعلي الواضح جداً */}
            {selectedBranch && (
              <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4 animate-in fade-in duration-300">
                
                <div className="flex items-center justify-between text-xs font-bold text-white border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#E3211C]" />
                    <span>ميعاد وساعة التركيب في {selectedBranch} *</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    محدد اليوم تلقائياً
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* بوكس التاريخ الكامل (قابل للضغط بالكامل لفتح التقويم) */}
                  <div>
                    <label className="block text-[11px] text-zinc-300 mb-1.5 font-semibold">
                      تاريخ يوم التركيب (اضغط لتغييره):
                    </label>
                    
                    <div 
                      onClick={triggerDatePicker}
                      className="relative w-full bg-zinc-900 hover:bg-zinc-850 border-2 border-zinc-700 hover:border-[#E3211C] rounded-xl p-3 flex items-center justify-between cursor-pointer transition shadow-md group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[#E3211C]/15 text-[#E3211C] group-hover:bg-[#E3211C] group-hover:text-white transition">
                          <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-white block">
                            {appointmentDate === todayStr ? `اليوم (${appointmentDate})` : appointmentDate}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {appointmentDate === todayStr ? 'الموعد المبدئي اليوم' : 'تم اختيار يوم آخر'}
                          </span>
                        </div>
                      </div>

                      {/* زر تغيير اليوم الواضح جداً */}
                      <span className="text-[11px] font-bold text-white bg-[#E3211C] group-hover:bg-red-700 px-3 py-1.5 rounded-lg shadow transition flex items-center gap-1">
                        <span>تغيير اليوم</span>
                        <Calendar className="w-3.5 h-3.5" />
                      </span>

                      {/* حقل الإدخال الأصلي المخبأ برمجياً ويعمل عند الضغط في أي مكان مع دعم الوضع الليلي للهواتف */}
                      <input
                        ref={dateInputRef}
                        type="date"
                        value={appointmentDate}
                        min={todayStr}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* بوكس اختيار الساعة */}
                  <div>
                    <label className="block text-[11px] text-zinc-300 mb-1.5 font-semibold">
                      الساعة المناسبة (كل نصف ساعة) *
                    </label>
                    <div className="relative">
                      <select
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full bg-zinc-900 border-2 border-zinc-700 hover:border-[#E3211C] rounded-xl p-3.5 text-xs text-white font-bold outline-none focus:border-[#E3211C] transition cursor-pointer [color-scheme:dark]"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          <div className={`space-y-4 transition-all duration-300 ${!selectedBranch ? 'opacity-40 pointer-events-none select-none' : 'opacity-100'}`}>
            
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs font-black">2</span>
              <span className="text-sm font-bold text-white">بيانات السيارة والعميل</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">الاسم بالكامل *</label>
                <input 
                  type="text" 
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-[#E3211C] outline-none" 
                  placeholder="اكتب اسمك..." 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">رقم الهاتف / واتساب *</label>
                <input 
                  type="tel" 
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-[#E3211C] outline-none" 
                  placeholder="01xxxxxxxxx" 
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">ماركة السيارة (ابحث أو اختر) *</label>
              <div 
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white flex items-center justify-between cursor-pointer hover:border-zinc-500"
                onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
              >
                <span className={selectedBrand ? 'text-white font-bold' : 'text-zinc-500'}>
                  {selectedBrand ? selectedBrand : 'اختر ماركة العربية من هنا...'}
                </span>
                <ChevronLeft className={`w-4 h-4 text-zinc-400 transition-transform ${isBrandDropdownOpen ? '-rotate-90' : ''}`} />
              </div>

              {isBrandDropdownOpen && (
                <div className="absolute z-30 top-full mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-2 max-h-60 flex flex-col">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      placeholder="ابحث بالاسم (مثلاً: BMW, تويوتا, هيونداي)..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-3 pr-8 text-xs text-white outline-none focus:border-[#E3211C]"
                      autoFocus
                    />
                    <Search className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-3" />
                  </div>

                  <div className="overflow-y-auto space-y-1 pr-1">
                    {filteredBrands.map((item) => (
                      <div
                        key={item.brand}
                        onClick={() => {
                          setSelectedBrand(item.brand);
                          setSelectedModel('');
                          setCustomModelInput('');
                          setIsBrandDropdownOpen(false);
                        }}
                        className="px-3 py-2 text-xs rounded hover:bg-[#E3211C]/20 hover:text-white cursor-pointer flex items-center justify-between text-zinc-300 transition"
                      >
                        <span>{item.brand}</span>
                        {selectedBrand === item.brand && <Check className="w-3.5 h-3.5 text-[#E3211C]" />}
                      </div>
                    ))}
                    {filteredBrands.length === 0 && (
                      <div className="p-3 text-center text-xs text-zinc-500">لا توجد ماركة مطابقة</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {selectedBrand && (
              <div className="relative animate-in fade-in duration-200">
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  موديل سيارة {selectedBrand} المحدد *
                </label>

                <div 
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white flex items-center justify-between cursor-pointer hover:border-zinc-500"
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                >
                  <span className={selectedModel ? 'text-white font-bold' : 'text-zinc-500'}>
                    {selectedModel === 'other' 
                      ? 'موديل آخر (كتابة يدوية)' 
                      : (selectedModel || 'اختر الموديل المحدد من هنا...')}
                  </span>
                  <ChevronLeft className={`w-4 h-4 text-zinc-400 transition-transform ${isModelDropdownOpen ? '-rotate-90' : ''}`} />
                </div>

                {isModelDropdownOpen && (
                  <div className="absolute z-20 top-full mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-2 max-h-56 flex flex-col">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        placeholder="ابحث عن الموديل (مثلاً: RB, CN7, Golf 7)..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-3 pr-8 text-xs text-white outline-none focus:border-[#E3211C]"
                        autoFocus
                      />
                      <Search className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-3" />
                    </div>

                    <div className="overflow-y-auto space-y-1 pr-1">
                      {currentBrandModels.map((model) => (
                        <div
                          key={model}
                          onClick={() => {
                            setSelectedModel(model);
                            setIsModelDropdownOpen(false);
                          }}
                          className="px-3 py-2 text-xs rounded hover:bg-[#E3211C]/20 hover:text-white cursor-pointer flex items-center justify-between text-zinc-300 transition"
                        >
                          <span>{model}</span>
                          {selectedModel === model && <Check className="w-3.5 h-3.5 text-[#E3211C]" />}
                        </div>
                      ))}

                      <div
                        onClick={() => {
                          setSelectedModel('other');
                          setIsModelDropdownOpen(false);
                        }}
                        className="px-3 py-2 text-xs rounded hover:bg-zinc-800 text-amber-400 cursor-pointer font-bold border-t border-zinc-800 mt-1"
                      >
                        + موديل آخر مش موجود بالقائمة
                      </div>
                    </div>
                  </div>
                )}

                {selectedModel === 'other' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      value={customModelInput}
                      onChange={(e) => setCustomModelInput(e.target.value)}
                      placeholder="اكتب اسم وموديل وسنة سيارتك هنا..."
                      className="w-full bg-zinc-900 border border-amber-500/50 rounded-lg p-3 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 text-xs space-y-1.5 text-zinc-300">
              <div className="flex justify-between font-bold">
                <span>الطارة: {selectedWheel.name} ({selectedThread.name})</span>
                <span className="text-white">{selectedWheel.priceText}</span>
              </div>
              {selectedGear !== 'none' && (
                <div className="flex justify-between text-zinc-400">
                  <span>الفتيس: {selectedGear === 'dotted' ? 'مقبض منقط' : 'مقبض سادة'}</span>
                  <span>+250 ج.م</span>
                </div>
              )}
              {selectedHandbrake === 'handbrake' && (
                <div className="flex justify-between text-zinc-400">
                  <span>الهاند بريك: كسوة هاند</span>
                  <span>+150 ج.م</span>
                </div>
              )}
              <div className="pt-2 border-t border-zinc-700 flex justify-between font-black text-sm text-[#E3211C]">
                <span>الإجمالي النهائي:</span>
                <span>{totalPrice} ج.م</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl transition mt-2 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 text-sm cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.944.558 3.766 1.523 5.309L2.094 22l4.82-1.406a9.98 9.98 0 0 0 5.117 1.437h.004c5.536 0 10.031-4.495 10.031-10.031C22.066 6.495 17.571 2 12.031 2zm0 18.234h-.003a8.196 8.196 0 0 1-4.172-1.141l-.3-.178-3.109.906.836-3.023-.195-.312A8.17 8.17 0 0 1 3.844 12.03c0-4.516 3.672-8.188 8.188-8.188 4.516 0 8.188 3.672 8.188 8.188 0 4.516-3.672 8.203-8.189 8.203zm4.492-6.133c-.246-.125-1.461-.723-1.688-.805-.227-.082-.391-.125-.555.125s-.641.805-.785.969-.289.184-.535.063c-.246-.125-1.043-.387-1.988-1.23-.734-.656-1.23-1.465-1.375-1.711-.145-.246-.016-.379.109-.504.109-.109.246-.289.367-.434.125-.145.164-.246.246-.41.082-.164.043-.309-.02-.434-.063-.125-.555-1.336-.762-1.832-.2-.48-.406-.418-.555-.426-.145-.008-.309-.008-.473-.008s-.434.063-.66.309c-.227.246-.867.848-.867 2.07 0 1.223.891 2.406 1.012 2.57.125.164 1.754 2.676 4.246 3.754.594.258 1.059.41 1.422.527.598.191 1.141.164 1.57.102.48-.07 1.461-.598 1.668-1.176.207-.578.207-1.074.145-1.176-.063-.102-.227-.164-.473-.285z"/>
              </svg>
              <span>تأكيد الحجز ومتابعة الميعاد عبر واتساب</span>
            </button>

          </div>

          {!selectedBranch && (
            <p className="text-xs text-amber-400/90 text-center font-semibold mt-2">
              ⚠️ يرجى الضغط على الفرع أولاً لتفعيل بيانات الحجز والمواعيد
            </p>
          )}

        </form>
      </section>

      {/* 6. الفوتر */}
      <footer className="py-8 border-t border-zinc-900 text-center text-xs text-zinc-500">
        ©️ {new Date().getFullYear()} WheelSkins. جميع الحقوق محفوظة.
      </footer>

      {/* 7. نافذة تكبير أي صورة */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-zinc-800/80 hover:bg-[#E3211C] p-2.5 rounded-full transition shadow-lg cursor-pointer"
            onClick={() => setModalImage(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-3xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={modalImage.src} 
              alt={modalImage.title} 
              className="max-w-full max-h-[75vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
            />
            <div className="mt-4 text-center bg-zinc-950/80 px-6 py-2.5 rounded-full border border-zinc-800">
              <h3 className="text-base font-bold text-white inline-block ml-3">{modalImage.title}</h3>
              <span className="text-[#E3211C] font-black text-sm">{modalImage.price}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}