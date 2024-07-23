import { HttpResponse, delay, http } from "msw";

export const userSessionHandler = http.get(
  `${process.env.NEXT_PUBLIC_API_SERVER}/user/sessions`,
  async ({ request }) => {
    await delay(1000);
    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    const accessToken = request.headers.get("access_token");
    if (!role) {
      return new HttpResponse(null, { status: 400, statusText: "Bad Request" });
    }
    if (!accessToken) {
      return new HttpResponse(null, {
        status: 403,
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
