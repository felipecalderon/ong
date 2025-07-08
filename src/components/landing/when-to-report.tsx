import React from 'react';

const situations = [
  "Abandono en la vía pública o en lugares deshabitados.",
  "Agresiones físicas, como golpes, patadas o heridas.",
  "Falta de alimentación o agua adecuada.",
  "Condiciones de vida insalubres o inadecuadas.",
  "Explotación para fines comerciales o de entretenimiento.",
  "Negligencia en la atención veterinaria."
];

export const WhenToReport = () => {
  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-600 to-amber-800 text-transparent bg-clip-text">¿Cuándo Denunciar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {situations.map((situation, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
              <p className="text-gray-600">{situation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
