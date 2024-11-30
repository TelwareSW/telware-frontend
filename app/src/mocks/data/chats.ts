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
  members: Member[];
  type: "private" | "group" | "channel";
  numberOfMembers: number;
};

export const allChats: Chat[] = [
  {
    _id: "1",
    isSeen: false,
    members: [
      {
        _id: "member1",
        username: "alice_smith",
        screenFirstName: "Alice",
        screenLastName: "Smith",
        phoneNumber: "+1234567890",
        photo: "alice.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "2",
    isSeen: false,
    members: [
      {
        _id: "member2",
        username: "bob_jones",
        screenFirstName: "Bob",
        screenLastName: "Jones",
        phoneNumber: "+1987654321",
        photo: "bob.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "3",
    isSeen: false,
    members: [
      {
        _id: "member3",
        username: "charlie_brown",
        screenFirstName: "Charlie",
        screenLastName: "Brown",
        phoneNumber: "+1567890123",
        photo: "charlie.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "4",
    isSeen: false,
    members: [
      {
        _id: "member4",
        username: "david_miller",
        screenFirstName: "David",
        screenLastName: "Miller",
        phoneNumber: "+1456789012",
        photo: "david.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "5",
    isSeen: false,
    members: [
      {
        _id: "member5",
        username: "eve_wilson",
        screenFirstName: "Eve",
        screenLastName: "Wilson",
        phoneNumber: "+1345678901",
        photo: "eve.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "6",
    isSeen: false,
    members: [
      {
        _id: "member6",
        username: "frank_garcia",
        screenFirstName: "Frank",
        screenLastName: "Garcia",
        phoneNumber: "+1234567890",
        photo: "frank.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "7",
    isSeen: false,
    members: [
      {
        _id: "member7",
        username: "grace_lee",
        screenFirstName: "Grace",
        screenLastName: "Lee",
        phoneNumber: "+1876543210",
        photo: "grace.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "8",
    isSeen: false,
    members: [
      {
        _id: "member8",
        username: "hannah_davis",
        screenFirstName: "Hannah",
        screenLastName: "Davis",
        phoneNumber: "+1765432109",
        photo: "hannah.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "9",
    isSeen: false,
    members: [
      {
        _id: "member9",
        username: "ivy_martinez",
        screenFirstName: "Ivy",
        screenLastName: "Martinez",
        phoneNumber: "+1654321098",
        photo: "ivy.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "10",
    isSeen: false,
    members: [
      {
        _id: "member10",
        username: "jack_anderson",
        screenFirstName: "Jack",
        screenLastName: "Anderson",
        phoneNumber: "+1543210987",
        photo: "jack.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "11",
    isSeen: false,
    members: [
      {
        _id: "member11",
        username: "kara_thomas",
        screenFirstName: "Kara",
        screenLastName: "Thomas",
        phoneNumber: "+1432109876",
        photo: "kara.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "12",
    isSeen: false,
    members: [
      {
        _id: "member12",
        username: "liam_johnson",
        screenFirstName: "Liam",
        screenLastName: "Johnson",
        phoneNumber: "+1321098765",
        photo: "liam.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "13",
    isSeen: false,
    members: [
      {
        _id: "member13",
        username: "mia_white",
        screenFirstName: "Mia",
        screenLastName: "White",
        phoneNumber: "+1210987654",
        photo: "mia.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "14",
    isSeen: false,
    members: [
      {
        _id: "member14",
        username: "noah_robinson",
        screenFirstName: "Noah",
        screenLastName: "Robinson",
        phoneNumber: "+1109876543",
        photo: "noah.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
  {
    _id: "15",
    isSeen: false,
    members: [
      {
        _id: "member15",
        username: "olivia_clark",
        screenFirstName: "Olivia",
        screenLastName: "Clark",
        phoneNumber: "+1098765432",
        photo: "olivia.jpg",
        status: "active",
        isAdmin: false,
        Role: "member",
      },
    ],
    type: "private",
    numberOfMembers: 1,
  },
];
