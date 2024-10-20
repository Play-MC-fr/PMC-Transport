export let minetroStations = [];
export let netherAxes = [];

export async function loadMinetroStations() {
    const response = await fetch('data/minetro_stations.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);

    for (const row of rows) {
        const [code, station, x, y] = row.split(',');
        if (code && station) {
            minetroStations.push({
                code: code.trim(),
                station: station.trim(),
                x: parseFloat(x.trim()),
                y: parseFloat(y.trim())
            });
        }
    }
}

export async function loadNetherAxes() {
    const response = await fetch('data/nether_axes.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);

    for (const row of rows) {
        const [axe, x, y] = row.split(',');
        if (axe) {
            netherAxes.push({
                axe: axe.trim(),
                x: parseFloat(x.trim()),
                y: parseFloat(y.trim())
            });
        }
    }
}