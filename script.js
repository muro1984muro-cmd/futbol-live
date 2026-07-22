const WORKER_URL = "https://futbol-live-api.muro-1984-muro.workers.dev";

let eskiSkorlar = {};


// ⚽ Canlı maçları getir

async function canliMaclar() {

  try {

    const res = await fetch(
      `${WORKER_URL}?endpoint=fixtures&live=all&league=203`
    );

    const data = await res.json();

    const alan = document.getElementById("liveMatches");

    alan.innerHTML = "";


    if (!data.response || data.response.length === 0) {

      alan.innerHTML =
      "<div class='match'>Şu anda canlı maç yok.</div>";

      return;

    }


    data.response.forEach(mac => {

      const id = mac.fixture.id;

      const skor =
      `${mac.goals.home}-${mac.goals.away}`;


      // 🥅 Gol bildirimi

      if (eskiSkorlar[id] && eskiSkorlar[id] !== skor) {

        bildirimGonder(
          "🥅 Gol!",
          `${mac.teams.home.name} ${skor} ${mac.teams.away.name}`
        );

      }


      eskiSkorlar[id] = skor;


      alan.innerHTML += `

      <div class="match">

      <span>${mac.teams.home.name}</span>

      <strong>${skor}</strong>

      <span>${mac.teams.away.name}</span>

      <span class="live">
      ${mac.fixture.status.elapsed}'
      </span>

      </div>

      `;


    });


  } catch(err){

    console.error(err);

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


const buton = document.getElementById("bildirimAc");


if(buton){


buton.onclick = async()=>{


const izin = await Notification.requestPermission();


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
"⚽ Futbol Live",
"Futbol Live yeni uygulaması açıldı! Hoş geldiniz."
);


},3000);


}


});




// İlk açılış

canliMaclar();


// Her 30 saniyede kontrol

setInterval(canliMaclar,30000);
setTimeout(function(){

bildirimGonder(
"⚽ Test Bildirimi",
"Futbol Live bildirim sistemi çalışıyor!"
);

},5000);
navigator.serviceWorker.ready.then(function(registration){

setTimeout(function(){

registration.showNotification(
"⚽ Futbol Live",
{
body:"Test bildirimi çalışıyor!",
icon:"logo.png"
}
);

},5000);

});
