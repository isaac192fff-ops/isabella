import React from 'react';
import { ChevronLeft, ChevronRight, RotateCw, MoreHorizontal, Layers, Lock, ShieldCheck } from 'lucide-react';

interface IPhoneMockupProps {
  children: React.ReactNode;
  browserUrl?: string;
  themeClass?: string;
  onRefresh?: () => void;
}

export function IPhoneMockup({ 
  children, 
  browserUrl = "ladiversao.com.br", 
  themeClass = "bg-dots-pink",
  onRefresh
}: IPhoneMockupProps) {
  return (
    <div className="relative mx-auto w-full max-w-[390px] h-[812px] sm:h-[844px] bg-black rounded-[54px] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.35),0_10px_20px_rgba(0,0,0,0.2)] border-[5px] border-slate-800/80 ring-1 ring-slate-700/50 flex flex-col overflow-hidden select-none">
      
      {/* Outer iPhone Screen */}
      <div className={`relative w-full h-full rounded-[44px] overflow-hidden flex flex-col justify-between ${themeClass}`}>
        
        {/* iOS Top Status Bar (Exactly like screenshot) */}
        <div className="w-full pt-3.5 pb-2 px-6 flex items-start justify-between z-20 text-slate-900 shrink-0">
          
          {/* Left: Time & TikTok back button */}
          <div className="flex flex-col items-start">
            <span className="text-[17px] font-black tracking-tight leading-none text-black pl-1">
              15:36
            </span>
            <div className="flex items-center gap-0.5 mt-1 text-[13px] font-semibold text-black/90 cursor-pointer active:opacity-60">
              <span className="text-[10px]">◀</span>
              <span>TikTok</span>
            </div>
          </div>

          {/* Dynamic Island / Speaker Pill */}
          <div className="w-24 h-5 bg-black rounded-full mx-auto -mt-1 hidden sm:block opacity-90" />

          {/* Right: Cellular bars, Wifi/4G, Battery indicator */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {/* Cellular signal bars */}
            <div className="flex items-end gap-[1.5px] h-3">
              <div className="w-[3px] h-1 bg-black rounded-[0.5px]"></div>
              <div className="w-[3px] h-1.5 bg-black rounded-[0.5px]"></div>
              <div className="w-[3px] h-2 bg-black rounded-[0.5px]"></div>
              <div className="w-[3px] h-3 bg-black rounded-[0.5px]"></div>
            </div>

            {/* Wifi or LTE icon */}
            <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.78 0 7.21 1.5 9.75 3.96L12 19.34 2.25 11.46C4.79 9 8.22 7.5 12 7.5z"/>
            </svg>

            {/* Battery Indicator with 45% */}
            <div className="flex items-center gap-1 ml-0.5">
              <span className="text-[11px] font-bold text-black leading-none">45</span>
              <div className="w-5 h-2.5 border-[1.5px] border-black rounded-[3px] p-[1px] flex items-center relative">
                <div className="w-[45%] h-full bg-black rounded-[1px]"></div>
                <div className="w-[1.5px] h-1 bg-black absolute -right-[2.5px] rounded-r-[0.5px]"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Scrollable Center Content Area */}
        <div className="flex-1 w-full overflow-y-auto px-4 py-4 flex items-center justify-center">
          {children}
        </div>

        {/* iOS Safari Bottom Navigation Bar (Exactly like screenshot) */}
        <div className="w-full shrink-0 z-20 pb-4 pt-1 px-4">
          <div className="w-full h-11 bg-white/40 backdrop-blur-md rounded-full px-3.5 flex items-center justify-between shadow-xs border border-white/30 text-slate-700">
            
            {/* Back Button */}
            <button 
              type="button" 
              className="p-1 hover:text-black transition-colors"
              title="Voltar"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            {/* Address Pill */}
            <div className="flex-1 max-w-[210px] mx-2 h-7 bg-white/70 rounded-full px-2.5 flex items-center justify-between shadow-2xs border border-white/60">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <div className="w-3.5 h-3.5 rounded-full border border-slate-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-xs"></div>
                </div>
                <span className="text-[12.5px] font-medium text-slate-800 truncate tracking-tight">
                  {browserUrl}
                </span>
              </div>
              <button 
                type="button" 
                onClick={onRefresh}
                className="p-0.5 hover:rotate-180 transition-transform duration-300"
                title="Recarregar"
              >
                <RotateCw className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>

            {/* Tabs Icon */}
            <button 
              type="button" 
              className="p-1 hover:text-black transition-colors"
              title="Abas"
            >
              <div className="w-4 h-4 border-[1.5px] border-slate-600 rounded-xs relative">
                <div className="w-4 h-4 border-[1.5px] border-slate-600 rounded-xs absolute -top-1 -right-1 opacity-70"></div>
              </div>
            </button>

            {/* More Menu */}
            <button 
              type="button" 
              className="p-1 hover:text-black transition-colors"
              title="Mais opções"
            >
              <MoreHorizontal className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* iPhone Home Bar */}
          <div className="w-32 h-1 bg-black/80 rounded-full mx-auto mt-2" />
        </div>

      </div>
    </div>
  );
}
