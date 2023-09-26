export interface User {
    id: number;
    name: string;
  }
  

  export interface Post {
    id: number;
    user: User;
    content: string;
    votes: {
      upvotes: number;
      downvotes: number;
    };
    timestamp: string;
  }
  