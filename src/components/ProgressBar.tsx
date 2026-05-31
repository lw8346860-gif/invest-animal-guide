interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-[#555]">{current} / {total}</span>
        <span className="text-xs text-[#555]">{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-2 bg-[#e0e0e0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #00ff88, #f5c518)',
          }}
        />
      </div>
    </div>
  );
}
