async function updateOptions() {
    document.getElementById('pinHeaderSelection').style.setProperty('--leftPos', player.options.pinHeader == true ? '0px' : player.options.pinHeader == false ? '160px' : '80px')
    document.getElementById('pinHeaderSelection').style.setProperty('border-radius', player.options.pinHeader == true ? '0 0 0 7px' : player.options.pinHeader == false ? '0 7px 7px 0' : '0 0 0 0')
    document.getElementById('rankupConfirmSelection').style.setProperty('--leftPos', player.options.rankupConfirm === 2 ? '0px' : player.options.rankupConfirm === 1 ? '80px' : '160px')
    document.getElementById('rankupConfirmSelection').style.setProperty('border-radius', player.options.rankupConfirm === 2 ? '0 0 0 7px' : player.options.rankupConfirm === 0 ? '0 7px 7px 0' : '0 0 0 0')
    document.getElementById('promptSelection').style.setProperty('--leftPos', player.options.promptStyle === 2 ? '0px' : '80px')
    document.getElementById('promptSelection').style.setProperty('border-radius', player.options.promptStyle === 2 ? '0 0 0 7px' : '0 7px 7px 0')
}

async function updateStats() {
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

    if(Decimal.gte(player.ranks.ranks, 1)) document.getElementById('rankLength').style.display = 'unset'
    else document.getElementById('rankLength').style.display = 'none'
    
    document.getElementById('statsRadius').textContent = formatDistance(game.stats.theta.radius())
    document.getElementById('statsDistance').textContent = formatDistance(game.stats.theta.distance())
    
    document.getElementById('totalTheta').textContent = formatWhole(player.totalTheta)
    document.getElementById('timePlayed').textContent = formatTime(player.playtime)
    
    document.getElementById('rankLengthTime').textContent = formatTime(Date.now() / 1000 - player.ranks.lastRankup / 1000)
}

async function updateRanks() {
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

    for (let index = 0; index <= 4; index++) {
        const IDname = 'rankUPG' + (index + 1)
        
        if(player.ranks.rankUpgrades1[index]) {
            document.getElementById(IDname).style.backgroundColor = 'rgba(0, 128, 0, 0.5)'
            document.getElementById(IDname + 'buyButton').textContent = 'Already Purchased'
            document.getElementById(IDname + 'buyButton').classList.add('bought')
        } else {
            document.getElementById(IDname).style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            document.getElementById(IDname + 'buyButton').textContent = 'Buy'
            document.getElementById(IDname + 'buyButton').classList.remove('bought')
        }
    }
}

async function updateTheta() {
    for (let index = 0; index <= 9; index++) {
        const IDname = 'thetaUPG' + (index + 1)
        
        document.getElementById(IDname + 'count').textContent = game.thetaUpgrades[index].bonus().lt(1) ? formatWhole(player.thetaUpgrades[index]) : formatWhole(player.thetaUpgrades[index]) + ' + ' + formatWhole(game.thetaUpgrades[index].bonus())
        document.getElementById(IDname + 'cost').textContent = formatWhole(game.thetaUpgrades[index].cost())
        document.getElementById(IDname + 'effect').textContent = format(game.thetaUpgrades[index].effect())
        document.getElementById(IDname + 'power').textContent = format(game.thetaUpgrades[index].power())
        document.getElementById(IDname + 'auto').textContent = 'Auto: ' + (player.automation.thetaUpgrades[index] ? 'On' : 'Off')

        if(Decimal.gte(player.theta, game.thetaUpgrades[index].cost())) {
            document.getElementById(IDname + 'box').classList.add('canBuyTheta')
        } else {
            document.getElementById(IDname + 'box').classList.remove('canBuyTheta')
        }
    }

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

    if(player.ranks.milestones >= 10) {
        document.getElementById('thetaUPG8box').style.display = 'unset'
        document.getElementById('thetaUPG9box').style.display = 'unset'
        document.getElementById('thetaUPG10box').style.display = 'unset'
    } else {
        document.getElementById('thetaUPG8box').style.display = 'none'
        document.getElementById('thetaUPG9box').style.display = 'none'
        document.getElementById('thetaUPG10box').style.display = 'none'
    }
}

async function updateAll() {
    player.theta = new Decimal(player.theta)
    await updateTheta()
    updateRanks()
    updateStats()
    updateOptions()
    updateHeader()

    window.onload = function() {
        setTimeout(function() {document.getElementById('loadingScreen').style.display = 'none'}, 50)
    }
}

async function updateHeader() {
    if(document.documentElement.scrollTop >= 8 && player.options.pinHeader === true) {
        document.getElementById('resourcesDisplay').style.boxShadow = '0 0 10px #000, 0 0 20px #000, 0 0 15px #000, 0 0 5px #000'
    } else {
        document.getElementById('resourcesDisplay').style.boxShadow = 'unset'
    }
    if(player.options.pinHeader == true) {
        document.getElementById('resourcesDisplay').style.position = 'fixed'
    } else {
        document.getElementById('resourcesDisplay').style.position = 'absolute'
    }
    
    if(document.documentElement.scrollTop >= 8 && player.options.pinHeader === 'values') {
        document.getElementById('resourceValues').style.boxShadow = '0 0 10px #000, 0 0 20px #000, 0 0 15px #000, 0 0 5px #000'
    } else {
        document.getElementById('resourceValues').style.boxShadow = 'unset'
    }
    if(player.options.pinHeader == 'values') {
        document.getElementById('resourceValues').style.position = 'fixed'
    } else {
        document.getElementById('resourceValues').style.position = 'absolute'
    }

    document.getElementById('thetaCountDisplay').textContent = formatWhole(player.theta)
    document.getElementById('thetaPerClickDisplay').textContent = formatWhole(getThetaGain('click'))
    document.getElementById('thetaPassiveDisplay').textContent = formatWhole(getThetaGain('passive'))

    document.getElementById('ranksCountDisplay').textContent = formatWhole(player.ranks.ranks)
    document.getElementById('rankRequirementDisplay').textContent = formatWhole(game.ranks.nextat())

    if(player.unlocks.automation.theta >= 3) document.getElementById('rankResource').style.display = 'unset'
    if(player.unlocks.automation.theta >= 3) document.getElementById('rankupQuickButton').style.display = 'unset'
}