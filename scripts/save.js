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
    thetaUpgrades: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
	tab: 'theta',
	subtabs: {
		ranks: 'rankup'
	},
	options: {
		pinHeader: true,
		rankupConfirm: 1,
		promtStyle: 2
	},
	automation: {
		thetaUpgrades: [false, false, false, false, false, false, false, false],
	},
	unlocks: {
		automation: {
			theta: 0,
		},
		tabs: 0,
	},
	ranks: {
		ranks: new Decimal(0),
		rankUpgrades1: [false, false, false, false, false],
		rankRowsData: [0],
		milestones: 0,
		rankEnergy: new Decimal(0),
		bestTheta: new Decimal(0),
		lastRankup: Date.now()
	},
	totalTheta: new Decimal(0),
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
	} else {
		player = basePlayer
	}

	player = remakeValues(player, basePlayer)
}

setInterval(save, 8000);

function saveExport() {
	navigator.clipboard.writeText('TIS' + btoa(unescape(encodeURIComponent(JSON.stringify(player)))))
	popup('Save copied to clipboard. If it hasn' + "'" + 't been copied, it is available in the console (F12)', 'alert')
	console.log('Exported save should be below')
	console.log('TIS' + btoa(unescape(encodeURIComponent(JSON.stringify(player)))))
}

function saveImport() {
	popup('Paste or type in save here', 'prompt', 'import')
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

function DANGERresetSave() {
	if(popup('Are you sure you want to reset your save? There is no benefit to doing so and you will NOT be able to get it back!', 'confirm', 'hardreset')) {
	}
}