const BACKEND_API_URL = 'https://pmc-transport.vercel.app'

async function findClosestStation() {
    const x = parseFloat(document.getElementById('x-coord').value);
    const z = parseFloat(document.getElementById('z-coord').value);

    if (isNaN(x) || isNaN(z)) {
        alert('Veuillez entrer des coordonnées valides.');
        console.error('Coordinates error : X or Z is NaN');
        return;
    }

    const apiUrl = `${BACKEND_API_URL}/api/stations/find`;

    try {
        console.log(`Request sending with coordinates : X=${x}, Z=${z}`);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'my-secret-api-key',
            },
            body: JSON.stringify({ x, z }),
        });

        const responseText = await response.text();
        console.log('Response :', responseText);

        if (!response.ok) {
            console.error(`HTTP error: ${response.status} - ${response.statusText}`);
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = JSON.parse(responseText);
        console.log('Station info:', data);
        updateUIWithStationInfo(data);
    } catch (error) {
        console.error('Station research error:', error);
        alert('Erreur lors de la recherche de la station. Veuillez réessayer.');
    }
}

function updateUIWithStationInfo(data) {
    const stationCode = document.getElementById('station-code');
    const stationName = document.getElementById('station-name');
    const stationX = document.getElementById('station-x');
    const stationZ = document.getElementById('station-z');

    stationCode.textContent = `${data.code}`;
    stationName.textContent = `${data.station}`;
    stationX.textContent = `${data.x}`;
    stationZ.textContent = `${data.z}`;
}

async function findPlayerCoordinates() {
    const player = document.getElementById('player-name').value;

    if (!player) {
        alert('Veuillez entrer un nom de joueur.');
        console.error('Player name error : Empty player name');
        return;
    }

    const apiUrl = `${BACKEND_API_URL}/api/players/location`;

    try {
        console.log(`Request sending with player name : ${player}`);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'my-secret-api-key',
            },
            body: JSON.stringify({ player }),
        });

        const responseText = await response.text();
        console.log('Response :', responseText);

        if (!response.ok) {
            console.error(`HTTP error: ${response.status} - ${response.statusText}`);
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = JSON.parse(responseText);
        console.log('Player location:', data);
        updateUIWithPlayerLocation(data);
    }
    catch (error) {
        console.error('Player location error:', error);
        alert('Erreur lors de la recherche des coordonnées du joueur. Veuillez réessayer.');
    }
}

function updateUIWithPlayerLocation(data) {
    const xCoord = document.getElementById('x-coord');
    const zCoord = document.getElementById('z-coord');

    xCoord.value = data.x;
    zCoord.value = data.z;
}

document.getElementById('find-station-button').addEventListener('click', findClosestStation);
document.getElementById('find-player-coordinates').addEventListener('click', findPlayerCoordinates);