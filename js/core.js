let themeColor = '#060018'

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

    let thetaUPG3text = formatWhole(player.thetaUpgrades[2])
    if(!new Decimal(game.thetaUpgrades[2].bonus()).eq(0)) thetaUPG3text = thetaUPG3text + " + " + formatWhole(game.thetaUpgrades[2].bonus())
    document.getElementById('thetaUPG3count').textContent = thetaUPG3text
    document.getElementById('thetaUPG3cost').textContent = formatWhole(game.thetaUpgrades[2].cost())
    document.getElementById('thetaUPG3effect').textContent = formatWhole(game.thetaUpgrades[2].effect())

    document.getElementById('thetaUPG4count').textContent = formatWhole(player.thetaUpgrades[3])
    document.getElementById('thetaUPG4cost').textContent = formatWhole(game.thetaUpgrades[3].cost())
    document.getElementById('thetaUPG4effect').textContent = format(game.thetaUpgrades[3].effect())

    document.getElementById('thetaUPG5count').textContent = formatWhole(player.thetaUpgrades[4])
    document.getElementById('thetaUPG5cost').textContent = formatWhole(game.thetaUpgrades[4].cost())
    document.getElementById('thetaUPG5effect').textContent = formatWhole(game.thetaUpgrades[4].effect())

    // CSS variables and Modification
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