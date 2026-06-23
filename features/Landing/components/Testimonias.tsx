import Image from "next/image";
import { getTranslations } from "next-intl/server";

async function Testimonias() {
  const t = await getTranslations("Testimonials");
  const cards = [
    {
      image: "/assets/testimonials1.png",
      name: "Emma Schneider",
      opinion: t("emmaOpinion"),
    },
    {
      image: "/assets/testimonials2.png",
      name: "Lucas Silva",
      opinion: t("lucasOpinion"),
    },
    {
      image: "/assets/testimonials3.png",
      name: "Matteo Rossi",
      opinion: t("matteoOpinion"),
    },
    {
      image: "/assets/testimonials4.png",
      name: "Sofia Fernandes",
      opinion: t("sofiaOpinion"),
    },
  ];

  return (
    <section id="testimonials" className="text-center">
      <p className="text-2xl text-blue-800 mt-10">{t("eyebrow")}</p>
      <h1 className="text-2xl font-semibold pb-20 pt-3">{t("heading")}</h1>
      <div className="overflow-hidden w-full">
        <div className="flex w-max animate-scroll gap-10">
          {[...cards, ...cards].map((card, index) => (
            <div
              key={index}
              className="flex h-50 max-w-100 gap-4 p-5 pb-15 rounded-lg bg-blue-900 text-white text-lg "
            >
              <div className="overflow-hidden w-40">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={100}
                  height={50}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold  text-left mb-3">{card.name}</p>
                <p className="text-left text-sm">{card.opinion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonias;
