// components/Header/HeaderMobileMenu.tsx
"use client";

import Link from "next/link";
import { UserIcon, FileTextIcon, HeartIcon, LogOutIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UserAvatar } from "@/features/auth/components/profile/UserAvatar";
import { HeaderNav } from "./HeaderNav";
import type { NavLink } from "./useNavLinks";
import type { UserProfile } from "@/features/auth/hooks/profile/useAuthProfile";

type Props = {
  links: NavLink[];
  profile: UserProfile | null;
  isLoading: boolean;
  onLogout: () => void;
  onClose: () => void;
};

export function HeaderMobileMenu({ links, profile, isLoading, onLogout, onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header");
  const nextLocale = locale === "en" ? "pt" : "en";
  const nextLocaleLabel = nextLocale.toUpperCase();

  const toggleLocale = () => {
    router.replace(pathname, { locale: nextLocale });
    onClose();
  };

  return (
    <nav className="xl:hidden bg-white border-t border-gray-100 px-8 py-6 flex flex-col gap-5 shadow-2xl absolute w-full animate-in slide-in-from-top duration-300">
      <HeaderNav links={links} onLinkClick={onClose} mobile />

      <div className="flex flex-col gap-4 pt-4 items-center">
        <button
          onClick={toggleLocale}
          aria-label={t("toggleLocale", { locale: nextLocaleLabel })}
          className="text-gray-500 hover:text-black transition-colors font-bold text-lg cursor-pointer w-full"
        >
          {nextLocaleLabel}
        </button>

        {isLoading ? (
          <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" />
        ) : profile ? (
          <>
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-gray-300">
              <UserAvatar profile={profile} size={45} />
              <div>
                <p className="font-semibold text-gray-900 text-lg">{profile.name}</p>
                <p className="text-md text-gray-500">{profile.email}</p>
              </div>
            </div>
            <Link href="/account" onClick={onClose} className="flex items-center gap-2 text-gray-600 hover:text-black font-medium">
              <UserIcon className="w-4 h-4" /> {t("account")}
            </Link>
            <Link href="/applications" onClick={onClose} className="flex items-center gap-2 text-gray-600 hover:text-black font-medium">
              <FileTextIcon className="w-4 h-4" /> {t("applications")}
            </Link>
            <Link href="/favorites" onClick={onClose} className="flex items-center gap-2 text-gray-600 hover:text-black font-medium">
              <HeartIcon className="w-4 h-4" /> {t("favorites")}
            </Link>
            <button
              onClick={() => { onLogout(); onClose(); }}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold cursor-pointer"
            >
              <LogOutIcon className="w-4 h-4" /> {t("signOut")}
            </button>
          </>
        ) : (
          <>
            <Link href="/sign_in">
              <button className="text-center text-gray-500 hover:text-black transition-colors font-bold text-lg cursor-pointer w-full">
                {t("signIn")}
              </button>
            </Link>
            <Link href="/sign_up">
              <button className="text-center text-gray-500 hover:text-black transition-colors font-bold text-lg cursor-pointer w-full">
                {t("signUp")}
              </button>
            </Link>
          </>
        )}
        <button className="text-black py-4 w-full rounded-xl font-bold border-2 border-gray-400 hover:bg-gray-100 hover:border-black transition-colors cursor-pointer">
          {t("rentRoom")}
        </button>
      </div>
    </nav>
  );
}
