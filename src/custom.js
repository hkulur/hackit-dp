function allowDrop(ev) {
    if (!ev) return 0;
    ev.preventDefault();
}

function drag(ev) {
	if (!ev) return 0;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    if (!ev) return 0;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}