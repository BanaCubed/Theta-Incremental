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

function getThetaGain(event) {
    let gain

    if (event === 'passive') {
        gain = new Decimal(0)
        gain = gain.add(game.thetaUpgrades[1].effect())
        gain = gain.times(game.thetaUpgrades[3].effect())
        gain = gain.times(game.thetaUpgrades[6].effect())
        if(player.ranks.rankUpgrades1[4]) gain = gain.times(Decimal.pow(55, game.ranks.unspentEnergy()))
        if(player.ranks.milestones >= 9) gain = gain.times(Decimal.sub(player.time, player.ranks.lastRankup).add(1).pow(0.25))

        gain = gain.add(Decimal.times(getThetaGain('click'), getCPS()))
    }

    if (event === 'click') {
        gain = new Decimal(1)
        gain = gain.add(game.thetaUpgrades[0].effect())
        gain = gain.times(game.thetaUpgrades[6].effect())
        if(player.ranks.rankUpgrades1[4]) gain = gain.times(Decimal.pow(40, game.ranks.unspentEnergy()))
        if(player.ranks.milestones >= 9) gain = gain.times(Decimal.sub(player.time, player.ranks.lastRankup).add(1).pow(0.25))
    }

    return gain
}

function rankUp() {
    if(player.theta.gte(game.ranks.nextat())) {
        game.reset.rankup(false, true)
    }
    game.ranks.milestoneCheck()
}

function toggleAuto(id, type) {
    if(type === 0) {
        id--
        player.automation.thetaUpgrades[id] = !player.automation.thetaUpgrades[id]
    }
}

function rankUPGbuy(row, id) {
    id--
    if(row === 1 && Decimal.gte(game.ranks.unspentEnergy(), game.ranks.upgrades[1].cost()) && !player.ranks.rankUpgrades1[id]) {
        player.ranks.rankRowsData[0]++
        player.ranks.rankUpgrades1[id] = true
    }
}

function respecRanks(condition = false) {
    if(player.options.rankupConfirm == 0) condition = true
    if(!condition) popup('Are you sure you want to Respec you Rank Energy upgrades? This will force a Rank reset, without any gain!', 'confirm', 'rankrespec')
    if(condition) {
        game.reset.rankup(true)
        player.ranks.rankRowsData = [0]
        player.ranks.rankUpgrades1 = [false, false, false, false, false]
    } else {
        return
    }
}

function switchTabs(tab, isSubtab = false, subtab) {
    if (!isSubtab) {
        player.tab = tabs[tab]
        updateTab()
    } else {
        if(tab === 1) player.subtabs.ranks = subtabs.ranks[subtab]
        updateSubtab()
    }
}

function updateTab() {
    for (let index = 0; index < tabs.length; index++) {
        const tabID = tabs[index];
        let display = 'none'
        if(player.tab == tabID)  display = 'flex'

        document.getElementById(tabID + 'Tab').style.display = display
    }

    updateSubtab()

    game.ranks.rerenderMilestones()
}

function updateSubtab() {
    for (const key in subtabs) {
        if (Object.hasOwnProperty.call(subtabs, key)) {
            const maintab = subtabs[key];
            
            for (let index = 0; index < maintab.length; index++) {
                const subtabID = maintab[index];
                
                let state = 'none'
                if(player.subtabs.ranks === subtabID) state = 'flex'

                document.getElementById(subtabID + 'Subtab').style.display = state
            }
        }
    }
}

function getCPS() {
    let cps = new Decimal(5)
    if(player.ranks.milestones >= 1) cps = cps.times(player.ranks.ranks)
    if(player.ranks.milestones >= 5) cps = cps.pow(2)
    return cps
}