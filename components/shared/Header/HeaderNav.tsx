// components/Header/HeaderNav.tsx
"use client";

import { Link } from "@/i18n/navigation";
import type { NavLink } from "./useNavLinks";

type Props = {
  links: NavLink[];
  onLinkClick?: () => void;
  mobile?: boolean;
};

export function HeaderNav({ links, onLinkClick, mobile = false }: Props) {
  if (mobile) {
    return (
      <>
        {links.map((link) => (
          <div key={link.href} className="border-b border-gray-100 pb-3">
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={`text-base font-semibold transition-colors ${
                link.active ? "text-[#25409C]" : "text-[#797979] hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          </div>
        ))}
      </>
    );
  }

  return (
    <nav aria-label="Main Navigation" className="hidden xl:block">
      <ul className="flex gap-8 text-[15px] font-medium">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`transition-colors ${
                link.active
                  ? "text-black font-semibold"
                  : "text-[#A7A7A7] hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}