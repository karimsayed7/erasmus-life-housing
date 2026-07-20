// components/Header/HeaderMobileMenu.tsx
"use client";

import { Link } from "@/i18n/navigation";
import { UserIcon, FileTextIcon, HeartIcon, LogOutIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UserAvatar } from "@/features/auth/components/profile/UserAvatar";
import { HeaderNav } from "./HeaderNav";
import type { NavLink } from "./useNavLinks";
// import type { UserProfile } from "@/features/auth/hooks/profile/useAuthProfile";
import type { UserProfile } from "@/providers/auth-provider";

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
    <nav className="xl:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-1 shadow-2xl absolute w-full animate-in slide-in-from-top duration-300 z-50">
      {/* Nav links */}
      <HeaderNav links={links} onLinkClick={onClose} mobile />

      {/* Divider */}
      {/* <div className="my-3 border-t border-gray-100" /> */}

      {/* Auth + locale section */}
      <div className="flex flex-col gap-3">
        {/* Language toggle */}
        <button
          onClick={toggleLocale}
          aria-label={t("toggleLocale", { locale: nextLocaleLabel })}
          className="text-gray-800 border-2 border-gray-200 hover:bg-gray-100 hover:border-black transition-all px-5 py-2.5 rounded-tr-xl rounded-tl-xl font-bold cursor-pointer text-sm w-full"
        >
          {nextLocaleLabel}
        </button>

        {isLoading ? (
          <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" />
        ) : profile ? (
          <>
            {/* User info */}
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <UserAvatar profile={profile} size={40} />
              <div>
                <p className="font-semibold text-gray-900 leading-tight">{profile.name}</p>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>

            {/* Profile links */}
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2.5 text-gray-600 hover:text-black font-medium py-1"
            >
              <UserIcon className="w-4 h-4 shrink-0" />
              {t("account")}
            </Link>
            <Link
              href="/applications"
              onClick={onClose}
              className="flex items-center gap-2.5 text-gray-600 hover:text-black font-medium py-1"
            >
              <FileTextIcon className="w-4 h-4 shrink-0" />
              {t("applications")}
            </Link>
            <Link
              href="/favorites"
              onClick={onClose}
              className="flex items-center gap-2.5 text-gray-600 hover:text-black font-medium py-1"
            >
              <HeartIcon className="w-4 h-4 shrink-0" />
              {t("favorites")}
            </Link>
            <button
              onClick={() => { onLogout(); onClose(); }}
              className="flex items-center gap-2.5 text-red-500 hover:text-red-700 font-bold cursor-pointer py-1"
            >
              <LogOutIcon className="w-4 h-4 shrink-0" />
              {t("signOut")}
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              href="/sign_in"
              onClick={onClose}
              className="text-center text-gray-700 hover:text-black transition-colors font-semibold py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              {t("signIn")}
            </Link>
            <Link
              href="/sign_up"
              onClick={onClose}
              className="text-center text-white bg-[#25409C] hover:bg-[#1e3282] transition-colors font-semibold py-2.5 rounded-lg"
            >
              {t("signUp")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}