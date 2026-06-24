import React from "react";
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/features/Landing/animations/ScrollReveal";
import { StaggerReveal } from "@/features/Landing/animations/StaggerReveal";

async function Process() {
  const t = await getTranslations("Process");
  const cards = [
    {
      num: "1",
      title: t("pickTitle"),
      description: t("pickDescription"),
    },
    {
      num: "2",
      title: t("acceptTitle"),
      description: t("acceptDescription"),
    },
    {
      num: "3",
      title: t("paymentTitle"),
      description: t("paymentDescription"),
    },
    {
      num: "4",
      title: t("keysTitle"),
      description: t("keysDescription"),
    },
  ];

  return (
    <section
      id="proccess"
      className="max-w-[1580px] mx-auto text-center my-40 px-6 lg:px-20"
      aria-labelledby="process-heading"
    >
      <ScrollReveal direction="up">
        <p className="text-2xl text-blue-800" aria-label={t("ariaLabel")}>
          {t("eyebrow")}
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <h1 id="process-heading" className="text-2xl font-semibold pb-20 pt-3">
          {t("heading")}
        </h1>
      </ScrollReveal>

      <StaggerReveal
        className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        staggerDelay={0.15}
      >
        {cards.map((card) => (
          <div
            key={card.num}
            className="text-left p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            role="listitem"
            aria-labelledby={`step-title-${card.num}`}
            aria-describedby={`step-desc-${card.num}`}
          >
            <div>
              <div className="text-[50px] font-bold text-blue-800" aria-hidden="true">
                {card.num}
              </div>
              <div className="sr-only" aria-live="polite">
                {t("step", { num: card.num })}
              </div>

              <h2 id={`step-title-${card.num}`} className="mb-5 font-semibold text-lg">
                {card.title}
              </h2>

              <p id={`step-desc-${card.num}`} className="text-gray-700">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </StaggerReveal>
    </section>
  );
}

export default Process;