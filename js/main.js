function thetaButtonPress() {
    player.theta = Decimal.add(player.theta, getThetaGain('click'))
}

function thetaUPGbuy(upgrade) {
    if(upgrade === 1) {
        if(player.theta.gte(game.thetaUpgrades[0].cost())) {
            player.theta = Decimal.sub(player.theta, game.thetaUpgrades[0].cost())
            player.thetaUpgrades[0] = Decimal.add(player.thetaUpgrades[0], 1)
        }
    }

    if(upgrade === 2) {
        if(player.theta.gte(game.thetaUpgrades[1].cost())) {
            player.theta = Decimal.sub(player.theta, game.thetaUpgrades[1].cost())
            player.thetaUpgrades[1] = Decimal.add(player.thetaUpgrades[1], 1)
        }
    }

    if(upgrade === 3) {
        if(player.theta.gte(game.thetaUpgrades[2].cost())) {
            player.theta = Decimal.sub(player.theta, game.thetaUpgrades[2].cost())
            player.thetaUpgrades[2] = Decimal.add(player.thetaUpgrades[2], 1)
        }
    }

    if(upgrade === 4) {
        if(player.theta.gte(game.thetaUpgrades[3].cost())) {
            player.theta = Decimal.sub(player.theta, game.thetaUpgrades[3].cost())
            player.thetaUpgrades[3] = Decimal.add(player.thetaUpgrades[3], 1)
        }
    }
}