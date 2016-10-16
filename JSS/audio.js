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
function getPosition(element) { //récupérer les coordonnés d'un élément
    var top = 0, left = 0;
    while (element) {
        left += element.offsetLeft; //permet de connaître le nombre de pixels sur l'axe horizontal dont est décalé un élément enfant par rapport à  son parent
        top += element.offsetTop; //pareil mais pour le décalage vertical
        element = element.offsetParent; //retourne le ^premier élément positionné, utilisé pour tout ce qui concerne les mesures
    }
    return {
        x: left,
        y: top
    };
}
function clickProgress(idPLayer,control, event) {
    var parent = getPosition(control); //la position absolue de la progressBar
    var target = getMousePosition(event); //l'endroit de la progressBar où on a cliqué
    var player = document.querySelector('#' + idPLayer);
    var x = traget.x - parent.x; // récupère la distance x, entre le bord gauche de la barre et l'endroit où on a cliqué
    var wrapperWidth = document.querySelector('#progressBarControl').offsetWidth;
    var percent = Math.ceil((x / wrapperWidth) * 100); //divise x par la largeur totale du conteneur de la barre de progression et multiplie par 100 pour avoir un pourcentage
    var duration = player.duration;
    player.curentTime = (duration * percent) / 100; //calcul le currentTime en multipliant le temps total de la chanson par le pourcentage et divise par 100
}

