let clicks = new Decimal(1)

function thetaButtonPress() {
    clicks = clicks.mul(2)
    document.getElementById("thetaDisplay").textContent = "θ: " + formatWhole(clicks)
}