let clicks = new Decimal(0)

function thetaButtonPress() {
    clicks = Decimal.add(clicks, 1)
    document.getElementById("thetaDisplay").textContent = "θ: " + formatWhole(clicks)
}