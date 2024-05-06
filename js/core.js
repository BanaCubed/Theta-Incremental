let player = {
    theta: new Decimal(0),
    time: Date.now(),
    thetaUpgrades: {
        1: {
            cost: new Decimal(25),
            count: new Decimal(0),
            power: new Decimal(1),
        },
        2: {
            cost: new Decimal(25),
            count: new Decimal(0),
            power: new Decimal(3),
        },
    },
}

let tabHeight = 23

setInterval(mainLoop, 25)

function mainLoop() {
    // Time management
    const diff = (Date.now() - player.time) / 1000
    player.time = Date.now()

    // Calculations
    player.theta = player.theta.add(getThetaGain('passive').times(diff))

    // Rerendering
    document.getElementById('thetaCountDisplay').textContent = formatWhole(player.theta)
    document.getElementById('thetaPerClickDisplay').textContent = formatWhole(getThetaGain('click'))

    // CSS variables
    // tabHeight = document.getElementById('tabView').getBoundingClientRect().height
}

function getThetaGain(event) {
    let gain

    if (event === 'passive') {
        gain = new Decimal(0)
    }

    if (event === 'click') {
        gain = new Decimal(1)
    }

    return gain
}