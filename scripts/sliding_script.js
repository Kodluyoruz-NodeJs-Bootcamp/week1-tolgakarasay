let home, destination;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  home = parseInt(ev.target.parentNode.id.slice(1));
  console.log(home);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  destination = parseInt(ev.target.id.slice(1));
  // console.log(destination);

  if (
    // Seçilen resim parçası bir TD elementi üzerine mi sürüklendi kontrolü
    ev.target.tagName == "TD" &&
    // Seçilen resim parçasının sürüklendiği yerde başka bir child element var mı kontrolü
    ev.target.childElementCount == 0 &&
    // Seçilen resim parçası bir adım sağa, sola, aşağı veya yukarı mı sürüklendi kontrolü
    (Math.abs(home - destination) == 1 || Math.abs(home - destination) == 10)
  ) {
    // Resim parçasını sürüklediğimiz table data hücresine ekle
    ev.target.appendChild(document.getElementById(data));
    // Oyun sonucunun yazdığı alanı sıfırla.
    resetBoard();
    // En son yapılan hamleden sonra oyun kazanılmış mı kontrol et
    checkWin();
  }
}

function shuffle() {
  // Bu fonksiyon rasgele 2 resim parçası seçer ve yerlerini birbiriyle değiş tokuş eder. Bu işlemi 10 kere tekrarlar.
  resetBoard();
  for (let i = 0; i < 10; i++) {
    let random1 = Math.floor(Math.random() * 3) + 1;
    let random2 = Math.floor(Math.random() * 3) + 1;
    let id1 = "c" + random1 + random2;
    let address1 = document.getElementById(id1);
    console.log(id1);

    let random3 = Math.floor(Math.random() * 3) + 1;
    let random4 = Math.floor(Math.random() * 3) + 1;
    let id2 = "c" + random3 + random4;
    let address2 = document.getElementById(id2);
    console.log(id2);

    if (address1.childElementCount != 0 && address2.childElementCount != 0) {
      let temp1 = address1.firstChild;
      let temp2 = address2.firstChild;
      address1.innerHTML = "";
      address2.innerHTML = "";
      address1.appendChild(temp2);
      address2.appendChild(temp1);
    }
  }
}

function checkWin() {
  // Bu fonksiyon tüm resim parçalarının doğru konumlarda olup olmadığını kontrol eder.
  let cells = Array.from(document.getElementsByTagName("TD"));
  let count = 0;

  for (let i = 0; i < cells.length; i++) {
    if (
      cells[i].firstChild != null &&
      cells[i].firstChild.id.slice(1) == cells[i].id.slice(1)
    ) {
      count++;
    }
  }

  console.log(count);

  if (count == 8) {
    let board = document.getElementById("score-board");
    board.innerHTML = `<h1 id="announcement">CONGURATULATIONS, YOU WIN!</h1>`;
  }
}

function resetBoard() {
  // Bu fonksiyon oyun sonucunun yazdığı alanı temizler.
  document.getElementById("score-board").innerHTML = "";
}
