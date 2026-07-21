// components/Header/Header.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
// import { useAuthProfile } from "@/features/auth/hooks/profile/useAuthProfile";
import { useAuthProfile } from "@/providers/auth-provider";
import { useNavLinks } from "./useNavLinks";
import { HeaderNav } from "./HeaderNav";
import { HeaderDesktopActions } from "./HeaderDesktopActions";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { cn } from "@/lib/utils";
interface HProp {
  className?: string
}

function Header({className} : HProp) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Header");
  const { profile, isLoading, handleLogout } = useAuthProfile();
  const navLinks = useNavLinks();

  return (
    <header className={cn(
        "relative z-[10000] w-full border-b border-gray-100 bg-white",
        className
      )}>
      <div className="flex justify-between px-6 md:px-10 items-center py-4 text-[#A7A7A7]">
        <Link href="/" aria-label={t("goHome")} className="shrink-0">
          <Image src="/icons/logo.svg" alt="Brand Logo" width={140} height={45} priority />
        </Link>

        <div className="ml-25">
          <HeaderNav links={navLinks} />
        </div>

        <HeaderDesktopActions
          profile={profile}
          isLoading={isLoading}
          onLogout={handleLogout}
        />

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <HeaderMobileMenu
          links={navLinks}
          profile={profile}
          isLoading={isLoading}
          onLogout={handleLogout}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
