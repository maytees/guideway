import {
  type Comment,
  type Group,
  type Prisma,
  type User,
} from "@prisma/client";

export type LoginActions = "EMAIL_NOT_VERIFIED";

export type GroupInclude = {
  members: true;
  pinnedBy: true;
  posts: {
    include: {
      tags: true;
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

export type UserWithPosts = Prisma.UserGetPayload<{
  include: {
    posts: true;
    groups: {
      include: {
        members: true;
      };
    };
  };
}>;

export type GroupWithMembersAndPosts = Prisma.GroupGetPayload<{
  include: GroupInclude;
}>;

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: {
    tags: true;
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
}>;

export type GroupMembers = User[];

export type GroupPosts = PostWithAuthor[];

export type PostAuthor = Prisma.UserGetPayload<{ include: { Post: true } }>;

export type PostLikes = User[];

export type PostComments = CommentsWithAuthor[];

export type CommentAuthor = User;

export type CommentLikes = User[];

export interface GroupWithMembers extends GroupWithMembersAndPosts {
  members: GroupMembers;
}

export interface GroupWithPosts extends Group {
  posts: GroupPosts;
}

export interface CommentsWithAuthor extends Comment {
  author: CommentAuthor;
  likes: CommentLikes;
}

export type Tag = {
  value: string; // Text
  color: string; // Hex color of bg maybe?
};
