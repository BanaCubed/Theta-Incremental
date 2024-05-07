function thetaButtonPress() {
    player.theta = Decimal.add(player.theta, getThetaGain('click'))
}

function thetaUPGbuy(upgrade, buymax = false) {
    const upgID = upgrade - 1

    if(!buymax) {
        if(new Decimal(player.theta).gte(game.thetaUpgrades[upgID].cost())) {
            player.theta = Decimal.sub(player.theta, game.thetaUpgrades[upgID].cost())
            player.thetaUpgrades[upgID] = Decimal.add(player.thetaUpgrades[upgID], 1)
        }
    } else {
        if(new Decimal(player.theta).gte(game.thetaUpgrades[upgID].cost())) {
            const data = game.thetaUpgrades[upgID].buyMax()
            player.theta = Decimal.sub(player.theta, data[0])
            player.thetaUpgrades[upgID] = Decimal.add(player.thetaUpgrades[upgID], data[1])
        }
    }
}