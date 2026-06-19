import { getAnimalVisual } from '../data/animalVisuals';

interface AnimalPortraitProps {
  speciesId: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'w-20 h-20',
  md: 'w-28 h-28',
  lg: 'w-36 h-36',
};

export default function AnimalPortrait({ speciesId, size = 'md' }: AnimalPortraitProps) {
  const visual = getAnimalVisual(speciesId);
  const darkAnimal = ['macro-crow', 'message-mole'].includes(speciesId);

  return (
    <div
      className={`${sizes[size]} animal-portrait relative overflow-hidden rounded-[28px] shrink-0`}
      style={{
        background: `radial-gradient(circle at 28% 20%, rgba(255,255,255,.86), transparent 28%), linear-gradient(135deg, ${visual.colors[0]}, ${visual.colors[1]})`,
        border: '1px solid rgba(17,17,17,.08)',
        boxShadow: '0 16px 36px rgba(0,0,0,.14)',
      }}
      aria-label={visual.shortName}
    >
      <div className="absolute inset-0 opacity-35">
        <div className="absolute left-3 right-3 top-5 h-1 rounded-full bg-white/70 rotate-[-10deg]" />
        <div className="absolute left-5 right-8 bottom-7 h-1 rounded-full bg-black/20 rotate-[16deg]" />
        <div className="absolute right-4 top-4 w-8 h-8 rounded-full border-2 border-white/70" />
        <div className="absolute left-4 bottom-4 w-9 h-9 rounded-full border-2 border-black/15" />
      </div>
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <g fill="none" stroke="rgba(17,17,17,.72)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 86 C36 70 78 70 102 86" opacity=".42" />
          <path d="M24 35 L96 35" opacity=".18" />
          <path d="M30 26 L42 26 M78 26 L90 26" opacity=".26" />
        </g>
        <g transform="translate(0 2)">
          {visual.archetype === 'whale' && <path d="M25 65 C30 38 80 30 98 58 C111 56 113 72 99 73 C88 91 46 93 29 76 C18 76 16 67 25 65Z" fill={darkAnimal ? '#111827' : '#16355f'} />}
          {visual.archetype === 'bird' && <path d="M28 70 C48 48 74 44 94 63 C75 62 61 72 49 88 C43 78 35 74 28 70Z" fill="#175f36" />}
          {visual.archetype === 'octopus' && <path d="M35 58 C35 34 86 34 86 58 C86 84 35 84 35 58Z M38 79 C30 91 48 94 50 80 M55 82 C50 98 70 98 66 82 M73 80 C76 96 95 91 84 78" fill="#56238f" />}
          {visual.archetype === 'flamingo' && <path d="M72 28 C45 30 42 58 64 63 C82 68 77 92 54 95 M72 28 C96 38 91 57 73 56" stroke="#8a1230" strokeWidth="10" fill="none" strokeLinecap="round" />}
          {visual.archetype === 'turtle' && <path d="M28 69 C35 43 86 43 94 69 C84 88 42 88 28 69Z M90 63 C104 60 107 74 94 77" fill="#2f6b21" />}
          {visual.archetype === 'hedgehog' && <path d="M24 75 L34 50 L45 72 L55 45 L65 72 L76 48 L86 75 C74 91 38 91 24 75Z" fill="#7c2d12" />}
          {visual.archetype === 'cheetah' && <path d="M26 72 C42 40 83 39 99 68 C83 87 44 91 26 72Z" fill="#9b4b10" />}
          {visual.archetype === 'mammoth' && <path d="M26 70 C30 42 88 39 98 67 C91 88 43 90 26 70Z M31 68 C18 80 17 96 32 96 M93 68 C106 80 105 96 90 96" fill="#8a4f18" />}
          {!['whale', 'bird', 'octopus', 'flamingo', 'turtle', 'hedgehog', 'cheetah', 'mammoth'].includes(visual.archetype) && (
            <path d="M30 66 C30 38 90 38 90 66 C90 89 30 89 30 66Z" fill={darkAnimal ? '#111827' : visual.accent} />
          )}
          <circle cx="48" cy="61" r="4" fill="#fff" />
          <circle cx="72" cy="61" r="4" fill="#fff" />
          <path d="M50 76 C56 80 64 80 70 76" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
        <g stroke="#f5c518" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {visual.archetype === 'ape' && <circle cx="87" cy="34" r="12" />}
          {visual.archetype === 'whale' && <path d="M46 28 L60 15 L74 28" fill="#f5c518" />}
          {visual.archetype === 'bird' && <path d="M72 34 L98 20 M91 18 L100 20 L96 29" />}
          {visual.archetype === 'octopus' && <path d="M22 44 V25 M35 40 V18 M48 42 V30" />}
          {visual.archetype === 'beast' && <rect x="76" y="20" width="24" height="15" rx="4" fill="#f5c518" />}
          {visual.archetype === 'mammoth' && <circle cx="60" cy="31" r="18" opacity=".8" />}
          {visual.archetype === 'hyena' && <path d="M84 28 A20 20 0 1 1 70 62" />}
          {visual.archetype === 'crow' && <path d="M84 24 C96 36 96 54 84 66" />}
          {visual.archetype === 'otter' && <path d="M33 34 H87 M45 34 L35 52 M75 34 L85 52" />}
          {visual.archetype === 'turtle' && <path d="M44 58 H79 M49 69 H74" />}
          {visual.archetype === 'hippo' && <path d="M28 33 C45 48 74 20 92 36" />}
          {visual.archetype === 'hedgehog' && <path d="M93 25 L105 48 H81 Z" fill="#ef4444" />}
          {visual.archetype === 'gardener' && <path d="M34 36 C48 32 43 50 57 45 C70 40 68 25 84 28" />}
          {visual.archetype === 'flamingo' && <path d="M31 94 L98 31 M88 30 L100 31 L96 43" />}
          {visual.archetype === 'cheetah' && <path d="M24 89 C52 86 68 44 101 31 M91 28 L102 31 L97 42" />}
          {visual.archetype === 'mole' && <rect x="22" y="30" width="20" height="15" rx="4" fill="#f5c518" />}
        </g>
      </svg>
    </div>
  );
}
