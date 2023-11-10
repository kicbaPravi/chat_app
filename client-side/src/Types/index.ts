export interface Comment {
  id: string;
  parent_id?: string;
  author: {
    name: string;
    picture: string;
  };
  text: string;
  timestamp: number;
}

export interface Response {
  data: {
    comments: Comment[];
  };
}
