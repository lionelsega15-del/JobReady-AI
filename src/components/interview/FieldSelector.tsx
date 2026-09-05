import React from 'react';
import { VOCATIONAL_FIELDS } from '../../data/interview-questions';
import { Wrench, Network, UtensilsCrossed, Calculator, Users, ArrowRight, BookMarked } from 'lucide-react';

interface FieldSelectorProps {
  onSelectField: (fieldId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Wrench,
  Network,
  UtensilsCrossed,
  Calculator,
  Users,
};

export const FieldSelector: React.FC<FieldSelectorProps> = ({ onSelectField }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3">
          <BookMarked className="w-3.5 h-3.5" />
          Tahap 1: Pilih Jurusan / Bidang Keahlian
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Pilih Bidang Simulasi Wawancara
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Pertanyaan disesuaikan dengan kurikulum kejuruan SMK dan standar kompetensi kerja yang sering diujikan oleh rekruter industri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VOCATIONAL_FIELDS.map((field) => {
          const IconComponent = ICON_MAP[field.icon] || Users;
          return (
            <div
              key={field.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {field.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition mb-1.5">
                  {field.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {field.description}
                </p>
              </div>

              <button
                onClick={() => onSelectField(field.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-blue-700 active:scale-[0.99] transition shadow-sm"
              >
                <span>Mulai Simulasi Bidang Ini</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
