interface story {
  id: string;
  userId?: string;
  content: string;
  timestamp: string;
  caption?: string;
  views?: string[];
  viewed?: boolean;
}
interface userStories {
  userId: string;
  userId: string;
  name: string;
  photo: string;
  photo: string;
  stories: story[];
}

export type { story, userStories };
