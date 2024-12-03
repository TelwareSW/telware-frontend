export type Member = {
  _id: string;
  username: string;
  screenFirstName: string;
  screenLastName: string;
  phoneNumber: string;
  photo: string;
  status: string;
  isAdmin: boolean;
  Role: "member" | "admin" | "creator";
};

export type Chat = {
  _id: string;
  isSeen: boolean;
  members: string[];
  type: "private" | "group" | "channel";
  numberOfMembers: number;
};

export type ChatDataType = {
  chats: Chat[];
  members: Member[];
  lastMessages: {
    chatId: string;
    lastMessage: {
      _id: string;
      content: string;
      senderId: string;
      timestamp: string;
    };
  }[];
};

export const allChats: Chat[] = [
  {
    _id: "1",
    isSeen: false,
    members: ["1", "2"],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "2",
    isSeen: false,
    members: ["2", "1"],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "3",
    isSeen: false,
    members: ["3"],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "4",
    isSeen: false,
    members: ["4"],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "5",
    isSeen: false,
    members: ["5"],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "6",
    isSeen: false,
    members: ["6"],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "7",
    isSeen: false,
    members: ["7"],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "8",
    isSeen: false,
    members: ["8"],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "9",
    isSeen: false,
    members: ["9"],
    type: "private",
    numberOfMembers: 1,
  },
];

export const members: Member[] = [
  {
    _id: "1",
    username: "alice_smith",
    screenFirstName: "Alice",
    screenLastName: "Smith",
    phoneNumber: "+1234567890",
    photo: "alice.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "2",
    username: "bob_jones",
    screenFirstName: "Bob",
    screenLastName: "Jones",
    phoneNumber: "+1987654321",
    photo: "bob.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "3",
    username: "charlie_brown",
    screenFirstName: "Charlie",
    screenLastName: "Brown",
    phoneNumber: "+1567890123",
    photo: "charlie.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "4",
    username: "david_miller",
    screenFirstName: "David",
    screenLastName: "Miller",
    phoneNumber: "+1456789012",
    photo: "david.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "5",
    username: "eve_wilson",
    screenFirstName: "Eve",
    screenLastName: "Wilson",
    phoneNumber: "+1345678901",
    photo: "eve.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "6",
    username: "frank_garcia",
    screenFirstName: "Frank",
    screenLastName: "Garcia",
    phoneNumber: "+1234567890",
    photo: "frank.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "7",
    username: "grace_lee",
    screenFirstName: "Grace",
    screenLastName: "Lee",
    phoneNumber: "+1876543210",
    photo: "grace.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "8",
    username: "hannah_davis",
    screenFirstName: "Hannah",
    screenLastName: "Davis",
    phoneNumber: "+1765432109",
    photo: "hannah.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "9",
    username: "ivy_martinez",
    screenFirstName: "Ivy",
    screenLastName: "Martinez",
    phoneNumber: "+1654321098",
    photo: "ivy.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "10",
    username: "jack_anderson",
    screenFirstName: "Jack",
    screenLastName: "Anderson",
    phoneNumber: "+1543210987",
    photo: "jack.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "11",
    username: "kara_thomas",
    screenFirstName: "Kara",
    screenLastName: "Thomas",
    phoneNumber: "+1432109876",
    photo: "kara.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "12",
    username: "liam_johnson",
    screenFirstName: "Liam",
    screenLastName: "Johnson",
    phoneNumber: "+1321098765",
    photo: "liam.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "13",
    username: "mia_white",
    screenFirstName: "Mia",
    screenLastName: "White",
    phoneNumber: "+1210987654",
    photo: "mia.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "14",
    username: "noah_robinson",
    screenFirstName: "Noah",
    screenLastName: "Robinson",
    phoneNumber: "+1109876543",
    photo: "noah.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
  {
    _id: "15",
    username: "olivia_clark",
    screenFirstName: "Olivia",
    screenLastName: "Clark",
    phoneNumber: "+1098765432",
    photo: "olivia.jpg",
    status: "active",
    isAdmin: false,
    Role: "member",
  },
];

export const lastMessages = [
  {
    chatId: "1",
    lastMessage: {
      content: "Hello, Alice!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
  {
    chatId: "2",
    lastMessage: {
      content: "Hi, Bob!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
  {
    chatId: "3",
    lastMessage: {
      content: "Hello, Charlie!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
  {
    chatId: "4",
    lastMessage: {
      content: "Hi, David!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
  {
    chatId: "5",
    lastMessage: {
      content: "Hello, Eve!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
  {
    chatId: "6",
    lastMessage: {
      content: "Hi, Frank!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
  {
    chatId: "7",
    lastMessage: {
      content: "Hello, Grace!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
  {
    chatId: "8",
    lastMessage: {
      content: "Hi, Hannah!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
  {
    chatId: "9",
    lastMessage: {
      content: "Hello, Ivy!",
      timestaamp: "2021-09-01T12:00:00.000Z",
    },
  },
];
