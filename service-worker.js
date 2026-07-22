self.addEventListener("install", function() {
  console.log("Futbol Live bildirim sistemi kuruldu");
});


self.addEventListener("activate", function() {
  console.log("Futbol Live aktif");
});


self.addEventListener("push", function(event) {

  let veri = {
    title: "⚽ Futbol Live",
    body: "Yeni bildirim var!"
  };


  if(event.data){
    veri = event.data.json();
  }


  event.waitUntil(

    self.registration.showNotification(
      veri.title,
      {
        body: veri.body,
        icon: "logo.png"
      }
    )

  );

});
