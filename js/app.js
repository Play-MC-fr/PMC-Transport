import {loadMinetroStations, minetroStations} from "./dataManager.js";


function findClosestStation() {
    const x = parseFloat(document.getElementById('x-coord').value);
    const y = parseFloat(document.getElementById('y-coord').value);

    if (isNaN(x) || isNaN(y)) {
        alert('Veuillez entrer des coordonnées valides.');
        console.error('Coordinates error : X or Y is NaN');
        return;
    }

    console.log(`Recherche de la station la plus proche avec les coordonnées : X=${x}, Y=${y}`);

    let closestStation = null;
    let minDistance = Infinity;

    for (const station of minetroStations) {
        const distance = Math.sqrt(Math.pow(station.x - x, 2) + Math.pow(station.y - y, 2));
        if (distance < minDistance) {
            minDistance = distance;
            closestStation = station;
        }
    }

    if (closestStation) {
        updateUIWithStationInfo(closestStation);
    } else {
        alert('Aucune station trouvée.');
    }
}

function updateUIWithStationInfo(data) {
    const stationCode = document.getElementById('station-code');
    const stationName = document.getElementById('station-name');
    const stationX = document.getElementById('station-x');
    const stationY = document.getElementById('station-y');

    stationCode.textContent = `${data.code}`;
    stationName.textContent = `${data.station}`;
    stationX.textContent = `${data.x}`;
    stationY.textContent = `${data.y}`;
}

loadMinetroStations().then(() => {
    document.getElementById('find-station-button').addEventListener('click', findClosestStation);
});