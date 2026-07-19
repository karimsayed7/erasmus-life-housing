

import Image from "next/image";
import { getTranslations } from "next-intl/server";

const teamMembers = [
  {
    name: "Olivia Rhye",
    role: "Founder & CEO",
    image: "/assets/Avatar1.png",
  },
  {
    name: "Phoenix Baker",
    role: "Engineering Manager",
    image: "/assets/Avatar2.png",
  },
  {
    name: "Lana Steiner",
    role: "Product Manager",
    image: "/assets/Avatar3.png",
  },
  {
    name: "Demi Wilkinson",
    role: "Frontend Developer",
    image: "/assets/Avatar4.png",
  },
  {
    name: "Candice Wu",
    role: "Backend Developer",
    image: "/assets/Avatar5.png",
  },
  {
    name: "Natali Craig",
    role: "Product Designer",
    image: "/assets/Avatar6.png",
  },
  {
    name: "Drew Cano",
    role: "UX Researcher",
    image: "/assets/Avatar7.png",
  },
  {
    name: "Orlando Diggs",
    role: "Customer Success",
    image: "/assets/Avatar.png",
  },
];

export default async function About() {
  const t =await getTranslations("about");

  return (
    <div className="px-6 sm:px-10 lg:px-20 xl:px-40 2xl:px-60 py-20">
      <section className="flex flex-col lg:flex-row items-start gap-12 mb-24">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            {t("about us")}
          </h3>

          <h2 className="text-3xl font-bold leading-tight">
            {t("hero title")}
          </h2>
        </div>

        <div className="flex-1 text-gray-500 text-base">
          <p className="mb-6">{t("hero description 1")}</p>

          <p>{t("hero description 2")}</p>
        </div>
      </section>

      <section className="border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-center">
        <div className="relative w-full lg:w-[420px] h-[300px] rounded-2xl overflow-hidden shrink-0">
          <Image
            src="/assets/about.png"
            alt="About"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-blue-800 mb-5">
            {t("achievements")}
          </h3>

          <p className="text-gray-500 leading-8">
            {t("achievements description")}
          </p>
        </div>
      </section>

      <section className="mt-28">
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {t("team title")}
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 leading-7">
            {t("team description")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-18 h-18 rounded-full overflow-hidden mb-4 shadow-md hover:shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover "
                />
              </div>

              <h3 className="font-semibold text-gray-900">
                {member.name}
              </h3>

              <p className="text-blue-700 text-sm mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}