const game = {
    thetaUpgrades: [{
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
        }
    }, {
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
        }
    }, {
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
            return Decimal.add(player.thetaUpgrades[2], this.bonus())
        },
        bonus() {
            return game.thetaUpgrades[4].effect()
        }
    }, {
        cost(x = player.thetaUpgrades[3]) {
            let amount = new Decimal(x)
            if(amount.gte(10)) amount = amount.div(10).pow(4).times(10)
            let base = Decimal.pow(2.5, amount).times(4000).floor()
            return base
        },
        buyMax() {
            let toBuy = Decimal.div(player.theta, 4000).log(2.5).floor().add(1)
            if(toBuy.gte(11)) {
                toBuy = toBuy.sub(1).div(10).pow(0.25).times(10).add(1).floor()
            }
            let cost = this.cost(toBuy.sub(1))
            toBuy = toBuy.sub(player.thetaUpgrades[3])
            return [cost, toBuy]
        },
        effect() {
            return Decimal.pow(1.5, player.thetaUpgrades[3])
        }
    }, {
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
            return Decimal.times(player.thetaUpgrades[4], 2)
        }
    }]
}
