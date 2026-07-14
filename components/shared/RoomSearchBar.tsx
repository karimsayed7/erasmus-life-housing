"use client";

import { useQueryState, parseAsInteger, parseAsString, debounce } from "nuqs";
import { useTransition } from "react";
import { Search } from "lucide-react";

export default function RoomSearchBar() {
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: false,
      clearOnDefault: true,
      startTransition,
      limitUrlUpdates: debounce(300),
    })
  );

  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );

  function handleChange(value: string) {
    setQ(value || null);
    setPage(1);
  }

  return (
    <div className="relative w-72" data-pending={isPending ? "" : undefined}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        value={q}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search Room..."
        className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}