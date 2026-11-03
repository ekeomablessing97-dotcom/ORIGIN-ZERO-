window.RegionSystem = {
    regions: ["Neo-Lagos", "New Abuja", "Atlantic Zone", "Northern Frontier"],
    currentRegionIndex: 0,

    transitionTo: function(regionName) {
        if (this.regions.includes(regionName)) {
            GameState.currentRegion = regionName;
            console.log(`Transitioning transport vector to: ${regionName}`);
            alert(`TRANSIT SYSTEM: Arrived in ${regionName} (2094 Sector Active)`);
        }
    }
};
