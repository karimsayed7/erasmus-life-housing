
import Image from "next/image";

type AvatarProfile = {
  name?: string | null;
  email?: string | null;
  photo?: string | null;
};

type Props = {
  profile: AvatarProfile;
  size?: number;
};

export function UserAvatar({ profile, size = 32 }: Props) {
  const initial =
    profile.name?.charAt(0)?.toUpperCase() ??
    profile.email?.charAt(0)?.toUpperCase() ??
    "?";

  if (profile.photo) {
    return (
      <Image
        src={profile.photo}
        alt={profile.name ?? "User"}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-[#224294] text-white flex items-center justify-center font-semibold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initial}
    </div>
  );
}