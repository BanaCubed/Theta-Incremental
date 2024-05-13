setInterval(mainLoop, 25)

let color = 270

function mainLoop() {
    // Time management
    const diff = (Date.now() - player.time) / 1000
    player.time = Date.now()
    player.playtime += diff

    // Calculations
    player.theta = Decimal.add(player.theta, getThetaGain('passive').times(diff))
    if(Decimal.gte(player.theta, player.ranks.bestTheta)) player.ranks.bestTheta = player.theta
    if(Decimal.gte(player.theta, player.ranks.bestTheta)) {
        player.ranks.bestTheta = player.theta
    }
    player.ranks.rankEnergy = game.ranks.calculateTotalEnergy()

    // Automation
    if(player.unlocks.automation.theta >= 1) {
        if(player.automation.thetaUpgrades[0]) thetaUPGbuy(1, true)
        if(player.automation.thetaUpgrades[1]) thetaUPGbuy(2, true)
        if(player.automation.thetaUpgrades[2]) thetaUPGbuy(3, true)
        if(player.automation.thetaUpgrades[3]) thetaUPGbuy(4, true)
        if(player.automation.thetaUpgrades[4]) thetaUPGbuy(5, true)
        if(player.automation.thetaUpgrades[5]) thetaUPGbuy(6, true)
        if(player.automation.thetaUpgrades[6]) thetaUPGbuy(7, true)
    }

    // Rerendering
    // Theta Display
    document.getElementById('thetaCountDisplay').textContent = formatWhole(player.theta)
    document.getElementById('thetaPerClickDisplay').textContent = formatWhole(getThetaGain('click'))
    document.getElementById('thetaPassiveDisplay').textContent = formatWhole(getThetaGain('passive'))

    document.getElementById('ranksCountDisplay').textContent = formatWhole(player.ranks.ranks)
    document.getElementById('rankRequirementDisplay').textContent = formatWhole(game.ranks.nextat())

    if(player.unlocks.automation.theta >= 3) document.getElementById('rankResource').style.display = 'unset'


    if(player.tab === 'theta') {
        document.getElementById('thetaUPG1count').textContent = formatWhole(player.thetaUpgrades[0])
        document.getElementById('thetaUPG1cost').textContent = formatWhole(game.thetaUpgrades[0].cost())
        document.getElementById('thetaUPG1effect').textContent = formatWhole(game.thetaUpgrades[0].effect())
        document.getElementById('thetaUPG1power').textContent = formatWhole(game.thetaUpgrades[0].power())
        document.getElementById('thetaUPG1auto').textContent = 'Auto: ' + (player.automation.thetaUpgrades[0] ? 'On' : 'Off')

        document.getElementById('thetaUPG2count').textContent = formatWhole(player.thetaUpgrades[1])
        document.getElementById('thetaUPG2cost').textContent = formatWhole(game.thetaUpgrades[1].cost())
        document.getElementById('thetaUPG2effect').textContent = formatWhole(game.thetaUpgrades[1].effect())
        document.getElementById('thetaUPG2power').textContent = formatWhole(game.thetaUpgrades[1].power())
        document.getElementById('thetaUPG2auto').textContent = 'Auto: ' + (player.automation.thetaUpgrades[1] ? 'On' : 'Off')

        let thetaUPG3text = formatWhole(player.thetaUpgrades[2])
        if(!Decimal.eq(game.thetaUpgrades[2].bonus(), 0)) thetaUPG3text = thetaUPG3text + " + " + formatWhole(game.thetaUpgrades[2].bonus())
        document.getElementById('thetaUPG3count').textContent = thetaUPG3text
        document.getElementById('thetaUPG3cost').textContent = formatWhole(game.thetaUpgrades[2].cost())
        document.getElementById('thetaUPG3effect').textContent = format(game.thetaUpgrades[2].effect(), 1)
        document.getElementById('thetaUPG3power').textContent = format(game.thetaUpgrades[2].power(), 1)
        document.getElementById('thetaUPG3auto').textContent = 'Auto: ' + (player.automation.thetaUpgrades[2] ? 'On' : 'Off')

        document.getElementById('thetaUPG4count').textContent = formatWhole(player.thetaUpgrades[3])
        document.getElementById('thetaUPG4cost').textContent = formatWhole(game.thetaUpgrades[3].cost())
        document.getElementById('thetaUPG4effect').textContent = format(game.thetaUpgrades[3].effect())
        document.getElementById('thetaUPG4power').textContent = format(game.thetaUpgrades[3].power())
        document.getElementById('thetaUPG4auto').textContent = 'Auto: ' + (player.automation.thetaUpgrades[3] ? 'On' : 'Off')

        document.getElementById('thetaUPG5count').textContent = formatWhole(player.thetaUpgrades[4])
        document.getElementById('thetaUPG5cost').textContent = formatWhole(game.thetaUpgrades[4].cost())
        document.getElementById('thetaUPG5effect').textContent = format(game.thetaUpgrades[4].effect(), 1)
        document.getElementById('thetaUPG5power').textContent = format(game.thetaUpgrades[4].power(), 1)
        document.getElementById('thetaUPG5auto').textContent = 'Auto: ' + (player.automation.thetaUpgrades[4] ? 'On' : 'Off')

        document.getElementById('thetaUPG6count').textContent = formatWhole(player.thetaUpgrades[5])
        document.getElementById('thetaUPG6cost').textContent = formatWhole(game.thetaUpgrades[5].cost())
        document.getElementById('thetaUPG6effect').textContent = format(game.thetaUpgrades[5].effect(), 1)
        document.getElementById('thetaUPG6power').textContent = format(game.thetaUpgrades[5].power(), 1)
        document.getElementById('thetaUPG6auto').textContent = 'Auto: ' + (player.automation.thetaUpgrades[5] ? 'On' : 'Off')

        document.getElementById('thetaUPG7count').textContent = formatWhole(player.thetaUpgrades[6])
        document.getElementById('thetaUPG7cost').textContent = formatWhole(game.thetaUpgrades[6].cost())
        document.getElementById('thetaUPG7effect').textContent = format(game.thetaUpgrades[6].effect())
        document.getElementById('thetaUPG7power').textContent = format(game.thetaUpgrades[6].power())
        document.getElementById('thetaUPG7auto').textContent = 'Auto: ' + (player.automation.thetaUpgrades[6] ? 'On' : 'Off')

        if(player.unlocks.automation.theta >= 1) {
            document.getElementById('thetaUPG1auto').style.display = 'unset'
            document.getElementById('thetaUPG2auto').style.display = 'unset'
            document.getElementById('thetaUPG3auto').style.display = 'unset'
        }

        if(player.unlocks.automation.theta >= 2) {
            document.getElementById('thetaUPG4auto').style.display = 'unset'
        }

        if(player.unlocks.automation.theta >= 3) {
            document.getElementById('thetaUPG5auto').style.display = 'unset'
        }

        if(player.unlocks.automation.theta >= 4) {
            document.getElementById('thetaUPG6auto').style.display = 'unset'
        }

        if(player.unlocks.automation.theta >= 5) {
            document.getElementById('thetaUPG7auto').style.display = 'unset'
        }

        if(player.ranks.milestones >= 4) {
            document.getElementById('thetaUPG6box').style.display = 'unset'
            document.getElementById('thetaUPG7box').style.display = 'unset'
        } else {
            document.getElementById('thetaUPG6box').style.display = 'none'
            document.getElementById('thetaUPG7box').style.display = 'none'
        }
    }

    if(player.tab === 'ranks') {
        document.getElementById('rankRequirement').textContent = formatWhole(game.ranks.nextat())
        let rankMilestoneText = "At Rank " + formatWhole(game.ranks.milestonesRequirements[player.ranks.milestones]) + ", " + game.ranks.milestonesText[player.ranks.milestones]
        document.getElementById('ranksNextMilestone').textContent = rankMilestoneText
        document.getElementById('ranksCount').textContent = formatWhole(player.ranks.ranks)
        game.ranks.rerenderMilestones()

        document.getElementById('currentRankEnergy').textContent = formatWhole(game.ranks.unspentEnergy())
        document.getElementById('totalRankEnergy').textContent = formatWhole(player.ranks.rankEnergy)
        document.getElementById('nextRankEnergy').textContent = formatWhole(game.ranks.nextEnergyAt())
        document.getElementById('rankEnergyCost').textContent = formatWhole(game.ranks.upgrades[1].cost())

        if(player.unlocks.tabs >= 1) document.getElementById('rankEnergySubtabButton').style.display = 'unset'

        document.getElementById('rankUPG1a1').textContent = formatWhole(game.ranks.upgrades[1].effects.a1().times(100))
        document.getElementById('rankUPG1a2').textContent = formatWhole(game.ranks.upgrades[1].effects.a2().times(100))
        document.getElementById('rankUPG1b1').textContent = formatWhole(game.ranks.upgrades[1].effects.b1().times(100))
        document.getElementById('rankUPG1c1').textContent = format(game.ranks.upgrades[1].effects.c1().times(100))
        document.getElementById('rankUPG1d1').textContent = format(game.ranks.upgrades[1].effects.d1().times(100))
        document.getElementById('rankUPG1e1').textContent = formatWhole(game.ranks.upgrades[1].effects.e1())

        if(player.ranks.rankUpgrades1[0]) {
            document.getElementById('rankUPG1').style.backgroundColor = 'rgba(0, 128, 0, 0.5)'
            document.getElementById('rankUPG1buyButton').style.backgroundColor = 'hsl(120, 100%, 20%)'
            document.getElementById('rankUPG1buyButton').style.pointerEvents = 'none'
            document.getElementById('rankUPG1buyButton').textContent = 'Already Purchased'
        } else {
            document.getElementById('rankUPG1').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            document.getElementById('rankUPG1buyButton').style.backgroundColor = 'var(--buttonbackgroundcolor)'
            document.getElementById('rankUPG1buyButton').style.pointerEvents = 'unset'
            document.getElementById('rankUPG1buyButton').textContent = 'Buy'
        }
        if(player.ranks.rankUpgrades1[1]) {
            document.getElementById('rankUPG2').style.backgroundColor = 'rgba(0, 128, 0, 0.5)'
            document.getElementById('rankUPG2buyButton').style.backgroundColor = 'hsl(120, 100%, 20%)'
            document.getElementById('rankUPG2buyButton').style.pointerEvents = 'none'
            document.getElementById('rankUPG2buyButton').textContent = 'Already Purchased'
        } else {
            document.getElementById('rankUPG2').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            document.getElementById('rankUPG2buyButton').style.backgroundColor = 'var(--buttonbackgroundcolor)'
            document.getElementById('rankUPG2buyButton').style.pointerEvents = 'unset'
            document.getElementById('rankUPG2buyButton').textContent = 'Buy'
        }
        if(player.ranks.rankUpgrades1[2]) {
            document.getElementById('rankUPG3').style.backgroundColor = 'rgba(0, 128, 0, 0.5)'
            document.getElementById('rankUPG3buyButton').style.backgroundColor = 'hsl(120, 100%, 20%)'
            document.getElementById('rankUPG3buyButton').style.pointerEvents = 'none'
            document.getElementById('rankUPG3buyButton').textContent = 'Already Purchased'
        } else {
            document.getElementById('rankUPG3').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            document.getElementById('rankUPG3buyButton').style.backgroundColor = 'var(--buttonbackgroundcolor)'
            document.getElementById('rankUPG3buyButton').style.pointerEvents = 'unset'
            document.getElementById('rankUPG3buyButton').textContent = 'Buy'
        }
        if(player.ranks.rankUpgrades1[3]) {
            document.getElementById('rankUPG4').style.backgroundColor = 'rgba(0, 128, 0, 0.5)'
            document.getElementById('rankUPG4buyButton').style.backgroundColor = 'hsl(120, 100%, 20%)'
            document.getElementById('rankUPG4buyButton').style.pointerEvents = 'none'
            document.getElementById('rankUPG4buyButton').textContent = 'Already Purchased'
        } else {
            document.getElementById('rankUPG4').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            document.getElementById('rankUPG4buyButton').style.backgroundColor = 'var(--buttonbackgroundcolor)'
            document.getElementById('rankUPG4buyButton').style.pointerEvents = 'unset'
            document.getElementById('rankUPG4buyButton').textContent = 'Buy'
        }
        if(player.ranks.rankUpgrades1[4]) {
            document.getElementById('rankUPG5').style.backgroundColor = 'rgba(0, 128, 0, 0.5)'
            document.getElementById('rankUPG5buyButton').style.backgroundColor = 'hsl(120, 100%, 20%)'
            document.getElementById('rankUPG5buyButton').style.pointerEvents = 'none'
            document.getElementById('rankUPG5buyButton').textContent = 'Already Purchased'
        } else {
            document.getElementById('rankUPG5').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            document.getElementById('rankUPG5buyButton').style.backgroundColor = 'var(--buttonbackgroundcolor)'
            document.getElementById('rankUPG5buyButton').style.pointerEvents = 'unset'
            document.getElementById('rankUPG5buyButton').textContent = 'Buy'
        }
    }

    if(player.tab === 'stats') {
        let degrees = game.stats.theta.degrees()
        let increases = 0
        if(degrees.lt(1)) {
            degrees = degrees.times(60)
            increases++
            if(degrees.lt(1)) {
                degrees = degrees.times(60)
                increases++
                if(degrees.lt(1)) {
                    degrees = degrees.times(1000)
                    increases++
                    if(degrees.lt(1)) {
                        degrees = degrees.times(1000)
                        increases++
                        if(degrees.lt(1)) {
                            degrees = degrees.times(1000)
                            increases++
                            if(degrees.lt(1)) {
                                degrees = degrees.times(1000)
                                increases++
        }}}}}}
        let degreestype = ' degrees'
        if(increases === 1) degreestype = ' arc minutes'
        if(increases === 2) degreestype = ' arc seconds'
        if(increases === 3) degreestype = ' arc milliseconds'
        if(increases === 4) degreestype = ' arc microseconds'
        if(increases === 5) degreestype = ' arc nanoseconds'
        if(increases === 6) degreestype = ' arc picoseconds'
        document.getElementById('statsDegrees').textContent = format(degrees) + degreestype
        document.getElementById('statsRotations').textContent = format(game.stats.theta.rotations())
        if(player.theta.lt(1.296e21)) document.getElementById('rotationS').textContent = ''
        if(player.theta.gte(1.296e21)) document.getElementById('rotationS').textContent = 's'

        if(game.stats.theta.rotations().gt(1)) document.getElementById('thetaDistance').style.display = 'unset'
        else document.getElementById('thetaDistance').style.display = 'none'
        
        if(Decimal.gte(player.theta, 1)) document.getElementById('thetaRotation').style.display = 'unset'
        else document.getElementById('thetaRotation').style.display = 'none'
        
        document.getElementById('statsRadius').textContent = formatDistance(game.stats.theta.radius())
        document.getElementById('statsDistance').textContent = formatDistance(game.stats.theta.distance())
    }

    // CSS variables and Modification
    document.documentElement.style.setProperty('--themecolor', color)
}