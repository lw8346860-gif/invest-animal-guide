import { useRef, useState } from 'react';
import type { Species } from '../data/species';
import type { Profile } from './ProfileForm';
import ShareCard from './ShareCard';

interface ResultPageProps {
  species: Species;
  profile: Profile;
  onRestart: () => void;
}

export default function ResultPage({ species, profile, onRestart }: ResultPageProps) {
  const shareRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Try to copy the quote as a simple share mechanism
    const text = `我在「投资动物自测指南」里测出了投资物种：${species.name}！\n\n"${species.quote}"\n\n来测测你是什么动物？`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8">
      <div className="w-full max-w-md">
        {/* Result card */}
        <ShareCard species={species} profile={profile} shareRef={shareRef} />

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleShare}
            className="w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer border-none"
            style={{
              background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
              color: '#111',
              boxShadow: '0 4px 14px rgba(0, 255, 136, 0.3)',
            }}
          >
            {copied ? '✓ 已复制到剪贴板' : '分享给朋友'}
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3.5 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer bg-white border border-[#e0e0e0] text-[#555] hover:border-[#ccc] hover:bg-[#fafafa]"
          >
            重新测试
          </button>
        </div>

        {/* Footer disclaimer */}
        <p className="mt-8 text-xs text-[#bbb] text-center">
          本测试仅供娱乐和自我观察，不构成任何投资建议。
        </p>
      </div>
    </div>
  );
}
