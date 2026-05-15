import React from "react";
import { cards } from "../reservationProccess/cards";

function Process() {
  return (
    <section
      id="proccess"
      className="max-w-[1580px] mx-auto text-center mt-40 px-20"
      aria-labelledby="process-heading"
    >
      <p className="text-xl text-blue-800" aria-label="Process stage indicator">
        Reservation Process
      </p>

      <h1 id="process-heading" className="text-2xl font-semibold pb-8 pt-3">
        Fast, intuitive and absolutely safe!
      </h1>

      <div
        className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Reservation process steps"
      >
        {cards.map((card) => (
          <div
            key={card.num}
            className="text-left"
            role="listitem"
            aria-labelledby={`step-title-${card.num}`}
            aria-describedby={`step-desc-${card.num}`}
          >
            <div>
              <div className="text-[50px] font-bold" aria-hidden="true">
                {card.num}
              </div>
              <div className="sr-only" aria-live="polite">
                Step {card.num}
              </div>

              <h2 id={`step-title-${card.num}`} className="mb-5 font-semibold">
                {card.title}
              </h2>

              <p id={`step-desc-${card.num}`} className="text-gray-700">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
