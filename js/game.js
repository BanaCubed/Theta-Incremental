const game = {
    thetaUpgrades: [
       { // UPG1
        cost(x = player.thetaUpgrades[0]) {
            return Decimal.pow(1.125, x).times(25).floor()
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 25).log(1.125).floor().add(1)
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[0])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.times(player.thetaUpgrades[0], this.power())
        },
        power() {
            return Decimal.add(game.thetaUpgrades[2].effect(), 1)
        },
        spends() { return player.ranks.milestones < 2 }
    }, { // UPG2
        cost(x = player.thetaUpgrades[1]) {
            return Decimal.pow(1.25, x).times(25).floor()
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 25).log(1.25).floor().add(1)
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[1])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.times(player.thetaUpgrades[1], this.power())
        },
        power() {
            return Decimal.add(game.thetaUpgrades[2].effect(), 3)
        },
        spends() { return player.ranks.milestones < 2 }
    }, { // UPG3
        cost(x = player.thetaUpgrades[2]) {
            return Decimal.pow(1.6, x).times(300).floor()
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 300).log(1.6).floor().add(1)
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[2])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.add(player.thetaUpgrades[2], this.bonus()).times(this.power())
        },
        bonus() {
            return game.thetaUpgrades[4].effect()
        },
        spends() { return player.ranks.milestones < 2 },
        power() {
            return Decimal.add(game.thetaUpgrades[5].effect()).add(1)
        }
    }, { // UPG4
        cost(x = player.thetaUpgrades[3]) {
            let amount = new Decimal(x)
            if(amount.gte(10)) amount = amount.div(10).pow(2).times(10)
            let base = Decimal.pow(2.5, amount).times(4000).floor()
            return base
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 4000).log(2.5)
            if(toBuy.gte(10)) {
                toBuy = toBuy.div(10).pow(0.5).times(10).floor()
            }
            let cost = this.cost(toBuy)
            toBuy = toBuy.sub(player.thetaUpgrades[3]).add(1)
            return [cost, toBuy]
        },
        effect() {
            return Decimal.pow(this.power(), player.thetaUpgrades[3])
        },
        spends() { return player.ranks.milestones < 2 },
        power() {
            return new Decimal(1.5)
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
            return Decimal.times(player.thetaUpgrades[4], this.power())
        },
        bonus() {
            return game.thetaUpgrades[4].effect()
        },
        spends() { return player.ranks.milestones < 2 },
        power() {
            return Decimal.add(game.thetaUpgrades[5].effect()).add(2)
        }
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
            return Decimal.times(player.thetaUpgrades[5], this.power())
        },
        spends() { return player.ranks.milestones < 6 },
        power() {
            return new Decimal(0.5)
        }
    }, { // UPG7
        cost(x = player.thetaUpgrades[6]) {
            let amount = new Decimal(x)
            if(amount.gte(10)) amount = amount.div(10).pow(2).times(10)
            let base = Decimal.pow(3, amount).times(5e7).floor()
            return base
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 5e7).log(3)
            if(toBuy.gte(10)) {
                toBuy = toBuy.div(10).pow(0.5).times(10).floor()
            }
            let cost = this.cost(toBuy)
            toBuy = toBuy.sub(player.thetaUpgrades[6]).add(1)
            return [cost, toBuy]
        },
        effect() {
            return Decimal.pow(this.power(), player.thetaUpgrades[6])
        },
        spends() { return player.ranks.milestones < 6 },
        power() {
            return new Decimal(1.3)
        }
    }],
    ranks: {
        nextat(x = player.ranks.ranks) {
            x = new Decimal(x)
            if(x.lt(3)) {
                if(x.lt(1)) return new Decimal(1000000)
                if(x.lt(2)) return new Decimal(5000000)
                if(x.lt(3)) return new Decimal(50000000)
            } else {
                return Decimal.pow(1337, player.ranks.ranks)
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
            if(Decimal.gte(player.ranks.ranks, 8)) milestones++
            if(Decimal.gte(player.ranks.ranks, 10)) milestones++
            if(Decimal.gte(player.ranks.ranks, 15)) milestones++
            if(Decimal.gte(player.ranks.ranks, 25)) milestones++
            player.ranks.milestones = milestones

            if(milestones >= 3 && player.unlocks.automation.theta < 1) player.unlocks.automation.theta = 1
            if(milestones >= 4 && player.unlocks.automation.theta < 2) player.unlocks.automation.theta = 2
            if(milestones >= 5 && player.unlocks.automation.theta < 3) player.unlocks.automation.theta = 3
            if(milestones >= 6 && player.unlocks.tabs < 1) player.unlocks.tabs = 1
            if(milestones >= 7 && player.unlocks.automation.theta < 4) player.unlocks.automation.theta = 4
            if(milestones >= 8 && player.unlocks.automation.theta < 5) player.unlocks.automation.theta = 5
        },
        milestonesText: [
            'automatically click the theta gain button based on ranks, unaffeted by upgrade 4.',
            "theta upgrades 1-5 don't spend theta.",
            'automate a theta upgrade for each rank, up to 5.',
            'unlock two more theta upgrades.',
            'square the automatic clicks per second.',
            "unlock rank energy and theta upgrades 6-7 don't spend theta.",
            'automate theta upgrade 6',
            'automate theta upgrade 7',
            'unlock three more theta upgrades UNIMPLEMENTED',
            "automate theta upgrade 9, and increase theta upgrade 10's limit UNIMPLEMENTED",
            "placeholder",
        ],
        milestonesRequirements: [
            new Decimal(1), new Decimal(2), new Decimal(3), new Decimal(4), new Decimal(5), new Decimal(6), new Decimal(8), new Decimal(10), new Decimal(15), new Decimal(25), new Decimal(1e100)
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

                content = content + "Rank " + formatWhole(rank) + ", " + element + effect + '<br><br>'
            }

            document.getElementById('rankMilestones').innerHTML = content
        },
        milestonesEffect(x = 0) {
            if(x === 0) return formatWhole(player.ranks.milestones < 5 ? Decimal.times(player.ranks.ranks, 5) : Decimal.times(player.ranks.ranks, 5).pow(2)) + ' cps'
            if(x === 1) return false
            if(x === 2) return !Decimal.gte(player.ranks.ranks, 5) ? formatWhole(player.ranks.ranks) : '5'
            if(x >= 3) return false
        },
        unspentEnergy(x = player.ranks.rankEnergy) {
            return x
        },
        calculateTotalEnergy() {
            return Decimal.div(Decimal.add(player.ranks.bestTheta, 1), '1e14').log('1e6').add(1).pow(5/3).floor()
        },
        nextEnergyAt() {
            return Decimal.pow(Decimal.add(player.ranks.rankEnergy, 1), 3/5).sub(1).pow_base('1e6').times('1e14').sub(1)
        }
    },
    stats: {
        theta: {
            degrees(x = new Decimal(player.theta)) {
                if(x.lt(1.296e21)) return Decimal.div(360, x)
                else return Decimal.div(1, 3.6e18)
            },
            rotations(x = player.theta) {
                x = new Decimal(x)
                if(x.lt(1.296e21)) return new Decimal(1)
                else return x.div(1.296e21)
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
        rankup() {
            player.theta = new Decimal(0)
            player.thetaUpgrades = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
            if(player.tab === 'ranks') game.ranks.rerenderMilestones()
        },
    }
}
