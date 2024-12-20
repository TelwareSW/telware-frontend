import { Group, User, userStatus } from "types/admin";

const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "Eddie Brock",
    photo: "https://i.pravatar.cc/70?=0.05",
    accountStatus: userStatus.active,
  },
  {
    id: "2",
    username: "Gwen Stacy",
    photo: "https://i.pravatar.cc/70?=0.06",
    accountStatus: userStatus.active,
  },
  {
    id: "3",
    username: "Mary Jane",
    photo: "https://i.pravatar.cc/70?=0.07",
    accountStatus: userStatus.active,
  },
  {
    id: "4",
    username: "Peter Parker",
    photo: "https://i.pravatar.cc/70?=0.08",
    accountStatus: userStatus.banned,
  },
  {
    id: "5",
    username: "Clark Kent",
    photo: "https://i.pravatar.cc/70?=0.09",
    accountStatus: userStatus.deactivated,
  },
  {
    id: "6",
    username: "Bruce Wayne",
    photo: "https://i.pravatar.cc/70?=0.11",
    accountStatus: userStatus.active,
  },
  {
    id: "7",
    username: "Diana Prince",
    photo: "https://i.pravatar.cc/70?=0.12",
    accountStatus: userStatus.deactivated,
  },
  {
    id: "8",
    username: "Tony Stark",
    photo: "https://i.pravatar.cc/70?=0.13",
    accountStatus: userStatus.deactivated,
  },
  {
    id: "9",
    username: "Steve Rogers",
    photo: "https://i.pravatar.cc/70?=0.14",
    accountStatus: userStatus.banned,
  },
  {
    id: "10",
    username: "Natasha Romanoff",
    photo: "https://i.pravatar.cc/70?=0.15",
    accountStatus: userStatus.active,
  },
  {
    id: "11",
    username: "Wade Wilson",
    photo: "https://i.pravatar.cc/70?=0.36",
    accountStatus: userStatus.active,
  },
];
const MOCK_GROUPS: Group[] = [
  {
    id: "1",
    name: "Avengers",
    picture: "https://i.redd.it/gf9yyhdo08m11.jpg",
    isFilterd: false,
    numberOfMembers: 12,
  },
  {
    id: "2",
    name: "Justice League",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSk0jgB0khxHpWlQ2WIrTWbbCcRVvzXusD-w&s",
    isFilterd: false,
    numberOfMembers: 8,
  },
  {
    id: "3",
    name: "Guardians of the Galaxy",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0TL205opaVnA2dYCebuk552-PP-ROsLgRw&s",
    isFilterd: false,
    numberOfMembers: 4,
  },
  {
    id: "4",
    name: "Power Rangers",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrtYzIiKsxu86ysm1wLFydr5yiTVA05dfHwA&s",
    isFilterd: false,
    numberOfMembers: 6,
  },
  {
    id: "5",
    name: "Teen Titans",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vBXO-BKKBlWT5gV1PzDbUZ4BcS3TGT8NGw&s",
    isFilterd: true,
    numberOfMembers: 5,
  },
  {
    id: "6",
    name: "Ninga Turtles",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlLycnffNMBrxjCKrG80nlmKWW3eAPfbhlow&s",
    isFilterd: false,
    numberOfMembers: 4,
  },
];
export { MOCK_USERS, MOCK_GROUPS };
