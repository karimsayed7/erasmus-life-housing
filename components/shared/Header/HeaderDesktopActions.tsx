// components/Header/HeaderDesktopActions.tsx
"use client";

import { Link } from "@/i18n/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { UserDropdown } from "@/features/auth/components/profile/UserDropdown";
import type { UserProfile } from "@/features/auth/hooks/profile/useAuthProfile";
import { useSearchParams } from "next/navigation";

type Props = {
  profile: UserProfile | null;
  isLoading: boolean;
  onLogout: () => void;
};

export function HeaderDesktopActions({ profile, isLoading, onLogout }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header");
  const nextLocale = locale === "en" ? "pt" : "en";
  const nextLocaleLabel = nextLocale.toUpperCase();
  const searchParams = useSearchParams();

const toggleLocale = () => {
  router.replace(
    {
      pathname,
      query: Object.fromEntries(searchParams.entries()),
    },
    { locale: nextLocale }
  );
};
  return (
    <div className="hidden xl:flex gap-5 items-center">
      <button
        onClick={toggleLocale}
        aria-label={t("toggleLocale", { locale: nextLocaleLabel })}
        className="text-gray-800 border-2 border-gray-200 hover:bg-gray-100 hover:border-black transition-all px-5 py-2.5 rounded-tr-xl rounded-tl-xl font-bold cursor-pointer text-sm"
      >
        {nextLocaleLabel}
      </button>

      {isLoading ? (
        <div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse" />
      ) : profile ? (
        <UserDropdown profile={profile} onLogout={onLogout} />
      ) : (
        <>
          <Link
            href="/sign_in"
            className="hover:text-black text-[#A7A7A7] transition-colors font-semibold text-[15px]"
          >
            {t("signIn")}
          </Link>
          <Link
            href="/sign_up"
            className="hover:text-black text-[#A7A7A7] transition-colors font-semibold text-[15px]"
          >
            {t("signUp")}
          </Link>
        </>
      )}
    </div>
  );
}