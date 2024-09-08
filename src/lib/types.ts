import {
  type Comment,
  type Group,
  type Post,
  type Prisma,
  type User,
} from "@prisma/client";

type GroupInclude = {
  members: true;
  pinnedBy: true;
  posts: {
    include: {
      likes: {
        include: {
          user: true;
        };
      };
      comments: {
        include: {
          likes: true;
          author: true;
        };
      };
      author: true;
    };
  };
};

export type GroupWithMembersAndPosts = Prisma.GroupGetPayload<{
  include: GroupInclude;
}>;

export interface GroupWithMembers extends GroupWithMembersAndPosts {}

export interface GroupWithPosts extends Group {
  posts: PostWithAuthor[];
}

export interface PostWithAuthor extends Post {
  author: Prisma.UserGetPayload<{ include: { Post: true } }>;
  likes: User[];
  comments: CommentsWithAuthor[];
}

export interface CommentsWithAuthor extends Comment {
  author: User;
  likes: User[];
}
