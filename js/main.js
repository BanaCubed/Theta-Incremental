function thetaButtonPress() {
    player.theta = Decimal.add(player.theta, getThetaGain('click'))
}

function thetaUPGbuy(upgrade, buymax = false) {
    const upgID = upgrade - 1

    if(!buymax) {
        if(new Decimal(player.theta).gte(game.thetaUpgrades[upgID].cost())) {
            if(game.thetaUpgrades[upgID].spends()) player.theta = Decimal.sub(player.theta, game.thetaUpgrades[upgID].cost())
            player.thetaUpgrades[upgID] = Decimal.add(player.thetaUpgrades[upgID], 1)
        }
    } else {
        if(new Decimal(player.theta).gte(game.thetaUpgrades[upgID].cost())) {
            const data = game.thetaUpgrades[upgID].buyMax()
            if(game.thetaUpgrades[upgID].spends()) player.theta = Decimal.sub(player.theta, data[0])
            player.thetaUpgrades[upgID] = Decimal.add(player.thetaUpgrades[upgID], data[1])
        }
    }
}

function rankUp() {
    if(player.theta.gte(game.ranks.nextat())) {
        player.ranks.ranks = Decimal.add(player.ranks.ranks, 1)
        game.reset.rankup()
        game.ranks.milestoneCheck()
    }
}

function toggleAuto(id, type) {
    if(type === 0) {
        id--
        player.automation.thetaUpgrades[id] = !player.automation.thetaUpgrades[id]
    }
}