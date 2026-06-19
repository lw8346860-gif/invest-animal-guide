export type AnimalVisual = {
  shortName: string;
  colors: [string, string];
  accent: string;
  motif: string;
  archetype: 'ape' | 'whale' | 'bird' | 'octopus' | 'beast' | 'mammoth' | 'hyena' | 'crow' | 'otter' | 'turtle' | 'hippo' | 'hedgehog' | 'gardener' | 'flamingo' | 'cheetah' | 'mole';
  atlasIndex: number;
};

export const animalVisuals: Record<string, AnimalVisual> = {
  'value-ape': { shortName: '考古猿', colors: ['#f6d365', '#fda085'], accent: '#7c3f00', motif: '放大镜 / 硬币', archetype: 'ape', atlasIndex: 0 },
  'leader-whale': { shortName: '信徒鲸', colors: ['#77e3ff', '#1d4ed8'], accent: '#0f2a55', motif: '浪线 / 皇冠', archetype: 'whale', atlasIndex: 1 },
  'trend-bird': { shortName: '候鸟', colors: ['#a7f3d0', '#22c55e'], accent: '#14532d', motif: '迁徙箭头', archetype: 'bird', atlasIndex: 2 },
  'kline-octopus': { shortName: '章鱼', colors: ['#f0abfc', '#7c3aed'], accent: '#4c1d95', motif: 'K线触手', archetype: 'octopus', atlasIndex: 3 },
  'ai-ticket-beast': { shortName: '船票兽', colors: ['#67e8f9', '#8b5cf6'], accent: '#312e81', motif: 'AI船票', archetype: 'beast', atlasIndex: 4 },
  'belief-mammoth': { shortName: '猛犸', colors: ['#fde68a', '#b45309'], accent: '#78350f', motif: '长期光环', archetype: 'mammoth', atlasIndex: 5 },
  'cycle-hyena': { shortName: '鬣狗', colors: ['#fdba74', '#ea580c'], accent: '#7c2d12', motif: '周期环', archetype: 'hyena', atlasIndex: 6 },
  'macro-crow': { shortName: '乌鸦', colors: ['#c4b5fd', '#111827'], accent: '#e5e7eb', motif: '地球 / 利率', archetype: 'crow', atlasIndex: 7 },
  'arbitrage-otter': { shortName: '水獭', colors: ['#99f6e4', '#0f766e'], accent: '#134e4a', motif: '天平硬币', archetype: 'otter', atlasIndex: 8 },
  'etf-turtle': { shortName: '海龟', colors: ['#bef264', '#16a34a'], accent: '#365314', motif: '指数篮子', archetype: 'turtle', atlasIndex: 9 },
  'cashflow-hippo': { shortName: '河马', colors: ['#fbcfe8', '#be185d'], accent: '#831843', motif: '分红水流', archetype: 'hippo', atlasIndex: 10 },
  'contrarian-hedgehog': { shortName: '刺猬', colors: ['#fed7aa', '#ef4444'], accent: '#7f1d1d', motif: '逆向警戒', archetype: 'hedgehog', atlasIndex: 11 },
  'position-gardener': { shortName: '园丁', colors: ['#bbf7d0', '#15803d'], accent: '#14532d', motif: '组合花园', archetype: 'gardener', atlasIndex: 12 },
  'leverage-flamingo': { shortName: '火烈鸟', colors: ['#fecdd3', '#f43f5e'], accent: '#881337', motif: '杠杆斜线', archetype: 'flamingo', atlasIndex: 13 },
  'growth-cheetah': { shortName: '猎豹', colors: ['#fde047', '#f97316'], accent: '#713f12', motif: '成长箭头', archetype: 'cheetah', atlasIndex: 14 },
  'message-mole': { shortName: '鼹鼠', colors: ['#ddd6fe', '#7c3aed'], accent: '#3b0764', motif: '消息碎片', archetype: 'mole', atlasIndex: 15 },
};

export function getAnimalVisual(id: string): AnimalVisual {
  return animalVisuals[id] ?? animalVisuals['value-ape'];
}
