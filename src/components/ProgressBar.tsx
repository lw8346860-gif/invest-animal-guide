interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="muted-text text-xs">{current} / {total}</span>
        <span className="muted-text text-xs">{Math.round(pct)}%</span>
      </div>
      <div className="progress-track w-full h-2 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--accent), var(--yellow))',
          }}
        />
      </div>
    </div>
  );
}
