import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Sparkles, 
  MoreHorizontal, 
  Compass, 
  HelpCircle,
  Loader2
} from 'lucide-react';
import { TelegramPaperAirplaneOnly } from './components/Icons';
import userAvatar from './assets/images/user_avatar.jpg';

function VerifiedBadge() {
  return (
    <svg 
      className="w-4 h-4 text-[#ea580c] fill-[#ea580c] inline-block shrink-0" 
      viewBox="0 0 24 24"
    >
      <path d="M12 2l2.3 2.1 3.1-.3 1.1 2.9 3 1.3-.8 3.1 1.7 2.6-2.2 2.2.1 3.1-3.1 1-1.6 2.7L12 21.6l-3.6 1.4-1.6-2.7-3.1-1 .1-3.1-2.2-2.2 1.7-2.6-.8-3.1 3-1.3 1.1-2.9 3.1.3L12 2z" />
      <path 
        d="M9 12l2 2 4-4" 
        stroke="white" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  );
}

export default function App() {
  // Target link (?link=...) and name (?name=...)
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const targetUrl = params.get('link') || 'https://t.me/isabellaacessoaogrupovip_bot';
  const profileName = params.get('name') || 'Isabella';

  const [progress, setProgress] = useState<number>(0);
  const [isRedirected, setIsRedirected] = useState<boolean>(false);
  const redirectedRef = useRef<boolean>(false);

  // Auto redirect effect with smooth loading progress over 7 seconds
  useEffect(() => {
    const totalDuration = 7000; // 7 seconds
    const intervalTime = 50;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          if (!redirectedRef.current) {
            redirectedRef.current = true;
            setIsRedirected(true);
            // Auto open the link
            try {
              window.location.href = targetUrl;
            } catch (err) {
              window.open(targetUrl, '_blank');
            }
          }
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [targetUrl]);

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    redirectedRef.current = true;
    setIsRedirected(true);
    setProgress(100);
    try {
      window.location.href = targetUrl;
    } catch (err) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const isWaiting = progress < 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4 bg-bio-pink select-none overflow-x-hidden">
      
      {/* Central White Card */}
      <div className="w-full max-w-[340px] sm:max-w-[355px] bg-white rounded-[32px] sm:rounded-[34px] shadow-[0_14px_45px_rgba(209,56,99,0.18),0_4px_16px_rgba(0,0,0,0.03)] px-6 pt-8 pb-7 flex flex-col items-center transition-all duration-300">
        
        {/* Profile Avatar in the Circle (Bolinha) */}
        <div className="relative mb-3.5">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[3.5px] bg-[#fb2a66] shadow-[0_4px_20px_-2px_rgba(251,42,102,0.32)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 ring-2 ring-white">
              <img 
                src={userAvatar} 
                alt={profileName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('imgur.com')) {
                    target.src = 'https://i.imgur.com/sqDQiw6.jpg';
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Name with Verified Badge */}
        <div className="flex items-center justify-center gap-1.5 text-center">
          <h1 className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight leading-tight">
            {profileName}
          </h1>
          <VerifiedBadge />
        </div>

        {/* Status: Green Dot + Online */}
        <div className="flex items-center justify-center gap-1.5 mt-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block bg-[#22c55e]" />
          <span className="text-[15px] font-bold text-[#22c55e] tracking-tight">
            Online
          </span>
        </div>

        {/* Average response time */}
        <div className="flex items-center justify-center gap-1.5 mt-3 mb-3.5 text-slate-500">
          <Clock className="w-4 h-4 text-slate-500 stroke-[2] shrink-0" />
          <span className="text-[13px] font-medium tracking-tight">
            Tempo médio de resposta: 3 minutos
          </span>
        </div>

        {/* CTA Callout Indicator with loading guidance */}
        <div className="w-full flex items-center justify-center gap-1.5 mb-2.5 text-center">
          <span className="animate-bounce inline-block text-sm">👇</span>
          <span className="text-xs sm:text-[12.5px] font-extrabold uppercase tracking-wide text-pink-600 animate-pulse">
            {isWaiting ? "Redirecionando automaticamente..." : "Clique abaixo se não abriu sozinho"}
          </span>
          <span className="animate-bounce inline-block text-sm">👇</span>
        </div>

        {/* Single Action Button with Animated Progress Fill */}
        <div className="w-full flex flex-col">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMainClick}
            aria-label="Conteúdos Exclusivos (Telegram) 🔥"
            className={`w-full h-[52px] sm:h-[54px] rounded-[22px] px-4 font-bold flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer select-none relative overflow-hidden active:scale-[0.98] ${
              isWaiting 
                ? 'bg-[#3ca7e7] text-white shadow-[0_8px_20px_-3px_rgba(56,189,248,0.45)]'
                : 'bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0284c7] bg-[length:200%_auto] animate-pulse-glow text-white shadow-[0_12px_28px_-3px_rgba(56,189,248,0.6)] ring-2 ring-sky-300/60'
            }`}
          >
            {/* Visual Loading Progress Bar Fill inside the button */}
            {isWaiting && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-white/25 transition-all ease-linear"
                style={{ width: `${progress}%`, transitionDuration: '50ms' }}
              />
            )}

            {/* White Circular Badge */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0 relative z-10">
              <TelegramPaperAirplaneOnly className="w-4 h-4 text-[#3ca7e7] -translate-x-[0.5px] -translate-y-[0.5px]" />
            </div>

            {/* Button Text & Loading Status */}
            <div className="relative z-10 flex items-center gap-2">
              {isWaiting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin shrink-0" />
                  <span className="text-base sm:text-[17px] font-bold text-white tracking-wide">
                    Aguarde...
                  </span>
                </>
              ) : (
                <span className="text-[13.5px] sm:text-[15px] font-extrabold text-white tracking-wide flex items-center gap-1 uppercase">
                  Conteúdos Exclusivos (Telegram) 🔥
                </span>
              )}
            </div>
          </a>
        </div>

        {/* Helpful Troubleshooting Box (Se der errado) */}
        <div className="w-full mt-4 pt-3.5 border-t border-slate-100/90 flex flex-col items-center">
          <div className="w-full bg-pink-50/70 border border-pink-200/70 rounded-2xl p-3 text-slate-700">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-pink-600 shrink-0" />
              <span className="text-xs font-bold text-pink-900 tracking-tight">
                Se der errado ao abrir:
              </span>
            </div>

            <div className="space-y-1.5 text-[11.5px] font-medium text-slate-600 leading-tight">
              <div className="flex items-center gap-2 bg-white/80 rounded-xl px-2.5 py-1.5 border border-pink-100 shadow-2xs">
                <span className="w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="flex-1">
                  Clique nos <strong>3 pontinhos</strong> (•••) no canto da tela
                </span>
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              <div className="flex items-center gap-2 bg-white/80 rounded-xl px-2.5 py-1.5 border border-pink-100 shadow-2xs">
                <span className="w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="flex-1">
                  Clique em <strong>"Abrir no navegador"</strong>
                </span>
                <Compass className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
