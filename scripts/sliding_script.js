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
  console.log(destination);

  if (
    ev.target.tagName == "TD" &&
    ev.target.childElementCount == 0 &&
    (Math.abs(home - destination) == 1 || Math.abs(home - destination) == 10)
  ) {
    ev.target.appendChild(document.getElementById(data));
    resetBoard();
    checkWin();
  }
}

function shuffle() {
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
  document.getElementById("score-board").innerHTML = "";
}
