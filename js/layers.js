addLayer("theta", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "theta", // Name of prestige currency
    type: "none",
    buyables: {
        11: {
            cost(x) {
                let base = new Decimal(1.125)
                return Decimal.pow(base, x).times(25).floor()
            },
            buyMax() {
                let base = new Decimal(1.125)
                let toBuy = Decimal.div(player.points, 25).log(base).floor().add(1)
                let cost = this.cost(toBuy.sub(1))
                player.points = player.points.sub(cost).max(0)
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)))
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); player.points = player.points.sub(cost).max(0); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.times(Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus), tmp[this.layer].buyables[this.id].power)
            },
            bonus() {
                return new Decimal(0)
            },
            power() {
                let base = new Decimal(1)
                base = base.add(tmp.theta.buyables[13].effect)
                return base
            },
            spends() {return true},
            canAfford() {return player.points.gte(tmp[this.layer].buyables[this.id].cost)},
            description: 'Increase theta/click',
            effectPre: '+',
            name: 'θB1',
        },
        12: {
            cost(x) {
                let base = new Decimal(1.25)
                return Decimal.pow(base, x).times(25).floor()
            },
            buyMax() {
                let base = new Decimal(1.25)
                let toBuy = Decimal.div(player.points, 25).log(base).floor().add(1)
                let cost = this.cost(toBuy.sub(1))
                player.points = player.points.sub(cost).max(0)
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)))
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); player.points = player.points.sub(cost).max(0); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.times(Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus), tmp[this.layer].buyables[this.id].power)
            },
            bonus() {
                return new Decimal(0)
            },
            power() {
                let base = new Decimal(3)
                base = base.add(tmp.theta.buyables[13].effect)
                return base
            },
            spends() { return true },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            description: 'Increase theta/sec',
            effectPre: '+',
            name: 'θB2',
        },
        13: {
            cost(x) {
                let base = new Decimal(1.6)
                return Decimal.pow(base, x).times(300).floor()
            },
            buyMax() {
                let base = new Decimal(1.6)
                let toBuy = Decimal.div(player.points, 300).log(base).floor().add(1)
                let cost = this.cost(toBuy.sub(1))
                player.points = player.points.sub(cost).max(0)
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)))
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); player.points = player.points.sub(cost).max(0); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.times(Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus), tmp[this.layer].buyables[this.id].power)
            },
            bonus() {
                return new Decimal(0)
            },
            power() {
                let base = new Decimal(1)
                return base
            },
            spends() { return true },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            description: `Increase the power of <div style="display: inline;" class="tooltipBox">θB1<div class="tooltip">Increase theta/click</div></div> & <div style="display: inline;" class="tooltipBox">θB2<div class="tooltip">Increase theta/sec</div></div>`,
            effectPre: '+',
            name: 'θB3',
        },
        14: {
            cost(x) {
                if(x.gte(10)) x = x.div(10).pow(2).times(10)
                let base = new Decimal(2)
                return Decimal.pow(base, x).times(4000).floor()
            },
            buyMax() {
                let base = new Decimal(2)
                let toBuy = Decimal.div(player.points, 4000).log(base)
                if(toBuy.gte(10)) toBuy = toBuy.div(10).pow(0.5).times(10)
                toBuy = toBuy.floor().add(1)
                let cost = this.cost(toBuy.sub(1))
                player.points = player.points.sub(cost).max(0)
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)))
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); player.points = player.points.sub(cost).max(0); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.pow(tmp[this.layer].buyables[this.id].power, Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus))
            },
            bonus() {
                return new Decimal(0)
            },
            power() {
                let base = new Decimal(1.5)
                return base
            },
            spends() { return true },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            description: `Multiply theta/sec`,
            effectPre: 'x',
            name: 'θB4',
        },
    },
    tabFormat: [
        "buyables",
    ],
    clickables: {
        11: {
            canClick(){return true},
            onClick(){player.points = player.points.add(getPointClick())},
            display() {
                return `+ ${formatWhole(getPointClick())}`
            },
            style: {
                height: '33px',
                width: '150px',
                'min-height': '33px',
            }
        }
    }
})

addLayer('unlocks', {
    startData() { return {
        auto: {
            theta: {
                11: false,
                12: false,
                13: false,
                14: false,
                15: false,
                21: false,
                22: false,
                23: false,
                24: false,
                25: false,
            }
        }
    }},
    row: 'side',
    layerShown(){return false},
})
