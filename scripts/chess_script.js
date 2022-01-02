function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  if (ev.target.tagName == "TD") {
    if (ev.target.childElementCount == 0) {
      ev.target.appendChild(document.getElementById(data));
    } else if (
      ev.target.firstChild.id != data &&
      ev.target.firstChild.id[0] != data[0]
    ) {
      ev.target.removeChild(ev.target.firstChild);
      ev.target.appendChild(document.getElementById(data));
    }
  } else if (
    ev.target.tagName == "IMG" &&
    ev.target.id != data &&
    ev.target.id[0] != data[0]
  ) {
    var parent = ev.target.parentNode;
    ev.target.remove();
    parent.appendChild(document.getElementById(data));
  }
}
