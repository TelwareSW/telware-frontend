export type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  lastSeen?: string;
  image?: string;
};

export const allChats: Chat[] = [
  {
    id: 1,
    name: "Alice",
    lastMessage: "See you soon!",
    timestamp: "1h ago",
    lastSeen: "10 minutes ago",
    image:
      "https://i.pinimg.com/564x/26/76/a1/2676a1898da6edae9fc648c94332903f.jpg",
  },
  {
    id: 2,
    name: "Bob",
    lastMessage: "Let's meet tomorrow.",
    timestamp: "2h ago",
    lastSeen: "30 minutes ago",
  },
  {
    id: 3,
    name: "Charlie",
    lastMessage: "Hello!",
    timestamp: "3h ago",
    lastSeen: "45 minutes ago",
  },
  {
    id: 4,
    name: "David",
    lastMessage: "Good morning!",
    timestamp: "4h ago",
    lastSeen: "1 hour ago",
  },
  {
    id: 5,
    name: "Eve",
    lastMessage: "See you at 5pm.",
    timestamp: "5h ago",
    lastSeen: "1 hour ago",
  },
  {
    id: 6,
    name: "Frank",
    lastMessage: "I'm on my way.",
    timestamp: "6h ago",
    lastSeen: "2 hours ago",
  },
  {
    id: 7,
    name: "Grace",
    lastMessage:
      "How are you? a very long message to test if the text is truncated correctly",
    timestamp: "7h ago",
    lastSeen: "3 hours ago",
  },
  {
    id: 8,
    name: "Hannah",
    lastMessage: "Let's catch up soon!",
    timestamp: "8h ago",
    lastSeen: "4 hours ago",
  },
  {
    id: 9,
    name: "Ivy",
    lastMessage: "Thanks for your help!",
    timestamp: "9h ago",
    lastSeen: "5 hours ago",
  },
  {
    id: 10,
    name: "Jack",
    lastMessage: "Can't wait to see you!",
    timestamp: "10h ago",
    lastSeen: "6 hours ago",
  },
  {
    id: 11,
    name: "Kara",
    lastMessage: "Talk soon.",
    timestamp: "11h ago",
    lastSeen: "7 hours ago",
  },
  {
    id: 12,
    name: "Liam",
    lastMessage: "I'll send the details.",
    timestamp: "12h ago",
    lastSeen: "8 hours ago",
  },
  {
    id: 13,
    name: "Mia",
    lastMessage: "Let's go for a walk.",
    timestamp: "13h ago",
    lastSeen: "9 hours ago",
  },
  {
    id: 14,
    name: "Noah",
    lastMessage: "I agree with you.",
    timestamp: "14h ago",
    lastSeen: "10 hours ago",
  },
  {
    id: 15,
    name: "Olivia",
    lastMessage: "I'll get back to you.",
    timestamp: "15h ago",
    lastSeen: "11 hours ago",
  },
];
