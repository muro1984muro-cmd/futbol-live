const WORKER_URL = "https://futbol-live-api.muro-1984-muro.workers.dev";

async function canliMaclar() {

  try {

    const res = await fetch(`${WORKER_URL}?endpoint=fixtures`);

    const data = await res.json();

    const alan = document.getElementById("liveMatches");

    if (!alan) return;

    alan.innerHTML = "";

    if (!data.response || data.response.length === 0) {

      alan.innerHTML = `
      <div class="match">
        <span>Bugün gösterilecek maç bulunamadı.</span>
      </div>`;
      return;
    }

    data.response.forEach(mac => {

      const ev = mac.teams.home.name;
      const dep = mac.teams.away.name;

      const skor =
        `${mac.goals.home ?? "-"} - ${mac.goals.away ?? "-"}`;

      const dakika =
        mac.fixture.status.elapsed
          ? mac.fixture.status.elapsed + "'"
          : "📅 Yaklaşan Maç";

      alan.innerHTML += `
        <div class="match">

          <span class="live">${dakika}</span>

          <h3>${ev} 🆚 ${dep}</h3>

          <p><strong>${skor}</strong></p>

        </div>
      `;
    });

  } catch (err) {

    document.getElementById("liveMatches").innerHTML =
      "<div class='match'>Veriler alınamadı.</div>";

    console.error(err);
  }
}

window.onload = () => {
  canliMaclar();

  setInterval(canliMaclar,60000);
};
