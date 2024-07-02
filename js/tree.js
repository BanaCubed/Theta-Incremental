var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: {
        "Ta": {
            embedLayer: 'theta',
            unlocked(){return false},
        },
        "Options": {
            embedLayer: 'options-tab',
            unlocked(){return true},
        },
        "Stats": {
            embedLayer: 'info-tab',
            unlocked(){return true},
        },
        "Theta": {
            embedLayer: 'theta',
            unlocked(){return true},
        },
    },
    previousTab: "",
    leftTab: true,
})