// Create viewer.
var viewer = new Marzipano.Viewer(document.getElementById("pano"));

// Create view.
var limiter = Marzipano.RectilinearView.limit.traditional(
  1024,
  (100 * Math.PI) / 180
);
var view = new Marzipano.RectilinearView({ yaw: 0 }, limiter);

// Image URL for the first scene.
var imageUrl = "https://live.staticflickr.com/65535/48083394567_c918e406ea_6k_d.jpg";

var image = new Image();
image.src = imageUrl;
var scene1;

image.onload = function () {
  // Create a geometry using the loaded image width.
  var geometry = new Marzipano.EquirectGeometry([{ width: image.width }]);

  // Create the image source using Marzipano.
  const source1 = new Marzipano.ImageUrlSource(function (tile) {
    return { url: imageUrl };
  });

  // Create the first scene.
  scene1 = viewer.createScene({
    source: source1,
    geometry: geometry,
    view: view,
  });

  // Display the scene.
  scene1.switchTo();

  // Create a hotspot element.
  var hotspotElement = document.createElement("div");
  hotspotElement.classList.add("hotspot");
  hotspotElement.innerHTML = '<img src="icons/door.png">';

  // Add a click event listener to the hotspot.
  hotspotElement.addEventListener("click", function () {
    // Switch to the new scene.
    newScene.switchTo();
  });

  // Define the hotspot's position.
  var hotspotPosition = { yaw: Math.PI * 1.95, pitch: 0 };

  // Create the hotspot.
  scene1.hotspotContainer().createHotspot(hotspotElement, hotspotPosition);
};

// Create the second hotspot element.
var hotspotElement2 = document.createElement("div");
hotspotElement2.classList.add("hotspot");
hotspotElement2.innerHTML = '<img src="icons/green-arrow-round.png">';

var image2Url = "https://live.staticflickr.com/65535/48082720616_7802a218e1_b_d.jpg";

var image2 = new Image();
image2.src = image2Url;

var newScene;

image2.onload = function () {
  // Create a geometry using the loaded second image width.
  var geometry2 = new Marzipano.EquirectGeometry([{ width: image2.width }]);

  // Create the second scene.
  newScene = viewer.createScene({
    geometry: geometry2,
    view: new Marzipano.RectilinearView({ yaw: Math.PI / -2 }),
    source: Marzipano.ImageUrlSource.fromString(image2Url),
  });

  // Add a hotspot to switch back to the first scene.
  newScene
    .hotspotContainer()
    .createHotspot(hotspotElement2, { yaw: Math.PI * -0.5, pitch: 0 });

  // Add a click event listener to the second hotspot.
  hotspotElement2.addEventListener("click", function () {
    // Switch to the first scene.
    scene1.switchTo();
  });
};
