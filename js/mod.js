let modInfo = {
	name: "Theta Incremental",
	id: "ThetaIncremental",
	author: "BanaCubed",
	pointsName: "",
	modFiles: ["layers.js", "tree.js", "layers/theta.js", "layers/ranks.js"],

	discordName: "Theta Incremental Discord",
	discordLink: "https://discord.gg/wt5XyPRtte",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 168,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "New Beginnings",
}

let changelog = `<button class="upg">button</button>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen(addOnly=false) {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	gain = gain.add(tmp.theta.buyables[12].effect)

	if(addOnly) { return gain }

	gain = gain.times(tmp.theta.buyables[14].effect)
	gain = gain.times(tmp.theta.buyables[22].effect)

	if(hasUpgrade('ranks', 15)) { gain = gain.mul(tmp.ranks.upgrades[15].effect) }


	if(hasMilestone('ranks', 0)) { gain = gain.add(tmp.ranks.milestones[0].effect.times(getPointClick())) }
	return gain
}

function getPointClick(addOnly=false) {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	gain = gain.add(tmp.theta.buyables[11].effect)
	
	if(addOnly) { return gain }

	gain = gain.times(tmp.theta.buyables[22].effect)

	if(hasUpgrade('ranks', 15)) { gain = gain.mul(tmp.ranks.upgrades[15].effect) }
	

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	totalTheta: Decimal.dZero,
	breakdown: 0,
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}