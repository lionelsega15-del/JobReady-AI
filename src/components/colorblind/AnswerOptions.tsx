import React, { useEffect } from 'react';

interface AnswerOptionsProps {
  options: (number | string)[];
  onSelectOption: (option: number | string) => void;
  disabled?: boolean;
}

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  onSelectOption,
  disabled = false,
}) => {
  // Listen for keyboard number shortcuts 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const keyIndex = parseInt(e.key, 10) - 1;
      if (keyIndex >= 0 && keyIndex < options.length) {
        onSelectOption(options[keyIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, onSelectOption, disabled]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-3 text-xs font-semibold text-slate-500">
        Pilih angka yang Anda lihat (atau gunakan angka 1–{options.length} pada keyboard):
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => onSelectOption(option)}
            className="group relative flex items-center justify-center p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/50 active:scale-[0.98] transition shadow-sm font-bold text-slate-800 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute top-2 left-2 text-[10px] font-semibold text-slate-400 group-hover:text-emerald-600">
              {index + 1}
            </span>
            <span className="group-hover:text-emerald-900 transition">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
