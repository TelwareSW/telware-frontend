interface storyView {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  seenTime: string;
}
interface story {
  id: string;
  userId?: string;
  content: string;
  timestamp: string;
  caption?: string;
  views?: storyView[];
  viewed?: boolean;
}
interface userStories {
  id: string;
  name: string;
  avatar: string;
  stories: story[];
}

export type { story, storyView, userStories };
