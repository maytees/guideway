import { ClubCategory } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
