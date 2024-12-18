import { http, HttpResponse } from "msw";
import { MOCK_USERS, MOCK_GROUPS } from "../data/admin";
import { Group, User } from "types/admin";

type BanUserRequestBody = {
  data: string;
};
type BanUserResponseBodySuccess = {
  status: "success";
  message: string;
  data: object | boolean;
};
type BanUserResponseBodyFail = {
  status: "fail" | "error";
  message: string;
  data: object;
};
type BanUserResponseBody = BanUserResponseBodySuccess | BanUserResponseBodyFail;

export const adminMock = [
  http.patch<{ userId: string }, BanUserRequestBody, BanUserResponseBody>(
    "/admin/deactivate/:userId",
    async ({ params }) => {
      const { userId } = params;
      const userIndex = MOCK_USERS.findIndex(
        (user: User) => user.id === userId
      );
      if (userIndex != -1) {
        MOCK_USERS[userIndex].status = "deactivated";
        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json(
        { status: "fail", message: "user not found", data: {} },
        { status: 404 }
      );
    }
  ),
  http.patch<{ userId: string }, BanUserRequestBody, BanUserResponseBody>(
    "/admin/activate/:userId",
    async ({ params }) => {
      const { userId } = params;
      const userIndex = MOCK_USERS.findIndex(
        (user: User) => user.id === userId
      );
      if (userIndex != -1) {
        MOCK_USERS[userIndex].status = "activated";
        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json(
        { status: "fail", message: "user not found", data: {} },
        { status: 404 }
      );
    }
  ),
  http.patch<{ userId: string }, BanUserRequestBody, BanUserResponseBody>(
    "/admin/ban/:userId",
    async ({ params }) => {
      const { userId } = params;
      const userIndex = MOCK_USERS.findIndex(
        (user: User) => user.id === userId
      );
      if (userIndex != -1) {
        MOCK_USERS[userIndex].status = "banned";
        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json(
        { status: "fail", message: "user not found", data: {} },
        { status: 404 }
      );
    }
  ),
  http.patch<{ groupId: string }, BanUserRequestBody, BanUserResponseBody>(
    "/admin/filter/:groupId",
    async ({ params }) => {
      const { groupId } = params;
      const groupIndex = MOCK_GROUPS.findIndex(
        (group: Group) => group.id === groupId
      );
      if (groupIndex != -1) {
        MOCK_GROUPS[groupIndex].filtered = true;
        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json(
        { status: "fail", message: "group not found", data: {} },
        { status: 404 }
      );
    }
  ),
  http.patch<{ groupId: string }, BanUserRequestBody, BanUserResponseBody>(
    "/admin/unfilter/:groupId",
    async ({ params }) => {
      const { groupId } = params;
      const groupIndex = MOCK_GROUPS.findIndex(
        (group: Group) => group.id === groupId
      );
      if (groupIndex != -1) {
        MOCK_GROUPS[groupIndex].filtered = false;
        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json(
        { status: "fail", message: "group not found", data: {} },
        { status: 404 }
      );
    }
  ),

  http.get("/admin/users", async () => {
    return HttpResponse.json(
      {
        data: MOCK_USERS,
      },
      { status: 200 }
    );
  }),
  http.get("/admin/groups", async () => {
    return HttpResponse.json(
      {
        data: MOCK_GROUPS,
      },
      { status: 200 }
    );
  }),
];
