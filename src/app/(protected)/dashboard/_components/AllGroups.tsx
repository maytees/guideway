"use client";
import { type Group } from "@prisma/client";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Calendar, Clock, School, Star, Users } from "lucide-react";
import { useState } from "react";
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
import { formatCategory, stringToRawCategory } from "~/lib/utils";

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

const mockGroups = [
  {
    id: "1",
    name: "Computer Science Club",
    description:
      "Join CS enthusiasts to share knowledge, collaborate on projects, and explore the latest tech trends!",
    category: "TECHNOLOGY_AND_INNOVATION",
    created_at: new Date("2023-01-01"),
    updated_at: new Date("2023-05-15"),
    owner_id: "user1",
    join_code: "CS2023",
    logo: "/placeholder.svg?height=100&width=100&text=CS",
    website: "https://csclub.com",
    email: "contact@csclub.com",
    member_count: 50,
  },
  {
    id: "2",
    name: "Environmental Awareness Group",
    description:
      "Promote environmental sustainability through local clean-up initiatives and awareness campaigns!",
    category: "ENVIRONMENTAL_AND_SUSTAINABILITY",
    created_at: new Date("2023-02-15"),
    updated_at: new Date("2023-05-20"),
    owner_id: "user2",
    join_code: "ECO2023",
    logo: "/placeholder.svg?height=100&width=100&text=ECO",
    website: "https://ecogroup.com",
    email: "info@ecogroup.com",
    member_count: 75,
  },
  {
    id: "3",
    name: "Debate Society",
    description:
      "Hone your public speaking and critical thinking skills through regular debates and competitions!",
    category: "ACADEMIC",
    created_at: new Date("2023-03-10"),
    updated_at: new Date("2023-06-01"),
    owner_id: "user3",
    join_code: "DEBATE2023",
    logo: "/placeholder.svg?height=100&width=100&text=DEBATE",
    website: "https://debatesociety.org",
    email: "info@debatesociety.org",
    member_count: 40,
  },
  {
    id: "4",
    name: "Art Collective",
    description:
      "Connect with fellow artists to create, exhibit, and collaborate across various artistic mediums!",
    category: "ARTS_AND_CULTURE",
    created_at: new Date("2023-04-05"),
    updated_at: new Date("2023-07-20"),
    owner_id: "user4",
    join_code: "ART2023",
    logo: "/placeholder.svg?height=100&width=100&text=ART",
    website: "https://artcollective.com",
    email: "create@artcollective.com",
    member_count: 60,
  },
  {
    id: "5",
    name: "Fitness Fanatics",
    description:
      "Boost your physical health through group workouts, nutrition tips, and exciting sports tournaments!",
    category: "SPORTS_AND_RECREATION",
    created_at: new Date("2023-05-20"),
    updated_at: new Date("2023-08-15"),
    owner_id: "user5",
    join_code: "FIT2023",
    logo: "/placeholder.svg?height=100&width=100&text=FIT",
    website: "https://fitnessfanatics.com",
    email: "health@fitnessfanatics.com",
    member_count: 100,
  },
  {
    id: "6",
    name: "Entrepreneurship Network",
    description:
      "Collaborate on business ideas and connect with successful entrepreneurs through pitch events and mentorship programs!",
    category: "BUSINESS_AND_ENTREPRENEURSHIP",
    created_at: new Date("2023-06-15"),
    updated_at: new Date("2023-09-01"),
    owner_id: "user6",
    join_code: "ENTRE2023",
    logo: "/placeholder.svg?height=100&width=100&text=ENTRE",
    website: "https://entrepreneurnetwork.org",
    email: "connect@entrepreneurnetwork.org",
    member_count: 80,
  },
  {
    id: "7",
    name: "Film Appreciation Society",
    description:
      "Explore cinema through weekly screenings, discussions, and collaborative film projects!",
    category: "ARTS_AND_CULTURE",
    created_at: new Date("2023-07-01"),
    updated_at: new Date("2023-09-30"),
    owner_id: "user7",
    join_code: "FILM2023",
    logo: "/placeholder.svg?height=100&width=100&text=FILM",
    website: "https://filmsociety.com",
    email: "watch@filmsociety.com",
    member_count: 55,
  },
  {
    id: "8",
    name: "Volunteer Corps",
    description:
      "Make a positive impact in the community through various volunteer activities and service projects!",
    category: "COMMUNITY_SERVICE_AND_VOLUNTEERING",
    created_at: new Date("2023-08-10"),
    updated_at: new Date("2023-10-15"),
    owner_id: "user8",
    join_code: "SERVE2023",
    logo: "/placeholder.svg?height=100&width=100&text=SERVE",
    website: "https://volunteercorps.org",
    email: "help@volunteercorps.org",
    member_count: 120,
  },
  {
    id: "9",
    name: "Robotics Club",
    description:
      "Design, build, and program robots while participating in competitions and industry collaborations!",
    category: "TECHNOLOGY_AND_INNOVATION",
    created_at: new Date("2023-09-05"),
    updated_at: new Date("2023-11-20"),
    owner_id: "user9",
    join_code: "ROBOT2023",
    logo: "/placeholder.svg?height=100&width=100&text=ROBOT",
    website: "https://roboticsclub.tech",
    email: "build@roboticsclub.tech",
    member_count: 45,
  },
  {
    id: "10",
    name: "Mental Health Awareness Alliance",
    description:
      "Promote mental health awareness and well-being through support groups, workshops, and campus-wide campaigns!",
    category: "HEALTH_AND_WELLNESS",
    created_at: new Date("2023-10-01"),
    updated_at: new Date("2023-12-15"),
    owner_id: "user10",
    join_code: "MIND2023",
    logo: "/placeholder.svg?height=100&width=100&text=MIND",
    website: "https://mentalhealthalliance.org",
    email: "support@mentalhealthalliance.org",
    member_count: 90,
  },
  {
    id: "11",
    name: "Multicultural Student Association",
    description:
      "Celebrate cultural diversity through festivals, language exchanges, and educational events!",
    category: "IDENTITY_AND_DIVERSITY",
    created_at: new Date("2023-10-15"),
    updated_at: new Date("2023-12-20"),
    owner_id: "user11",
    join_code: "MULTI2023",
    logo: "/placeholder.svg?height=100&width=100&text=MULTI",
    website: "https://multiculturalassociation.org",
    email: "diversity@multiculturalassociation.org",
    member_count: 85,
  },
  {
    id: "12",
    name: "Campus News Network",
    description:
      "Gain hands-on experience in journalism, broadcasting, and digital media production while covering campus news and events!",
    category: "MEDIA_AND_JOURNALISM",
    created_at: new Date("2023-11-01"),
    updated_at: new Date("2024-01-05"),
    owner_id: "user12",
    join_code: "NEWS2023",
    logo: "/placeholder.svg?height=100&width=100&text=NEWS",
    website: "https://campusnewsnetwork.com",
    email: "editor@campusnewsnetwork.com",
    member_count: 70,
  },
  {
    id: "13",
    name: "Political Science Association",
    description:
      "Foster political awareness and civic engagement through debates, mock elections, and guest speaker events!",
    category: "POLITICAL_AND_ACTIVISM",
    created_at: new Date("2023-11-15"),
    updated_at: new Date("2024-01-20"),
    owner_id: "user13",
    join_code: "POLISCI2023",
    logo: "/placeholder.svg?height=100&width=100&text=POLISCI",
    website: "https://polisciassociation.org",
    email: "engage@polisciassociation.org",
    member_count: 65,
  },
  {
    id: "14",
    name: "Interfaith Dialogue Group",
    description:
      "Promote understanding and respect among different faith traditions through discussions, visits to places of worship, and collaborative projects!",
    category: "RELIGIOUS_AND_SPIRITUAL",
    created_at: new Date("2023-12-01"),
    updated_at: new Date("2024-02-05"),
    owner_id: "user14",
    join_code: "FAITH2023",
    logo: "/placeholder.svg?height=100&width=100&text=FAITH",
    website: "https://interfaithdialogue.org",
    email: "connect@interfaithdialogue.org",
    member_count: 55,
  },
  {
    id: "15",
    name: "Board Game Enthusiasts",
    description:
      "Enjoy regular game nights, tournaments, and game design workshops for lovers of board games, card games, and tabletop RPGs!",
    category: "HOBBIES_AND_INTERESTS",
    created_at: new Date("2023-12-15"),
    updated_at: new Date("2024-02-20"),
    owner_id: "user15",
    join_code: "GAME2023",
    logo: "/placeholder.svg?height=100&width=100&text=GAME",
    website: "https://boardgameclub.com",
    email: "play@boardgameclub.com",
    member_count: 40,
  },
];

const AllGroups = (props: { groups: Group[] }) => {
  const [groups, setGroups] = useState(mockGroups);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "All" || group.category === categoryFilter),
  );

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
              <CardTitle>Hmm... there seems to be a problem.</CardTitle>
              <CardDescription>
                Sadly, we couldn{"'"}t find any clubs with the filters you
                added..
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          filteredGroups.map((group) => (
            <Card key={group.id} className="w-full">
              <CardHeader className="space-y-0 pb-2">
                <div className="mb-4 flex flex-row items-center justify-between">
                  <Avatar>
                    <AvatarImage src={group.logo} />
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
              <CardContent className="mt-1">
                <div className="flex items-center justify-between"></div>
                <p className="font-medium">{group.description}</p>

                <div className="mt-8 grid grid-cols-2 grid-rows-2 xl:w-96">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>{group.member_count} Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>Meets Weekly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-4" />
                    <span>4.8 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>Since 2004</span>
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
