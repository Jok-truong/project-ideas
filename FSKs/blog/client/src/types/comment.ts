type TCreateComment = {
  token: string;
  desc: string;
  slug: string;
  parent: any;
  replyOnUser: any;
};

type TUpdateComment = {
  token: string;
  desc?: string;
  check?: boolean;
  commentId: string;
};

type TAffectedComment = {
  type: string;
  _id: string;
} | null;
