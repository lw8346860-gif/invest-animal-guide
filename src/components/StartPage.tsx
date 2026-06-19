import ThemeToggle from './ThemeToggle';

interface StartPageProps {
  onStart: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function StartPage({ onStart, theme, onToggleTheme }: StartPageProps) {
  return (
    <div className="start-screen min-h-screen px-5 py-6">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="brand-pill">INVESTMENT ANIMAL GUIDE</div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <div className="hero-orbit mb-8" aria-hidden="true">
          <div className="market-card card-a">
            <span>价值</span>
            <b>APE</b>
          </div>
          <div className="market-card card-b">
            <span>趋势</span>
            <b>BIRD</b>
          </div>
          <div className="market-card card-c">
            <span>现金流</span>
            <b>HIPPO</b>
          </div>
          <div className="hero-core">
            <div className="core-ring" />
            <div className="core-mark">
              <span className="core-line line-up" />
              <span className="core-line line-mid" />
              <span className="core-line line-down" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="hero-title mb-3">投资动物自测指南</h1>
          <h2 className="hero-subtitle mb-5">
            你的钱，在市场里到底像什么动物？
          </h2>

          <p className="hero-copy mb-8 max-w-sm mx-auto">
            30 道题，测出你的投资物种。不是给你荐股，是给你的市场习性做一张可转发的人格卡。
          </p>
        </div>

        <button
          onClick={onStart}
          className="primary-button w-full max-w-xs mx-auto block py-3.5 px-8 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer border-none"
        >
          开始鉴定我的投资物种
        </button>

        <div className="mt-8 grid grid-cols-3 gap-2">
          <div className="stat-tile"><b>30</b><span>题</span></div>
          <div className="stat-tile"><b>5</b><span>维度</span></div>
          <div className="stat-tile"><b>16</b><span>物种</span></div>
        </div>

        <p className="disclaimer mt-8 text-xs leading-relaxed max-w-xs mx-auto text-center">
          本测试仅供娱乐和自我观察，不构成任何投资建议、理财建议、证券分析或买卖依据。
        </p>
      </div>
    </div>
  );
}
