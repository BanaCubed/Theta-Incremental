let popupactive = false

function popup(text = 'lorem ipsum', type = 'alert', event) {
    if(type === 'alert') {
        if(player.options.promptStyle === 1) {
            alert(text)
        } else {
            pagePopup(text + `<br><br><button onclick="closePopup()">Close</button>`)
        }
    } else if(type === 'confirm') {
        if(player.options.promptStyle === 1) {
            let confirmed = confirm(text)
            if(event === 'hardreset' && confirmed) {
                player = basePlayer
                save()
            }
            if(event === 'rankup' && confirmed) {
                player.theta = new Decimal(0)
                player.thetaUpgrades = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
                player.ranks.lastRankup = player.time
                player.ranks.ranks = Decimal.add(player.ranks.ranks, 1)
            }
            if(event === 'rankrespec' && confirmed) {
                game.reset.rankup(true)
                player.ranks.rankRowsData = [0]
                player.ranks.rankUpgrades1 = [false, false, false, false, false]
            }
        } else {
            if(event === 'hardreset') {
                pagePopup(text + `
                    <br><br>
                    <button class="strangeBugfix DangerousButton" onclick="
                        player = basePlayer;
                        save()">Confirm</button>
                    <button class="strangeBugfix" onclick="closePopup()">Cancel</button>
                `)
            }
            if(event === 'rankup') {
                pagePopup(text + `
                    <br><br>
                    <button class="strangeBugfix" onclick="
                    player.theta = new Decimal(0);
                    player.thetaUpgrades = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)];
                    player.ranks.lastRankup = player.time;
                    player.ranks.ranks = Decimal.add(player.ranks.ranks, 1);">Rankup</button>
                    <button class="strangeBugfix" onclick="closePopup()">Cancel</button>
                `)
            }
            if(event === 'rankrespec') {
                pagePopup(text + `
                    <br><br>
                    <button class="strangeBugfix" onclick="
                    game.reset.rankup(true);
                    player.ranks.rankRowsData = [0];
                    player.ranks.rankUpgrades1 = [false, false, false, false, false];">Respec</button>
                    <button class="strangeBugfix" onclick="closePopup()">Cancel</button>
                `)
            }
        }
    } else if(type === 'prompt') {
        if(player.options.promptStyle === 1) {
            let thingymajig = prompt(text)
            if(event === 'import') {
                thingymajig = thingymajig.substring(3)
                load(thingymajig)
            }
        } else {
            if(event === 'import') {
                pagePopup(text + `
                    <br><br>
                    <textarea id="importSaveSection" class="coolepictextbox" name="import" placeholder="Enter save here"></textarea>
                    <br><br>
                    <button class="strangeBugfix" onclick="
                        let savedata = document.getElementById('importSaveSection').value;
                        savedata = savedata.substring(3);
                        load(savedata);
                        closePopup()">Submit</button>
                    <button class="strangeBugfix" onclick="closePopup()">Cancel</button>
                `)
            }
        }
    }
}

function pagePopup(HTML) {
    if(popupactive) return
    popupactive = true
    document.getElementById('popup').innerHTML = HTML
    document.getElementById('popup').style.transition = 'none'
    document.getElementById('popup').style.setProperty('--height', document.getElementById('popup').getBoundingClientRect().height + 'px')
    document.documentElement.classList.add('inPopup')
    setTimeout(function() {
        document.getElementById('popup').style.transition = 'all 1s'
        document.getElementById('popup').classList.add('activated')
    }, 50)
}

function closePopup() {
    document.getElementById('popup').classList.remove('activated')
    popupactive = false
    setTimeout(function() {
        document.getElementById('popup').style.transition = 'none'
        document.documentElement.classList.remove('inPopup')
    }, 850)
}