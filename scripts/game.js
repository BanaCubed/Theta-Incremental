const game = {
    thetaUpgrades: [
       { // UPG1
        cost(x = player.thetaUpgrades[0]) {
            let base = new Decimal(1.125)
            if(player.ranks.rankUpgrades1[3]) base = base.pow(Decimal.pow(0.94, player.ranks.rankEnergy))
            return Decimal.pow(base, x).times(25).floor()
        },
        buyMax() {
            let base = new Decimal(1.125)
            if(player.ranks.rankUpgrades1[3]) base = base.pow(Decimal.pow(0.94, player.ranks.rankEnergy))
            let toBuy = Decimal.div(player.theta, 25).log(base).floor().add(1)
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[0])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.times(Decimal.add(player.thetaUpgrades[0], this.bonus()), this.power())
        },
        bonus() {
            return new Decimal(0)
        },
        power() {
            let base = Decimal.add(game.thetaUpgrades[2].effect(), 1)
            if(player.ranks.rankUpgrades1[0]) base = base.times(Decimal.add(1, Decimal.div(player.thetaUpgrades[0], 4)))
            return base
        },
        spends() { return player.ranks.milestones < 2 }
    }, { // UPG2
        cost(x = player.thetaUpgrades[1]) {
            let base = new Decimal(1.2)
            if(player.ranks.rankUpgrades1[3]) base = base.pow(Decimal.pow(0.94, player.ranks.rankEnergy))
            return Decimal.pow(base, x).times(25).floor()
        },
        buyMax() {
            let base = new Decimal(1.2)
            if(player.ranks.rankUpgrades1[3]) base = base.pow(Decimal.pow(0.94, player.ranks.rankEnergy))
            let toBuy = Decimal.div(player.theta, 25).log(base).floor().add(1)
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[1])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.times(Decimal.add(player.thetaUpgrades[1], this.bonus()), this.power())
        },
        power() {
            let base = Decimal.add(game.thetaUpgrades[2].effect(), 3)
            if(player.ranks.rankUpgrades1[0]) base = base.times(Decimal.add(1, Decimal.div(player.thetaUpgrades[1], 4)))
            return base
        },
        bonus() {
            return game.thetaUpgrades[8].effect()
        },
        spends() { return player.ranks.milestones < 2 }
    }, { // UPG3
        cost(x = player.thetaUpgrades[2]) {
            let base = new Decimal(1.6)
            if(player.ranks.rankUpgrades1[3]) base = base.pow(Decimal.pow(0.94, player.ranks.rankEnergy))
            return Decimal.pow(base, x).times(300).floor()
        },
        buyMax() {
            let base = new Decimal(1.6)
            if(player.ranks.rankUpgrades1[3]) base = base.pow(Decimal.pow(0.94, player.ranks.rankEnergy))
            let toBuy = Decimal.div(player.theta, 300).log(base).floor().add(1)
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[2])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.times(Decimal.add(player.thetaUpgrades[2], this.bonus()), this.power())
        },
        bonus() {
            return game.thetaUpgrades[4].effect()
        },
        spends() { return player.ranks.milestones < 2 },
        power() {
            let base = Decimal.add(game.thetaUpgrades[5].effect()).add(1)
            if(player.ranks.rankUpgrades1[1]) base = base.times(Decimal.times(player.thetaUpgrades[2], 0.4).add(1))
            return base
        }
    }, { // UPG4
        cost(x = player.thetaUpgrades[3]) {
            let amount = new Decimal(x)
            if(amount.gte(10)) amount = amount.div(10).pow(2).times(10)
            let base = new Decimal(2)
            if(player.ranks.rankUpgrades1[3]) base = base.pow(Decimal.pow(0.94, player.ranks.rankEnergy))
            let baseCost = Decimal.pow(base, amount).times(4000).floor()
            return baseCost
        },
        buyMax() {
            let base = new Decimal(2)
            if(player.ranks.rankUpgrades1[3]) base = base.pow(Decimal.pow(0.94, player.ranks.rankEnergy))
            let toBuy = Decimal.div(player.theta, 4000).log(base)
            if(toBuy.gte(10)) {
                toBuy = toBuy.div(10).pow(0.5).times(10)
            }
            let cost = this.cost(toBuy.floor())
            toBuy = toBuy.sub(player.thetaUpgrades[3]).add(1).floor()
            return [cost, toBuy]
        },
        effect() {
            return Decimal.pow(this.power(), Decimal.add(player.thetaUpgrades[3], this.bonus()))
        },
        bonus() {
            return new Decimal(0)
        },
        spends() { return player.ranks.milestones < 2 },
        power() {
            return Decimal.add(1.5,  game.thetaUpgrades[7].effect())
        }
    }, { // UPG5
        cost(x = player.thetaUpgrades[4]) {
            return Decimal.pow(1.75, x).times(10000).floor()
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 10000).log(1.75).floor().add(1)
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[4])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.times(Decimal.add(player.thetaUpgrades[4], this.bonus()), this.power())
        },
        spends() { return player.ranks.milestones < 2 },
        power() {
            let base = Decimal.add(game.thetaUpgrades[5].effect()).add(2)
            base = base.pow(game.thetaUpgrades[9].effect())
            return base
        },
        bonus() {
            return game.thetaUpgrades[8].effect()
        },
    }, { // UPG6
        cost(x = player.thetaUpgrades[5]) {
            return Decimal.pow(1.8, x).times(1e6).floor()
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 1e6).log(1.8).floor().add(1)
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[5])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.times(Decimal.add(player.thetaUpgrades[5], this.bonus()), this.power())
        },
        spends() { return player.ranks.milestones < 6 },
        power() {
            return new Decimal(0.5)
        },
        bonus() {
            return new Decimal(0)
        },
    }, { // UPG7
        cost(x = player.thetaUpgrades[6]) {
            let amount = new Decimal(x)
            if(amount.gte(10)) amount = amount.div(10).pow(2).times(10)
            let base = Decimal.pow(2, amount).times(5e7).floor()
            return base
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 5e7).log(2)
            if(toBuy.gte(10)) {
                toBuy = toBuy.div(10).pow(0.5).times(10).floor()
            }
            let cost = this.cost(toBuy.floor())
            toBuy = toBuy.sub(player.thetaUpgrades[6]).add(1).floor()
            return [cost, toBuy]
        },
        effect() {
            return Decimal.pow(this.power(), Decimal.add(player.thetaUpgrades[6], this.bonus()))
        },
        bonus() {
            return new Decimal(0)
        },
        spends() { return player.ranks.milestones < 6 },
        power() {
            return Decimal.add(1.3, 0)
        }
    }, { // UPG8
        cost(x = player.thetaUpgrades[7]) {
            let amount = new Decimal(x)
            if(amount.gte(10)) amount = amount.div(10).pow(2.5).times(10)
            let base = Decimal.pow(25, amount).times(1e10).floor()
            return base
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 1e10).log(25)
            if(toBuy.gte(10)) {
                toBuy = toBuy.div(10).pow(0.4).times(10).floor()
            }
            let cost = this.cost(toBuy.floor())
            toBuy = toBuy.sub(player.thetaUpgrades[7]).add(1).floor()
            return [cost, toBuy]
        },
        bonus() {
            return new Decimal(0)
        },
        effect() {
            return Decimal.times(Decimal.add(player.thetaUpgrades[7], this.bonus()), this.power())
        },
        spends() { return true },
        power() {
            return new Decimal(0.02)
        }
    }, { // UPG9
        cost(x = player.thetaUpgrades[8]) {
            let amount = new Decimal(x)
            let base = Decimal.pow(6, amount).times(1e15).floor()
            return base
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 1e15).log(6).floor()
            let cost = this.cost(toBuy)
            toBuy = toBuy.sub(player.thetaUpgrades[8]).add(1)
            return [cost, toBuy]
        },
        bonus() {
            return new Decimal(0)
        },
        effect() {
            return Decimal.times(Decimal.add(player.thetaUpgrades[8], this.bonus()), this.power())
        },
        spends() { return true },
        power() {
            return new Decimal(15)
        }
    }, { // UPG10
        cost(x = player.thetaUpgrades[9]) {
            let amount = new Decimal(x)
            if(amount.gte(3)) amount = amount.div(3).pow_base(2).times(2)
            let base = Decimal.pow(1e5, amount).times(1e20).floor()
            return base
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 1e20).log(1e5)
            if(toBuy.gte(3)) {
                toBuy = toBuy.div(2).log(2).times(3).floor()
            }
            let cost = this.cost(toBuy.floor())
            toBuy = toBuy.sub(player.thetaUpgrades[9]).add(1).floor()
            return [cost, toBuy]
        },
        bonus() {
            return new Decimal(0)
        },
        effect() {
            return Decimal.times(Decimal.add(player.thetaUpgrades[9], this.bonus()), this.power()).add(1)
        },
        spends() { return true },
        power() {
            return new Decimal(0.025)
        }
    }],
    ranks: {
        nextat(x = player.ranks.ranks) {
            x = new Decimal(x)
            if(x.lt(3)) {
                if(x.lt(1)) return new Decimal(250000)
                if(x.lt(2)) return new Decimal(1000000)
                if(x.lt(3)) return new Decimal(1500000)
            } else {
                let base = new Decimal(x)
                let baseEnergy = new Decimal(player.ranks.rankEnergy)
                if(player.ranks.rankUpgrades1[2]) base = base.times(Decimal.pow(0.96, baseEnergy))
                if(base.gte(10)) base = base.div(10).pow(2).times(10)
                if(base.gte(100)) base = base.div(100).pow_base(2).add(98)
                return Decimal.pow(144, base)
            }
        },
        milestoneCheck() {
            let milestones = 0
            if(Decimal.gte(player.ranks.ranks, 1)) milestones++
            if(Decimal.gte(player.ranks.ranks, 2)) milestones++
            if(Decimal.gte(player.ranks.ranks, 3)) milestones++
            if(Decimal.gte(player.ranks.ranks, 4)) milestones++
            if(Decimal.gte(player.ranks.ranks, 5)) milestones++
            if(Decimal.gte(player.ranks.ranks, 6)) milestones++
            if(Decimal.gte(player.ranks.ranks, 7)) milestones++
            if(Decimal.gte(player.ranks.ranks, 9)) milestones++
            if(Decimal.gte(player.ranks.ranks, 10)) milestones++
            if(Decimal.gte(player.ranks.ranks, 12)) milestones++
            if(Decimal.gte(player.ranks.ranks, 14)) milestones++
            if(Decimal.gte(player.ranks.ranks, 17)) milestones++
            player.ranks.milestones = milestones

            if(milestones >= 3 && player.unlocks.automation.theta < 1) player.unlocks.automation.theta = 1
            if(milestones >= 4 && player.unlocks.automation.theta < 2) player.unlocks.automation.theta = 2
            if(milestones >= 5 && player.unlocks.automation.theta < 3) player.unlocks.automation.theta = 3
            if(milestones >= 6 && player.unlocks.tabs < 1) player.unlocks.tabs = 1
            if(milestones >= 7 && player.unlocks.automation.theta < 4) player.unlocks.automation.theta = 4
            if(milestones >= 8 && player.unlocks.automation.theta < 5) player.unlocks.automation.theta = 5
        },
        milestonesText: [
            'automatically click the theta gain button based on ranks, unaffected by upgrade 4.',
            "theta upgrades 1-5 don't spend theta.",
            'automate a theta upgrade for each rank, up to 5.',
            'unlock two more theta upgrades.',
            'square the automatic clicks per second.',
            "unlock rank energy and theta upgrades 6-7 don't spend theta.",
            'automate theta upgrade 6.',
            'automate theta upgrade 7.',
            'increase theta gain based on time since last rankup.',
            'unlock another three theta upgrades.',
            'improve the rank 10 milestone.',
            'unlock ??? [ENDGAME].',
            "good luck getting this one.",
        ],
        milestonesRequirements: [
            new Decimal(1), new Decimal(2), new Decimal(3), new Decimal(4), new Decimal(5), new Decimal(6), new Decimal(7), new Decimal(9), new Decimal(10), new Decimal(12), new Decimal(14), new Decimal(17), Decimal.pow(1e300, 1e300)
        ],
        rerenderMilestones(x = player.ranks.milestones) {
            if(x === 0) return
            x--
            let content = ""
            for (let index = 0; index <= x; index++) {
                const element = game.ranks.milestonesText[index]
                const rank = game.ranks.milestonesRequirements[index]
                let effect = ''

                if(this.milestonesEffect(index) !== false) effect = '<br>Currently: ' + this.milestonesEffect(index)

                content = content + "RM" + formatWhole(rank) + ", " + element + effect + '<br><br>'
            }

            document.getElementById('rankMilestones').innerHTML = content
        },
        milestonesEffect(x = 0) {
            if(x === 0) return formatWhole(getCPS()) + ' cps'
            if(x === 1) return false
            if(x === 2) return !Decimal.gte(player.ranks.ranks, 5) ? formatWhole(player.ranks.ranks) : '5'
            if(x >= 3 && x < 8) return false
            if(x === 8) return 'x' + format(player.ranks.milestones >= 8 ? Decimal.sub(player.time, player.ranks.lastRankup).add(300).pow(0.4) : Decimal.sub(player.time, player.ranks.lastRankup).add(1).pow(0.25))
            if(x >= 9) return false
        },
        unspentEnergy(x = player.ranks.rankEnergy) {
            x = new Decimal(x)
            if(player.ranks.rankRowsData[0] >= 1) x = x.sub(1)
            if(player.ranks.rankRowsData[0] >= 2) x = x.sub(1)
            if(player.ranks.rankRowsData[0] >= 3) x = x.sub(2)
            if(player.ranks.rankRowsData[0] >= 4) x = x.sub(2)
            if(player.ranks.rankRowsData[0] >= 5) x = x.sub(4)
            return x
        },
        calculateTotalEnergy() {
            let base = Decimal.div(Decimal.add(player.ranks.bestTheta, 1), '1e10').log('1e2').add(1).pow(Decimal.sub(1, Decimal.pow(player.ranks.ranks, -0.8)))
            if(base.gte(10)) base = base.sub(9).pow(0.5).add(9).floor()
            else base = base.floor()
            return base
        },
        nextEnergyAt() {
            let energy = new Decimal(player.ranks.rankEnergy).add(1)
            if(energy.gte(10)) energy = energy.sub(9).pow(2).add(9)
            return Decimal.pow(energy, Decimal.sub(1, Decimal.pow(player.ranks.ranks, -0.8)).pow(-1)).sub(1).pow_base('1e2').times('1e10').sub(1)
        },
        upgrades: {
            1: {
                cost() {
                    if(player.ranks.rankRowsData[0] == 0) return new Decimal(1)
                    if(player.ranks.rankRowsData[0] == 1) return new Decimal(1)
                    if(player.ranks.rankRowsData[0] == 2) return new Decimal(2)
                    if(player.ranks.rankRowsData[0] == 3) return new Decimal(2)
                    if(player.ranks.rankRowsData[0] == 4) return new Decimal(4)
                },
                effects: {
                    a1() {
                        return Decimal.div(player.thetaUpgrades[0], 4)
                    },
                    a2() {
                        return Decimal.div(player.thetaUpgrades[1], 4)
                    },
                    b1() {
                        return Decimal.times(player.thetaUpgrades[2], 0.35)
                    },
                    c1() {
                        return Decimal.sub(1, Decimal.pow(0.96, player.ranks.rankEnergy))
                    },
                    d1() {
                        return Decimal.sub(1, Decimal.pow(0.94, player.ranks.rankEnergy))
                    },
                    e1() {
                        return Decimal.pow(20, game.ranks.unspentEnergy())
                    },
                }
            },
        }
    },
    stats: {
        theta: {
            degrees(x = new Decimal(player.theta)) {
                if(x.lt(1.296e40)) return Decimal.div(360, x)
                else return Decimal.div(1, 3.6e37)
            },
            rotations(x = player.theta) {
                x = new Decimal(x)
                if(x.lt(1.296e40)) return new Decimal(1)
                else return x.div(1.296e40)
            },
            radius(x = this.rotations()) {
                if(x.lt(6.25e40)) return Decimal.div(1000, x).div(6.28318530718)
                else return Decimal.div(1, 6.25e37).div(6.28318530718)
            },
            distance(x = this.rotations()) {
                if(x.lt(6.25e40)) return new Decimal(1000)
                else return x.div(6.25e37).times(6.28318530718)
            },
        }
    },
    reset: {
        rankup(condition = false, gaining = false) {
            if(player.options.rankupConfirm < 1 && gaining == false) condition = true
            if(player.options.rankupConfirm < 2 && gaining == true) condition = true
            if(!condition) popup('Are you sure you want to rank up?', 'confirm', 'rankup')
            if(condition) {
                player.theta = new Decimal(0)
                player.thetaUpgrades = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
                player.ranks.lastRankup = player.time
                if(gaining) {
                    player.ranks.ranks = Decimal.add(player.ranks.ranks, 1)
                }
            }
        },
    },
}
