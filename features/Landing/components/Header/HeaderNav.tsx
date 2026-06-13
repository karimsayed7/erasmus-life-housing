// components/Header/HeaderNav.tsx
import Link from "next/link";
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
          <div key={link.name} className="border-b border-gray-50 pb-2">
            {link.isLink ? (
              <Link
                href={link.href}
                onClick={onLinkClick}
                className={`text-lg font-medium ${link.active ? "text-black" : "text-[#797979] hover:text-black"}`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                href={link.href}
                onClick={onLinkClick}
                className={`text-lg font-medium ${link.active ? "text-black" : "text-[#797979] hover:text-black"}`}
              >
                {link.name}
              </a>
            )}
          </div>
        ))}
      </>
    );
  }

  return (
    <nav aria-label="Main Navigation" className="hidden xl:block">
      <ul className="flex gap-8 text-[15px] font-medium">
        {links.map((link) => (
          <li key={link.name}>
            {link.isLink ? (
              <Link
                href={link.href}
                className={`transition-colors ${link.active ? "text-black" : "hover:text-black"}`}
              >
                {link.name}
              </Link>
            ) : (
             <a 
                href={link.href}
                className={`transition-colors ${link.active ? "text-black" : "hover:text-black"}`}
              >
                {link.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
