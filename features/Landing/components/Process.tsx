import React from "react";
import { getTranslations } from "next-intl/server";

async function Process() {
  const t = await getTranslations("Process");
  const cards = [
    {
      num: '1',
      title: t('pickTitle'),
      description: t('pickDescription'),
    },
    {
      num: '2',
      title: t('acceptTitle'),
      description: t('acceptDescription'),
    },
    {
      num: '3',
      title: t('paymentTitle'),
      description: t('paymentDescription'),
    },
    {
      num: '4',
      title: t('keysTitle'),
      description: t('keysDescription'),
    },
  ];

  return (
    <section
      id="proccess"
      className="max-w-[1580px] mx-auto text-center my-40  px-20"
      aria-labelledby="process-heading"
    >
      <p className="text-2xl text-blue-800" aria-label={t("ariaLabel")}>
        {t("eyebrow")}
      </p>

      <h1 id="process-heading" className="text-2xl font-semibold pb-20 pt-3">
        {t("heading")}
      </h1>

      <div
        className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label={t("stepsAria")}
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
                {t("step", { num: card.num })}
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
