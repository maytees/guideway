"use client";
import { type Group } from "@prisma/client";
import { Mail, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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

const mockGroups = [
  {
    id: "1",
    name: "Computer Science Club",
    description:
      "A group for CS enthusiasts to share knowledge and collaborate on projects. Members meet regularly to discuss the latest trends in technology and work on coding challenges together. The club also hosts workshops and invites guest speakers from the tech industry to provide valuable insights and networking opportunities.collaborate on projects. Members meet regularly to discuss the latest trends in technology and work on coding challenges together. The club also hosts workshops and invites guest speakers from the tech industry to provide valuable insights and networking opportunities. ",
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
      "Dedicated to promoting environmental sustainability and conservation efforts. Members organize local clean-up initiatives and awareness campaigns on campus. The club also partners with community organizations to implement eco-friendly practices in the area.",
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
      "A platform for students to hone their public speaking and critical thinking skills. The society holds regular debates on current affairs and philosophical topics. Members participate in inter-collegiate debate competitions and organize an annual debate tournament.",
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
      "A community of artists across various mediums, including painting, sculpture, and digital art. The collective organizes exhibitions, workshops, and collaborative projects. Members have access to shared studio space and resources for their artistic endeavors.",
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
      "A group dedicated to promoting physical health and wellness. Members participate in group workouts, share nutrition tips, and organize sports tournaments. The club also arranges fitness challenges and invites fitness experts for workshops.",
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
      "A community for aspiring entrepreneurs and business enthusiasts. The network organizes startup pitch events, mentorship programs, and networking sessions with successful entrepreneurs. Members collaborate on business ideas and participate in business plan competitions.",
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
      "A group for cinema enthusiasts to explore and discuss various genres and eras of film. The society hosts weekly movie screenings followed by discussions, organizes film festivals, and invites filmmakers for Q&A sessions. Members also collaborate on short film projects.",
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
      "A service-oriented group committed to making a positive impact in the community. Members participate in various volunteer activities, including tutoring underprivileged children, organizing food drives, and assisting at local shelters. The corps also coordinates with NGOs for larger community service projects.",
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
      "A group for robotics enthusiasts to design, build, and program robots. Members work on various robotics projects, participate in robotics competitions, and organize workshops on topics like Arduino, Raspberry Pi, and AI. The club also collaborates with industry partners for internship opportunities.",
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
      "A supportive community dedicated to promoting mental health awareness and well-being. The alliance organizes support groups, mindfulness workshops, and stress management seminars. They also work to reduce stigma around mental health issues through campus-wide campaigns and events.",
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
      "A group celebrating cultural diversity and promoting intercultural understanding. The association organizes cultural festivals, language exchange programs, and educational events about different cultures and traditions. They also advocate for inclusive policies on campus.",
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
      "A student-run media organization covering campus news, events, and issues. Members gain hands-on experience in journalism, broadcasting, and digital media production. The network produces a weekly newspaper, operates a radio station, and maintains an online news portal.",
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
      "A non-partisan group fostering political awareness and civic engagement. The association organizes debates on current political issues, hosts mock elections, and invites political speakers from various ideologies. They also encourage students to participate in local and national political processes.",
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
      "A community promoting understanding and respect among different faith traditions. The group organizes interfaith discussions, visits to various places of worship, and collaborative community service projects. They also work to foster a more inclusive and tolerant campus environment.",
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
      "A club for lovers of board games, card games, and tabletop RPGs. The group hosts regular game nights, organizes tournaments, and introduces members to new and classic games. They also design and playtest their own games, fostering creativity and strategic thinking.",
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
  const [categoryFilter, setCategoryFilter] = useState("All");
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

      {filteredGroups.length == 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Hmm... there seems to be a problem.</CardTitle>
            <CardDescription>
              Sadly, we couldn{"'"}t find any clubs with the filters you added..
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        filteredGroups.map((group) => (
          <Card key={group.id} className="mb-10">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="flex flex-row justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZuT1CDTg-N6EMe8cAlh000s1VjUxeVbnKw&s"
                      }
                    />
                    <AvatarFallback>
                      {group.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{group.name}</span>
                </div>
                <div className="flex items-center text-lg">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{group.member_count}</span>
                </div>
              </CardTitle>
              <CardDescription>
                {group.category.replace(/_/g, " ")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between"></div>
              <p>{group.description}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-between space-y-5">
              <div className="flex flex-row gap-6">
                {/* Map club socials... */}
                <Link
                  href="insta"
                  target="_blank"
                  className="transition-all duration-150 ease-in-out hover:scale-110"
                >
                  <FaInstagram className="size-6" />
                </Link>
                <Link
                  href="insta"
                  target="_blank"
                  className="transition-all duration-150 ease-in-out hover:scale-110"
                >
                  <FaTiktok className="size-6" />
                </Link>
                <Link
                  href="insta"
                  target="_blank"
                  className="transition-all duration-150 ease-in-out hover:scale-110"
                >
                  <FaFacebook className="size-6" />
                </Link>
                <Link
                  href="insta"
                  target="_blank"
                  className="transition-all duration-150 ease-in-out hover:scale-110"
                >
                  <Mail className="size-6" />
                </Link>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="px-16 max-md:w-full"
              >
                Open
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default AllGroups;
