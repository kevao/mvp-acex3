'use client';

import React from 'react';
import Image from 'next/image';

const testimonialsData = [
  {
    name: "Ana",
    role: "Ganho de Massa",
    image: "/testimonials/ana.jpg",
    text: '"Ganhei massa magra! Não sinto fadiga e consigo manter o foco no treino."',
    rating: 5,
  },
  {
    name: "Carlos",
    role: "Emagrecimento",
    image: "/testimonials/carlos.jpg",
    text: '"Minha alimentação de verdade. O sabor transforma totalmente a experiência!"',
    rating: 5,
  },
  {
    name: "João",
    role: "Fitness Geral",
    image: "/testimonials/joao.jpg",
    text: '"Muito prático e delicioso. Nunca mais vou cozinhar à noite!"',
    rating: 5,
  },
];

const Star = ({ filled }: { filled: boolean }) => (
  <span className={`text-xl ${filled ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
);

const TestimonialsSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonialsData.map((testimonial, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-100">
          <div className="relative w-20 h-20 mx-auto -mt-12 mb-4">
            <Image
              src={testimonial.image}
              alt={`Foto de ${testimonial.name}`}
              fill
              className="rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          <p className="italic text-gray-700 mb-4 text-sm">{testimonial.text}</p>

          <div className="flex justify-center mb-3">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} filled={i < testimonial.rating} />
            ))}
          </div>

          <p className="font-bold text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.role}</p>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsSection;
