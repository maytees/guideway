"use client";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  BookKey,
  Calendar,
  Clock,
  Copy,
  School,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { GroupWithMembers } from "~/lib/types";
import { dashify, formatCategory, stringToRawCategory } from "~/lib/utils";
import { useGroupStore } from "~/stores/group-store";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";

enum ClubCategory {
  ACADEMIC,
  ARTS_AND_CULTURE,
  BUSINESS_AND_ENTREPRENEURSHIP,
  COMMUNITY_SERVICE_AND_VOLUNTEERING,
  ENVIRONMENTAL_AND_SUSTAINABILITY,
  HEALTH_AND_WELLNESS,
  HOBBIES_AND_INTERESTS,
  IDENTITY_AND_DIVERSITY,
  MEDIA_AND_JOURNALISM,
  POLITICAL_AND_ACTIVISM,
  RELIGIOUS_AND_SPIRITUAL,
  SOCIAL_AND_NETWORKING,
  SPORTS_AND_RECREATION,
  TECHNOLOGY_AND_INNOVATION,
}

const AllGroups = (props: { groups: GroupWithMembers[] }) => {
  const { groups, setGroups } = useGroupStore();
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    if (isCopied)
      toast.success("Success", {
        description: "Copied join code to clipboard!",
      });
  }, [isCopied]);

  useEffect(() => {
    setGroups(props.groups);
  }, [setGroups]);

  const filteredGroups = Array.isArray(groups)
    ? groups.filter((group) => {
        if (!group || typeof group.name !== "string") {
          return false;
        }

        return (
          group.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (categoryFilter === "All" || group.category === categoryFilter)
        );
      })
    : [];

  return (
    <div className="mt-5">
      <div className="mb-6 flex flex-col items-center justify-between gap-2 md:flex-row">
        <div className="w-full flex-1 md:mr-4">
          <Input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[250px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="ACADEMIC">Academic</SelectItem>
            <SelectItem value="ARTS_AND_CULTURE">Arts and Culture</SelectItem>
            <SelectItem value="BUSINESS_AND_ENTREPRENEURSHIP">
              Business and Entrepreneurship
            </SelectItem>
            <SelectItem value="COMMUNITY_SERVICE_AND_VOLUNTEERING">
              Community Service and Volunteering
            </SelectItem>
            <SelectItem value="ENVIRONMENTAL_AND_SUSTAINABILITY">
              Environmental and Sustainability
            </SelectItem>
            <SelectItem value="HEALTH_AND_WELLNESS">
              Health and Wellness
            </SelectItem>
            <SelectItem value="HOBBIES_AND_INTERESTS">
              Hobbies and Interests
            </SelectItem>
            <SelectItem value="IDENTITY_AND_DIVERSITY">
              Identity and Diversity
            </SelectItem>
            <SelectItem value="MEDIA_AND_JOURNALISM">
              Media and Journalism
            </SelectItem>
            <SelectItem value="POLITICAL_AND_ACTIVISM">
              Political and Activism
            </SelectItem>
            <SelectItem value="RELIGIOUS_AND_SPIRITUAL">
              Religious and Spiritual
            </SelectItem>
            <SelectItem value="SOCIAL_AND_NETWORKING">
              Social and Networking
            </SelectItem>
            <SelectItem value="SPORTS_AND_RECREATION">
              Sports and Recreation
            </SelectItem>
            <SelectItem value="TECHNOLOGY_AND_INNOVATION">
              Technology and Innovation
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-10">
        {filteredGroups.length == 0 ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <QuestionMarkCircledIcon className="size-10" />
              </CardTitle>
              <CardTitle>Whoops...</CardTitle>
              <CardDescription>
                We couldn't find any groups{" "}
                {searchTerm ? "matching " + searchTerm : ""}in the{" "}
                {categoryFilter} category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-x-4">
              <JoinGroup />
              <CreateGroup />
            </CardContent>
          </Card>
        ) : (
          filteredGroups.map((group) => (
            <Card key={group.id} className="w-full">
              <CardHeader className="space-y-0 pb-2">
                <div className="mb-4 flex flex-row items-center justify-between">
                  <Avatar>
                    <AvatarImage src={group.logo || ""} />
                    <AvatarFallback>
                      {group.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Badge variant={"secondary"} className="h-fit rounded-full">
                    {formatCategory(stringToRawCategory(group.category))}
                  </Badge>
                </div>
                <CardTitle className="flex flex-row justify-between pb-1">
                  <div className="flex items-center space-x-2 text-2xl font-semibold">
                    <span>{group.name}</span>
                  </div>
                </CardTitle>
                <CardDescription className="mt-0 flex">
                  <School className="mr-1 size-4" />
                  <span>South Lakes High School</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-1 max-sm:text-sm">
                <div className="flex items-center justify-between"></div>
                <p className="w-full text-pretty font-medium">
                  {group.description}
                </p>

                <div className="mt-8 grid grid-cols-3 grid-rows-2 xl:max-w-2xl">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>{group.members.length} Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>Meets Weekly</span>
                  </div>
                  <div className="flex items-center gap-2 hover:cursor-pointer">
                    <BookKey className="size-4" />
                    <Tooltip delayDuration={150}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() =>
                            copyToClipboard(dashify(group.join_code))
                          }
                        >
                          <div className="flex items-center gap-1">
                            <span>{dashify(group.join_code)}</span>
                            <Copy className="size-3" />
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>
                      Created{" "}
                      {group.created_at.toLocaleString("default", {
                        month: "short",
                      })}{" "}
                      {group.created_at.getFullYear()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-4" />
                    <span>4.8 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-4" />
                    <span>4.8 Rating sigma</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start justify-between space-y-5">
                <Button size="lg" className="w-full">
                  Open
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AllGroups;
