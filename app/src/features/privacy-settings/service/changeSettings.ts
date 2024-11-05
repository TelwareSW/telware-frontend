import { API_URL } from "@constants";
import { activeStatesStrings, privacyStatesStrings } from "types/sideBar";

enum endPts {
  lastSeenPrivacy = "last-seen",
  storiesSeenPrivacy = "stories",
  profilePhotoPrivacy = "picture",
  readReceiptsPrivacy = "read-receipts",
  addToGroupPrivacy = "invite-permissions",
  addToChannelPrivacy = "invite-permissions",
}

async function changeSettings(data: {
  key: keyof typeof endPts;
  value: privacyStatesStrings | activeStatesStrings;
}) {
  const { key, value } = data;

  const endpt = endPts[key];
  const reqBody = { privacy: value.toLowerCase() };


  const res = await fetch(`${API_URL}/users/privacy/${endpt}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
}

export { changeSettings };
export { endPts };
