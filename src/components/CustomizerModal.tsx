import React, { useRef } from 'react';
import { 
  X, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  Palette, 
  Link as LinkIcon, 
  User, 
  Check, 
  Clock, 
  Plus, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import { BioConfig, DEFAULT_CONFIG, ThemeId, AdditionalLink } from '../types';
import { TelegramPlaneIcon, WhatsAppIcon, InstagramIcon } from './Icons';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BioConfig;
  onChange: (updated: BioConfig) => void;
  defaultAvatarSrc: string;
}

export function CustomizerModal({
  isOpen,
  onClose,
  config,
  onChange,
  defaultAvatarSrc
}: CustomizerModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...config,
          avatarUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addAdditionalLink = () => {
    const newLink: AdditionalLink = {
      id: Date.now().toString(),
      title: 'Novo Link',
      subtitle: 'Toque para acessar',
      url: 'https://',
      icon: 'link'
    };
    onChange({
      ...config,
      additionalLinks: [...config.additionalLinks, newLink]
    });
  };

  const removeAdditionalLink = (id: string) => {
    onChange({
      ...config,
      additionalLinks: config.additionalLinks.filter(l => l.id !== id)
    });
  };

  const updateAdditionalLink = (id: string, updates: Partial<AdditionalLink>) => {
    onChange({
      ...config,
      additionalLinks: config.additionalLinks.map(l => l.id === id ? { ...l, ...updates } : l)
    });
  };

  const resetToDefault = () => {
    onChange({
      ...DEFAULT_CONFIG,
      avatarUrl: defaultAvatarSrc
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Personalizar Link na Bio
              </h2>
              <p className="text-xs text-slate-500">
                Ajuste dados, foto, tempo de resposta e link do Telegram
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 text-sm">
          
          {/* Section 1: Perfil (Nome & Foto) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Perfil e Foto
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div 
                className="w-20 h-20 rounded-full p-[2.5px] shrink-0"
                style={{ backgroundColor: config.avatarBorderColor || '#f43f5e' }}
              >
                <img 
                  src={config.avatarUrl || defaultAvatarSrc} 
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex flex-wrap gap-2">
                  <input 
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Enviar Minha Foto
                  </button>

                  <button
                    type="button"
                    onClick={() => onChange({ ...config, avatarUrl: defaultAvatarSrc })}
                    className="px-3 py-1.5 rounded-xl bg-pink-100 text-pink-700 font-medium text-xs hover:bg-pink-200 transition-colors cursor-pointer"
                  >
                    Usar Foto Original (Julia)
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500 shrink-0">Cor da Borda:</label>
                  <div className="flex gap-1.5">
                    {['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#000000'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => onChange({ ...config, avatarBorderColor: color })}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          config.avatarBorderColor === color ? 'scale-110 border-slate-900 ring-2 ring-slate-400' : 'border-white'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome Exibido
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => onChange({ ...config, name: e.target.value })}
                  placeholder="Ex: Julia B."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status
                </label>
                <input
                  type="text"
                  value={config.statusText}
                  onChange={(e) => onChange({ ...config, statusText: e.target.value })}
                  placeholder="Ex: Online"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Texto de Tempo de Resposta
              </label>
              <input
                type="text"
                value={config.responseTime}
                onChange={(e) => onChange({ ...config, responseTime: e.target.value })}
                placeholder="Ex: Tempo médio de resposta: 3 minutos"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Section 2: Botão Principal de Ação (Telegram / Aguarde...) */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TelegramPlaneIcon className="w-3.5 h-3.5 text-sky-500" />
              Botão Principal de Ação (Telegram / Link)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Link de Destino (Telegram, WhatsApp ou VIP)
                </label>
                <input
                  type="url"
                  value={config.buttonUrl}
                  onChange={(e) => onChange({ ...config, buttonUrl: e.target.value })}
                  placeholder="https://t.me/seu_canal_vip"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-400 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Texto no Carregamento
                  </label>
                  <input
                    type="text"
                    value={config.buttonTextWaiting}
                    onChange={(e) => onChange({ ...config, buttonTextWaiting: e.target.value })}
                    placeholder="Aguarde..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Texto Após Liberar
                  </label>
                  <input
                    type="text"
                    value={config.buttonTextReady}
                    onChange={(e) => onChange({ ...config, buttonTextReady: e.target.value })}
                    placeholder="Acessar Telegram VIP"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Behavior & Delay */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Efeito "Aguarde..."</div>
                    <div className="text-[11px] text-slate-500">Mostra o botão carregando antes de liberar</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.enableWaitingState}
                    onChange={(e) => onChange({ ...config, enableWaitingState: e.target.checked })}
                    className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                  />
                </div>

                {config.enableWaitingState && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <span className="text-xs font-medium text-slate-700">
                      Tempo de espera: <strong className="text-sky-600">{config.delaySeconds}s</strong>
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={config.delaySeconds}
                      onChange={(e) => onChange({ ...config, delaySeconds: parseInt(e.target.value, 10) })}
                      className="w-32 accent-sky-500 cursor-pointer"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Redirecionamento Automático</div>
                    <div className="text-[11px] text-slate-500">Abre o link direto após o tempo zerar</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.autoRedirect}
                    onChange={(e) => onChange({ ...config, autoRedirect: e.target.checked })}
                    className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Tema e Aparência de Fundo */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              Tema do Fundo (Bolinhas)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'pink_dots', label: 'Rosa Print (Original)', bg: 'bg-[#ffb1c7]', text: 'text-pink-900' },
                { id: 'hotpink_dots', label: 'Pink Vibrante', bg: 'bg-[#f43f5e]', text: 'text-white' },
                { id: 'dark_dots', label: 'Dark VIP', bg: 'bg-[#0f172a]', text: 'text-white' },
                { id: 'lavender_dots', label: 'Lavanda Candy', bg: 'bg-[#e0e7ff]', text: 'text-indigo-900' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onChange({ ...config, theme: theme.id as ThemeId })}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    config.theme === theme.id ? 'border-pink-500 ring-2 ring-pink-300' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${theme.bg} shadow-inner flex items-center justify-center`}>
                    {config.theme === theme.id && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 leading-tight">
                    {theme.label}
                  </span>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Domínio na Barra do Safari (Modo iPhone)
              </label>
              <input
                type="text"
                value={config.browserUrl}
                onChange={(e) => onChange({ ...config, browserUrl: e.target.value })}
                placeholder="ladiversao.com.br"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-pink-400 font-mono text-xs"
              />
            </div>
          </div>

          {/* Section 4: Links Adicionais Opcionais */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5" />
                  Links Extras na Bio (Opcional)
                </h3>
                <p className="text-[11px] text-slate-500">Adicione outros botões (WhatsApp, Instagram, etc.)</p>
              </div>
              <input
                type="checkbox"
                checked={config.showAdditionalLinks}
                onChange={(e) => onChange({ ...config, showAdditionalLinks: e.target.checked })}
                className="w-4 h-4 accent-pink-500 rounded cursor-pointer"
              />
            </div>

            {config.showAdditionalLinks && (
              <div className="space-y-2.5 pt-2">
                {config.additionalLinks.map((link) => (
                  <div key={link.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <select
                        value={link.icon}
                        onChange={(e) => updateAdditionalLink(link.id, { icon: e.target.value as any })}
                        className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                      >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telegram">Telegram</option>
                        <option value="instagram">Instagram</option>
                        <option value="lock">Exclusivo (Cadeado)</option>
                        <option value="heart">Coração</option>
                        <option value="star">Estrela</option>
                        <option value="link">Link Padrão</option>
                      </select>

                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => updateAdditionalLink(link.id, { title: e.target.value })}
                        placeholder="Título do botão"
                        className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                      />

                      <button
                        type="button"
                        onClick={() => removeAdditionalLink(link.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateAdditionalLink(link.id, { url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addAdditionalLink}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200/80 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Outro Botão
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={resetToDefault}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Original do Print
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Concluir & Visualizar
          </button>
        </div>
      </div>
    </div>
  );
}
