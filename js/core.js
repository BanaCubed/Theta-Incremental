const game = {
    thetaUpgrades: [{
        cost() {
            return Decimal.pow(1.125, player.thetaUpgrades[0]).times(25).floor()
        },
        effect() {
            return Decimal.times(player.thetaUpgrades[0], this.power())
        },
        power() {
            return Decimal.add(player.thetaUpgrades[2], 1)
        }
    }, {
        cost() {
            return Decimal.pow(1.25, player.thetaUpgrades[1]).times(25).floor()
        },
        effect() {
            return Decimal.times(player.thetaUpgrades[1], 3)
        },
        effect() {
            return Decimal.times(player.thetaUpgrades[1], this.power())
        },
        power() {
            return Decimal.add(player.thetaUpgrades[2], 3)
        }
    }, {
        cost() {
            return Decimal.pow(1.6, player.thetaUpgrades[2]).times(300).floor()
        },
        effect() {
            return player.thetaUpgrades[2]
        }
    }, {
        cost() {
            return Decimal.pow(2.5, player.thetaUpgrades[3]).times(4000).floor()
        },
        effect() {
            return Decimal.pow(1.5, player.thetaUpgrades[3])
        }
    }]
}

let tabHeight = 23

setInterval(mainLoop, 25)

function mainLoop() {
    // Time management
    const diff = (Date.now() - player.time) / 1000
    player.time = Date.now()

    // Calculations
    player.theta = Decimal.add(player.theta, getThetaGain('passive').times(diff))

    // Rerendering
    document.getElementById('thetaCountDisplay').textContent = formatWhole(player.theta)
    document.getElementById('thetaPerClickDisplay').textContent = formatWhole(getThetaGain('click'))
    document.getElementById('thetaPassiveDisplay').textContent = formatWhole(getThetaGain('passive'))

    document.getElementById('thetaUPG1count').textContent = formatWhole(player.thetaUpgrades[0])
    document.getElementById('thetaUPG1cost').textContent = formatWhole(game.thetaUpgrades[0].cost())
    document.getElementById('thetaUPG1effect').textContent = formatWhole(game.thetaUpgrades[0].effect())
    document.getElementById('thetaUPG1power').textContent = formatWhole(game.thetaUpgrades[0].power())

    document.getElementById('thetaUPG2count').textContent = formatWhole(player.thetaUpgrades[1])
    document.getElementById('thetaUPG2cost').textContent = formatWhole(game.thetaUpgrades[1].cost())
    document.getElementById('thetaUPG2effect').textContent = formatWhole(game.thetaUpgrades[1].effect())
    document.getElementById('thetaUPG2power').textContent = formatWhole(game.thetaUpgrades[1].power())

    document.getElementById('thetaUPG3count').textContent = formatWhole(player.thetaUpgrades[2])
    document.getElementById('thetaUPG3cost').textContent = formatWhole(game.thetaUpgrades[2].cost())
    document.getElementById('thetaUPG3effect').textContent = formatWhole(game.thetaUpgrades[2].effect())

    document.getElementById('thetaUPG4count').textContent = formatWhole(player.thetaUpgrades[3])
    document.getElementById('thetaUPG4cost').textContent = formatWhole(game.thetaUpgrades[3].cost())
    document.getElementById('thetaUPG4effect').textContent = format(game.thetaUpgrades[3].effect())

    // CSS variables
    // tabHeight = document.getElementById('tabView').getBoundingClientRect().height

    // Update Temp
    // updateTemp()
}

function getThetaGain(event) {
    let gain

    if (event === 'passive') {
        gain = new Decimal(0)
        gain = gain.add(game.thetaUpgrades[1].effect())
        gain = gain.times(game.thetaUpgrades[3].effect())
    }

    if (event === 'click') {
        gain = new Decimal(1)
        gain = gain.add(game.thetaUpgrades[0].effect())
    }

    return gain
}