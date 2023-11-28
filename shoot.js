// Wait for the A-Frame scene to load
document.querySelector('a-scene').addEventListener('loaded', function () {
  // Register the shoot component
  AFRAME.registerComponent('shoot', {
    init: function () {
      // Add event listener for keydown event
      window.addEventListener('keydown', (e) => {
        if (e.key === ' ') { // Check for the spacebar key
          this.shootPaintball();
        }
      });
    },
    shootPaintball: function () {
      // Get the camera direction in Three.js Vector3 variable
      const camera = this.el.getObject3D('camera');
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);

      // Create a paintball entity
      const paintball = document.createElement('a-sphere');
      paintball.setAttribute('radius', 0.1);
      paintball.setAttribute('position', this.el.getAttribute('position'));
      paintball.setAttribute('dynamic-body', true); // Enable physics for the paintball

      // Set the velocity to the in-camera direction
      const velocity = direction.multiplyScalar(10); // Adjust the speed as needed
      paintball.setAttribute('velocity', velocity);

      // Add a "collide" event handler
      paintball.addEventListener('collide', (event) => {
        this.handleCollision(event);
      });

      // Append the paintball entity to the scene
      this.el.sceneEl.appendChild(paintball);
    },
    handleCollision: function (event) {
      // Create a paint splash image entity
      const splash = document.createElement('a-image');
      splash.setAttribute('src', 'path/to/paint-splash-image.png'); // Provide the path to your paint splash image
      splash.setAttribute('scale', '0.5 0.5 0.5'); // Adjust the scale as needed
      splash.setAttribute('position', event.detail.contact.point);

      // Append the paint splash entity to the scene
      this.el.sceneEl.appendChild(splash);

      // Remove the collided paintball from the scene
      event.target.parentNode.removeChild(event.target);
    }
  });
});
