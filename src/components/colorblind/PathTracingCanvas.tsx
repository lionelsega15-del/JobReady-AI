import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PathPoint } from '../../types';
import { RotateCcw, Eye, Sparkles, Check, HelpCircle } from 'lucide-react';

interface PathTracingCanvasProps {
  startPoint?: { x: number; y: number; label: string };
  endPoint?: { x: number; y: number; label: string };
  canonicalPath?: PathPoint[];
  instruction?: string;
  onPathChange?: (hasDrawn: boolean) => void;
}

export const PathTracingCanvas: React.FC<PathTracingCanvasProps> = ({
  startPoint,
  endPoint,
  canonicalPath,
  instruction,
  onPathChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showCanonical, setShowCanonical] = useState(false);
  const strokesRef = useRef<{ x: number; y: number }[][]>([]);
  const currentStrokeRef = useRef<{ x: number; y: number }[]>([]);

  // Coordinate conversion from pointer client coords to 300x300 canvas space
  const getCanvasCoords = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = 300 / rect.width;
    const scaleY = 300 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 300, 300);

    // Draw all completed strokes
    const allStrokes = [...strokesRef.current];
    if (currentStrokeRef.current.length > 0) {
      allStrokes.push(currentStrokeRef.current);
    }

    allStrokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);

      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }

      ctx.strokeStyle = '#0284c7'; // Vibrant sky blue
      ctx.lineWidth = 4.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(2, 132, 199, 0.4)';
      ctx.shadowBlur = 6;
      ctx.stroke();
    });
  }, []);

  // Reset when question / path changes
  useEffect(() => {
    strokesRef.current = [];
    currentStrokeRef.current = [];
    setHasDrawn(false);
    setShowCanonical(false);
    onPathChange?.(false);
    redrawCanvas();
  }, [canonicalPath, startPoint, onPathChange, redrawCanvas]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    currentStrokeRef.current = [coords];
    redrawCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    currentStrokeRef.current.push(coords);
    redrawCanvas();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    if (currentStrokeRef.current.length > 1) {
      strokesRef.current.push([...currentStrokeRef.current]);
      setHasDrawn(true);
      onPathChange?.(true);
    }
    currentStrokeRef.current = [];
    redrawCanvas();
  };

  const clearCanvas = () => {
    strokesRef.current = [];
    currentStrokeRef.current = [];
    setHasDrawn(false);
    setShowCanonical(false);
    onPathChange?.(false);
    redrawCanvas();
  };

  // Generate SVG path string for canonical line
  const canonicalPathD = canonicalPath && canonicalPath.length > 1
    ? `M ${canonicalPath[0].x} ${canonicalPath[0].y} ` +
      canonicalPath.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ')
    : '';

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Canvas container superimposed over 300x300 plate */}
      <div
        ref={containerRef}
        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full cursor-crosshair overflow-hidden touch-none"
        style={{ touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="absolute inset-0 w-full h-full z-20 pointer-events-auto"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />

        {/* Start Point Marker (A) */}
        {startPoint && (
          <div
            className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(startPoint.x / 300) * 100}%`,
              top: `${(startPoint.y / 300) * 100}%`,
            }}
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-emerald-400 opacity-60"></span>
              <div className="relative w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-[11px] flex items-center justify-center shadow-md border-2 border-white ring-2 ring-emerald-500/50">
                {startPoint.label}
              </div>
            </div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-wide uppercase px-1 rounded bg-slate-900/80 text-emerald-300">
              Mulai
            </span>
          </div>
        )}

        {/* End Point Marker (B) */}
        {endPoint && (
          <div
            className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(endPoint.x / 300) * 100}%`,
              top: `${(endPoint.y / 300) * 100}%`,
            }}
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-rose-400 opacity-60"></span>
              <div className="relative w-6 h-6 rounded-full bg-rose-600 text-white font-extrabold text-[11px] flex items-center justify-center shadow-md border-2 border-white ring-2 ring-rose-500/50">
                {endPoint.label}
              </div>
            </div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-wide uppercase px-1 rounded bg-slate-900/80 text-rose-300">
              Akhir
            </span>
          </div>
        )}

        {/* Canonical Path Reveal Overlay */}
        {showCanonical && canonicalPathD && (
          <svg
            viewBox="0 0 300 300"
            className="absolute inset-0 w-full h-full z-15 pointer-events-none"
          >
            <path
              d={canonicalPathD}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 6"
              className="animate-pulse opacity-90 drop-shadow-md"
            />
          </svg>
        )}
      </div>

      {/* Interactive Canvas Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <button
          type="button"
          onClick={clearCanvas}
          disabled={!hasDrawn}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
            hasDrawn
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs cursor-pointer active:scale-95'
              : 'bg-slate-50 border-slate-200/60 text-slate-400 cursor-not-allowed'
          }`}
          title="Hapus goresan garis"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Hapus Goresan</span>
        </button>

        <button
          type="button"
          onClick={() => setShowCanonical(!showCanonical)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border cursor-pointer active:scale-95 ${
            showCanonical
              ? 'bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-300/50'
              : 'bg-white hover:bg-amber-50 border-amber-200/80 text-amber-800 shadow-2xs'
          }`}
          title="Bandingkan goresan Anda dengan garis rujukan Ishihara resmi"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{showCanonical ? 'Sembunyikan Kunci Alur' : 'Bandingkan Alur Asli'}</span>
        </button>
      </div>

      {/* Tracing Status Hint */}
      <div className="mt-2.5 text-center">
        {hasDrawn ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
            <Check className="w-3 h-3 text-emerald-600" />
            Alur tergambar! Cocokkan hasil pengamatan Anda pada pilihan di bawah.
          </span>
        ) : (
          <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <HelpCircle className="w-3 h-3 text-slate-400" />
            Gunakan kursor atau jari Anda untuk menarik garis dari <strong>Titik A</strong> ke <strong>Titik B</strong>.
          </span>
        )}
      </div>
    </div>
  );
};
