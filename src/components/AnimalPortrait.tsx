import { getAnimalVisual } from '../data/animalVisuals';

interface AnimalPortraitProps {
  speciesId: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

const sizes = {
  sm: 'w-24 h-24',
  md: 'w-40 h-40',
  lg: 'w-56 h-56',
  hero: 'w-full aspect-square',
};

export default function AnimalPortrait({ speciesId, size = 'md' }: AnimalPortraitProps) {
  const visual = getAnimalVisual(speciesId);
  const col = visual.atlasIndex % 4;
  const row = Math.floor(visual.atlasIndex / 4);

  return (
    <div
      className={`${sizes[size]} animal-portrait relative overflow-hidden rounded-[26px] shrink-0`}
      style={{
        border: '1px solid rgba(17,17,17,.12)',
        boxShadow: '0 18px 44px rgba(0,0,0,.18)',
      }}
      aria-label={visual.shortName}
    >
      <img
        src={`${import.meta.env.BASE_URL}animal-atlas.jpg`}
        alt={visual.shortName}
        className="absolute max-w-none"
        style={{
          width: '400%',
          height: '400%',
          left: `-${col * 100}%`,
          top: `-${row * 100}%`,
        }}
        draggable={false}
      />
    </div>
  );
}
