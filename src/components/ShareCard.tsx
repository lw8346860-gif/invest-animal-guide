import type { Species } from '../data/species';
import type { Profile } from './ProfileForm';
import AnimalPortrait from './AnimalPortrait';

const SITE_URL = 'https://lw8346860-gif.github.io/invest-animal-guide/';

interface ShareCardProps {
  species: Species;
  profile: Profile;
  shareRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ShareCard({ species, profile, shareRef }: ShareCardProps) {
  return (
    <div
      ref={shareRef}
      className="share-card rounded-2xl overflow-hidden"
    >
      {/* Header strip */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, #111, #222)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-[#00ff88]" />
          <span className="text-xs font-medium text-[#00ff88] tracking-wider">
            测测你是什么投资物种
          </span>
        </div>
        <span className="text-xs text-[#9ca3af]">物种卡</span>
      </div>

      {/* Body */}
      <div className="px-5 py-6">
        {/* Subject */}
        <div className="card-muted text-xs mb-4">
          鉴定对象：<span className="card-title font-medium">{profile.nickname}</span>
        </div>

        <div className="mb-5">
          <AnimalPortrait speciesId={species.id} size="hero" />
          <div className="pt-5">
            <div className="card-muted text-xs mb-1">你的投资物种</div>
            <h2 className="card-title text-4xl font-black tracking-tight mb-2">
              {species.name}
            </h2>
            <p className="card-muted text-sm italic leading-relaxed">"{species.feature}"</p>
          </div>
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
            <span className="section-label text-xs font-medium uppercase tracking-wider">
              投资优势
            </span>
          </div>
          <p className="card-body text-sm leading-relaxed">
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
            <span className="section-label text-xs font-medium uppercase tracking-wider">
              需要留意
            </span>
          </div>
          <p className="card-muted text-sm leading-relaxed">
            {species.watchout}
          </p>
        </div>

        {/* Divider */}
        <div className="card-divider h-px my-5" />

        {/* Investor */}
        <div className="mb-4">
          <div className="card-muted text-xs mb-1.5">更像的投资人</div>
          <div className="card-title text-lg font-bold mb-1.5">
            {species.investor}
          </div>
          <p className="card-muted text-xs leading-relaxed">
            {species.investorBrief}
          </p>
        </div>

        {/* Divider */}
        <div className="card-divider h-px my-5" />

        {/* Quote */}
        <div className="quote-box rounded-xl px-4 py-3.5">
          <div className="card-muted text-xs mb-1">转发短句</div>
          <p className="card-title text-sm font-medium italic">
            "{species.quote}"
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white p-3">
          <img src={`${import.meta.env.BASE_URL}qrcode.png`} alt="测试入口二维码" className="w-16 h-16 rounded-lg shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#111] mb-1">长按识别二维码</div>
            <div className="text-[10px] leading-snug text-[#666] break-all">{SITE_URL}</div>
          </div>
        </div>

        <p className="card-muted mt-4 text-xs text-center">
          你不是单一动物，但动物园先抓住了你最明显的市场习性。
        </p>
      </div>

      {/* Footer */}
      <div className="card-footer px-5 py-3 flex items-center justify-between">
        <span className="text-xs">测测你是什么投资物种 · 仅供娱乐</span>
        <span className="text-xs">16 种物种</span>
      </div>
    </div>
  );
}
