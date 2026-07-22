const WORKER_URL = "https://futbol-live-api.muro-1984-muro.workers.dev";

async function canliMaclar() {
  try {
    const res = await fetch(
      `${WORKER_URL}?endpoint=fixtures?live=all&league=203`
    );

    const data = await res.json();

    const alan = document.getElementById("liveMatches");
    alan.innerHTML = "";

    if (!data.response || data.response.length === 0) {
      alan.innerHTML = "<div class='match'>Şu anda canlı maç yok.</div>";
      return;
    }

    data.response.forEach(mac => {
      alan.innerHTML += `
      <div class="match">
        <span>${mac.teams.home.name}</span>
        <strong>${mac.goals.home} - ${mac.goals.away}</strong>
        <span>${mac.teams.away.name}</span>
        <span class="live">${mac.fixture.status.elapsed}'</span>
      </div>`;
    });

  } catch (err) {
    console.error(err);
  }
}

canliMaclar();
