const API_KEY = "e639d1554da4579b85e63e33c3db94f1";

export default {
  async fetch(request) {

    const url = new URL(request.url);

    const endpoint = url.searchParams.get("endpoint");
    const live = url.searchParams.get("live");
    const league = url.searchParams.get("league");

    if (endpoint === "fixtures") {

      const apiUrl =
        `https://v3.football.api-sports.io/fixtures?live=${live}&league=${league}`;

      const response = await fetch(apiUrl, {
        headers: {
          "x-apisports-key": API_KEY
        }
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response("Futbol Live API çalışıyor!");
  }
};
