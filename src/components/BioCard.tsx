import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, MessageCircle, Lock, Heart, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { BioConfig } from '../types';
import { TelegramPlaneIcon, TelegramPaperAirplaneOnly, WhatsAppIcon, InstagramIcon } from './Icons';

interface BioCardProps {
  config: BioConfig;
  defaultAvatarSrc: string;
  onButtonClick?: () => void;
}

export function BioCard({ config, defaultAvatarSrc, onButtonClick }: BioCardProps) {
  // Loading state management
  const [isWaiting, setIsWaiting] = useState<boolean>(config.enableWaitingState);
  const [countdown, setCountdown] = useState<number>(config.delaySeconds);
  const [hasRedirected, setHasRedirected] = useState<boolean>(false);
  const [clickedOnce, setClickedOnce] = useState<boolean>(false);

  // Timer effect for "Aguarde..."
  useEffect(() => {
    if (!config.enableWaitingState) {
      setIsWaiting(false);
      return;
    }

    setIsWaiting(true);
    setCountdown(config.delaySeconds);
    setHasRedirected(false);

    let current = config.delaySeconds;
    const interval = setInterval(() => {
      current -= 1;
      setCountdown(Math.max(0, current));
      
      if (current <= 0) {
        clearInterval(interval);
        setIsWaiting(false);
        
        if (config.autoRedirect && !hasRedirected) {
          setHasRedirected(true);
          window.open(config.buttonUrl, '_blank', 'noopener,noreferrer');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [config.enableWaitingState, config.delaySeconds, config.autoRedirect, config.buttonUrl]);

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickedOnce(true);
    
    if (onButtonClick) {
      onButtonClick();
    }

    // If still in waiting state, force unlock immediately
    if (isWaiting) {
      setIsWaiting(false);
    }

    // Open target link
    if (config.buttonUrl && config.buttonUrl !== '#') {
      try {
        window.open(config.buttonUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error('Failed to open link', err);
      }
    }
  };

  const avatarSrc = config.avatarUrl && config.avatarUrl.trim() !== '' 
    ? config.avatarUrl 
    : defaultAvatarSrc;

  return (
    <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto bg-white rounded-[34px] shadow-[0_12px_45px_rgba(225,29,72,0.14),0_4px_16px_rgba(0,0,0,0.04)] px-6 pt-9 pb-8 flex flex-col items-center transition-all duration-300">
      
      {/* Avatar Container with prominent pink circle border */}
      <div className="relative mb-4 group">
        <div 
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[3.5px] transition-transform duration-300 group-hover:scale-[1.02]"
          style={{
            backgroundColor: config.avatarBorderColor || '#f43f5e',
            boxShadow: `0 4px 20px -2px ${config.avatarBorderColor || '#f43f5e'}40`
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 ring-2 ring-white">
            <img 
              src={avatarSrc} 
              alt={config.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              onError={(e) => {
                // Fallback to default
                const target = e.target as HTMLImageElement;
                if (target.src !== defaultAvatarSrc) {
                  target.src = defaultAvatarSrc;
                }
              }}
            />
          </div>
        </div>

        {/* Floating subtle verified or sparkles indicator if desired */}
        {config.isOnline && (
          <span className="absolute bottom-1 right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
        )}
      </div>

      {/* Name */}
      <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight text-center leading-tight">
        {config.name || "Julia B."}
      </h1>

      {/* Status (Green Dot + Online) */}
      <div className="flex items-center justify-center gap-1.5 mt-1.5">
        <span 
          className="w-2.5 h-2.5 rounded-full inline-block"
          style={{ backgroundColor: config.statusColor || '#22c55e' }}
        />
        <span 
          className="text-[15px] font-bold tracking-tight"
          style={{ color: config.statusColor || '#22c55e' }}
        >
          {config.statusText || "Online"}
        </span>
      </div>

      {/* Response time */}
      <div className="flex items-center justify-center gap-1.5 mt-4 mb-6 text-slate-600 select-none">
        <Clock className="w-4 h-4 text-slate-500 stroke-[2] shrink-0" />
        <span className="text-[13px] font-medium tracking-tight">
          {config.responseTime || "Tempo médio de resposta: 3 minutos"}
        </span>
      </div>

      {/* Main Telegram CTA Button */}
      <button
        onClick={handleMainClick}
        aria-label={isWaiting ? config.buttonTextWaiting : config.buttonTextReady}
        className={`w-full h-[52px] sm:h-[56px] rounded-[22px] px-5 font-bold flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer select-none relative overflow-hidden active:scale-[0.98] ${
          isWaiting 
            ? 'bg-gradient-to-r from-[#44b0ea] via-[#48b5ee] to-[#3ca7e7] text-white shadow-[0_8px_20px_-3px_rgba(56,189,248,0.38)]'
            : 'bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0284c7] bg-[length:200%_auto] animate-pulse-glow text-white shadow-[0_10px_25px_-3px_rgba(56,189,248,0.5)]'
        }`}
      >
        {/* Subtle shine on ready */}
        {!isWaiting && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        )}

        {/* Telegram icon in circular white badge */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0">
          {config.buttonType === 'whatsapp' ? (
            <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
          ) : (
            <TelegramPaperAirplaneOnly className="w-4 h-4 text-[#3ca7e7] translate-x-[-0.5px] translate-y-[-0.5px]" />
          )}
        </div>

        {/* Spinner or Text */}
        {isWaiting ? (
          <>
            <div className="w-5 h-5 rounded-full border-2 border-white/35 border-t-white animate-spin shrink-0" />
            <span className="text-lg font-bold text-white tracking-wide">
              {config.buttonTextWaiting || "Aguarde..."}
            </span>
          </>
        ) : (
          <span className="text-base sm:text-[17px] font-bold text-white tracking-wide flex items-center gap-1.5 truncate">
            {config.buttonTextReady || "Acessar Telegram VIP"}
            <Sparkles className="w-4 h-4 text-yellow-200 fill-yellow-200 shrink-0" />
          </span>
        )}
      </button>

      {/* Helpful hint below button */}
      <p className="text-[11px] text-slate-400 mt-2.5 text-center font-medium">
        {isWaiting 
          ? `Liberando link de acesso... (${countdown}s)` 
          : '✓ Clique acima para abrir no aplicativo oficial'}
      </p>

      {/* Additional Links if enabled */}
      {config.showAdditionalLinks && config.additionalLinks.length > 0 && (
        <div className="w-full mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2.5">
          <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase text-center mb-1">
            Outros Links Oficiais
          </p>
          {config.additionalLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all duration-200 border ${
                link.highlight 
                  ? 'bg-pink-50/80 border-pink-200 hover:bg-pink-100/80 text-pink-950 shadow-xs' 
                  : 'bg-slate-50 border-slate-200/70 hover:bg-slate-100/80 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  link.highlight ? 'bg-pink-500 text-white' : 'bg-white text-slate-700 shadow-xs'
                }`}>
                  {link.icon === 'whatsapp' && <WhatsAppIcon className="w-4 h-4" />}
                  {link.icon === 'telegram' && <TelegramPlaneIcon className="w-4 h-4" />}
                  {link.icon === 'instagram' && <InstagramIcon className="w-4 h-4" />}
                  {link.icon === 'lock' && <Lock className="w-4 h-4" />}
                  {link.icon === 'heart' && <Heart className="w-4 h-4" />}
                  {link.icon === 'star' && <Star className="w-4 h-4" />}
                  {link.icon === 'link' && <ExternalLink className="w-4 h-4" />}
                </div>
                <div className="text-left">
                  <div className="text-[13px] font-bold leading-tight">
                    {link.title}
                  </div>
                  {link.subtitle && (
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {link.subtitle}
                    </div>
                  )}
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
            </a>
          ))}
        </div>
      )}

    </div>
  );
}
