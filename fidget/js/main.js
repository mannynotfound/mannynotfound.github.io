if (! Detector.webgl) Detector.addGetWebGLMessage();

var container;
var camera, cameraTarget, scene, renderer;
var disc, bearing, bearing2, bearing3;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
  camera.position.set(4, 3.14, -1);

  cameraTarget = new THREE.Vector3(0, -0.25, 0);

  scene = new THREE.Scene();
  var sceneColor = new THREE.Color('slategray');
  scene.fog = new THREE.Fog(sceneColor, 2, 15);

  // Binary files
  var loader = new THREE.STLLoader();
  var material = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF, specular: 0x111111, shininess: 200,
  });

  loader.load('models/Smooth_Tiny_Spinner.stl', function(geometry) {
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    mesh.scale.set(.05, .05, .05);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
  });

  loader.load('models/Deep_Dished_Spinner_Cap.stl', function(geometry) {
    disc = new THREE.Mesh(geometry, material);

    disc.position.set(0.565, -0.2, -4.59);
    disc.rotation.set(-Math.PI / 2, 0, 0);
    disc.scale.set(0.065, 0.065, 0.065);

    disc.castShadow = true;
    disc.receiveShadow = true;

    scene.add(disc);
  });

  loader.load('models/Ball_Bearing.stl', function(geometry) {
    var bearingMat = new THREE.MeshPhongMaterial({
      color: 0x000000, specular: 0x111111, shininess: 200,
    });
    bearing = new THREE.Mesh(geometry, bearingMat);

    bearing.position.set(0.48, 0.04, -0.04);
    bearing.rotation.set(-Math.PI / 2, 0, 0);
    bearing.scale.set(0.14, 0.14, 0.14);

    bearing.castShadow = true;
    bearing.receiveShadow = true;

    scene.add(bearing);

    bearing2 = new THREE.Mesh(geometry, bearingMat);
    bearing2.position.set(-1.61, 0.04, -0.04);
    bearing2.rotation.set(-Math.PI / 2, 0, 0);
    bearing2.scale.set(0.14, 0.14, 0.14);

    bearing2.castShadow = true;
    bearing2.receiveShadow = true;

    scene.add(bearing2);

    bearing3 = new THREE.Mesh(geometry, bearingMat);
    bearing3.position.set(-0.58, 0.04, -1.841);
    bearing3.rotation.set(-Math.PI / 2, 0, 0);
    bearing3.scale.set(0.14, 0.14, 0.14);

    bearing3.castShadow = true;
    bearing3.receiveShadow = true;

    scene.add(bearing3);
  });

  // Lights
  scene.add(new THREE.HemisphereLight(0xffffff, 0x111122));

  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(scene.fog.color);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.renderReverseSided = false;

  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minPolarAngle = Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 3;


  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

