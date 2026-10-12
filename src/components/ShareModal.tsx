import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, Smartphone, ExternalLink, HelpCircle } from 'lucide-react';
import { BioConfig } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BioConfig;
}

export function ShareModal({ isOpen, onClose, config }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://seu-link-bio.com';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              Compartilhar Link na Bio
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Link da sua página (Copie e cole na bio)
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-2 text-xs font-mono text-slate-700 bg-transparent outline-hidden select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copied 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Quick QR Code for Stories / Instagram */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-4">
            <div className="w-20 h-20 bg-white p-2 rounded-xl shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`} 
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">QR Code Oficial</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Use este QR Code nos Stories do Instagram para seus seguidores acessarem direto com a câmera.
              </p>
            </div>
          </div>

          {/* Step-by-step instructions for TikTok & Instagram */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-pink-500" />
              Como colocar no TikTok e Instagram:
            </h4>
            <ol className="text-xs text-slate-600 space-y-1.5 pl-4 list-decimal leading-relaxed">
              <li>Copie o link acima clicando no botão preto <strong>"Copiar"</strong>.</li>
              <li>Abra o <strong>TikTok</strong> ou <strong>Instagram</strong> e vá em <strong>Editar Perfil</strong>.</li>
              <li>No campo <strong>"Site"</strong> ou <strong>"Links"</strong>, cole o link.</li>
              <li>Salve e pronto! Seus seguidores verão exatamente a tela idêntica ao print com o botão automático.</li>
            </ol>
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
