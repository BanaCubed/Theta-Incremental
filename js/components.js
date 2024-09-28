var app;

function loadVue() {
	// data = a function returning the content (actually HTML)
	Vue.component('display-text', {
		props: ['layer', 'data'],
		template: `
			<span class="instant" v-html="data"></span>
		`
	})

// data = a function returning the content (actually HTML)
	Vue.component('raw-html', {
			props: ['layer', 'data'],
			template: `
				<span class="instant"  v-html="data"></span>
			`
		})

	// Blank space, data = optional height in px or pair with width and height in px
	Vue.component('blank', {
		props: ['layer', 'data'],
		template: `
			<div class = "instant">
			<div class = "instant" v-if="!data" v-bind:style="{'width': '8px', 'height': '17px'}"></div>
			<div class = "instant" v-else-if="Array.isArray(data)" v-bind:style="{'width': data[0], 'height': data[1]}"></div>
			<div class = "instant" v-else v-bind:style="{'width': '8px', 'height': data}"><br></div>
			</div>
		`
	})

	// Displays an image, data is the URL
	Vue.component('display-image', {
		props: ['layer', 'data'],
		template: `
			<img class="instant" v-bind:src= "data" v-bind:alt= "data">
		`
	})
		
	// data = an array of Components to be displayed in a row
	Vue.component('row', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgTable instant">
			<div class="upgRow">
				<div v-for="(item, index) in data">
				<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
				<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
				<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a column
	Vue.component('column', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgTable instant">
			<div class="upgCol">
				<div v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data [other layer, tabformat for within proxy]
	Vue.component('layer-proxy', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div>
			<column :layer="data[0]" :data="data[1]" :key="key + 'col'"></column>
		</div>
		`
	})
	Vue.component('infobox', {
		props: ['layer', 'data'],
		template: `
		<div class="story instant" v-if="tmp[layer].infoboxes && tmp[layer].infoboxes[data]!== undefined && tmp[layer].infoboxes[data].unlocked" v-bind:style="[{'border-color': tmp[layer].color, 'border-radius': player.infoboxes[layer][data] ? 0 : '8px'}, tmp[layer].infoboxes[data].style]">
			<button class="story-title" v-bind:style="[{'background-color': tmp[layer].color}, tmp[layer].infoboxes[data].titleStyle]"
				v-on:click="player.infoboxes[layer][data] = !player.infoboxes[layer][data]">
				<span class="story-toggle">{{player.infoboxes[layer][data] ? "+" : "-"}}</span>
				<span v-html="tmp[layer].infoboxes[data].title ? tmp[layer].infoboxes[data].title : (tmp[layer].name)"></span>
			</button>
			<div v-if="!player.infoboxes[layer][data]" class="story-text" v-bind:style="tmp[layer].infoboxes[data].bodyStyle">
				<span v-html="tmp[layer].infoboxes[data].body ? tmp[layer].infoboxes[data].body : 'Blah'"></span>
			</div>
		</div>
		`
	})


	// Data = width in px, by default fills the full area
	Vue.component('h-line', {
		props: ['layer', 'data'],
			template:`
				<hr class="instant" v-bind:style="data ? {'width': data} : {}" class="hl">
			`
		})

	// Data = height in px, by default is bad
	Vue.component('v-line', {
		props: ['layer', 'data'],
		template: `
			<div class="instant" v-bind:style="data ? {'height': data} : {}" class="vl2"></div>
		`
	})

	Vue.component('challenges', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].challenges" class="upgTable">
		<div v-for="row in (data === undefined ? tmp[layer].challenges.rows : data)" class="upgRow">
		<div v-for="col in tmp[layer].challenges.cols">
					<challenge v-if="tmp[layer].challenges[row*10+col]!== undefined && tmp[layer].challenges[row*10+col].unlocked" :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.challenge"></challenge>
				</div>
			</div>
		</div>
		`
	})

	// data = id
	Vue.component('challenge', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].challenges && tmp[layer].challenges[data]!== undefined && tmp[layer].challenges[data].unlocked && !inChallenge(layer, [data]))"
			v-bind:class="['challenge', challengeStyle(layer, data), player[layer].activeChallenge === data ? 'resetNotify' : '']" v-bind:style="tmp[layer].challenges[data].style">
			<br><h3 v-html="tmp[layer].challenges[data].name"></h3><br><br>
			<button v-bind:class="{ longUpg: true, can: true, [layer]: true }" v-bind:style="{'background-color': tmp[layer].color}" v-on:click="startChallenge(layer, data)">{{challengeButtonText(layer, data)}}</button><br><br>
			<span v-if="layers[layer].challenges[data].fullDisplay" v-html="run(layers[layer].challenges[data].fullDisplay, layers[layer].challenges[data])"></span>
			<span v-else>
				<span v-html="tmp[layer].challenges[data].challengeDescription"></span><br>
				Goal:  <span v-if="tmp[layer].challenges[data].goalDescription" v-html="tmp[layer].challenges[data].goalDescription"></span><span v-else>{{format(tmp[layer].challenges[data].goal)}} {{tmp[layer].challenges[data].currencyDisplayName ? tmp[layer].challenges[data].currencyDisplayName : modInfo.pointsName}}</span><br>
				Reward: <span v-html="tmp[layer].challenges[data].rewardDescription"></span><br>
				<span v-if="layers[layer].challenges[data].rewardDisplay!==undefined">Currently: <span v-html="(tmp[layer].challenges[data].rewardDisplay) ? (run(layers[layer].challenges[data].rewardDisplay, layers[layer].challenges[data])) : format(tmp[layer].challenges[data].rewardEffect)"></span></span>
			</span>
			<node-mark :layer='layer' :data='tmp[layer].challenges[data].marked' :offset="20" :scale="1.5"></node-mark></span>

		</div>
		`
	})

	Vue.component('upgrades', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].upgrades" class="upgTable">
		<div class="upgRow">
			<div v-for="id in (data === undefined ? Object.keys(tmp[layer].upgrades) : data)" class="upgAlign">
					<upgrade :layer = "layer" :data = "id" v-bind:style="tmp[layer].componentStyles.upgrade"></upgrade>
				</div></div>
			</div>
			<br>
		</div>
		`
	})

	// data = id
	Vue.component('upgrade', {
		props: ['layer', 'data'],
		template: `
		<div class="box" v-if="tmp[layer].upgrades && tmp[layer].upgrades[data]!== undefined && tmp[layer].upgrades[data].unlocked">
			 {{ tmp[layer].upgrades[data].name }}: <span v-html="run(tmp[layer].upgrades[data].description, tmp[layer].upgrades[data])"></span><br><br>
			<div style="text-align: left; margin: 0 8px 0 8px">
				 Power: <span v-html="run(tmp[layer].upgrades[data].powerDisplay, tmp[layer].upgrades[data])"></span><br>
				<span v-if="layer != 'ranks'">  Cost:  {{ formatWhole(tmp[layer].upgrades[data].cost) }}<br></span>
				Effect: <span v-html="run(tmp[layer].upgrades[data].effectDisplay, tmp[layer].upgrades[data])"></span><br>
				
			</div><br>
			<div style="display: flex; flex-direction: row;">
				<button style="width: 100%;" v-bind:class="{ can: tmp[layer].upgrades[data].canAfford && !hasUpgrade(layer, data), locked: !tmp[layer].upgrades[data].canAfford && !hasUpgrade(layer, data), bought: hasUpgrade(layer, data) }" v-on:click="if(canAffordUpgrade(layer, data)) buyUpg(layer, data)">{{hasUpgrade(layer, data) ? 'Bought' : 'Buy'}}</button>
			</div>
		</div>
		`
	})

	Vue.component('rankup', {
		props: ['layer', 'data'],
		template: `
		<div class="box" style="text-align: center; margin: 4px auto; width: 420px;">
			<h2>Rankup</h2><br>
			You are at Rank {{ formatWhole(player.ranks.points) }}<br><br>
			Rankup will reset all theta related features<br>
			You can rank up at {{ formatWhole(tmp.ranks.getNextAt) }} theta<br><br>
			<span v-if="player.ranks.milestones.length<Object.keys(tmp.ranks.milestones).length">At {{ tmp.ranks.milestones[player.ranks.milestones.length].requirementDescription }}, <span v-html="tmp.ranks.milestones[player.ranks.milestones.length].effectDescription"></span><br><br></span>
			<prestige-button :layer="layer"></prestige-button>
		</div>
		`
	})

	Vue.component('rank-energy', {
		props: ['layer', 'data'],
		template: `
		<div class="box" style="text-align: center; margin: 4px auto; width: 420px;">
			<h2>Rank Energy</h2><br>
			You have {{ formatWhole(tmp.ranks.unspentEnergy) }} rank energy (Rε)<br>
			{{ formatWhole(tmp.ranks.totalEnergy) }} total (Rτ)<br>
			Next rank energy at {{ formatWhole(tmp.ranks.nextEnergyAt) }} theta<br><br>
			Your next rank energy upgrade will cost {{ formatWhole(tmp.ranks.rankEnergyCost) }} rank energy<br>
			This increases with every upgrade bought<br><br>
			<clickable :layer="'ranks'" :data="11"></clickable>
		</div>
		`
	})

	Vue.component('rankbert', {
		props: ['layer', 'data'],
		template: `
		<div class="box" style="text-align: center; margin: 4px auto; width: 420px;">
			<h2>Rankbert</h2><br>
			This is Rankbert, another being trapped here<br>
			Rankbert, unlike you, is unable to live purely off of basically nothingness<br>
			This makes Rankbert very hungry<br><br>
			Perhaps if you feed him he will reward you...<br><br>
			CURRENT ENDGAME
		</div>
		`
	})

	Vue.component('milestones', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].milestones && hasMilestone(layer, 0)" class="box" style="width: calc(100vw - 40px); max-width: 600px; height: fit-content; margin: 0; padding: 5px;">
			<h2> Milestones</h2><br><br>
				<div v-for="milestone in (data === undefined ? Object.keys(tmp[layer].milestones) : data)" style="margin: 0;">
					<milestone :layer = "layer" :data = "milestone" v-bind:style="tmp[layer].componentStyles.milestone"></milestone>
				</div>
		</div>
		`
	})

	// data = id
	Vue.component('milestone', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].milestones && tmp[layer].milestones[data]!== undefined && hasMilestone(layer, data)" style="text-align: left;">
			 {{ tmp[layer].milestones[data].name }}: <span v-html="run(tmp[layer].milestones[data].requirementDescription, tmp[layer].milestones[data])"></span>, <span v-html="run(tmp[layer].milestones[data].effectDescription, tmp[layer].milestones[data])"></span><br><br>
		</div>
		`
	})

	Vue.component('toggle', {
		props: ['layer', 'data'],
		template: `
		<button class="smallUpg can" v-bind:style="{'background-color': tmp[data[0]].color}" v-on:click="toggleAuto(data)">{{player[data[0]][data[1]]?"ON":"OFF"}}</button>
		`
	})

	Vue.component('prestige-button', {
		props: ['layer', 'data'],
		template: `
		<button v-if="(tmp[layer].type !== 'none')" v-bind:class="{ [layer]: true, reset: true, locked: !tmp[layer].canReset, can: tmp[layer].canReset}"
			v-bind:style="[tmp[layer].canReset ? {'background-color': tmp[layer].color} : {}, tmp[layer].componentStyles['prestige-button']]"
			v-html="prestigeButtonText(layer)" v-on:click="doReset(layer)">
		</button>
		`
	
	})

	// Displays the main resource for the layer
	Vue.component('main-display', {
		props: ['layer', 'data'],
		template: `
		<div><span v-if="player[layer].points.lt('1e1000')">You have </span><h2 v-bind:style="{'color': tmp[layer].color, 'text-shadow': '0px 0px 10px ' + tmp[layer].color}">{{data ? format(player[layer].points, data) : formatWhole(player[layer].points)}}</h2> {{tmp[layer].resource}}<span v-if="layers[layer].effectDescription">, <span v-html="run(layers[layer].effectDescription, layers[layer])"></span></span><br><br></div>
		`
	})

	// Displays the base resource for the layer, as well as the best and total values for the layer's currency, if tracked
	Vue.component('resource-display', {
		props: ['layer'],
		template: `
		<div style="margin-top: -13px">
			<span v-if="tmp[layer].baseAmount"><br>You have {{formatWhole(tmp[layer].baseAmount)}} {{tmp[layer].baseResource}}</span>
			<span v-if="tmp[layer].passiveGeneration"><br>You are gaining {{format(tmp[layer].resetGain.times(tmp[layer].passiveGeneration))}} {{tmp[layer].resource}} per second</span>
			<br><br>
			<span v-if="tmp[layer].showBest">Your best {{tmp[layer].resource}} is {{formatWhole(player[layer].best)}}<br></span>
			<span v-if="tmp[layer].showTotal">You have made a total of {{formatWhole(player[layer].total)}} {{tmp[layer].resource}}<br></span>
		</div>
		`
	})

	Vue.component('buyables', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].buyables" class="upgTable">
			<respec-button v-if="tmp[layer].buyables.respec && !(tmp[layer].buyables.showRespec !== undefined && tmp[layer].buyables.showRespec == false)" :layer = "layer" v-bind:style="[{'margin-bottom': '12px'}, tmp[layer].componentStyles['respec-button']]"></respec-button>
			<div class="upgRow">
				<div v-if="tmp[layer].buyables[buyable]!== undefined && tmp[layer].buyables[buyable].unlocked" class="upgAlign" v-bind:style="{'height': (data ? data : 'inherit'),}" v-for="buyable in (data === undefined ? Object.keys(tmp[layer].buyables) : data)">
					<buyable :layer = "layer" :data = "buyable"></buyable>
				</div>
				<br>
			</div>
		</div>
	`
	})

	Vue.component('buyable', {
		props: ['layer', 'data'],
		template: `
			<div class="box" v-if="tmp[layer].buyables && tmp[layer].buyables[data]!== undefined && tmp[layer].buyables[data].unlocked">
				 {{ tmp[layer].buyables[data].name }}: <span v-html="run(tmp[layer].buyables[data].description, tmp[layer].buyables[data])"></span><br><br>
				<div style="text-align: left; margin: 0 8px 0 8px">
					 Power: {{ tmp[layer].buyables[data].effectPre }}{{ format(tmp[layer].buyables[data].power) }}<br>
					 Count:  {{ formatWhole(getBuyableAmount(layer, data)) }}<span v-if="tmp[layer].buyables[data].bonus.neq(0)"> + {{ formatWhole(tmp[layer].buyables[data].bonus) }}</span><br>
					  Cost:  {{ formatWhole(tmp[layer].buyables[data].cost) }}<br>
					Effect: {{ tmp[layer].buyables[data].effectPre }}{{ format(tmp[layer].buyables[data].effect) }}<br>
					
				</div><br>
				<div style="display: flex; flex-direction: row;">
					<button style="width: 100%;" v-bind:class="{ can: tmp[layer].buyables[data].canAfford, locked: !tmp[layer].buyables[data].canAfford }" v-on:click="if(layers[layer].buyables[data].canAfford()) layers[layer].buyables[data].buy()">Buy One</button>
					<button style="width: 100%;" v-bind:class="{ can: tmp[layer].buyables[data].canAfford, locked: !tmp[layer].buyables[data].canAfford }" v-on:click="layers[layer].buyables[data].buyMax()">Buy Max</button>
					<button style="width: 100%;" v-if="player.unlocks.auto[layer][data]" v-on:click="player.auto[layer][data] = !player.auto[layer][data]">Auto: {{player.auto[layer][data] ? "On" : "Off"}}</button>
				</div>
			</div>
		`,
	})

	Vue.component('respec-button', {
		props: ['layer', 'data'],
		template: `
			<div v-if="tmp[layer].buyables && tmp[layer].buyables.respec && !(tmp[layer].buyables.showRespec !== undefined && tmp[layer].buyables.showRespec == false)">
				<div class="tooltipBox respecCheckbox"><input type="checkbox" v-model="player[layer].noRespecConfirm" ><tooltip v-bind:text="'Disable respec confirmation'"></tooltip></div>
				<button v-on:click="respecBuyables(layer)" v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }" style="margin-right: 18px">{{tmp[layer].buyables.respecText ? tmp[layer].buyables.respecText : "Respec"}}</button>
			</div>
			`
	})
	
	Vue.component('clickables', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].clickables" class="upgTable">
			<master-button v-if="tmp[layer].clickables.masterButtonPress && !(tmp[layer].clickables.showMasterButton !== undefined && tmp[layer].clickables.showMasterButton == false)" :layer = "layer" v-bind:style="[{'margin-bottom': '12px'}, tmp[layer].componentStyles['master-button']]"></master-button>
			<div v-for="row in (data === undefined ? tmp[layer].clickables.rows : data)" class="upgRow">
				<div v-for="col in tmp[layer].clickables.cols"><div v-if="tmp[layer].clickables[row*10+col]!== undefined && tmp[layer].clickables[row*10+col].unlocked" class="upgAlign" v-bind:style="{'margin-left': '7px', 'margin-right': '7px',  'height': (data ? data : 'inherit'),}">
					<clickable :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.clickable"></clickable>
				</div></div>
				<br>
			</div>
		</div>
	`
	})

	// data = id of clickable
	Vue.component('clickable', {
		props: ['layer', 'data'],
		template: `
		<button 
			v-if="tmp[layer].clickables && tmp[layer].clickables[data]!== undefined && tmp[layer].clickables[data].unlocked" 
			v-bind:class="{ upg: true, tooltipBox: true, can: tmp[layer].clickables[data].canClick, locked: !tmp[layer].clickables[data].canClick}"
			v-bind:style="[tmp[layer].clickables[data].canClick ? {'background-color': tmp[layer].color} : {}, tmp[layer].clickables[data].style]"
			v-on:click="if(!interval) clickClickable(layer, data)" :id='"clickable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
			<span v-if= "tmp[layer].clickables[data].title"><h2 v-html="tmp[layer].clickables[data].title"></h2><br></span>
			<span v-bind:style="{'white-space': 'pre-line'}" v-html="run(layers[layer].clickables[data].display, layers[layer].clickables[data])"></span>
			<node-mark :layer='layer' :data='tmp[layer].clickables[data].marked'></node-mark>
			<tooltip v-if="tmp[layer].clickables[data].tooltip" :text="tmp[layer].clickables[data].tooltip"></tooltip>

		</button>
		`,
		data() { return { interval: false, time: 0,}},
		methods: {
			start() {
				if (!this.interval && layers[this.layer].clickables[this.data].onHold) {
					this.interval = setInterval((function() {
						let c = layers[this.layer].clickables[this.data]
						if(this.time >= 5 && run(c.canClick, c)) {
							run(c.onHold, c)
						}	
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			}
		},
	})

	Vue.component('master-button', {
		props: ['layer', 'data'],
		template: `
		<button v-if="tmp[layer].clickables && tmp[layer].clickables.masterButtonPress && !(tmp[layer].clickables.showMasterButton !== undefined && tmp[layer].clickables.showMasterButton == false)"
			v-on:click="run(tmp[layer].clickables.masterButtonPress, tmp[layer].clickables)" v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].clickables.masterButtonText ? tmp[layer].clickables.masterButtonText : "Click me!"}}</button>
	`
	})


	// data = optionally, array of rows for the grid to show
	Vue.component('grid', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].grid" class="upgTable">
			<div v-for="row in (data === undefined ? tmp[layer].grid.rows : data)" class="upgRow">
				<div v-for="col in tmp[layer].grid.cols"><div v-if="run(layers[layer].grid.getUnlocked, layers[layer].grid, row*100+col)"
					class="upgAlign" v-bind:style="{'margin': '1px',  'height': 'inherit',}">
					<gridable :layer = "layer" :data = "row*100+col" v-bind:style="tmp[layer].componentStyles.gridable"></gridable>
				</div></div>
				<br>
			</div>
		</div>
	`
	})

	Vue.component('gridable', {
		props: ['layer', 'data'],
		template: `
		<button 
		v-if="tmp[layer].grid && player[layer].grid[data]!== undefined && run(layers[layer].grid.getUnlocked, layers[layer].grid, data)" 
		v-bind:class="{ tile: true, can: canClick, locked: !canClick, tooltipBox: true,}"
		v-bind:style="[canClick ? {'background-color': tmp[layer].color} : {}, gridRun(layer, 'getStyle', player[this.layer].grid[this.data], this.data)]"
		v-on:click="clickGrid(layer, data)"  @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
			<span v-if= "layers[layer].grid.getTitle"><h3 v-html="gridRun(this.layer, 'getTitle', player[this.layer].grid[this.data], this.data)"></h3><br></span>
			<span v-bind:style="{'white-space': 'pre-line'}" v-html="gridRun(this.layer, 'getDisplay', player[this.layer].grid[this.data], this.data)"></span>
			<tooltip v-if="layers[layer].grid.getTooltip" :text="gridRun(this.layer, 'getTooltip', player[this.layer].grid[this.data], this.data)"></tooltip>

		</button>
		`,
		data() { return { interval: false, time: 0,}},
		computed: {
			canClick() {
				return gridRun(this.layer, 'getCanClick', player[this.layer].grid[this.data], this.data)}
		},
		methods: {
			start() {
				if (!this.interval && layers[this.layer].grid.onHold) {
					this.interval = setInterval((function() {
						if(this.time >= 5 && gridRun(this.layer, 'getCanClick', player[this.layer].grid[this.data], this.data)) {
							gridRun(this.layer, 'onHold', player[this.layer].grid[this.data], this.data)						}	
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			}
		},
	})

	// data = id of microtab family
	Vue.component('microtabs', {
		props: ['layer', 'data'],
		computed: {
			currentTab() {return player.subtabs[layer][data]}
		},
		template: `
		<div v-if="tmp[layer].microtabs" :style="{'border-style': 'solid'}">
			<div class="upgTable instant">
				<tab-buttons :layer="layer" :data="tmp[layer].microtabs[data]" :name="data" v-bind:style="tmp[layer].componentStyles['tab-buttons']"></tab-buttons>
			</div>
			<layer-tab v-if="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :layer="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :embedded="true"></layer-tab>

			<column v-else v-bind:style="tmp[layer].microtabs[data][player.subtabs[layer][data]].style" :layer="layer" :data="tmp[layer].microtabs[data][player.subtabs[layer][data]].content"></column>
		</div>
		`
	})


	// data = id of the bar
	Vue.component('bar', {
		props: ['layer', 'data'],
		computed: {
			style() {return constructBarStyle(this.layer, this.data)}
		},
		template: `
		<div v-if="tmp[layer].bars && tmp[layer].bars[data].unlocked" v-bind:style="{'position': 'relative'}"><div v-bind:style="[tmp[layer].bars[data].style, style.dims, {'display': 'table'}]">
			<div class = "overlayTextContainer barBorder" v-bind:style="[tmp[layer].bars[data].borderStyle, style.dims]">
				<span class = "overlayText" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].textStyle]" v-html="run(layers[layer].bars[data].display, layers[layer].bars[data])"></span>
			</div>
			<div class ="barBG barBorder" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].baseStyle, tmp[layer].bars[data].borderStyle,  style.dims]">
				<div class ="fill" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].fillStyle, style.fillDims]"></div>
			</div>
		</div></div>
		`
	})


	Vue.component('achievements', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].achievements" class="upgTable">
			<div v-for="row in (data === undefined ? tmp[layer].achievements.rows : data)" class="upgRow">
				<div v-for="col in tmp[layer].achievements.cols"><div v-if="tmp[layer].achievements[row*10+col]!== undefined && tmp[layer].achievements[row*10+col].unlocked" class="upgAlign">
					<achievement :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.achievement"></achievement>
				</div></div>
			</div>
			<br>
		</div>
		`
	})

	// data = id
	Vue.component('achievement', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].achievements && tmp[layer].achievements[data]!== undefined && tmp[layer].achievements[data].unlocked" v-bind:class="{ [layer]: true, achievement: true, tooltipBox:true, locked: !hasAchievement(layer, data), bought: hasAchievement(layer, data)}"
			v-bind:style="achievementStyle(layer, data)">
			<tooltip :text="
			(tmp[layer].achievements[data].tooltip == '') ? false : hasAchievement(layer, data) ? (tmp[layer].achievements[data].doneTooltip ? tmp[layer].achievements[data].doneTooltip : (tmp[layer].achievements[data].tooltip ? tmp[layer].achievements[data].tooltip : 'You did it!'))
			: (tmp[layer].achievements[data].goalTooltip ? tmp[layer].achievements[data].goalTooltip : (tmp[layer].achievements[data].tooltip ? tmp[layer].achievements[data].tooltip : 'LOCKED'))
		"></tooltip>
			<span v-if= "tmp[layer].achievements[data].name"><br><h3 v-bind:style="tmp[layer].achievements[data].textStyle" v-html="tmp[layer].achievements[data].name"></h3><br></span>
		</div>
		`
	})

	// Data is an array with the structure of the tree
	Vue.component('tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<div>
		<span class="upgRow" v-for="(row, r) in data"><table>
			<span v-for="(node, id) in row" style = "{width: 0px}">
				<tree-node :layer='node' :prev='layer' :abb='tmp[node].symbol' :key="key + '-' + r + '-' + id"></tree-node>
			</span>
			<tr><table><button class="treeNode hidden"></button></table></tr>
		</span></div>

	`
	})

	// Data is an array with the structure of the tree
	Vue.component('upgrade-tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<thing-tree :layer="layer" :data = "data" :type = "'upgrade'"></thing-tree>`
	})

	// Data is an array with the structure of the tree
	Vue.component('buyable-tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<thing-tree :layer="layer" :data = "data" :type = "'buyable'"></thing-tree>`
	})

	// Data is an array with the structure of the tree
	Vue.component('clickable-tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<thing-tree :layer="layer" :data = "data" :type = "'clickable'"></thing-tree>`
	})

	Vue.component('thing-tree', {
		props: ['layer', 'data', 'type'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<div>
		<span class="upgRow" v-for="(row, r) in data"><table>
			<span v-for="id in row" style = "{width: 0px; height: 0px;}" v-if="tmp[layer][type+'s'][id]!== undefined && tmp[layer][type+'s'][id].unlocked" class="upgAlign">
				<div v-bind:is="type" :layer = "layer" :data = "id" v-bind:style="tmp[layer].componentStyles[type]" class = "treeThing"></div>
			</span>
			<tr><table><button class="treeNode hidden"></button></table></tr>
		</span></div>
	`
	})


	// Updates the value in player[layer][data]
	Vue.component('text-input', {
		props: ['layer', 'data'],
		template: `
			<input class="instant" :id="'input-' + layer + '-' + data" :value="player[layer][data].toString()" v-on:focus="focused(true)" v-on:blur="focused(false)"
			v-on:change="player[layer][data] = toValue(document.getElementById('input-' + layer + '-' + data).value, player[layer][data])">
		`
	})

	// Updates the value in player[layer][data][0]
	Vue.component('slider', {
		props: ['layer', 'data'],
		template: `
			<div class="tooltipBox">
			<tooltip :text="player[layer][data[0]]"></tooltip><input type="range" v-model="player[layer][data[0]]" :min="data[1]" :max="data[2]"></div>
		`
	})

	// Updates the value in player[layer][data[0]], options are an array in data[1]
	Vue.component('drop-down', {
		props: ['layer', 'data'],
		template: `
			<select v-model="player[layer][data[0]]">
				<option v-for="item in data[1]" v-bind:value="item">{{item}}</option>
			</select>
		`
	})
	// These are for buyables, data is the id of the corresponding buyable
	Vue.component('sell-one', {
		props: ['layer', 'data'],
		template: `
			<button v-if="tmp[layer].buyables && tmp[layer].buyables[data].sellOne && !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)" v-on:click="run(tmp[layer].buyables[data].sellOne, tmp[layer].buyables[data])"
				v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].buyables.sellOneText ? tmp[layer].buyables.sellOneText : "Sell One"}}</button>
	`
	})
	Vue.component('sell-all', {
		props: ['layer', 'data'],
		template: `
			<button v-if="tmp[layer].buyables && tmp[layer].buyables[data].sellAll && !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false)" v-on:click="run(tmp[layer].buyables[data].sellAll, tmp[layer].buyables[data])"
				v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].buyables.sellAllText ? tmp[layer].buyables.sellAllText : "Sell All"}}</button>
	`
	})
	
	Vue.component('options-bar', {
		props: ['option', 'choices', 'names'],
		template: `
			<div class="optionsBar" id="pinHeaderBar" style="height: 50px; margin-top: 20px;" v-bind:style="{'width': (choices.length*80)+'px'}">
				<div class="optionsBarName" style="text-align: start;" v-html="option[1]"></div>
				<div class="optionsBarSelection" style="z-index: 1;" v-bind:style="{'border-radius': '0px '+(choices.indexOf(options[option[0]])==(choices.length-1)?'7px 7px ':'0px 0px ')+(choices.indexOf(options[option[0]])==0?'7px':'0px'), '--leftPos': (choices.indexOf(options[option[0]])*80)+'px'}"></div>
				<div style="z-index: 2; border-radius: 0 7px 7px 7px; overflow: hidden; display: flex;">
					<button class="optionsBarSegment" v-on:click="options[option[0]]=choice" v-for="choice in choices">{{ names[choices.indexOf(choice)] }}</button>
				</div>
			</div>
	`
	})

	Vue.component('stats', {
		props: ['layer', 'data'],
		template: `
		<div class="box" style="text-align: center; margin: 4px auto; width: 600px;">
			<h2>General</h2><br>
			You have played for {{ formatTime(player.timePlayed) }}<br><br>
			<h2>Theta</h2><br>
			You have produced a total of {{ formatWhole(player.totalTheta) }} theta<br>
			You own a total of {{ formatWhole(getBuyableAmount('theta', 11).add(getBuyableAmount('theta', 12)).add(getBuyableAmount('theta', 13)).add(getBuyableAmount('theta', 14)).add(getBuyableAmount('theta', 15)).add(getBuyableAmount('theta', 21)).add(getBuyableAmount('theta', 22))) }} theta upgrades<br><br>
			<span v-if="player.ranks.done"><h2>Ranks</h2><br>
			<span class="tooltipBox">Your best theta is {{ formatWhole(player.ranks.bestTheta) }}<tooltip :text="'Used for calculating Rank Energy'"></tooltip></span><br><br></span>
		</div>
		`
	})
	
	Vue.component('breakdown', {
		props: ['layer', 'data'],
		template: `
			<div class="optionsBar" id="pinHeaderBar" style="height: 50px; margin-top: 20px;" v-bind:style="{'width': (data.length*80)+'px'}">
				<div class="optionsBarName" style="text-align: start;" v-html="'Breakdown Stat'"></div>
				<div class="optionsBarSelection" style="z-index: 1;" v-bind:style="{'border-radius': '0px '+(player.breakdown==data.length-1?'7px 7px ':'0px 0px ')+(player.breakdown==0?'7px':'0px'), '--leftPos': (player.breakdown*80)+'px'}"></div>
				<div style="z-index: 2; border-radius: 0 7px 7px 7px; overflow: hidden; display: flex;">
					<button class="optionsBarSegment" v-on:click="player.breakdown=data.indexOf(choice)" v-for="choice in data">{{ choice }}</button>
				</div>
			</div>
	`
	})

	Vue.component('breakdown-display', {
		props: ['layer', 'data'],
		template: `
		<div class="box" style="text-align: center; margin: 4px auto; width: 600px;">
			<span v-html="breakdownDisplay()"></span>
		</div>
		`
	})

	// SYSTEM COMPONENTS
	Vue.component('node-mark', systemComponents['node-mark'])
	Vue.component('tab-buttons', systemComponents['tab-buttons'])
	Vue.component('tree-node', systemComponents['tree-node'])
	Vue.component('layer-tab', systemComponents['layer-tab'])
	Vue.component('overlay-head', systemComponents['overlay-head'])
	Vue.component('info-tab', systemComponents['info-tab'])
	Vue.component('options-tab', systemComponents['options-tab'])
	Vue.component('confirmations', systemComponents['confirmations'])
	Vue.component('tooltip', systemComponents['tooltip'])
	Vue.component('particle', systemComponents['particle'])
	Vue.component('bg', systemComponents['bg'])


	app = new Vue({
		el: "#app",
		data: {
			player,
			tmp,
			options,
			Decimal,
			format,
			formatWhole,
			formatTime,
			formatSmall,
			focused,
			getThemeName,
			layerunlocked,
			doReset,
			buyUpg,
			buyUpgrade,
			startChallenge,
			milestoneShown,
			keepGoing,
			hasUpgrade,
			hasMilestone,
			hasAchievement,
			hasChallenge,
			maxedChallenge,
			getBuyableAmount,
			getClickableState,
			inChallenge,
			canAffordUpgrade,
			canBuyBuyable,
			canCompleteChallenge,
			subtabShouldNotify,
			subtabResetNotify,
			challengeStyle,
			challengeButtonText,
			constructBarStyle,
			constructParticleStyle,
			VERSION,
			LAYERS,
			hotkeys,
			activePopups,
			particles,
			mouseX,
			mouseY,
			shiftDown,
			ctrlDown,
			run,
			gridRun,
		},
	})
}

 
