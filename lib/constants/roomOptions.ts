

export interface CheckboxOption {
  key: string
  icon: string 
  en: string
  pt: string
}

export const ROOM_TYPE_PT: Record<"Studio" | "Apartment" | "Private Room", string> = {
  Studio: "Estúdio",
  Apartment: "Apartamento",
  "Private Room": "Quarto Privado",
}

export const FACILITIES_OPTIONS: readonly CheckboxOption[] = [
  { key: "tv", icon: "Tv", en: "TV", pt: "Televisão" },
  { key: "sofa", icon: "Sofa", en: "Sofa", pt: "Sofá" },
  { key: "wifi", icon: "Wifi", en: "Wi-Fi", pt: "Wi-Fi" },
  { key: "washing_machine", icon: "WashingMachine", en: "Washing machine", pt: "Máquina de lavar" },
  { key: "unfurnished", icon: "Box", en: "Unfurnished", pt: "Não mobilado" },
  { key: "central_heating", icon: "Flame", en: "Central heating", pt: "Aquecimento central" },
  { key: "accessibility", icon: "Accessibility", en: "Accessibility needs", pt: "Necessidades de acessibilidade" },
  { key: "terrace", icon: "Wind", en: "Terrace", pt: "Terraço" },
  { key: "elevator", icon: "ArrowUpDown", en: "Elevator", pt: "Elevador" },
  { key: "air_conditioning", icon: "AirVent", en: "Air conditioning", pt: "Ar condicionado" },
  { key: "dishwasher", icon: "Utensils", en: "Dishwasher", pt: "Máquina de lavar louça" },
  { key: "free_parking", icon: "ParkingSquare", en: "Free parking", pt: "Estacionamento gratuito" },
  { key: "garden", icon: "Trees", en: "Garden", pt: "Jardim" },
] as const

export const LANDLORD_RULES_OPTIONS: readonly CheckboxOption[] = [
  { key: "no_smoking", icon: "CigaretteOff", en: "No smoking allowed", pt: "Proibido fumar" },
  { key: "no_pets", icon: "PawPrint", en: "Pets are not allowed", pt: "Animais não são permitidos" },
  { key: "overnight_guests", icon: "UserCheck", en: "Overnight guests are allowed", pt: "Visitas noturnas são permitidas" },
] as const