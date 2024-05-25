setInterval(mainLoop, 25)

let color = 270

async function mainLoop(diff = null, rerender = true) {
    // Time management
    if(diff === null) diff = (Date.now() - player.time) / 1000
    player.time += diff
    player.playtime += diff

    // Calculations
    player.theta = Decimal.add(player.theta, getThetaGain('passive').times(diff))
    player.totalTheta = Decimal.add(player.totalTheta, getThetaGain('passive').times(diff))
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
    if(rerender) {   
        updateHeader()
        if(player.tab === 'theta') { updateTheta() }
        if(player.tab === 'ranks') { updateRanks() }
        if(player.tab === 'stats') { updateStats() }
        if(player.tab === 'options') { updateOptions() }
    }

    // CSS variables and Modification
    document.documentElement.style.setProperty('--themecolor', color)
}