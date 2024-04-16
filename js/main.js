let clicks = new Decimal(0)

function thetaButtonPress() {
    clicks = clicks.add(1)
    document.getElementById("clicks").textContent = "Θ: " + formatWhole(clicks)
}