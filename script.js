const API_KEY = "e639d1554da4579b85e63e33c3db94f1";

const headers = {
  "x-apisports-key": API_KEY
};

// Canlı Maçlar
async function canliMaclar() {
  try {
    const res = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      { headers }
    );

    const data = await res.json();

    const alan = document.getElementById("liveMatches");

    alan.innerHTML = "";

    if (data.response.length === 0) {
      alan.innerHTML = "<p>Şu anda canlı maç yok.</p>";
      return;
    }

    data.response.forEach(mac => {
      alan.innerHTML += `
      <div class="match">
        <span>${mac.teams.home.name}</span>
        <strong>${mac.goals.home} - ${mac.goals.away}</strong>
        <span>${mac.teams.away.name}</span>
        <span class="live">${mac.fixture.status.elapsed}'</span>
      </div>
      `;
    });

  } catch (e) {
    console.log(e);
  }
}

// Süper Lig Puan Durumu
async function puanDurumu() {

  try {

    const res = await fetch(
      "https://v3.football.api-sports.io/standings?league=203&season=2026",
      { headers }
    );

    const data = await res.json();

    const table = document.getElementById("puan");

    table.innerHTML = "";

    data.response[0].league.standings[0].forEach(takim=>{

      table.innerHTML += `
      <tr>
        <td>${takim.rank}</td>
        <td>${takim.team.name}</td>
        <td>${takim.points}</td>
      </tr>
      `;

    });

  } catch(e){
    console.log(e);
  }

}

canliMaclar();
puanDurumu();
