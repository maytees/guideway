import { format } from "date-fns";
import { CalendarDays, Info, Users } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type GroupWithMembersAndPosts } from "~/lib/types";
import { formatCategory } from "~/lib/utils";

const GroupSidebar = ({ group }: { group: GroupWithMembersAndPosts }) => {
    const upcomingEvents = [
        { id: 1, name: "Weekly Meeting", date: "2024-03-15" },
        { id: 2, name: "Fundraiser Event", date: "2024-03-20" },
        { id: 3, name: "Guest Speaker", date: "2024-03-25" },
    ];

    return (
        <div className="w-3/12 space-y-6">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Group Info
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Category</h4>
                        <Badge variant="secondary" className="mt-1">
                            {formatCategory(group.category)}
                        </Badge>
                    </div>
                    <div>
                        <h4 className="font-semibold">Created</h4>
                        <p className="text-sm text-muted-foreground">
                            {format(new Date(group.created_at), 'MMMM d, yyyy')}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Total Posts</h4>
                        <p className="text-sm text-muted-foreground">{group.posts.length}</p>
                    </div>
                    <Button variant="outline" className="w-full">
                        View Full Details
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Upcoming Events
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {upcomingEvents.map((event) => (
                            <li key={event.id} className="flex justify-between">
                                <span>{event.name}</span>
                                <span className="text-sm text-muted-foreground">
                                    {event.date}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Button variant="link" className="mt-4 w-full">
                        View All Events
                    </Button>
                </CardContent>
            </Card>


            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Members
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex -space-x-2 overflow-hidden">
                        {group.members.slice(0, 5).map((member) => (
                            <Avatar
                                key={member.id}
                                className="inline-block border-2 border-background"
                            >
                                <AvatarImage src={member.image ?? undefined} />
                                <AvatarFallback>{member.name?.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                        ))}
                        {group.members.length > 5 && (
                            <Avatar className="inline-block border-2 border-background">
                                <AvatarFallback>+{group.members.length - 5}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    <Button asChild variant="link" className="mt-4 w-full">
                        <Link href={`/dashboard/groups/${group.id}/members`}>
                            View All Members
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default GroupSidebar;
