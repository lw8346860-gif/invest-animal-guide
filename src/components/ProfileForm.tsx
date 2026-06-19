import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export type Profile = {
  nickname: string;
  market: string;
  experience: string;
  style: string;
};

interface ProfileFormProps {
  onSubmit: (profile: Profile) => void;
  onBack: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const marketOptions = ['A股', '港股', '美股', '基金', '固收/债券', '加密资产', '什么都看一点'];
const experienceOptions = ['1年以内', '1—3年', '3—5年', '5—10年', '10年以上'];
const styleOptions = ['价值', '成长', '趋势', '套利', '宏观', '高股息', '我也不知道，账户自己有想法'];

export default function ProfileForm({ onSubmit, onBack, theme, onToggleTheme }: ProfileFormProps) {
  const [nickname, setNickname] = useState('');
  const [market, setMarket] = useState('');
  const [experience, setExperience] = useState('');
  const [style, setStyle] = useState('');

  const canSubmit = nickname.trim() && market && experience && style;

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit({ nickname: nickname.trim(), market, experience, style });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="muted-button text-sm transition-colors cursor-pointer bg-transparent border-none flex items-center gap-1"
          >
            ← 返回
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <h2 className="text-xl font-bold mb-1">先认识一下你</h2>
        <p className="muted-text text-sm mb-8">填完基本信息，开始答题</p>

        {/* Nickname */}
        <div className="mb-6">
          <label className="form-label block text-sm font-medium mb-2">昵称</label>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="输入你的昵称"
            maxLength={20}
            className="form-input w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors placeholder:text-[#aaa]"
          />
        </div>

        {/* Market preference */}
        <div className="mb-6">
          <label className="form-label block text-sm font-medium mb-2">投资市场偏好</label>
          <div className="flex flex-wrap gap-2">
            {marketOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setMarket(opt)}
                className={`px-3 py-2 rounded-lg text-sm border cursor-pointer transition-all ${
                  market === opt
                    ? 'choice-active font-medium'
                    : 'choice-idle'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <label className="form-label block text-sm font-medium mb-2">投资年限</label>
          <div className="flex flex-wrap gap-2">
            {experienceOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setExperience(opt)}
                className={`px-3 py-2 rounded-lg text-sm border cursor-pointer transition-all ${
                  experience === opt
                    ? 'choice-active font-medium'
                    : 'choice-idle'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div className="mb-8">
          <label className="form-label block text-sm font-medium mb-2">自认为风格</label>
          <div className="flex flex-wrap gap-2">
            {styleOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setStyle(opt)}
                className={`px-3 py-2 rounded-lg text-sm border cursor-pointer transition-all ${
                  style === opt
                    ? 'choice-active font-medium'
                    : 'choice-idle'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`primary-button w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200 border-none ${
            canSubmit
              ? 'cursor-pointer'
              : 'cursor-not-allowed opacity-40'
          }`}
        >
          开始答题
        </button>
      </div>
    </div>
  );
}
