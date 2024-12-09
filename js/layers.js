addLayer('unlocks', {
    startData() { return {
        auto: {
            theta: {
                11: false,
                12: false,
                13: false,
                14: false,
                15: false,
                21: false,
                22: false,
                23: false,
                24: false,
                25: false,
            },
        },
        progression: 0,
    }},
    row: 'side',
    layerShown(){return false},
    update(diff) {
        if(hasMilestone('ranks', 2) && !player.unlocks.auto.theta[15]) {
            if(player.ranks.points.gte(3) && !player.unlocks.auto.theta[13]) {
                player.unlocks.auto.theta[11] = true
                player.unlocks.auto.theta[12] = true
                player.unlocks.auto.theta[13] = true
            }
            if(player.ranks.points.gte(4) && !player.unlocks.auto.theta[14]) { player.unlocks.auto.theta[14] = true }
            if(player.ranks.points.gte(5) && !player.unlocks.auto.theta[15]) { player.unlocks.auto.theta[15] = true }
        }
        if(hasMilestone('ranks', 4) && player.unlocks.progression < 1) { player.unlocks.progression = 1 }
        if(hasMilestone('ranks', 7) && player.unlocks.progression < 2) { player.unlocks.progression = 2 }
        if(hasMilestone('ranks', 5) && !player.unlocks.auto.theta[21]) { player.unlocks.auto.theta[21] = true }
        if(hasMilestone('ranks', 6) && !player.unlocks.auto.theta[22]) { player.unlocks.auto.theta[22] = true }
    },
})

addLayer('auto', {
    startData() { return {
        theta: {
            11: false,
            12: false,
            13: false,
            14: false,
            15: false,
            21: false,
            22: false,
            23: false,
            24: false,
            25: false,
        },
    }},
    row: 'side',
    layerShown(){return false},
})


