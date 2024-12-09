addLayer("theta", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
        };
    },
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "theta", // Name of prestige currency
    type: "none",
    buyables: {
        11: {
            cost(x) {
                let base = new Decimal(1.125);
                // if(hasUpgrade('ranks', 14)) { base = base.pow(tmp.ranks.upgrades[14].effect) }
                return Decimal.pow(base, x).times(25).floor();
            },
            buyMax() {
                let base = new Decimal(1.125);
                // if(hasUpgrade('ranks', 14)) { base = base.pow(tmp.ranks.upgrades[14].effect) }
                let toBuy = Decimal.div(player.points, 25).log(base).floor().add(1);
                let cost = this.cost(toBuy.sub(1)); // -+= This line and below are dynamic, so don't change them =+-
                if(tmp[this.layer].buyables[this.id].spends) player.points = player.points.sub(cost).max(0);
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)));
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); if(tmp[this.layer].buyables[this.id].spends) {player.points = player.points.sub(cost).max(0)}; setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.times(Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus), tmp[this.layer].buyables[this.id].power);
            },
            bonus() {
                return new Decimal(0);
            },
            power() {
                let base = new Decimal(1);
                base = base.add(tmp.theta.buyables[13].effect);
                // if(hasUpgrade('ranks', 11)) { base = base.times(tmp.ranks.upgrades[11].effect[0]) }
                return base;
            },
            spends() { return !hasMilestone('ranks', 1); },
            unlocked(){ return true },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost); },
            description: 'Increase theta/click',
            effectPre: '+',
            name: 'θB1',
        },
        12: {
            cost(x) {
                let base = new Decimal(1.25);
                // if(hasUpgrade('ranks', 14)) { base = base.pow(tmp.ranks.upgrades[14].effect) }
                return Decimal.pow(base, x).times(25).floor();
            },
            buyMax() {
                let base = new Decimal(1.25);
                // if(hasUpgrade('ranks', 14)) { base = base.pow(tmp.ranks.upgrades[14].effect) }
                let toBuy = Decimal.div(player.points, 25).log(base).floor().add(1);
                let cost = this.cost(toBuy.sub(1)); // -+= This line and below are dynamic, so don't change them =+-
                if(tmp[this.layer].buyables[this.id].spends) player.points = player.points.sub(cost).max(0);
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)));
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); if(tmp[this.layer].buyables[this.id].spends) {player.points = player.points.sub(cost).max(0)}; setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.times(Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus), tmp[this.layer].buyables[this.id].power);
            },
            bonus() {
                return new Decimal(0);
            },
            power() {
                let base = new Decimal(3);
                base = base.add(tmp.theta.buyables[13].effect);
                // if(hasUpgrade('ranks', 11)) { base = base.times(tmp.ranks.upgrades[11].effect[1]) }
                return base;
            },
            spends() { return !hasMilestone('ranks', 1); },
            unlocked(){ return true },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost); },
            description: 'Increase theta/sec',
            effectPre: '+',
            name: 'θB2',
        },
        13: {
            cost(x) {
                let base = new Decimal(1.6);
                // if(hasUpgrade('ranks', 14)) { base = base.pow(tmp.ranks.upgrades[14].effect) }
                return Decimal.pow(base, x).times(300).floor();
            },
            buyMax() {
                let base = new Decimal(1.6);
                // if(hasUpgrade('ranks', 14)) { base = base.pow(tmp.ranks.upgrades[14].effect) }
                let toBuy = Decimal.div(player.points, 300).log(base).floor().add(1);
                let cost = this.cost(toBuy.sub(1)); // -+= This line and below are dynamic, so don't change them =+-
                if(tmp[this.layer].buyables[this.id].spends) player.points = player.points.sub(cost).max(0);
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)));
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); if(tmp[this.layer].buyables[this.id].spends) {player.points = player.points.sub(cost).max(0)}; setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.times(Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus), tmp[this.layer].buyables[this.id].power);
            },
            bonus() {
                let amount = new Decimal(0);
                amount = amount.add(tmp.theta.buyables[15].effect);
                return amount;
            },
            power() {
                let base = new Decimal(1);
                base = base.add(tmp.theta.buyables[21].effect);
                if(hasUpgrade('ranks', 12)) { base = base.mul(Decimal.add(1, tmp.ranks.upgrades[12].effect)) }
                return base;
            },
            spends() { return !hasMilestone('ranks', 1); },
            unlocked(){ return true },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost); },
            description: `Increase the power of <div style="display: inline;" class="tooltipBox">θB1<div class="tooltip">Increase theta/click</div></div> & <div style="display: inline;" class="tooltipBox">θB2<div class="tooltip">Increase theta/sec</div></div>`,
            effectPre: '+',
            name: 'θB3',
        },
        14: {
            cost(x) {
                if (x.gte(10)) x = x.div(10).pow(2).times(10);
                let base = new Decimal(2);
                // if(hasUpgrade('ranks', 14)) { base = base.pow(tmp.ranks.upgrades[14].effect) }
                return Decimal.pow(base, x).times(4000).floor();
            },
            buyMax() {
                let base = new Decimal(2);
                // if(hasUpgrade('ranks', 14)) { base = base.pow(tmp.ranks.upgrades[14].effect) }
                let toBuy = Decimal.div(player.points, 4000).log(base);
                if (toBuy.gte(10)) toBuy = toBuy.div(10).pow(0.5).times(10);
                toBuy = toBuy.floor().add(1); // -+= This line and below are dynamic, so don't change them =+-
                let cost = this.cost(toBuy.sub(1));
                if(tmp[this.layer].buyables[this.id].spends) player.points = player.points.sub(cost).max(0);
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)));
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); if(tmp[this.layer].buyables[this.id].spends) {player.points = player.points.sub(cost).max(0)}; setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.pow(tmp[this.layer].buyables[this.id].power, Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus));
            },
            bonus() {
                return new Decimal(0);
            },
            power() {
                let base = new Decimal(1.5);
                return base;
            },
            spends() { return !hasMilestone('ranks', 1); },
            unlocked(){ return true },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost); },
            description: `Multiply theta/sec`,
            effectPre: '×',
            name: 'θB4',
        },
        15: {
            cost(x) {
                let base = new Decimal(1.75);
                return Decimal.pow(base, x).times(10000).times(tmp[this.layer].buyables[this.id].costMult).floor();
            },
            buyMax() {
                let base = new Decimal(1.75);
                let toBuy = Decimal.div(player.points, 10000).div(tmp[this.layer].buyables[this.id].costMult).log(base);
                toBuy = toBuy.floor().add(1); // -+= This line and below are dynamic, so don't change them =+-
                let cost = this.cost(toBuy.sub(1));
                if(tmp[this.layer].buyables[this.id].spends) player.points = player.points.sub(cost).max(0);
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)));
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); if(tmp[this.layer].buyables[this.id].spends) {player.points = player.points.sub(cost).max(0)}; setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.times(tmp[this.layer].buyables[this.id].power, Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus));
            },
            bonus() {
                return new Decimal(0);
            },
            power() {
                let base = new Decimal(2);
                base = base.add(tmp.theta.buyables[21].effect);
                return base;
            },
            spends() { return !hasMilestone('ranks', 1); },
            unlocked(){ return true },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost); },
            description: `Add to functional amount of <div style="display: inline;" class="tooltipBox">θB3<div class="tooltip">Increase the power of θB1 & θB2</div></div>`,
            effectPre: '+',
            name: 'θB5',
            costMult() {
                let mult = new Decimal(1)
                return mult
            },
        },
        21: {
            cost(x) {
                let base = new Decimal(1.8);
                return Decimal.pow(base, x).times(1e6).floor();
            },
            buyMax() {
                let base = new Decimal(1.8);
                let toBuy = Decimal.div(player.points, 1e6).log(base);
                toBuy = toBuy.floor().add(1); // -+= This line and below are dynamic, so don't change them =+-
                let cost = this.cost(toBuy.sub(1));
                if(tmp[this.layer].buyables[this.id].spends) player.points = player.points.sub(cost).max(0);
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)));
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); if(tmp[this.layer].buyables[this.id].spends) {player.points = player.points.sub(cost).max(0)}; setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.times(tmp[this.layer].buyables[this.id].power, Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus));
            },
            bonus() {
                return new Decimal(0);
            },
            power() {
                let base = new Decimal(0.5);
                return base;
            },
            spends() { return /* !hasMilestone('ranks', 5) */ false },
            unlocked(){ return hasMilestone('ranks', 3); },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost); },
            description: `Increae the power of <div style="display: inline;" class="tooltipBox">θB3<div class="tooltip">Increase the power of θB1 & θB2</div></div> & <div style="display: inline;" class="tooltipBox">θB5<div class="tooltip">Add to functional amount of θB3</div></div>`,
            effectPre: '+',
            name: 'θB6',
        },
        22: {
            cost(x) {
                let base = new Decimal(2);
                if(x.gte(10)) x = x.div(10).pow(2).times(10);
                return Decimal.pow(base, x).times(5e7).floor();
            },
            buyMax() {
                let base = new Decimal(2);
                let toBuy = Decimal.div(player.points, 5e7).log(base);
                if(toBuy.gte(10)) { toBuy = toBuy.div(10).pow(0.5).times(10).floor() }
                toBuy = toBuy.floor().add(1); // -+= This line and below are dynamic, so don't change them =+-
                let cost = this.cost(toBuy.sub(1));
                if(tmp[this.layer].buyables[this.id].spends) player.points = player.points.sub(cost).max(0);
                setBuyableAmount(this.layer, this.id, toBuy.max(getBuyableAmount(this.layer, this.id)));
            },
            buy() { let cost = this.cost(getBuyableAmount(this.layer, this.id)); if(tmp[this.layer].buyables[this.id].spends) {player.points = player.points.sub(cost).max(0)}; setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)); },
            effect() {
                return Decimal.pow(tmp[this.layer].buyables[this.id].power, Decimal.add(getBuyableAmount(this.layer, this.id), tmp[this.layer].buyables[this.id].bonus));
            },
            bonus() {
                return new Decimal(0);
            },
            power() {
                let base = new Decimal(1.3);
                return base;
            },
            spends() { return /* !hasMilestone('ranks', 5) */ false },
            unlocked(){ return hasMilestone('ranks', 3); },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost); },
            description: `Multiply all theta gain`,
            effectPre: '×',
            name: 'θB7',
        },
    },
    tabFormat: [
        "buyables",
        'blank',
    ],
    clickables: {
        11: {
            canClick() { return true; },
            onClick() { player.points = player.points.add(getPointClick()); player.totalTheta = player.totalTheta.add(getPointClick()) },
            display() {
                return `+ ${formatWhole(getPointClick())}`;
            },
            style: {
                height: '33px',
                width: '150px',
                'min-height': '33px',
            }
        }
    },
    row: 0,
    automate() {
        for (const key in tmp[this.layer].buyables) {
            if (Object.hasOwnProperty.call(tmp[this.layer].buyables, key) && player.unlocks.auto[this.layer][key] && player.auto[this.layer][key] && tmp[this.layer].buyables[key].unlocked) {
                if(layers[this.layer].buyables[key].canAfford()) { layers[this.layer].buyables[key].buyMax(); }
            }
        }
    },
});
