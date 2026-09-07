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
  const isLongOptions = options.some(
    (opt) => typeof opt === 'string' && opt.length > 4
  );

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
    <div className={`w-full ${isLongOptions ? 'max-w-xl' : 'max-w-md'} mx-auto`}>
      <div className="text-center mb-3 text-xs font-semibold text-slate-500">
        Pilih hasil pengamatan Anda (tekan angka 1–{options.length} pada keyboard):
      </div>

      <div className={isLongOptions ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5' : 'grid grid-cols-2 gap-3'}>
        {options.map((option, index) => (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => onSelectOption(option)}
            className={`group relative flex items-center justify-center rounded-xl border-2 border-slate-200/90 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 active:scale-[0.98] transition shadow-2xs text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
              isLongOptions
                ? 'p-3 text-xs sm:text-sm font-semibold text-left justify-start pl-8'
                : 'p-4 text-lg font-bold'
            }`}
          >
            <span className={`absolute ${isLongOptions ? 'left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center' : 'top-2 left-2'} text-[10px] font-bold text-slate-400 group-hover:text-emerald-700`}>
              {index + 1}
            </span>
            <span className="group-hover:text-emerald-950 transition leading-snug">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
