interface StartPageProps {
  onStart: () => void;
}

export default function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md text-center">
        {/* Logo / Brand */}
        <div className="mb-8">
          <div className="text-5xl mb-4">🐾</div>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider mb-6"
            style={{ background: 'linear-gradient(135deg, #00ff88, #f5c518)', color: '#111' }}
          >
            INVESTMENT ANIMAL GUIDE
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
          投资动物自测指南
        </h1>
        <h2 className="text-lg sm:text-xl font-semibold mb-6 text-[#333]">
          你的钱，在市场里到底像什么动物？
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-[#555] leading-relaxed mb-10 max-w-sm mx-auto">
          30道题，鉴定你的投资物种。看看你是价值考古猿、趋势候鸟，还是套利水獭。
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full max-w-xs mx-auto block py-3.5 px-8 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer border-none"
          style={{
            background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
            color: '#111',
            boxShadow: '0 4px 14px rgba(0, 255, 136, 0.3)',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 136, 0.45)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 255, 136, 0.3)')}
        >
          开始鉴定我的投资物种
        </button>

        {/* Disclaimer */}
        <p className="mt-10 text-xs text-[#999] leading-relaxed max-w-xs mx-auto">
          本测试仅供娱乐和自我观察，不构成任何投资建议、理财建议、证券分析或买卖依据。市场有风险，动物园不背锅。
        </p>
      </div>
    </div>
  );
}
