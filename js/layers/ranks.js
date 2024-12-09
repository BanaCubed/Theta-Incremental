addLayer("ranks", {
    name: "ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
    row: 1,
    type: 'custom',
    baseResource: 'theta',
    resource: 'ranks',
    startData() {
        return {
            unlocked: true,
            done: false,
            points: new Decimal(0),
            bestTheta: new Decimal(0),
            rankbert: Decimal.dZero
        };
    },
    baseAmount() {
        return player.points
    },
    getNextAt(x = player.ranks.points) {
        let base = new Decimal(x)
        if(hasUpgrade('ranks', 13)) { base = base.mul(tmp.ranks.upgrades[13].effect) }
        if(base.gte(100)) base = base.div(100).pow_base(2).times(50)
        if(base.gte(10)) base = base.div(10).pow(2).times(10)
        if(base.gte(3)) base = base.div(2).pow(1.5).times(2)
        return Decimal.pow(12, base.div(2)).times(250000)
    },
    getResetGain(canMax=false) {
        if(canMax) {
            let base = player.points.div(250000).log(12).times(2)
            if(base.gte(3)) base = base.div(2).pow(1/1.5).times(2)
            if(base.gte(10)) base = base.div(10).pow(0.5).times(10)
            if(base.gte(100)) base = base.div(50).log(2).times(100)
            if(hasUpgrade('ranks', 13)) { base = base.div(tmp.ranks.upgrades[13].effect) }
            return base.sub(player.ranks.points).floor()
        }
        return player.points.gte(tmp.ranks.getNextAt)?new Decimal(1):new Decimal(0)
    },
    canReset() {
        return player.points.gte(tmp.ranks.getNextAt)
    },
    tabFormat: {
        "Rankup": {
            content: [
                "rankup",
                "milestones",
                'blank',
            ],
        },
        // "Energy": {
        //     content: [
        //         "rank-energy",
        //         "upgrades",
        //         'blank',
        //     ],
        //     unlocked(){return player.unlocks.progression >= 1},
        // },
        // "Rankbert": {
        //     content: [
        //         "rankbert",
        //         ['row', [
        //             ['raw-html', '<img src="resources/rankbert.svg" height="300">'],
        //             ['bar', 'ranksie'],
        //         ]],
        //         "buyables",
        //         'blank',
        //     ],
        //     unlocked(){return player.unlocks.progression >= 2},
        // },
    },
    // bars: {
    //     ranksie: {
    //         width: 50,
    //         height: 300,
    //         direction: UP,
    //         progress() {
    //             return player.ranks.rankbert.div(100)
    //         },
    //         borderStyle: {
    //             'border-width': '3px',
    //             'border-radius': '10px',
    //         },
    //         fillStyle: {
    //             'background-color': 'hsl(275, 100%, 20%)',
    //         },
    //         display() {
    //             return formatWhole(player.ranks.rankbert) + '%'
    //         },
    //     },
    // },
    resetName: 'Rankup',
    prestigeNotify(){return false},
    shouldNotify(){return false},
    milestones: {
        0: {
            requirementDescription: 'Rank 1',
            effectDescription: 'Autoclick the theta gain button <span class="tooltipBox">based on ranks<div class="tooltip">5×1.6<sup>Ranks</sup></div></span>. CPS is unaffected by boosts to theta/sec',
            done() {
                return player.ranks.points.gte(1)
            },
            effect() {
                return Decimal.times(5, Decimal.pow(1.6, player.ranks.points))
            },
            name: 'RM1',
        },
        1: {
            requirementDescription: 'Rank 2',
            effectDescription: 'Theta upgrades 1-5 no longer spend theta',
            done() {
                return player.ranks.points.gte(2)
            },
            name: 'RM2',
        },
        2: {
            requirementDescription: 'Rank 3',
            effectDescription: 'Automate a theta upgrade from 1-5 for each rank',
            done() {
                return player.ranks.points.gte(3)
            },
            name: 'RM3',
        },
        3: {
            requirementDescription: 'Rank 4',
            effectDescription: 'Unlock two more theta upgrades',
            done() {
                return player.ranks.points.gte(4)
            },
            name: 'RM4',
        },
        4: {
            requirementDescription: 'Rank 6',
            effectDescription: 'Unlock Rank Energy (Unfinished)',
            done() {
                return player.ranks.points.gte(6)
            },
            name: 'RM5',
        },
        // 5: {
        //     requirementDescription: 'Rank 9',
        //     effectDescription: 'Automate theta upgrade 6, and theta upgrades 6-7 no longer spend theta',
        //     done() {
        //         return player.ranks.points.gte(9)
        //     },
        //     name: 'RM6',
        // },
        // 6: {
        //     requirementDescription: 'Rank 12',
        //     effectDescription: 'Automate theta upgrade 7',
        //     done() {
        //         return player.ranks.points.gte(12)
        //     },
        //     name: 'RM7',
        // },
        // 7: {
        //     requirementDescription: 'Rank 16',
        //     effectDescription: 'Unlock Rankbert',
        //     done() {
        //         return player.ranks.points.gte(16)
        //     },
        //     name: 'RM8',
        // },
        // 8: {
        //     requirementDescription: 'Rank 25',
        //     effectDescription: 'Win?',
        //     done() {
        //         return false
        //     },
        //     name: 'RM?',
        // },
    },
    componentStyles: {
        'prestige-button': {
            'height': '35px',
            'width': '200px',
        }
    },
    prestigeButtonText() {return 'Rankup'},
    update(diff) {
        if(player.points.gte(player.ranks.bestTheta)) { player.ranks.bestTheta = player.points }
    },
    // totalEnergy() {
    //     let en = player.ranks.bestTheta.max(1).log(10).sub(10).max(0.5).pow(0.75).floor()
    //     if(en.gte(15)) { en = en.div(15).log(1.25).add(1).mul(15) }
    //     return en
    // },
    // nextEnergyAt() {
    //     let en = tmp.ranks.totalEnergy.add(1)
    //     if(en.gte(15)) { en = en.div(15).sub(1).pow_base(1.25).mul(15) }
    //     return en.pow(1/0.75).add(10).pow_base(10)
    // },
    // unspentEnergy() {
    //     let amt = tmp.ranks.totalEnergy
    //     let upgs = player.ranks.upgrades.length
    //     if(upgs == 1) { amt = amt.sub(1) }
    //     if(upgs == 2) { amt = amt.sub(2) }
    //     if(upgs == 3) { amt = amt.sub(4) }
    //     if(upgs == 4) { amt = amt.sub(7) }
    //     if(upgs == 5) { amt = amt.sub(10) }
    //     return amt
    // },
    // upgrades: {
    //     11: {
    //         name: 'RεU1a',
    //         description() {
    //             return `Increase the power of <div style="display: inline;" class="tooltipBox">θB1<div class="tooltip">Increase theta/click</div></div> & <div style="display: inline;" class="tooltipBox">θB2<div class="tooltip">Increase theta/sec</div></div> based on their amount`
    //         },
    //         effect() {
    //             return [
    //                 getBuyableAmount('theta', 11).div(tmp[this.layer].upgrades[this.id].power[0]).add(1),
    //                 getBuyableAmount('theta', 12).div(tmp[this.layer].upgrades[this.id].power[0]).add(1)
    //             ]
    //         },
    //         canAfford() { return tmp.ranks.canGetUpg },
    //         power() {
    //             return [
    //                 new Decimal(4),
    //                 false
    //             ]
    //         },
    //         effectDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].effect[0])} <div style="display: inline;" class="tooltipBox">θB1<div class="tooltip">Increase theta/click</div></div>,
    //             ${formatBoost(tmp[this.layer].upgrades[this.id].effect[1])} <div style="display: inline;" class="tooltipBox">θB2<div class="tooltip">Increase theta/sec</div></div>`
    //         },
    //         powerDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].power[0].recip())} per owned`
    //         },
    //     },
    //     12: {
    //         name: 'RεU1b',
    //         description() {
    //             return `Increase power of <div style="display: inline;" class="tooltipBox">θB3<div class="tooltip">Increase the power of θB1 & θB2</div></div> based on it'a non-bonus amount`
    //         },
    //         effect() {
    //             return getBuyableAmount('theta', 13).mul(tmp[this.layer].upgrades[this.id].power)
    //         },
    //         canAfford() { return tmp.ranks.canGetUpg },
    //         power() {
    //             return new Decimal(0.35)
    //         },
    //         effectDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].effect)}`
    //         },
    //         powerDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].power)} per non-bonus <div style="display: inline;" class="tooltipBox">θB3<div class="tooltip">Increase the power of θB1 & θB2</div></div>`
    //         },
    //     },
    //     13: {
    //         name: 'RεU1c',
    //         description() {
    //             return `Decrease rank requirement scaling based on Rτ`
    //         },
    //         effect() {
    //             return tmp.ranks.totalEnergy.pow_base(0.96)
    //         },
    //         canAfford() { return tmp.ranks.canGetUpg },
    //         power() {
    //             return new Decimal(0.04)
    //         },
    //         effectDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].effect, true)} scaling`
    //         },
    //         powerDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].power.neg())} per Rτ`
    //         },
    //     },
    //     14: {
    //         name: 'RεU1d',
    //         description() {
    //             return `Reduce theta upgrade 1-4 scaling based on Rτ`
    //         },
    //         effect() {
    //             return tmp.ranks.totalEnergy.pow_base(Decimal.sub(1, tmp[this.layer].upgrades[this.id].power))
    //         },
    //         canAfford() { return tmp.ranks.canGetUpg },
    //         power() {
    //             return new Decimal(0.06)
    //         },
    //         effectDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].effect, true)} scaling`
    //         },
    //         powerDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].power.neg())} per Rτ`
    //         },
    //     },
    //     15: {
    //         name: 'RεU1e',
    //         description() {
    //             return `Increase all theta gain based on <i>unspent</i> Rε`
    //         },
    //         effect() {
    //             return tmp[this.layer].upgrades[this.id].power.pow(tmp.ranks.unspentEnergy)
    //         },
    //         canAfford() { return tmp.ranks.canGetUpg },
    //         power() {
    //             return new Decimal(20)
    //         },
    //         effectDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].effect, true)}`
    //         },
    //         powerDisplay() {
    //             return `${formatBoost(tmp[this.layer].upgrades[this.id].power, true)} per Rε`
    //         },
    //     },
    // },
    // rankEnergyCost() {
    //     let upgs = player.ranks.upgrades.length
    //     if(upgs < 1) { return new Decimal(1) }
    //     if(upgs < 2) { return new Decimal(1) }
    //     if(upgs < 3) { return new Decimal(2) }
    //     if(upgs < 4) { return new Decimal(3) }
    //     if(upgs < 5) { return new Decimal(3) }
    //     if(upgs < 6) { return new Decimal(999) }
    // },
    // canGetUpg() {
    //     return tmp.ranks.unspentEnergy.gte(tmp.ranks.rankEnergyCost)
    // },
    // clickables: {
    //     11: {
    //         canClick() { return true },
    //         display() {
    //             return `Respec`
    //         },
    //         onClick() {
    //             if(options[layer]>=1) { createConfirm(`Are you sure that you want to force a ${tmp[layer].resetName} reset?<br>This is a gainless reset, and is not required to beat the game.`,
    //                 `${tmp[layer].resetName} Confirmation`, `Cancel`, `Confirm`,
    //                 ()=>{doReset(layer, true, true); player.ranks.upgrades=[]; closeModal();}); return; }
                
    //             doReset(layer, true, true); player.ranks.upgrades=[];
    //         },
    //         style: {
    //             height: '35px',
    //             width: '200px',
    //             'min-height': '35px',
    //         }
    //     }
    // },
    // rankbert() {
    //     let effect = [Decimal.dOne]
    //     if(player.ranks.rankbert.gte(1)) { effect[0] = player.ranks.rankbert.mul(player.ranks.rankbert.sub(30).max(0).pow_base(1.05)) }
    // },
})
