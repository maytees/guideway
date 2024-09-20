import { ClubCategory } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJoinCode(code: string): string | null {
  // Remove any non-alphanumeric characters
  const cleanedCode = code.replace(/[^a-zA-Z0-9]/g, "");

  // Check if the cleaned code is exactly 8 characters long
  if (cleanedCode.length !== 8) {
    return null;
  }

  // Convert to uppercase
  const formattedCode = cleanedCode.toUpperCase();

  // Check if the formatted code contains only valid characters (A-Z and 0-9)
  if (!/^[A-Z0-9]{8}$/.test(formattedCode)) {
    return null;
  }

  return formattedCode;
}

export function formatCategory(category: ClubCategory | undefined): string {
  switch (category) {
    case ClubCategory.ACADEMIC:
      return "Academic";
    case ClubCategory.ARTS_AND_CULTURE:
      return "Arts & Culture";
    case ClubCategory.BUSINESS_AND_ENTREPRENEURSHIP:
      return "Business";
    case ClubCategory.COMMUNITY_SERVICE_AND_VOLUNTEERING:
      return "Community Service";
    case ClubCategory.ENVIRONMENTAL_AND_SUSTAINABILITY:
      return "Environmental";
    case ClubCategory.HEALTH_AND_WELLNESS:
      return "Health & Wellness";
    case ClubCategory.HOBBIES_AND_INTERESTS:
      return "Hobbies";
    case ClubCategory.IDENTITY_AND_DIVERSITY:
      return "Identity & Diversity";
    case ClubCategory.MEDIA_AND_JOURNALISM:
      return "Media";
    case ClubCategory.POLITICAL_AND_ACTIVISM:
      return "Political";
    case ClubCategory.RELIGIOUS_AND_SPIRITUAL:
      return "Religious";
    case ClubCategory.SOCIAL_AND_NETWORKING:
      return "Social";
    case ClubCategory.SPORTS_AND_RECREATION:
      return "Sports";
    case ClubCategory.TECHNOLOGY_AND_INNOVATION:
      return "Technology";
    default:
      return "Unknown Category";
  }
}

export function stringToRawCategory(
  categoryString: string,
): ClubCategory | undefined {
  return ClubCategory[categoryString as keyof typeof ClubCategory];
}

export function rawCategoryToString(category: ClubCategory): string {
  return ClubCategory[category];
}

export function dashify(code: string) {
  if (code.length !== 8) {
    throw new Error("Input must be exactly 8 characters long");
  }
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

export const colors: { bg: string; text: string }[] = [
  { bg: "#292524", text: "#FFFFFF" }, // Black
  { bg: "#f1f5f9", text: "#1e293b" }, // Slate
  { bg: "#ffedd5", text: "#9a3412" }, // Orange
  { bg: "#fef3c7", text: "#92400e" }, // Amber
  { bg: "#fef9c3", text: "#854d0e" }, // Yellow
  { bg: "#ecfccb", text: "#3f6212" }, // Lime
  { bg: "#cffafe", text: "#155e75" }, // Cyan
  { bg: "#e0e7ff", text: "#3730a3" }, // Indigo
  { bg: "#ede9fe", text: "#5b21b6" }, // Violet
  { bg: "#fae8ff", text: "#86198f" }, // Fuchsia
  { bg: "#ffe4e6", text: "#9f1239" }, // Rose
];

export const DEFAULT_COLOR = "#292524";
