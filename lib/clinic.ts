import {
  Droplets,
  Flower2,
  Leaf,
  ScanFace,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Authoritative Elysea clinic information.
 * Only confirmed clinic information belongs in this file.
 */
export const CLINIC = {
  name: "Elysea Aesthetic Clinic",
  brandName: "ELYSEA",

  city: "Bharuch",
  region: "Gujarat",
  country: "India",

  address1:
    "FF-52, Sharnam Sky, beside Jhulelal Hospital, Zadeshwar Chowkdi",

  address2:
    "Ganesh Shrishti, Zadeshwar, Bharuch, Gujarat 392011",

  fullAddress:
    "FF-52, Sharnam Sky, beside Jhulelal Hospital, Zadeshwar Chowkdi, Ganesh Shrishti, Zadeshwar, Bharuch, Gujarat 392011, India",

  pinCode: "392011",

  phone: "+91 81411 15873",
  phoneHref: "tel:+918141115873",
  whatsappNumber: "918141115873",

  email: "elysea.aesthetics@gmail.com",
  emailHref: "mailto:elysea.aesthetics@gmail.com",

  rating: 4.7,
  googleReviewCount: 19,

  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",

  mapsUrl: "https://maps.app.goo.gl/b64q4EErcJeBsH5z5",

  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12397.67144335569!2d73.03165271348787!3d21.726097808591486!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be021a386abab55%3A0x8095ac2d18619a44!2sElysea%20Aesthetic%20Clinic!5e1!3m2!1sen!2sin!4v1795422876863!5m2!1sen!2sin",

  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=21.726097808591486%2C73.03165271348787",

  doctor: {
    name: "Dr. Vrujal Mistry",
    qualifications: "BHMS · PGDAM",
    registrationNumber: "G-25110",
    designation: "Consultant Aesthetic Physician",
    additionalDesignations: "Cosmetologist and Trichologist",
    experience: "8+ years of experience in the medical field",
    experienceYears: 8,
  },

  // Configure only after receiving the clinic's actual profile URLs.
  instagram: "",
  facebook: "",
  youtube: "",
} as const;

/**
 * Opening hours supplied by the clinic.
 * JavaScript day: Sunday = 0, Monday = 1 ... Saturday = 6.
 */
export const HOURS = [
  { label: "Monday", jsDay: 1, time: "10:00 AM – 7:00 PM", closed: false },
  { label: "Tuesday", jsDay: 2, time: "10:00 AM – 7:00 PM", closed: false },
  { label: "Wednesday", jsDay: 3, time: "10:00 AM – 7:00 PM", closed: false },
  { label: "Thursday", jsDay: 4, time: "10:00 AM – 7:00 PM", closed: false },
  { label: "Friday", jsDay: 5, time: "10:00 AM – 7:00 PM", closed: false },
  { label: "Saturday", jsDay: 6, time: "10:00 AM – 7:00 PM", closed: false },
  { label: "Sunday", jsDay: 0, time: "10:00 AM – 2:00 PM", closed: false },
] as const;

/**
 * Generate WhatsApp enquiry links consistently throughout the website.
 * This creates an enquiry, not an appointment confirmation.
 */
export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Complete service catalogue based on the clinic brochure.
 * Do not add prices or treatment durations without clinic confirmation.
 */
export type ClinicServiceCategory = {
  number: string;
  name: string;
  subtitle: string;
  icon: LucideIcon;
  services: readonly string[];
};

export const SERVICE_CATEGORIES: readonly ClinicServiceCategory[] = [
  {
    number: "01",
    name: "Skin Concern",
    subtitle: "Skin care",
    icon: ScanFace,
    services: [
      "Acne & Acne Scar Treatment",
      "Anti-Ageing & Wrinkle Reduction",
      "Melasma & Pigmentation Treatment",
      "Skin Rejuvenation",
    ],
  },
  {
    number: "02",
    name: "Cosmetic Procedure",
    subtitle: "Aesthetic procedures",
    icon: Sparkles,
    services: [
      "Microdermabrasion",
      "Chemical Peels",
      "Mesotherapy",
      "Microneedling",
      "PRP & GFC Therapy",
      "RF Skin Tightening",
      "LED Light Therapy",
    ],
  },
  {
    number: "03",
    name: "Medical Facials",
    subtitle: "Facial treatments",
    icon: Flower2,
    services: [
      "Hydra Facial",
      "Oxy Facial",
      "Carbon Laser Facial",
      "Vampire (PRP) Facial",
      "Korean Glass Skin Facial",
    ],
  },
  {
    number: "04",
    name: "Hair",
    subtitle: "Hair & scalp care",
    icon: Leaf,
    services: [
      "Hair Fall Diagnosis",
      "Hair Loss Treatment",
      "Anti-dandruff Treatment",
      "Alopecia Management",
      "Hair Mesotherapy",
      "Hair Microneedling",
      "PRP And GFC Therapy",
      "LED Light Therapy",
    ],
  },
  {
    number: "05",
    name: "Laser",
    subtitle: "Laser treatments",
    icon: Zap,
    services: [
      "Laser Hair Reduction",
      "Beard Shaping",
      "Tattoo Removal",
      "Carbon Laser Peel",
      "Laser Skin Toning",
    ],
  },
  {
    number: "06",
    name: "Minor Procedures",
    subtitle: "Clinical procedures",
    icon: Droplets,
    services: [
      "Ear Lobe Repair",
      "Nail Avulsion",
      "Wart And Skin Tag Excision",
      "Mole Removal",
      "Milia Extraction",
    ],
  },
] as const;
