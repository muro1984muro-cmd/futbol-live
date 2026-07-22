const WORKER_URL = "https://futbol-live-api.muro-1984-muro.workers.dev";

let eskiSkorlar = {};


// ⚽ Canlı maçları getir

async function canliMaclar() {

  try {

    const res = await fetch(
      `${WORKER_URL}?endpoint=fixtures&live=all`
    );


    const data = await res.json();


    const alan = document.getElementById("liveMatches");


    if(!alan) return;


    alan.innerHTML = "";


    if (!data.response || data.response.length === 0) {

      alan.innerHTML =
      "<div class='match'>Şu anda canlı maç yok.</div>";

      return;

    }



    data.response.forEach(mac => {


      const id = mac.fixture.id;


      const skor =
      `${mac.goals.home ?? 0}-${mac.goals.away ?? 0}`;



      // 🥅 Gol kontrolü

      if (eskiSkorlar[id] && eskiSkorlar[id] !== skor) {


        bildirimGonder(

          "🥅 Gol oldu!",

          `${mac.teams.home.name} ${skor} ${mac.teams.away.name}`

        );


      }



      eskiSkorlar[id] = skor;



      const dakika =
      mac.fixture.status.elapsed 
      ? mac.fixture.status.elapsed + "'"
      : "Başlamadı";




      alan.innerHTML += `

      <div class="match">


      <span class="live">
      🔴 CANLI ${dakika}
      </span>


      <h3>
      ${mac.teams.home.name}
      🆚
      ${mac.teams.away.name}
      </h3>


      <p>
      ⚽ Skor:
      <strong>${skor}</strong>
      </p>


      </div>

      `;


    });



  } catch(err) {


    console.error(
      "Canlı maç hatası:",
      err
    );


  }


}





// 🔔 Bildirim gönder

function bildirimGonder(baslik, mesaj){


  if(Notification.permission === "granted"){


    new Notification(baslik,{

      body: mesaj,

      icon:"logo.png"

    });


  }


}







// 🔔 Bildirim sistemi

window.addEventListener("load",()=>{


const buton =
document.getElementById("bildirimAc");



if(buton){


buton.onclick = async()=>{


const izin =
await Notification.requestPermission();



if(izin === "granted"){


bildirimGonder(

"⚽ Futbol Live",

"Bildirimler aktif edildi!"

);


}



};



}





// 🚀 Uygulama açılış bildirimi

if(Notification.permission === "granted"){


setTimeout(()=>{


bildirimGonder(

"⚽ Futbol Live yayında!",

"Canlı maçları takip etmeye başla."

);


},3000);



}



});







// İlk çalıştır

canliMaclar();



// Her 30 saniyede yenile

setInterval(

canliMaclar,

30000

);
