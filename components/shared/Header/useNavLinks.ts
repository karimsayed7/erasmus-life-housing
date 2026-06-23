// components/Header/useNavLinks.ts
import { useUserRole } from "@/features/auth/hooks/profile/useUserRole";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export type NavLink = {
  name: string;
  href: string;
  active?: boolean;
};

export function useNavLinks(): NavLink[] {
  const t = useTranslations("Header");
  const { isAdmin } = useUserRole();
  const pathname = usePathname();

  return [
    {
      name: t("home"),
      href: "/",
      active: pathname === "/",
    },
    ...(isAdmin
      ? [
          {
            name: t("dashboard"),
            href: "/dashboard",
            active: pathname === "/dashboard",
          },
        ]
      : []),
    {
      name: t("rentRoom"),
      href: "/rooms",
      active: pathname === "/rooms",
    },
    {
      name: t("about"),
      href: "/about",
      active: pathname === "/about",
    },
  ];
}