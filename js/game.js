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
    }],
    ranks: {
        nextat(x = player.ranks.ranks) {
            x = new Decimal(x)
            if(x.lt(6)) {
                if(x.lt(1)) return new Decimal(1500000)
                if(x.lt(2)) return new Decimal(2500000)
                if(x.lt(3)) return new Decimal(5000000)
                if(x.lt(4)) return new Decimal(10000000)
                if(x.lt(5)) return new Decimal(100000000)
                return new Decimal('1e12')
            } else {
                return Decimal.sub(player.ranks, 5).times(5).pow(2).add(25).pow(10).times(102400)
            }
        }
    },
    stats: {
        theta: {
            type(x = player.theta) {
                x = new Decimal(x)
                if(x.add(1).log(10).lt(360)) return 0
                else if(x.add(1).log(10).add(1).log(10).lt(360)) return 1
                else if(x.add(1).log(10).add(1).log(10).add(1).log(10).lt(360)) return 2
                else if(x.add(1).slog(10).lt(5)) return 3
                else return 4
            },
            amount(x = player.theta) {
                x = new Decimal(x)
                if(this.type(x) === 0) {
                    return x
                }
                if(this.type(x) === 1) {
                    return x.add(1).log(10)
                }
                if(this.type(x) === 2) {
                    return x.add(1).log(10).add(1).log(10)
                }
                if(this.type(x) === 3) {
                    return x.add(1).log(10).add(1).log(10).add(1).log(10)
                }
                if(this.type(x) === 4) {
                    return x.add(1).slog(10)
                }
            },
            degrees(x = this.amount()) {
                if(this.amount(x).lt(1.296e18)) return Decimal.div(360, x)
                else return Decimal.div(1, 3.6e15)
            },
            rotations(x = this.amount()) {
                x = new Decimal(x)
                if(x.lt(1.296e18)) return 1
                else return x.div(1.296e18)
            }
        }
    }
}
