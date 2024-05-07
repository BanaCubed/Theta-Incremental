const tabs = ['theta', 'ranks', 'stats', 'options']

const basePlayer = {
    theta: new Decimal(0),
    time: Date.now(),
    thetaUpgrades: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
	tab: 'theta',
	options: {

	},
	automation: {
		thetaUpgrades: [false, false, false, false, false],
	},
	unlocks: {
		automation: {
			theta: 0,
		},
	},
}

let player = {}

load(true)

function save() {
	if (player !== undefined && player !== null) {
        localStorage.setItem('thetaIncrementalR', btoa(unescape(encodeURIComponent(JSON.stringify(player)))));
    }
}

function load(initial = false) {
	let get = localStorage.getItem('thetaIncrementalR');
	player = basePlayer

	if(get !== null && get !== undefined) {
		player = Object.assign(player, JSON.parse(decodeURIComponent(escape(atob(get)))));
	}

	if(!initial) updateTab()
}

setInterval(save, 1000);