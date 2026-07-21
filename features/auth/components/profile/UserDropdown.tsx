// features/auth/components/UserDropdown.tsx
"use client";
import Link from "next/link";
import { ChevronDownIcon, UserIcon, FileTextIcon, HeartIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "../profile/UserAvatar";
import { useTranslations } from 'next-intl';
// import type { UserProfile } from "../../hooks/profile/useAuthProfile";
import type { UserProfile } from "@/providers/auth-provider";

type Props = {
  profile: UserProfile;
  onLogout: () => void;
};

export function UserDropdown({ profile, onLogout }: Props) {
    const t = useTranslations('Header');
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
  <button className="flex items-center justify-between gap-2.5 border border-gray-200 rounded-tl-xl rounded-tr-xl px-3 py-1.5 hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer bg-white w-46">
    <div className="flex items-center gap-2">
      <UserAvatar profile={profile} size={30} />
      <span className="text-[15px] font-medium text-gray-800 max-w-[120px] truncate">
        {profile.name ?? profile.email}
      </span>
    </div>
    <ChevronDownIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
  </button>
</DropdownMenuTrigger>
<DropdownMenuContent align="center" className="w-45 z-[10000] rounded-tr-none rounded-tl-none -mt-1">
  <DropdownMenuItem asChild>
    <Link href="/account" className="cursor-pointer gap-2">
      <UserIcon className="w-4 h-4" /> {t('account')}
    </Link>
  </DropdownMenuItem>
  <DropdownMenuItem asChild>
    <Link href="/applications" className="cursor-pointer gap-2">
      <FileTextIcon className="w-4 h-4" /> {t('applications')}
    </Link>
  </DropdownMenuItem>
  <DropdownMenuItem asChild>
    <Link href="/favourites" className="cursor-pointer gap-2">
      <HeartIcon className="w-4 h-4" /> {t('favorites')}
    </Link>
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem variant="destructive" onClick={onLogout} className="cursor-pointer gap-2">
    <LogOutIcon className="w-4 h-4" /> {t('signOut')}
  </DropdownMenuItem>
</DropdownMenuContent>
    </DropdownMenu>
  );
}