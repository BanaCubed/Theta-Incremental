const tabs = ['theta', 'ranks', 'stats', 'options']

const subtabs = {
	ranks: [
		'rankup',
		'energy',
	],
}

const basePlayer = {
    theta: new Decimal(0),
    time: Date.now(),
	playtime: 0,
    thetaUpgrades: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
	tab: 'theta',
	subtabs: {
		ranks: 'rankup'
	},
	options: {

	},
	automation: {
		thetaUpgrades: [false, false, false, false, false, false, false],
	},
	unlocks: {
		automation: {
			theta: 0,
		},
		tabs: 0,
	},
	ranks: {
		ranks: new Decimal(0),
		rankUpgrades: [false, false, false, false, false],
		milestones: 0,
		rankEnergy: new Decimal(0),
		bestTheta: new Decimal(0),
	},
}

let player = {}

load()

function save() {
	if (player !== undefined && player !== null) {
        localStorage.setItem('thetaIncrementalR', btoa(unescape(encodeURIComponent(JSON.stringify(player)))));
    }
}

function load(data) {
	if(data === undefined || data === null) {
		data = localStorage.getItem('thetaIncrementalR');
	}

	if(data !== null && data !== undefined) {
		player = Object.assign(player, JSON.parse(decodeURIComponent(escape(atob(data)))));
	}

	player = remakeValues(player, basePlayer)

	updateTab()
}

setInterval(save, 1000);

function saveExport() {
	navigator.clipboard.writeText('TiS' + btoa(unescape(encodeURIComponent(JSON.stringify(player)))))
}

function saveImport() {
	save = prompt('Paste or type in save here')
	save = save.substring(3)
	load(save)
}

function remakeValues(obj, defaultObj) {
    for (let key in defaultObj) {
        if (!obj.hasOwnProperty(key)) {
            if (Array.isArray(defaultObj[key])) {
                obj[key] = [...defaultObj[key]];
            } else {
                obj[key] = defaultObj[key];
            }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            remakeValues(obj[key], defaultObj[key]);
        }
    }
    return obj;
}