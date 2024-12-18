interface User {
  id: string;
  userName: string;
  photo: string;
  status: string;
}
interface Group {
  id: string;
  name: string;
  photo: string;
  membersCount: number;
  filtered: boolean;
}

enum userStatus {
  active = "active",
  banned = "banned",
  deactivated = "deactivated",
}

export type { User, Group };
export { userStatus };
