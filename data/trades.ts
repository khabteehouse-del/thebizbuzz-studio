import type { Lang } from "@/data/i18n";

/*
  The pictures in the "Who we help" strip. They are illustrations of the
  kinds of business we work with, not our clients or past work, so each one
  carries only the trade name.
*/
export const trades: { src: string; name: Record<Lang, string> }[] = [
  { src: "/images/trades/house-painter.webp", name: { en: "House painting", es: "Pintura de casas" } },
  { src: "/images/trades/handyman.webp", name: { en: "Handyman", es: "Reparaciones del hogar" } },
  { src: "/images/trades/car-detailer.webp", name: { en: "Car detailing", es: "Detallado de autos" } },
  { src: "/images/trades/physiotherapy.webp", name: { en: "Physiotherapy", es: "Fisioterapia" } },
  { src: "/images/trades/elderly-care.webp", name: { en: "Elderly care", es: "Cuidado de adultos mayores" } },
  { src: "/images/trades/cleaning.webp", name: { en: "Cleaning", es: "Limpieza" } },
  { src: "/images/trades/mobile-beauty.webp", name: { en: "Mobile beauty", es: "Belleza a domicilio" } },
  { src: "/images/trades/pet-grooming.webp", name: { en: "Pet grooming", es: "Estética canina" } },
  { src: "/images/trades/landscaping.webp", name: { en: "Landscaping", es: "Jardinería" } },
  { src: "/images/trades/contractor.webp", name: { en: "Contractors", es: "Contratistas" } },
  { src: "/images/trades/electrician.webp", name: { en: "Electricians", es: "Electricistas" } },
  { src: "/images/trades/plumbing.webp", name: { en: "Plumbing", es: "Plomería" } },
];
