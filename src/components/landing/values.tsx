import React from 'react';

const values = [
  {
    title: "Justicia Animal",
    description: "Priorizamos el bienestar y los derechos de los animales en todas nuestras acciones legales."
  },
  {
    title: "Ética Profesional",
    description: "Actuamos con rigor jurídico, transparencia y respeto por la ley."
  },
  {
    title: "Empatía y Compasión",
    description: "Entendemos el sufrimiento animal como un imperativo para la acción."
  },
  {
    title: "Colaboración",
    description: "Trabajamos con ciudadanos, instituciones y otras organizaciones para multiplicar nuestro impacto."
  },
  {
    title: "Transparencia",
    description: "Rendimos cuentas claras sobre el uso de recursos y los casos atendidos."
  },
  {
    title: "Innovación Legal",
    description: "Impulsamos reformas legales y aprovechamos la tecnología para optimizar nuestra labor."
  }
];

export const Values = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-600 to-amber-800 text-transparent bg-clip-text">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="p-6 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
