// Create viewer.
var viewer = new Marzipano.Viewer(document.getElementById('pano'));


// Create geometry.
var geometry = new Marzipano.EquirectGeometry([{ width: 8364 }]);

// Create view.
var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100*Math.PI/180);
var view1 = new Marzipano.RectilinearView({ yaw: 0, pitch: .1});

// Create first scene.
var scene1 = viewer.createScene({
  source: Marzipano.ImageUrlSource.fromString(
    "https://live.staticflickr.com/65535/48083394567_59a0a84910_o.jpg"
  ),
  geometry: geometry,
  view: view1,
});

// Display scene.
scene1.switchTo();



// Create a hotspot element
var hotspotElement = document.createElement('div');
hotspotElement.classList.add('hotspot');
hotspotElement.innerHTML = '<img src="icons/green-arrow-round.png">';

// Create second hotspot element
var hotspotElement2 = document.createElement('div');
hotspotElement2.classList.add('hotspot');
hotspotElement2.innerHTML = '<img src="icons/green-arrow-round.png">';

// Define the hotspot's position
var hotspotPosition = { yaw: Math.PI * 1.95, pitch: 0 };

// Create the hotspot
scene1.hotspotContainer().createHotspot(hotspotElement, hotspotPosition);

// Add a click event listener to the hotspot
hotspotElement.addEventListener('click', function() {
  // Switch to the new scene
  newScene.switchTo();
});

var view2 = new Marzipano.RectilinearView({ yaw: -1.45, pitch: .1 });


// Load the new panorama
var newScene = viewer.createScene({
  geometry: geometry,
  view: view2,
  source: Marzipano.ImageUrlSource.fromString("https://live.staticflickr.com/65535/48082720616_976ae7a4bf_o.jpg"),
  // ... configuration for the new panorama
});

newScene.hotspotContainer().createHotspot(hotspotElement2, {yaw: Math.PI * -.5, pitch: 0})

// Add a click event listener to  hotspot2
hotspotElement2.addEventListener('click', function() {
  // Switch to the first scene
  scene1.switchTo();
});