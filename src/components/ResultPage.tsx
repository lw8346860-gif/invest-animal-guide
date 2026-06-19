import { useRef, useState } from 'react';
import type { Species } from '../data/species';
import { getAnimalVisual } from '../data/animalVisuals';
import type { Profile } from './ProfileForm';
import ShareCard from './ShareCard';

interface ResultPageProps {
  species: Species;
  profile: Profile;
  onRestart: () => void;
}

const SITE_URL = 'https://lw8346860-gif.github.io/invest-animal-guide/';

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 4) {
  const chars = Array.from(text);
  let line = '';
  let lines = 0;
  for (let i = 0; i < chars.length; i += 1) {
    const next = line + chars[i];
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      lines += 1;
      line = chars[i];
      if (lines >= maxLines - 1) {
        const rest = chars.slice(i).join('');
        let finalLine = line + rest;
        while (ctx.measureText(`${finalLine}...`).width > maxWidth && finalLine.length > 0) {
          finalLine = finalLine.slice(0, -1);
        }
        ctx.fillText(`${finalLine}...`, x, y);
        return y + lineHeight;
      }
    } else {
      line = next;
    }
  }
  if (line) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawAnimal(ctx: CanvasRenderingContext2D, species: Species, x: number, y: number, size: number) {
  const visual = getAnimalVisual(species.id);
  return loadImage(`${import.meta.env.BASE_URL}animal-atlas.jpg`).then((atlas) => {
    const tile = atlas.naturalWidth / 4;
    const col = visual.atlasIndex % 4;
    const row = Math.floor(visual.atlasIndex / 4);
    ctx.save();
    roundRect(ctx, x, y, size, size, 34);
    ctx.clip();
    ctx.drawImage(atlas, col * tile, row * tile, tile, tile, x, y, size, size);
    ctx.restore();
    roundRect(ctx, x, y, size, size, 34);
    ctx.strokeStyle = 'rgba(17,17,17,.16)';
    ctx.lineWidth = 3;
    ctx.stroke();
  });
}

async function createResultImage(species: Species, profile: Profile) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1680;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas unsupported');

  ctx.fillStyle = '#f6f1e8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#111';
  ctx.font = '800 30px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  ctx.fillText('测测你是什么投资物种', 76, 92);
  ctx.fillStyle = '#00b86b';
  ctx.fillRect(76, 112, 280, 8);

  roundRect(ctx, 58, 150, 964, 1380, 44);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#ded7ca';
  ctx.lineWidth = 3;
  ctx.stroke();

  await drawAnimal(ctx, species, 96, 188, 888);
  ctx.fillStyle = '#777';
  ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  ctx.fillText(`鉴定对象：${profile.nickname}`, 96, 1120);
  ctx.fillStyle = '#111';
  ctx.font = '900 66px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  ctx.fillText(species.name, 96, 1204);
  ctx.fillStyle = '#555';
  ctx.font = '500 32px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  wrapText(ctx, `“${species.feature}”`, 96, 1262, 888, 44, 2);

  ctx.strokeStyle = '#00cc6a';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(96, 1348);
  ctx.lineTo(984, 1348);
  ctx.stroke();

  const qr = await loadImage(`${import.meta.env.BASE_URL}qrcode.png`);
  ctx.drawImage(qr, 76, 1364, 124, 124);
  ctx.fillStyle = '#111';
  ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  ctx.fillText('长按识别二维码，测测你的投资物种', 226, 1408);
  ctx.fillStyle = '#666';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  wrapText(ctx, SITE_URL, 226, 1450, 680, 30, 2);

  ctx.fillStyle = '#aaa';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  ctx.fillText('本测试仅供娱乐和自我观察，不构成任何投资建议。', 76, 1594);

  return canvas.toDataURL('image/png');
}

export default function ResultPage({ species, profile, onRestart }: ResultPageProps) {
  const shareRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleShare = async () => {
    // Try to copy the quote as a simple share mechanism
    const text = `我在「测测你是什么投资物种」里测出了：${species.name}！\n\n"${species.quote}"\n\n来测测你的投资物种。\n${SITE_URL}`;
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

  const handleGenerateImage = async () => {
    setGenerating(true);
    try {
      const url = await createResultImage(species, profile);
      setImageUrl(url);
      window.setTimeout(() => {
        document.getElementById('save-card-preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    } finally {
      setGenerating(false);
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
            className="primary-button w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer border-none"
          >
            {copied ? '✓ 已复制到剪贴板' : '分享给朋友'}
          </button>

          <button
            onClick={handleGenerateImage}
            disabled={generating}
            className="secondary-button w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer"
          >
            {generating ? '正在生成保存图...' : '生成可长按保存的卡片'}
          </button>

          {imageUrl && (
            <div id="save-card-preview" className="save-preview rounded-2xl p-3">
              <p className="muted-text text-xs text-center mb-3">手机长按下方图片即可保存</p>
              <img src={imageUrl} alt={`${species.name}结果卡片`} className="w-full rounded-xl block" />
              <a
                href={imageUrl}
                download={`${species.name}-投资物种.png`}
                className="secondary-button mt-3 block w-full py-3 rounded-xl text-center text-sm font-semibold"
              >
                下载 PNG
              </a>
            </div>
          )}

          <button
            onClick={onRestart}
            className="secondary-button w-full py-3.5 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer"
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
