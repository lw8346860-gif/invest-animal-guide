import type { Species } from '../data/species';
import type { Profile } from './ProfileForm';

interface ShareCardProps {
  species: Species;
  profile: Profile;
  shareRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ShareCard({ species, profile, shareRef }: ShareCardProps) {
  return (
    <div
      ref={shareRef}
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header strip */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, #111, #222)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🐾</span>
          <span className="text-xs font-medium text-[#00ff88] tracking-wider">
            投资动物物种卡
          </span>
        </div>
        <span className="text-xs text-[#666]">ANIMAL SPECIES CARD</span>
      </div>

      {/* Body */}
      <div className="px-5 py-6">
        {/* Subject */}
        <div className="text-xs text-[#888] mb-4">
          鉴定对象：<span className="text-[#111] font-medium">{profile.nickname}</span>
        </div>

        {/* Species name */}
        <div className="mb-5">
          <div className="text-xs text-[#888] mb-1">你的投资物种</div>
          <h2
            className="text-3xl font-black tracking-tight mb-2"
            style={{ color: '#111' }}
          >
            {species.name}
          </h2>
          <p className="text-sm text-[#555] italic">"{species.feature}"</p>
        </div>

        {/* Divider */}
        <div
          className="h-px my-5"
          style={{ background: 'linear-gradient(90deg, #00ff88, #f5c518, transparent)' }}
        />

        {/* Advantage */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: '#00ff88' }}
            />
            <span className="text-xs font-medium text-[#333] uppercase tracking-wider">
              投资优势
            </span>
          </div>
          <p className="text-sm text-[#333] leading-relaxed">
            {species.advantage}
          </p>
        </div>

        {/* Watchout */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: '#ef4444' }}
            />
            <span className="text-xs font-medium text-[#333] uppercase tracking-wider">
              需要留意
            </span>
          </div>
          <p className="text-sm text-[#555] leading-relaxed">
            {species.watchout}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px my-5"
          style={{ background: 'linear-gradient(90deg, transparent, #e0e0e0)' }}
        />

        {/* Investor */}
        <div className="mb-4">
          <div className="text-xs text-[#888] mb-1.5">更像的投资人</div>
          <div className="text-lg font-bold text-[#111] mb-1.5">
            {species.investor}
          </div>
          <p className="text-xs text-[#666] leading-relaxed">
            {species.investorBrief}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px my-5"
          style={{ background: 'linear-gradient(90deg, transparent, #e0e0e0)' }}
        />

        {/* Quote */}
        <div
          className="rounded-xl px-4 py-3.5"
          style={{ background: 'linear-gradient(135deg, #f5c518/10, #00ff88/5)', border: '1px solid #f5c518/20' }}
        >
          <div className="text-xs text-[#888] mb-1">转发短句</div>
          <p className="text-sm font-medium text-[#111] italic">
            "{species.quote}"
          </p>
        </div>

        {/* Tie-breaking note */}
        <p className="mt-4 text-xs text-[#999] text-center">
          你不是单一动物，但动物园先抓住了你最明显的市场习性。
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#f0f0f0] flex items-center justify-between">
        <span className="text-xs text-[#bbb]">投资动物自测指南 · 仅供娱乐</span>
        <span className="text-xs text-[#bbb]">🐾</span>
      </div>
    </div>
  );
}
