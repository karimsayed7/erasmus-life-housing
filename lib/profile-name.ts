export function splitName(name: string | null): { firstName: string; lastName: string } {
  if (!name) return { firstName: "", lastName: "" }

  const trimmed = name.trim()
  const firstSpaceIndex = trimmed.indexOf(" ")

  if (firstSpaceIndex === -1) {
    return { firstName: trimmed, lastName: "" }
  }

  return {
    firstName: trimmed.slice(0, firstSpaceIndex),
    lastName: trimmed.slice(firstSpaceIndex + 1).trim(),
  }
}

export function joinName(firstName: string, lastName: string): string {
  return [firstName, lastName].filter(Boolean).join(" ").trim()
}