import { HttpResponse, delay, http } from "msw";
import { sessionData } from "../data/sessions";

export const userSessionHandler = http.get(
  `${process.env.NEXT_PUBLIC_API_SERVER}/user/sessions`,
  async ({ request }) => {
    await delay(1000);
    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    const accessToken = request.headers.get("Authorization")?.split(" ")[1];
    if (!role) {
      return new HttpResponse(null, { status: 400, statusText: "Bad Request" });
    }
    if (!accessToken || accessToken === "undefined") {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Authorization Error",
      });
    }
    const data = sessionData.filter(
      (e) => e.userID === (role === "host" ? 1 : 2)
    );
    if (data) {
      return HttpResponse.json(data);
    } else {
      return new HttpResponse(null, { status: 404, statusText: "not found" });
    }
  }
);

export const tokenRefreshHandler = http.get(
  `${process.env.NEXT_PUBLIC_API_SERVER}/auth/token-refresh`,
  async ({ request }) => {
    await delay(500);
    const refreshToken = request.headers.get("Authorization")?.split(" ")[1];
    if (!refreshToken || refreshToken === "undefined") {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Authorization Error",
      });
    }
    return new HttpResponse(null, {
      status: 200,
      statusText: "Get new access_token with refreshToken",
      headers: {
        "Set-Cookie": "access_token=123456789",
      },
    });
  }
);
