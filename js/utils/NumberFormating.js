/*   --- GLOBAL NUMBER FORMATTING FUNCTION ---
     --- DIRECTLY TAKEN AND REDUCED FROM CREATE INCREMENTAL ---

   --- INPUTS ---

n         - Number to format
int       - Whether or not to force whole numbers from 1-10,000
small     - Whether or not to allow formatting of numbers below 0.01 (unfinished)
type      - Formatting to use (see below key)


   --- NOTATIONS ---
    (type variable)


    0 - Mixed Scientific
        Standard notation until e306 (all prefixes up to and including centillion)
        Scientific notation until ee6 (beyond this point the number before the e becomes meaningless)
        Logarithmic notation beyond ee6 (after ee9, will start to have notation in the exponent)
    
    1 - Scientific
        Scientific notation until ee6 (beyond this point the number before the e becomes meaningless)
        Logarithmic notation beyond ee6  (after ee9, will start to have notation in the exponent)
    
    2 - Logarithm
        Logarithmic notation beyond ee6  (after ee9, will start to have notation in the exponent)

    4 - Letters
        Standard, but uses an infinite base-26 system, and also is likely to break at higher numbers
        Pseudo-Joke Notation
    
    5 - Mixed Logarithm
        Scientific notation until e100
        Logarithmic notation beyond e100  (after ee9, will start to have notation in the exponent)
        This is different to sicentific, as it actually uses the decimal portion of the exponent in logarithmic notation meaningfully

*/

function format(n, int = false, small = false, type = options.notation) {
    n = new Decimal(n);

    // NaNCheck
    if (isNaN(n.sign) || isNaN(n.layer) || isNaN(n.mag)) {
        player.hasNaN = true;
        return "NaN"
    }

    // Default formatting (unnaffected by notations)
    if(n.lt(0.01)) {
        if(small && !int && n.neq(0)) {
            return format(n.recip(), false, false, type) + '<sup>-1</sup>'
        } else return int?'0':'0.00';
    }

    if(n.gte('(e^1000)1')) {
        return 'Infinity'
    }

    if(n.lt('10000')) {
        if(int) { return n.toStringWithDecimalPlaces(0) }
        if(n.lt('100')) { return n.toStringWithDecimalPlaces(2); }
        return n.toStringWithDecimalPlaces(1);
    }
    
    if(type == 4) { return formatLetters(n, letters); }

    if(n.lt('1e9')) { return formatComma(n); }

    // Actual notations
    if(type == 0) { if(n.lt('1e306')) { return formatStandard(n) } if(n.lt('1e1000000')) { return formatScience(n, 0) } return formatLog(n, 0); }
    if(type == 1) { if(n.lt('1e1e6')) { return formatScience(n, 1) } return formatLog(n, 1); }
    if(type == 2) { return formatLog(n, 2); }
    if(type == 5) { if(n.lt('1e1e2')) { return formatScience(n, 5) } return formatLog(n, 5) }
}

// For consistency with TMT
function formatWhole(n) { return format(n, true) }
function formatSmall(n) { return format(n, false, true) }

// Useful for numbers that change length rapidly (has some issues with some formattings)
function formatLength(n, int = false, minlength = 0) {
    let text = format(n, int);
    if(text.length < minlength && options.notation != 6 && options.notation != 7) {
        let toAdd = minlength - text.length;
        while (toAdd > 0) {
            text = '0' + text;
            toAdd--;
        }
    }
    return text
}

// This is hell
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function formatLetters(n, str=letters, base=1000, hasNumber=true) {
    let position = n.times(1.001).log(base).floor();
    n = n.div(position.pow_base(base));
    let length = n.log(10).floor().toNumber();
    let text = hasNumber?n.toStringWithDecimalPlaces(3-length):''
    let suffix = ''
    while(position.gte(1)) {
        suffix = str[position.sub(1).mod(str.length).toNumber()] + suffix
        position = position.div(str.length).floor()
    }
    // suffix = suffix.slice(0, suffix.length-9)
    return text + (hasNumber?' ':'') + suffix
}

