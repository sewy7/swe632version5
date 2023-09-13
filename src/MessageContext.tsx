export interface User {
    id: number;
    name: string;
  }
  

  export interface Post {
    id: number;
    user: User;
    content: string;
    Votes: Votes;
  }

  export interface Votes {
    Count: number;
  }