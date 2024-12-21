enum userStatus {
  active = "active",
  banned = "banned",
  deactivated = "deactivated",
}
interface User {
  id: string;
  username: string;
  photo: string;
  accountStatus: userStatus;
}
interface Group {
  id: string;
  name: string;
  picture: string;
  isFilterd: boolean;
  numberOfMembers: number;
}

export type { User, Group };
export { userStatus };
