function switchTabs(tab) {
    player.tab = tabs[tab]
    updateTab()
}

function updateTab() {
    for (let index = 0; index < tabs.length; index++) {
        let tabID = tabs[index];
        let display = 'none'
        if(player.tab == tabID)  display = 'flex'

        tabID = tabID + 'Tab'

        document.getElementById(tabID).style.display = display
    }
}