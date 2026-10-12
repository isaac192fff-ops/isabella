export interface AdditionalLink {
  id: string;
  title: string;
  url: string;
  icon: 'telegram' | 'whatsapp' | 'instagram' | 'lock' | 'heart' | 'star' | 'link';
  subtitle?: string;
  highlight?: boolean;
}

export type ThemeId = 'pink_dots' | 'hotpink_dots' | 'dark_dots' | 'lavender_dots';

export interface BioConfig {
  name: string;
  avatarUrl: string;
  avatarBorderColor: string;
  isOnline: boolean;
  statusText: string;
  statusColor: string; // hex or tailwind
  responseTime: string;
  
  // Primary CTA Button
  buttonType: 'telegram' | 'whatsapp' | 'custom';
  buttonUrl: string;
  buttonTextWaiting: string;
  buttonTextReady: string;
  delaySeconds: number; // e.g., 2.5
  autoRedirect: boolean; // whether to automatically open the link after delay
  enableWaitingState: boolean; // if false, button is immediately ready
  
  // Theme and Layout
  theme: ThemeId;
  browserUrl: string; // shown in phone mockup (default: ladiversao.com.br)
  
  // Extra options
  showAdditionalLinks: boolean;
  additionalLinks: AdditionalLink[];
  bioDescription?: string;
}

export const DEFAULT_CONFIG: BioConfig = {
  name: "Julia B.",
  avatarUrl: "", // will default to imported Julia image
  avatarBorderColor: "#f43f5e",
  isOnline: true,
  statusText: "Online",
  statusColor: "#22c55e",
  responseTime: "Tempo médio de resposta: 3 minutos",
  
  buttonType: "telegram",
  buttonUrl: "https://t.me/+exemplo_canal_vip",
  buttonTextWaiting: "Aguarde...",
  buttonTextReady: "Acessar Telegram VIP",
  delaySeconds: 3,
  autoRedirect: false,
  enableWaitingState: true,
  
  theme: "pink_dots",
  browserUrl: "ladiversao.com.br",
  
  showAdditionalLinks: false,
  additionalLinks: [
    {
      id: "1",
      title: "Conversar no WhatsApp",
      subtitle: "Atendimento direto",
      url: "https://wa.me/5511999999999",
      icon: "whatsapp"
    },
    {
      id: "2",
      title: "Meu Instagram Oficial",
      subtitle: "@juliab_oficial",
      url: "https://instagram.com",
      icon: "instagram"
    },
    {
      id: "3",
      title: "Conteúdos Exclusivos VIP",
      subtitle: "Acesso reservado",
      url: "https://t.me/+exemplo_canal_vip",
      icon: "lock",
      highlight: true
    }
  ]
};
