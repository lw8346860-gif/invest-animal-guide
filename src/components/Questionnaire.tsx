import { useState } from 'react';
import { questions } from '../data/questions';
import ProgressBar from './ProgressBar';

interface QuestionnaireProps {
  onComplete: (answers: Record<number, number>) => void;
  onBack: () => void;
}

const scaleLabels = [
  { value: 1, label: '完全不像我' },
  { value: 2, label: '有点不像我' },
  { value: 3, label: '看市场情况' },
  { value: 4, label: '有点像我' },
  { value: 5, label: '太像了，建议翻交易记录' },
];

export default function Questionnaire({ onComplete, onBack }: QuestionnaireProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = questions[currentIdx];
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === questions.length - 1;
  const currentAnswer = answers[question.id];

  const handleSelect = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (isFirst) {
      onBack();
    } else {
      setCurrentIdx(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-5 py-6">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrev}
              className="text-sm text-[#555] hover:text-[#111] transition-colors cursor-pointer bg-transparent border-none"
            >
              ← {isFirst ? '返回' : '上一题'}
            </button>
            <span className="text-xs text-[#999]">
              {currentIdx + 1} / {questions.length}
            </span>
          </div>
          <ProgressBar current={currentIdx + 1} total={questions.length} />
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <div className="text-xs font-medium text-[#00cc6a] uppercase tracking-wider mb-3">
              Q{question.id}
            </div>
            <p className="text-lg font-medium leading-relaxed text-[#111]">
              {question.text}
            </p>
          </div>

          {/* Scale options */}
          <div className="space-y-3">
            {scaleLabels.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleSelect(value)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all cursor-pointer ${
                  currentAnswer === value
                    ? 'border-[#00ff88] bg-[#00ff88]/8 text-[#111] font-medium'
                    : 'border-[#e0e0e0] bg-white text-[#555] hover:border-[#ccc] hover:bg-[#fafafa]'
                }`}
              >
                <span className="inline-flex items-center gap-3">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
                      currentAnswer === value
                        ? 'bg-[#00ff88] text-[#111]'
                        : 'bg-[#f0f0f0] text-[#888]'
                    }`}
                  >
                    {value}
                  </span>
                  <span>{label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          <button
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200 border-none ${
              currentAnswer !== undefined
                ? 'cursor-pointer'
                : 'cursor-not-allowed opacity-40'
            }`}
            style={{
              background: currentAnswer !== undefined
                ? 'linear-gradient(135deg, #00ff88, #00cc6a)'
                : '#e0e0e0',
              color: currentAnswer !== undefined ? '#111' : '#999',
              boxShadow: currentAnswer !== undefined ? '0 4px 14px rgba(0, 255, 136, 0.3)' : 'none',
            }}
          >
            {isLast ? '查看结果' : '下一题 →'}
          </button>
        </div>
      </div>
    </div>
  );
}
