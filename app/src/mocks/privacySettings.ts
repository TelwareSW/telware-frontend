import { endPts } from "features/privacy-settings/service/changeSettings";
import { http, HttpResponse } from "msw";
import { activeStatesStrings, privacyStatesStrings } from "types/user";

type requestType = {
  privacy: activeStatesStrings | privacyStatesStrings;
};

export const privacySettingsMock = [
  http.patch<{ path: endPts }, requestType>(
    "/users/privacy/:path",
    async ({ request }) => {
      const body = await request.json();
      if (!body.privacy) return HttpResponse.json({}, { status: 401 });
      return HttpResponse.json({}, { status: 200 });
    }
  ),
];
