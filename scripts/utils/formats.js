function format(x, precision = player.options.precision, small = false) {
    x = new Decimal(x)
    let davesWonderfulWorld = precision
    if(precision === 0) x = x.round()
    let e = x.div(x.log(10).floor().pow_base(10))
    let m = x.log(10).floor()
    e = e.toStringWithDecimalPlaces(precision)
    if(x.gte(player.options.standardLimit)) return e + 'e' + m
    else if(x.gte(player.options.standardStart)) {
        e = x.div(x.log(1000).floor().pow_base(1000))
        while (davesWonderfulWorld > 0) {
            if(Decimal.gte(e, Decimal.pow(10, davesWonderfulWorld))) precision--
            davesWonderfulWorld--
        }
        e = e.toStringWithDecimalPlaces(precision)
        return e + standardNotationSuffix(x)
    }
    while (davesWonderfulWorld > 0) {
        if(x.gte(Decimal.pow(10, davesWonderfulWorld))) precision--
        davesWonderfulWorld--
    }
    if(x.gte(Decimal.pow(0.1, player.options.precision)))return x.toStringWithDecimalPlaces(precision).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    else if(!small) return (0).toFixed(player.options.precision)
    else return format(Decimal.pow(x, -1)) + '⁻¹'
}

function formatWhole(x) {
    x = new Decimal(x).floor()
    if(x.lt(1e6)) return format(x, 0)
    else return format(x)
}

function formatDistance(x) {
    x = new Decimal(x)
    let unitMod = 14
    if(x.lt("1")) {
        x = x.times(1000)
        unitMod++
        if(x.lt("1")) {
            x = x.times(1000)
            unitMod++
            if(x.lt("1")) {
                x = x.times(1000)
                unitMod++
                if(x.lt("1")) {
                    x = x.times(1000)
                    unitMod++
                    if(x.lt("1")) {
                        x = x.times(1000)
                        unitMod++
                        if(x.lt("1")) {
                            x = x.times(1000)
                            unitMod++
                            if(x.lt("1")) {
                                x = x.times(1000)
                                unitMod++
                                if(x.lt("1")) {
                                    x = x.times(1000)
                                    unitMod++
                                    if(x.lt("1")) {
                                        x = x.times(1000)
                                        unitMod++
                                        if(x.lt("1")) {
                                            x = x.times(1000)
                                            unitMod++
                                            if(x.lt("1")) {
                                                x = x.times(1600)
                                                unitMod++
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if(x.gte("1e3"))  {
        x = x.div(1000)
        unitMod--
        if(x.gte("1e3"))  {
            x = x.div(1000)
            unitMod--
            if(x.gte("1e3"))  {
                x = x.div(1000)
                unitMod--
                if(x.gte("1e3"))  {
                    x = x.div(1000)
                    unitMod--
                    if(x.gte("1e3"))  {
                        x = x.div(1000)
                        unitMod--
                        if(x.gte("1e3"))  {
                            x = x.div(1000)
                            unitMod--
                            if(x.gte("1e3"))  {
                                x = x.div(1000)
                                unitMod--
                                if(x.gte("1e3"))  {
                                    x = x.div(1000)
                                    unitMod--
                                    if(x.gte("1e3"))  {
                                        x = x.div(1000)
                                        unitMod--
                                        if(x.gte("1e3"))  {
                                            x = x.div(1000)
                                            unitMod--
                                            if(x.gte("1e3"))  {
                                                x = x.div(1000)
                                                unitMod--
                                                if(x.gte("1e67"))  {
                                                    x = x.div("1e67")
                                                    unitMod--
                                                    if(x.gte("1.3e208"))  {
                                                        x = x.div("1.3e208")
                                                        unitMod--
                                                        if(x.gte(Decimal.pow(2, 1024).pow(Decimal.pow(2, 1024).log(10).sub(1)).times(1e100)))  {
                                                            x = x.div(Decimal.pow(2, 1024).pow(Decimal.pow(2, 1024).log(10).sub(1)).times(1e100)).log(10).add(1)
                                                            unitMod--
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const distances = ['really big universe', 'big universe', 'universe', 'quettameter', 'ronnameter', 'yottameter', 'zettameter', 'exameter', 'petameter', 'terameter', 'gigameter', 'megameter', 'kilometer', 'meter', 'millimeter', 'micrometer', 'nanometer', 'picometer', 'femtometer', 'attometer', 'zeptometer', 'yoctometer', 'rontometer', 'quectometer', 'plank length']

    let toUse = distances[unitMod]

    return format(x) + " " + toUse + "s"
}

function formatTime(x) {
    x = new Decimal(x)
    let text
    if(x.lt(60*60*24*365*1000)) {
        text = x.mod(60).toStringWithDecimalPlaces(player.options.precision - x.mod(60).toStringWithDecimalPlaces(0).length + 1) + 's'
        if(x.gte(60)) {
            x = x.div(60).floor()
            text = x.mod(60).toStringWithDecimalPlaces(0) + 'm ' + text
            if(x.gte(60)) {
                x = x.div(60).floor()
                text = x.mod(24).toStringWithDecimalPlaces(0) + 'h ' + text
                if(x.gte(24)) {
                    x = x.div(24).floor()
                    text = x.mod(365).toStringWithDecimalPlaces(0) + 'd ' + text
                    if(x.gte(365)) {
                        x = x.div(365).floor()
                        text = x.toStringWithDecimalPlaces(0) + 'y ' + text
                    }
                }
            }
        }
    } else {
        text = format(x.div(3600).div(24).div(365)) + 'y'
    }
    return text
}

function standardNotationSuffix(x) {
    let ones = ['', 'U', 'D', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No']
    let twos = ['', 'Dc', 'Vg', 'Tg', 'Qag', 'Qig', 'Sxg', 'Spg', 'Ocg', 'Nog']
    let threes = ['', 'C', 'Duc', 'Tc', 'Qac', 'Qic', 'Sxc', 'Spc', 'Occ', 'Noc']
    let fours = ['', 'Mi', 'Dm', 'Tm', 'Qam', 'Qim', 'Sxm', 'Spm', 'Ocm', 'Nom']
    x = new Decimal(x)
    if(x.lt(1e3)) return ''
    if(x.lt(1e6)) return ' K'
    if(x.lt(1e9)) return ' M'
    if(x.lt(1e12)) return ' B'
    if(x.lte(1e15)) return ' T'
    x = x.log(10).div(3).sub(1).floor()
    if(x.gte(10000)) return ' I do not want to optimise this'
    let digits = []
    for (let index = 1; index <= x.log(10).mag + 1; index++) {
        if(index % 4 === 1) digits.push(ones[  x.mod(Decimal.pow(10, index)).div(Decimal.pow(10, index - 1)).floor()])
        if(index % 4 === 2) digits.push(twos[  x.mod(Decimal.pow(10, index)).div(Decimal.pow(10, index - 1)).floor()])
        if(index % 4 === 3) digits.push(threes[x.mod(Decimal.pow(10, index)).div(Decimal.pow(10, index - 1)).floor()])
        if(index % 4 === 0) digits.push(fours[ x.mod(Decimal.pow(10, index)).div(Decimal.pow(10, index - 1)).floor()])
    }
    let text = ''
    for (let index = 0; index < digits.length; index++) {
        const element = digits[index];

        if(index === 0) text = ' '
        else if(index % 4 === 0) text = '-'
        text = text + element
        
    }
    return text
}