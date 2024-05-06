const basePlayer = {
    theta: new Decimal(0),
    time: Date.now(),
    thetaUpgrades: [new Decimal(0), new Decimal(0), new Decimal(0)]
}

let player = {}

load()

function save() {
	if (player !== undefined && player !== null) {
        localStorage.setItem('thetaIncrementalR', btoa(unescape(encodeURIComponent(JSON.stringify(player)))));
    }
}

function load() {
	let get = localStorage.getItem('thetaIncrementalR');

	if (get === null || get === undefined) {
		player = basePlayer
	}
	else {
		player = Object.assign(player, JSON.parse(decodeURIComponent(escape(atob(get)))));
	}
}

setInterval(save(), 5000);

window.onbeforeunload = () => {
    save();
};