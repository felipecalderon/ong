import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: "Bárbara Manquilef",
    role: "Abogada especializada en derecho animal",
    description: "4 años de experiencia en litigación y políticas públicas.",
    avatar: "/default-avatar.png"
  },
  {
    name: "Felipe Calderón",
    role: "Ingeniero de software",
    description: "Comprometido con desarrollar herramientas digitales para democratizar el acceso a la justicia animal.",
    avatar: "/default-avatar.png"
  }
];

export const Team = () => {
  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-600 to-amber-800 text-transparent bg-clip-text">Equipo Fundador</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Somos un equipo interdisciplinario con una pasión común: la defensa legal de los animales.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="max-w-sm text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.avatar}
                  alt={`Avatar de ${member.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
