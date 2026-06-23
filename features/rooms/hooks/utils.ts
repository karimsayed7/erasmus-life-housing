export function toggleItem(
  value: string,
  current: string[],
  setter: (values: string[]) => void
) {
  if (current.includes(value)) {
    setter(current.filter((item) => item !== value));
  } else {
    setter([...current, value]);
  }
}