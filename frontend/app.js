async function findClosestStation() {
    const x = parseFloat(document.getElementById('x-coord').value);
    const y = parseFloat(document.getElementById('y-coord').value);

    if (isNaN(x) || isNaN(y)) {
        alert('Veuillez entrer des coordonnées valides.');
        console.error('Coordinates error : X or Y is NaN');
        return;
    }

    const apiUrl = 'http://localhost:3000/api/stations/find';

    try {
        console.log(`Request sending with coordinates : X=${x}, Y=${y}`);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'my-secret-api-key',
            },
            body: JSON.stringify({ x, y }),
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
    const stationY = document.getElementById('station-y');

    stationCode.textContent = `${data.code}`;
    stationName.textContent = `${data.station}`;
    stationX.textContent = `${data.x}`;
    stationY.textContent = `${data.y}`;
}

document.getElementById('find-station-button').addEventListener('click', findClosestStation);