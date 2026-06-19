interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition"
      aria-label="切换黑白主题"
    >
      <span className="text-sm">{theme === 'dark' ? '☀️' : '🌙'}</span>
      <span>{theme === 'dark' ? '白天' : '黑天'}</span>
    </button>
  );
}
