function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  // Sürükleyip bıraktığımız satranç taşı HTML table data (td) elementi üzerine mi bırakıldı kontrolü
  if (ev.target.tagName == "TD") {
    if (ev.target.childElementCount == 0) {
      // Taşı bıraktığımız td elementinin içinde başka elementler yoksa taşı o td hücresine ekle
      ev.target.appendChild(document.getElementById(data));
    } else if (
      ev.target.firstChild.id != data &&
      ev.target.firstChild.id[0] != data[0]
    ) {
      // Taşı bıraktığımız td elementinin içinde başka bir taş varsa ve bu taş karşı takımdansa bu taşı sil.
      ev.target.removeChild(ev.target.firstChild);
      // Silinen taş yerine sürükleyip bıraktığımız taşı ekle.
      ev.target.appendChild(document.getElementById(data));
    }
  } else if (
    // Sürükleyip bıraktığımız taş HTML img elementi üzerine mi bırakıldı kontrolü
    ev.target.tagName == "IMG" &&
    // Sürükleyip bıraktığımız taş kendi üzerine mi bırakıldı kontrolü
    ev.target.id != data &&
    // Sürükleyip bıraktığımız taş kendi takımından başka bir taş üzerine mi bırakıldı kontrolü
    ev.target.id[0] != data[0]
  ) {
    var parent = ev.target.parentNode;
    // Sürükleyip bıraktığımız konumdaki img elementini sil
    ev.target.remove();
    // Sürükleyip bıraktığımız taşı yeni konuma ekle
    parent.appendChild(document.getElementById(data));
  }
}
