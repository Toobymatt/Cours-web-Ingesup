function play(idPlayer, control) {
    var player = document.querySelector('#' + idPlayer);
    if (player.paused) { //vérifie si la lecture est en pause en fonction de ça on fait play() ou pause()
        player.play(); 
        control.textContent = 'Pause';
    } else {
        player.pause();
        control.textContent = 'Play';
    }
}
function resume(idPlayer) { //permet de remettre la lecture à zéro
    var player = document.querySelector('#' + idPlayer);
    player.currentTime = 0;
    player.pause();
}
function volume(idPLayer, vol) { //fonction associée au volume
    var player = document.querySelector('#' + idPLayer);
    player.volume = vol;
}
function update(player) {
    var duration = player.duration; //Durée totale
    var time = player.currentTime;  //Temps écoulé, retourne une valeur décimale
    var fraction = time / duration;
    var percent = Math.ceil(fraction * 100); //Math.ceil() permet d'arrondir
    var progress = document.querySelector('#progressBar');
    progress.style.width = percent + '%';
    progress.textContent = percent + '%';
    document.querySelector('#progressTime').textContent = formatTime(time);
}
function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins = Math.floor((time % 3600) / 60);
    var secs = Math.floor(time % 60);
    if (secs < 10) {
        secs = "0" + mins;
    }
    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }
        return hours + ":" + mins + ":" + secs; //hh:mm:ss
    } else {
        return mins + ":" + secs; //mm:ss
    }
}
function getMousePosition(event) { //retourne les positions X et Y du curseur
    if (event.pageX) {
        return {
            x : event.pageX, //ces deux lignes retournent les 
            y : event.pageY //positions sur les axes X et Y de l'objet event
        };
    } else {
        return {
            x : event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            y : event.clientY + document.body.scrollTop + document.documentElement.scrollTop //parce qu'IE c'est chiant on doit faire ces deux lignes :(
        };
    }
}