// For use in the Mixed Scientific and Standard notation options
// Mixed Scientific goes up to e306, Standard goes up to e30,006 (will extend later)
// Numbers here are the index values of the array that contains the suffixes/prefixes (idk what one they are)
// 0 = K/M/B | 1 = Millions | 2 = Decillions | 3 = Centillions | 4 = Millillions
const standardSuffixes = [['', 'K', 'M', 'B'], ['', 'U', 'D', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'], ['', 'Dc', 'Vg', 'Tg', 'Qg', 'Qq', 'Sg', 'Su', 'Og', 'Ng'], ['', 'Ce', 'Du', 'Tc', 'Qc', 'Qe', 'Sc', 'Se', 'Oe', 'Nc'], ['', 'Mi', 'Dm', 'Tm', 'Qm', 'Qn', 'Sm', 'Sl', 'Om', 'Nm'], ]
function formatStandard(n) {
    const position = n.times(1.001).log(1000).floor();
    if(position.lt(4)) {
        n = n.div(position.pow_base(1000));
        length = n.times(1.001).log(10).floor().toNumber();
        return n.toStringWithDecimalPlaces(3-length) + ' ' + standardSuffixes[0][position.toNumber()];
    }
    n = n.div(position.pow_base(1000));
    length = n.times(1.001).log(10).floor().toNumber();
    return n.toStringWithDecimalPlaces(3-length) + ' ' + standardSuffixes[1][(position.toNumber()-1)%10] + standardSuffixes[2][Math.floor((position.toNumber()-1)/10)%10] + standardSuffixes[3][Math.floor((position.toNumber()-1)/100)%10] + standardSuffixes[4][Math.floor((position.toNumber()-1)/1000)%10];
}

// These should need no explanation, aside from type in formatLog() and formatScience(), which determine the notation for the exponent
function formatComma(n) { return n.toStringWithDecimalPlaces(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
function formatLog(n, type) { return 'e' + format(n.log(10), false, false, type) }
function formatScience(n, type) { const mag = n.times(1.001).log(10).floor(); n = n.div(mag.pow_base(10)); return n.toStringWithDecimalPlaces(2) + 'e' + format(mag, true, false, type); }

// Hopefully works
function formatTime(n) {
    n = new Decimal(n);
    if(n.lt(60)) { return format(n) + ' seconds' }
    if(n.lt(3600)) { return format(n.div(60).floor(), true) + ':' + formatLength(n.mod(60), false, 5) }
    if(n.lt(864000)) { return format(n.div(3600).floor(), true) + ':' + formatLength(n.div(60).mod(60).floor(), true, 2) + ':' + formatLength(n.mod(60), false, 5) }
    if(n.lt(315360000)) { return format(n.div(86400)) + ' days'  }
    return format(n.div(31536000)) + ' years'
}

function formatBoost(n, mult=false, xMode=false) {
    n = new Decimal(n)
    if(mult) {
        if(n.gte(100)) { return `×${format(n, true)}` }
        if(n.gte(20) || xMode) { return `×${format(n)}` }
        if(n.gte(1)) { return `${format(n.times(100), true)}%` }
        if(n.gte(0.05)) { return `${format(n.times(100))}%` }
        if(n.gte(0.0001)) { return `/${format(n.recip())}` }
        if(n.gt(0)) { return `/${format(n.recip(), true)}` }
        return `0.00%`
    } else {
        if(n.gte(100)) { return `×${format(n.add(1), true)}` }
        if(n.gte(20)) { return `×${format(n.add(1))}` }
        if(n.gte(1)) { return `+${format(n.times(100), true)}%` }
        if(n.gt(0)) { return `+${format(n.times(100))}%` }
        if(n.lte(-100)) { return `×${format(n.add(1).div(-1), true)}` }
        if(n.lte(-20)) { return `×${format(n.add(1).div(-1))}` }
        if(n.lte(-1)) { return `-${format(n.times(-100), true)}%` }
        if(n.lt(0)) { return `-${format(n.times(-100))}%` }
        return `+0.00%`
    }
}

function formatRotation(n) {
    if(n.lt(1/18000)) { return format(n.mul(1296000)) + ' arc seconds' }
    if(n.lt(1/300)) { return format(n.mul(21600)) + ' arc minutes' }
    if(n.lt(10)) { return format(n.mul(360)) + ' degrees' }
    return format(n) + ' full rotations'
}
