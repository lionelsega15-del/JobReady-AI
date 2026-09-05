import React, { useMemo } from 'react';
import { ColorblindQuestion } from '../../types';

interface ColorblindPlateProps {
  question: ColorblindQuestion;
}

// 7x5 dot matrix definitions for digits 0-9
const DIGIT_MATRICES: Record<string, number[][]> = {
  '0': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  '1': [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  '2': [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  '3': [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  '4': [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
  ],
  '5': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  '6': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  '7': [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  '8': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  '9': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
};

// Palettes for various Ishihara tests
const PALETTES = {
  'orange-green': {
    target: ['#e05338', '#eb6841', '#ed8240', '#d94726', '#f2784b'],
    background: ['#739845', '#88aa52', '#5d8033', '#9ebf63', '#688c3a', '#a6c66d'],
  },
  'red-green': {
    target: ['#cc3333', '#d64545', '#bf2626', '#e05353', '#aa1f1f'],
    background: ['#598a4e', '#6fa363', '#49753f', '#7fb872', '#8fc682', '#548249'],
  },
  'yellow-blue': {
    target: ['#e5a93b', '#d9992b', '#ebb84d', '#cca033', '#f2c35e'],
    background: ['#507a9e', '#3f6789', '#638cb0', '#749ec2', '#355979'],
  },
  'blue-green': {
    target: ['#3282b8', '#1b6ca8', '#4392c7', '#0f4c75', '#499cd4'],
    background: ['#8db580', '#719e62', '#9fc492', '#5f8a50', '#b0d4a3'],
  },
};

interface Dot {
  id: number;
  cx: number;
  cy: number;
  r: number;
  color: string;
}

export const ColorblindPlate: React.FC<ColorblindPlateProps> = ({ question }) => {
  const dots: Dot[] = useMemo(() => {
    const list: Dot[] = [];
    const size = 300;
    const center = size / 2;
    const plateRadius = 132;

    const answerStr = String(question.correctAnswer).trim();
    const digits = answerStr.split('');
    const digitCount = digits.length;

    // Determine palette
    const palette = PALETTES[question.paletteType] || PALETTES['orange-green'];

    // Helper: is a point inside the digit shape?
    const isPointInsideDigits = (px: number, py: number): boolean => {
      // Calculate bounding box for digits
      // Total height ~ 130px, digit width ~ 48px
      const digitHeight = 126;
      const digitWidth = 52;
      const digitGap = 12;
      const totalWidth = digitCount * digitWidth + (digitCount - 1) * digitGap;
      const startX = center - totalWidth / 2;
      const startY = center - digitHeight / 2;

      for (let d = 0; d < digitCount; d++) {
        const char = digits[d];
        const matrix = DIGIT_MATRICES[char];
        if (!matrix) continue;

        const dX = startX + d * (digitWidth + digitGap);
        const dY = startY;

        // Check if px, py falls inside this digit's bounds
        if (px >= dX && px <= dX + digitWidth && py >= dY && py <= dY + digitHeight) {
          const colIndex = Math.floor(((px - dX) / digitWidth) * 5);
          const rowIndex = Math.floor(((py - dY) / digitHeight) * 7);

          if (rowIndex >= 0 && rowIndex < 7 && colIndex >= 0 && colIndex < 5) {
            if (matrix[rowIndex][colIndex] === 1) {
              return true;
            }
          }
        }
      }
      return false;
    };

    // Deterministic pseudo-random based on question plateNumber
    let seed = question.plateNumber * 777 + 12345;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Generate hexagonal/jittered grid of dots within circle
    const step = 10.5;
    let dotId = 0;

    for (let y = center - plateRadius; y <= center + plateRadius; y += step) {
      const rowOffset = (Math.floor(y / step) % 2 === 0) ? (step / 2) : 0;
      for (let x = center - plateRadius; x <= center + plateRadius; x += step) {
        const jitterX = (pseudoRandom() - 0.5) * 4.5;
        const jitterY = (pseudoRandom() - 0.5) * 4.5;
        const cx = x + rowOffset + jitterX;
        const cy = y + jitterY;

        const distFromCenter = Math.hypot(cx - center, cy - center);
        if (distFromCenter < plateRadius - 3) {
          const inTarget = isPointInsideDigits(cx, cy);
          const r = 3.6 + pseudoRandom() * 4.2;

          let colorPool = inTarget ? palette.target : palette.background;
          // In subtle vanishing plates, introduce a tiny 5% background noise into the digit to make it blend authentically
          if (inTarget && pseudoRandom() < 0.08) {
            colorPool = palette.background;
          }
          const colorIndex = Math.floor(pseudoRandom() * colorPool.length);
          const color = colorPool[colorIndex];

          list.push({
            id: dotId++,
            cx: Math.round(cx * 10) / 10,
            cy: Math.round(cy * 10) / 10,
            r: Math.round(r * 10) / 10,
            color,
          });
        }
      }
    }

    return list;
  }, [question]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative p-2.5 rounded-full bg-slate-900/5 shadow-inner border border-slate-200">
        <svg
          viewBox="0 0 300 300"
          className="w-64 h-64 sm:w-80 sm:h-80 rounded-full select-none"
          style={{ background: '#f1f5f9' }}
        >
          {/* Subtle outer circular rim */}
          <circle cx="150" cy="150" r="147" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
          
          {/* Procedural Ishihara dots */}
          {dots.map((dot) => (
            <circle
              key={dot.id}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill={dot.color}
              className="transition-colors duration-300"
            />
          ))}
        </svg>
      </div>

      <div className="mt-3 text-center">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Plat #{question.plateNumber} — Gaya Ishihara Prosedural SVG
        </span>
      </div>
    </div>
  );
};
