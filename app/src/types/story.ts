interface storyView {
  id: string;
  userId: string;
  name: string;
  photo?: string;
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
  userId: string;
  name: string;
  photo: string;
  stories: story[];
}

export type { story, storyView, userStories };
