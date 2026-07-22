const API_KEY = "BURAYA_API_FOOTBALL_KEYİNİ_YAZ";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    const endpoint = url.searchParams.get("endpoint");

    if (endpoint && endpoint.startsWith("fixtures")) {

      const apiUrl = "https://v3.football.api-sports.io/fixtures?live=all&league=203";

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
