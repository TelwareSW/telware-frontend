import { activeStatesStrings, privacyStatesStrings } from "types/user";

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
  const reqBody = { privacy: value };

  const res = await fetch(`/users/privacy/${endpt}`, {
    method: "PATCH",
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
