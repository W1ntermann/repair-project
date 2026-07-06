'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD_GRAD = 'linear-gradient(135deg,#E2C97E,#C9A84C,#8B6914)';

const ROOM_TYPES = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Будинок' },
  { value: 'office', label: 'Офіс' },
  { value: 'commercial', label: 'Комерційне' },
];

const REPAIR_TYPES = [
  { value: 'basic', label: 'Базовий', price: 4500 },
  { value: 'standard', label: 'Стандарт', price: 8000 },
  { value: 'premium', label: 'Преміум', price: 15000 },
];

const ADDONS = [
  { value: 'design', label: 'Дизайн-проєкт', price: 1500 },
  { value: 'furniture', label: 'Меблі під ключ', price: 3000 },
  { value: 'smart', label: 'Smart Home', price: 2000 },
];

interface CostCalculatorProps {
  onContact: () => void;
}

export default function CostCalculator({ onContact }: CostCalculatorProps) {
  const [roomType, setRoomType] = useState('apartment');
  const [area, setArea] = useState(50);
  const [repairType, setRepairType] = useState('standard');
  const [addons, setAddons] = useState<string[]>([]);

  const toggleAddon = (val: string) => {
    setAddons(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const repair = REPAIR_TYPES.find(r => r.value === repairType)!;
  const baseCost = area * repair.price;
  const addonCost = addons.reduce((sum, a) => {
    const addon = ADDONS.find(ad => ad.value === a);
    return sum + (addon ? addon.price * area : 0);
  }, 0);
  const total = baseCost + addonCost;

  const formatPrice = (num: number) =>
    Math.round(num).toLocaleString('uk-UA');

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/[0.06] backdrop-blur-xl bg-white/[0.02]">
        {/* Left: Calculator inputs */}
        <div className="p-8 md:p-12 border-r-0 lg:border-r border-white/[0.06]">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-5 h-5 text-[#C9A84C]" />
            <span className="text-white/40 font-heading text-[10px] uppercase tracking-[0.3em] font-black">
              КАЛЬКУЛЯТОР
            </span>
          </div>

          {/* Room type */}
          <div className="mb-8">
            <label className="text-white/50 font-heading text-[10px] uppercase tracking-[0.2em] font-black block mb-3">
              Тип приміщення
            </label>
            <div className="flex flex-wrap gap-2">
              {ROOM_TYPES.map(rt => (
                <button
                  key={rt.value}
                  onClick={() => setRoomType(rt.value)}
                  className={`px-5 py-3 text-[10px] font-heading font-black uppercase tracking-[0.2em] transition-all duration-300
                    ${roomType === rt.value
                      ? 'text-[#0e0e0e]'
                      : 'text-white/50 border border-white/[0.1] hover:border-white/30 hover:text-white/80'
                    }`}
                  style={roomType === rt.value ? { background: GOLD_GRAD } : {}}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Area */}
          <div className="mb-8">
            <label className="text-white/50 font-heading text-[10px] uppercase tracking-[0.2em] font-black block mb-3">
              Площа: <span className="text-[#C9A84C]">{area} м²</span>
            </label>
            <input
              type="range"
              min={15}
              max={1000}
              step={5}
              value={area}
              onChange={e => setArea(Number(e.target.value))}
              className="w-full h-[2px] appearance-none bg-white/[0.15] rounded-full cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#C9A84C]
                [&::-webkit-slider-thumb]:bg-[#0e0e0e] [&::-webkit-slider-thumb]:cursor-pointer"
              style={{ accentColor: '#C9A84C' }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-white/20 text-[10px] font-sans">15 м²</span>
              <span className="text-white/20 text-[10px] font-sans">1000 м²</span>
            </div>
          </div>

          {/* Repair type */}
          <div className="mb-8">
            <label className="text-white/50 font-heading text-[10px] uppercase tracking-[0.2em] font-black block mb-3">
              Тип ремонту
            </label>
            <div className="flex flex-wrap gap-2">
              {REPAIR_TYPES.map(rt => (
                <button
                  key={rt.value}
                  onClick={() => setRepairType(rt.value)}
                  className={`px-5 py-3 text-[10px] font-heading font-black uppercase tracking-[0.2em] transition-all duration-300
                    ${repairType === rt.value
                      ? 'text-[#0e0e0e]'
                      : 'text-white/50 border border-white/[0.1] hover:border-white/30 hover:text-white/80'
                    }`}
                  style={repairType === rt.value ? { background: GOLD_GRAD } : {}}
                >
                  {rt.label} · {rt.price.toLocaleString()} ₴/м²
                </button>
              ))}
            </div>
          </div>

          {/* Addons */}
          <div className="mb-6">
            <label className="text-white/50 font-heading text-[10px] uppercase tracking-[0.2em] font-black block mb-3">
              Додаткові опції
            </label>
            <div className="flex flex-col gap-3">
              {ADDONS.map(addon => (
                <button
                  key={addon.value}
                  onClick={() => toggleAddon(addon.value)}
                  className={`flex items-center justify-between px-5 py-3 text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 border
                    ${addons.includes(addon.value)
                      ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5 text-white'
                      : 'border-white/[0.06] text-white/40 hover:border-white/20 hover:text-white/70'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors
                      ${addons.includes(addon.value) ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-white/20'}`}>
                      {addons.includes(addon.value) && <Check className="w-3 h-3 text-[#0e0e0e]" />}
                    </div>
                    <span>{addon.label}</span>
                  </div>
                  <span className="text-[#C9A84C]">+{addon.price.toLocaleString()} ₴/м²</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Result */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-white/40 font-heading text-[10px] uppercase tracking-[0.3em] font-black">
                ОРІЄНТОВНА ВАРТІСТЬ
              </span>
            </div>

            {/* Price breakdown */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                <span className="text-white/50 text-xs font-sans">Ремонт ({area} м² × {repair.price.toLocaleString()} ₴)</span>
                <span className="text-white font-heading font-black text-sm">{formatPrice(baseCost)} ₴</span>
              </div>
              {addons.map(a => {
                const addon = ADDONS.find(ad => ad.value === a)!;
                return (
                  <div key={a} className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                    <span className="text-white/50 text-xs font-sans">{addon.label} ({area} м² × {addon.price.toLocaleString()} ₴)</span>
                    <span className="text-white/70 font-heading font-black text-sm">{formatPrice(addon.price * area)} ₴</span>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-4 border-t-2 border-[#C9A84C]/30">
              <span className="text-white font-heading font-black text-lg uppercase tracking-wider">ЗАГАЛОМ</span>
              <span className="text-3xl font-heading font-black text-transparent bg-clip-text"
                style={{ backgroundImage: GOLD_GRAD }}>
                {formatPrice(total)} ₴
              </span>
            </div>

            <p className="text-white/20 text-[10px] font-sans mt-2">
              * Фінальна вартість розраховується після виїзду майстра на об'єкт
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={onContact}
            className="mt-8 w-full py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e]"
            style={{ background: GOLD_GRAD, boxShadow: '0 8px 32px rgba(201,168,76,0.35)' }}
          >
            ОТРИМАТИ ТОЧНИЙ КОШТОРИС
          </motion.button>
        </div>
      </div>
    </div>
  );
}