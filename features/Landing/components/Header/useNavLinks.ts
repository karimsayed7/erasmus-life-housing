// components/Header/useNavLinks.ts
import { useUserRole } from "@/features/auth/hooks/profile/useUserRole";
import { useTranslations } from "next-intl";

export type NavLink = {
  name: string;
  href: string;
  isLink?: boolean;
  active?: boolean;
};

export function useNavLinks(): NavLink[] {
  const t = useTranslations("Header");
  const { isAdmin } = useUserRole();

  return [
    { name: t("home"), href: "#hero", active: true },
    ...(isAdmin ? [{ name: t("dashboard"), href: "/dashboard", isLink: true }] : []),
    { name: t("about"), href: "#about" },
    { name: t("finestRooms"), href: "#rooms" },
    { name: t("testimonials"), href: "#testimonials" },
    { name: t("process"), href: "#proccess" },
  ];
}
