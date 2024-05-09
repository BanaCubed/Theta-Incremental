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

    if(player.tab === 'ranks') game.ranks.rerenderMilestones()
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