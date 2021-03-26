
// Circle Event Registration
function registerCircleListner(circle) {

    google.maps.event.addListener(circle, 'radius_changed', () => {
      const radius = circle.getRadius();
      const radiusinMiles = radius / 1609.4;
      console.log('Circle Radius changed :' + radius + 'meter or ' + radiusinMiles + ' in miles' );
    });

    google.maps.event.addListener(circle, 'dragend', () => {
      console.log('Finished Circle Drag' );
      const radius = circle.getRadius();
      const radiusinMiles = radius / 1609.4;
      console.log('Circle completed Drag  with Radius of :' + radius + 'meter or ' + radiusinMiles + ' in miles' );
      console.log('Center: ' + circle.getCenter());
    });

    google.maps.event.addListener(circle, 'rightclick', (event) => {
      circle.setMap(null);
      // populate yor box/field with lat, lng
      console.log(event);
  });
    google.maps.event.addListener(circle, 'click', (event) => {
        console.log(event);
});
}

export {registerCircleListner};
