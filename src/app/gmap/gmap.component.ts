import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  VERSION,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoogleService } from '../services/google.service';
import { Guid } from 'guid-typescript';
import { v4 as uuidv4 } from 'uuid';
import { MapObjects , Polygon, Circle, Rectangle} from '../models/google-map';
import { registerCircleListner } from './google-map-registrations';
import { NgZone } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

// @Component({
//   selector: 'input-component',
//   template: `
//     <input id="pac-input" type="text" placeholder="Enter a location" />
//   `
// })
// export class InputComponent {
//   constructor(public elementRef: ElementRef) {}
// }


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css'],
})
export class AgmExampleComponent implements OnInit {
  @Input() savedMap: string;
  @Input() mapConfig: any;


  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  @ViewChild('search', {static: false}) public searchElementRef: ElementRef;
  // @ViewChild('container', { static: false, read: ViewContainerRef }) public container: ViewContainerRef;

  // private inputFactory: ComponentFactory<any>;
  // private inputComponent: ComponentRef<InputComponent>;

  // showTextInput$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  myMap = new MapObjects();
  map: google.maps.Map;
  lat = 33.52012157647301;
  lng = -117.6893127;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: google.maps.drawing.DrawingManager;
  selectedArea = 0;
  marker: any;
  isBeingDragged = false;
  private geoCoder;
  showTextInput = true;

  iconUrl = 'http://maps.google.com/mapfiles/ms/icons/';
  iconY = {
    url: this.iconUrl + 'yellow-dot.png',
    scaledSize: {
      width: 40,
      height: 40
    }};
    iconR = {
      url: this.iconUrl + 'red-dot.png',
      scaledSize: {
        width: 40,
        height: 40
      }};
      iconG = {
        url: this.iconUrl + 'green-dot.png',
        scaledSize: {
          width: 40,
          height: 40
        }};


  markerPts = [
    {
      alpha: 1,
      docid: 'farm::03228285-5236-478B-8169-900B927501EE',
      lat: 33.5202468,
      lng: -117.6901303,
      map: this.map,
      occupied: '0'
    },
    {
      alpha: 1,
      docid: 'farm::0443A0FD-2E13-4B7C-BE67-70D433D90ACB',
      lat: 33.5218586,
      lng: -117.6885149,
      map: this.map,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::09FD5033-1266-452B-8468-D85B2D715575',
      lat: 33.5198285,
      lng: -117.6885607,
      map: this.map,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::0B5C9FBC-60F3-4789-B2B7-23A625BC56CF',
      lat: 33.5206537,
      lng: -117.6891565,
      map: this.map,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::0F5BC17F-0207-40F4-8A0E-75A052A60F5A',
      lat: 33.5199229,
      lng: -117.6893398,
      occupied: 'A'
    },
    {
      alpha: 1,
      docid: 'farm::0F83CCCF-9C71-4696-A999-0F6420425D3C',
      lat: 33.519436,
      lng: -117.689302,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::10EDFF91-0947-451E-AFCE-B9F70523249F',
      lat: 33.5214108,
      lng: -117.6884462,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::11D5CBF8-79CC-417A-B649-DC3A1CD3C8B3',
      lat: 33.5219836,
      lng: -117.6883316,
      occupied: '0'
    },
    {
      alpha: 1,
      docid: 'farm::149253FF-2932-485A-BE40-549A6C0F0C3B',
      lat: 33.5195299,
      lng: -117.689546,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::161406EC-BB8A-456B-A51C-3B48B37651B6',
      lat: 33.5194025,
      lng: -117.6886524,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::1B7F046D-3AC3-4678-84DE-4BE497FEC796',
      lat: 33.5196854,
      lng: -117.689947,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::1C28967F-4369-4343-8766-B5D7B16F340F',
      lat: 33.5224498,
      lng: -117.6887155,
      occupied: 'A'
    },
    {
      alpha: 1,
      docid: 'farm::1C68C8AC-1970-4545-AC6F-F64821BAF2A6',
      lat: 33.521447,
      lng: -117.6888815,
      occupied: '0'
    },
    {
      alpha: 1,
      docid: 'farm::21EC5442-BED4-41B0-9E20-B985816ACA4F',
      lat: 33.5214541,
      lng: -117.689019,
      occupied: 'A'
    },
    {
      alpha: 1,
      docid: 'farm::255D5D6B-CED4-4333-BE78-A2D4106A7ECC',
      lat: 33.5206615,
      lng: -117.6887899,
      occupied: 'E'
    },
    {
      alpha: 1,
      docid: 'farm::25D127F7-505E-43E6-B509-188B5F99EDBE',
      lat: 33.5196836,
      lng: -117.6899126,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::27064AC6-5345-4C00-8EFE-BA8CAB866DDE',
      lat: 33.5198936,
      lng: -117.689294,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::2739DC1C-C176-4E9A-9187-FE0ABE57D82F',
      lat: 33.5214535,
      lng: -117.6895231,
      occupied: 'A'
    },
    {
      alpha: 1,
      docid: 'farm::2C0033BB-6C98-4E00-847A-9533FCF83B2E',
      lat: 33.5198373,
      lng: -117.6902792,
      occupied: 'A'
    },
    {
      alpha: 1,
      docid: 'farm::2C6A69E8-BB0F-4448-9444-0021B157AD01',
      lat: 33.5201841,
      lng: -117.6889273,
      occupied: 'A'
    }
  ];

  myLatLng = { lat: 33.5201841, lng: -117.6889273 };
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 17
  };

  constructor(
    private googleservice: GoogleService,
    private ngZone: NgZone,
    // private componentFactory: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.setCurrentPosition();

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    // this.inputFactory = this.componentFactory.resolveComponentFactory(
    //   InputComponent
    // );
    // this.inputComponent = this.container.createComponent(this.inputFactory);
    // this.showTextInput$.subscribe(flag => {
    //   this.hideOrShow(flag);
    // });
    
    this.mapInitializer();
  }




  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapConfig);
    // Initialize DrawingManager
    this.initDrawingManager(this.map);
    // Register Map Listeners
    this.addMapListner(this.map);
    // Load All Markers
    this.loadAllMarkers();
    // Load All shapes from Backend
    this.loadAllShapes();
    // Load Autocomplete Manager
    this.initAutoComplete();


  }

  addMapListner(map) {
    google.maps.event.addListener(map, 'click', (event) => {
      console.log('We clicked on Map');

    });
    google.maps.event.addListener(map, 'drag', (event) => {
      console.log('We drag Map');

    });
  }

  initAutoComplete() {
    this.geoCoder = new google.maps.Geocoder;

    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          console.log(place.formatted_address);
          const  newcoordinates = new google.maps.LatLng(lat, lng);
          this.map.setCenter(newcoordinates);
          const marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: { lat, lng },
            map: this.map,
            // icon: this.getIcon(markerInfo.occupied),
            // id: markerInfo.docid,
          });
          const infowindow = new google.maps.InfoWindow({
            content: place.formatted_address,
            maxWidth: 200
          });
          marker.addListener('click', () =>  {

            infowindow.open(marker.get('map'), marker);

        });
      });
    });
  }


  toggleBounce() {
    console.log('We clicked');
  }

  initDrawingManager = (map: any) => {
    const self = this;
    const  isBeingDragged = false;
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [
          // google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
      markerOptions: {
        icon:
          'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      },
      circleOptions: {
        // fillColor: "#ffff00",
        fillOpacity: 0.25,
        strokeWeight: 5,
        clickable: true,
        editable: true,
        draggable: true,
      },
      rectangleOptions: {
        // fillColor: "#ffff00",
        fillOpacity: 0.25,
        strokeWeight: 5,
        clickable: true,
        editable: true,
        draggable: true,
      },
      polygonOptions: {
        // fillColor: "#ffff00",
        fillOpacity: 0.25,
        strokeWeight: 5,
        clickable: true,
        editable: true,
        draggable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener( this.drawingManager, 'overlaycomplete', (event) => {

        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          self.drawingManager.setDrawingMode(null);
          // To hide:
          // self.drawingManager.setOptions({
          //  drawingControl: false,
          // });
        }
     });

      // Get called when polygon Creation is Completed
    google.maps.event.addListener( this.drawingManager, 'polygoncomplete', (polygon) => {

        console.log('Polygon completed');
        const myPath = this.getPolygonCoordinates(polygon);
        let id: string;
        id = uuidv4();  // 'Guid.create().toString;
        console.log(polygon);
        if (!polygon.get('id')) {
          console.log('We have no ID');
          polygon.set('id', id);
        } else {
          console.log('We have an existing Polygon ID : ' + polygon.get('PolyID'));

        }

        // tslint:disable-next-line: object-literal-shorthand
        const newPoly: Polygon = { id: id, path: myPath };
        // Push newly Drawn PolyGom to polygons Array on myMap
        this.myMap.polygons.push(newPoly);
        // Register Listners for Newly Drawn PolyGon
        this.registerPolyGonListner(polygon);
      });

    // Get called when Circle Creation is Completed
    google.maps.event.addListener( this.drawingManager, 'circlecomplete', (circle) => {

      console.log('Circle completed');
      let CircleId: string;
      CircleId = uuidv4();  // 'Guid.create().toString;
      console.log(circle);
      if (!circle.get('id')) {
        circle.set('id', CircleId);
      }

      const newCircle: Circle = { id: CircleId, center: circle.getCenter(), radius: circle.getRadius() };
      // Push newly Drawn PolyGom to polygons Array on myMap
      this.myMap.circles.push(newCircle);

      this.registerCircleListner(circle);

    });

    // Get Called when we finish drawing a Square
    google.maps.event.addListener( this.drawingManager, 'rectanglecomplete', (rectangle) => {
      console.log('Rectangle completed');
      let RectangleId: string;
      RectangleId = uuidv4();  // 'Guid.create().toString;
      console.log(rectangle);
      if (!rectangle.get('id')) {
        rectangle.set('id', RectangleId);
      }

      const ne = rectangle.getBounds()!.getNorthEast();
      const sw = rectangle.getBounds()!.getSouthWest();

      // check if Array exists before we push
      if (!this.myMap.rectangle) {
        // Array does not exist so we will create
        this.myMap.rectangle = [];
        console.log('Rectangle Array does not exist');
      }

      const newRectangle: Rectangle = {id: RectangleId, bounds: {north: ne.lat(), east: ne.lng(), south: sw.lat(), west: sw.lng()}};

      this.myMap.rectangle.push(newRectangle);
      // Register Listeners for Rectangle
      this.registerRectangleListner(rectangle);



    });

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  getPolygonCoordinates(draggablePolygon) {
    const len = draggablePolygon.getPath().getLength();
    const polyArrayLatLng = [];

    for (let i = 0; i < len; i++) {
      const vertex = draggablePolygon.getPath().getAt(i);
      const vertexLatLng = { lat: vertex.lat(), lng: vertex.lng() };
      polyArrayLatLng.push(vertexLatLng);
    }
    this.pointList = polyArrayLatLng;
    console.log(this.pointList);
    return(polyArrayLatLng);
  }

  centerChange($event) {
    console.log($event);
  }


  updatePointList(path) {
    console.log(path.getLength());
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(
        path.getAt(i).toJSON()
      );
    }
    console.log(this.pointList);
    console.log(google.maps.geometry.spherical.computeArea(path));
    this.selectedArea = google.maps.geometry.spherical.computeArea(path);
  }

  // Marker Section
  deleteMarkers() {
    this.markerPts = [];
  }

  markerDragEnd(m: any, $event: MouseEvent) {
    this.googleservice.updateGeo(m.docid, $event).subscribe(res => console.log(res));
    console.log('dragEnd', m.docid, $event);
  }

  mouseOver(m, $event) {
    console.log('Mouse Over');
  }

  rightClick(m) {
    console.log('Right Click ' + m.docid);
    this.googleservice.updateGeo(m.docid, m).subscribe(res => console.log(res));

    const MarkerIndex = this.markerPts.findIndex(function GetIndex(element) {
      return element.docid === m.docid;
    });
    // this.markers[MarkerIndex].setMap(null);
    this.markerPts.splice(MarkerIndex, 1); // to remove element from global array
    console.log('Marker with Index : ' + MarkerIndex + ' removed !');
  }

  getIcon(occupied) {

    if (occupied === '0' || occupied === 'A' ) {
      return this.iconR;
    }
    if (occupied === '1' || occupied === 'O' ) {

      return this.iconG;
    }
    if (occupied === 'E' ) {

     return this.iconY;
    }
  }

  loadAllMarkers(): void {

    console.log(this.markerPts.length);
    this.markerPts.forEach(markerInfo => {
      // Creating a new marker object
      const marker = new google.maps.Marker({
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: markerInfo.lat, lng: markerInfo.lng },
        map: this.map,
        title: markerInfo.docid,
        // icon: this.getIcon(markerInfo.occupied),
        // id: markerInfo.docid,
      });

      // creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      // Register click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });
      marker.addListener('dragend', (event) => {
        console.log('We draged the marker' + marker);
        console.log(marker);
        console.log('Current Lat: ' + event.latLng.lat() + ' Current Lng: ' + event.latLng.lng());
      });

      // Register Right Click Event for Marker
      marker.addListener('rightclick',  (mouseEvent) => {
        marker.setMap(null);
        alert('Right click triggered'); });
      // Adding marker to google map
      marker.setMap(this.map);
    });
  }


  loadAllShapes() {

    // tslint:disable-next-line: deprecation
    this.googleservice.getGeoFilter(this.savedMap).subscribe(
      (res: any) => {
        if (res.polygons) {
          console.log(res);
          this.myMap = res;
          this.createSavedShapes(this.myMap);

        }
    });
  }

  createSavedShapes( myMap: MapObjects) {

    // Loop over all saved Polygons
    myMap.polygons.forEach(polyInfo => {

      const polygon = new google.maps.Polygon({
      draggable: true,
      editable: true,
      paths: polyInfo.path,
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillOpacity: 0.35,
      id: polyInfo.id,
      subject: polyInfo.subject,
      description: polyInfo.description,

    });
      // Register Listeners for PolyGon
      this.registerPolyGonListner(polygon);
      // Set the PolyGon on the Map
      polygon.setMap(this.map);

  });

     // Loop over all saved Circles
    myMap.circles.forEach(circleInfo => {

    const circle = new google.maps.Circle({
    draggable: true,
    editable: true,
    center: circleInfo.center,
    radius: circleInfo.radius,
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillOpacity: 0.35,
    id: circleInfo.id,
    subject: circleInfo.subject,
    description: circleInfo.description,

  });
    // Register Listeners for PolyGon
    this.registerCircleListner(circle);
    // Set the PolyGon on the Map
    circle.setMap(this.map);

});

 // Loop over all saved Rectangles
    myMap.rectangle.forEach(rectangleInfo => {

  const rectangle = new google.maps.Rectangle({
  draggable: true,
  editable: true,
  bounds: { north: rectangleInfo.bounds.north,
            east: rectangleInfo.bounds.east,
            south: rectangleInfo.bounds.south,
            west: rectangleInfo.bounds.west},
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillOpacity: 0.35,
  id: rectangleInfo.id,
  subject: rectangleInfo.subject,
  description: rectangleInfo.description,

});
  // Register Listeners for Rectangle
  this.registerRectangleListner(rectangle);
  // Set the PolyGon on the Map
  rectangle.setMap(this.map);

});
}




// ******************************  Polygon Function ******************************* //

// Register Polygon Listners
registerPolyGonListner(polygon) {
  const paths = polygon.getPaths();
  for (let p = 0; p < paths.getLength(); p++) {

      google.maps.event.addListener(paths.getAt(p), 'insert_at', () => {
        console.log('We inserted a point');
        this.updatePolygon(polygon);
      });

      google.maps.event.addListener(paths.getAt(p), 'remove_at', () => {
        console.log('We removed a point');
        this.updatePolygon(polygon);
      });

      google.maps.event.addListener(paths.getAt(p), 'set_at', () => {
        if (!this.isBeingDragged) {
          console.log('We set a point');
          this.updatePolygon(polygon);
        }
      });
    }


  google.maps.event.addListener(polygon, 'dragstart', () => {
      console.log('Polygon started drag');
      this.isBeingDragged = true;
     // this.getPolygonCoordinates(polygon);

    });

  google.maps.event.addListener(polygon, 'dragend', () => {
    console.log('Polygon moved finished drag');
    this.isBeingDragged = false;
    this.updatePolygon(polygon);


  });

  google.maps.event.addListener(polygon, 'rightclick', () => {
      console.log('We right clicked Polygon');
      this.deletePolygon(polygon);
  });

  google.maps.event.addListener(polygon, 'click', (event) =>  {
      console.log('We clicked the polygon');
      console.log(polygon);

  });
}

// Delete Polygon from Map and Array
deletePolygon(polygon) {
  // if we have a PolyGon ID we can try to delete Polygon
  const polygonId = polygon.get('id');
  console.log('About to delete Polygon : ' + polygonId );

  // Find the index based on Polygon Id
  const PolygonIndex = this.myMap.polygons.findIndex(function GetIndex(element) {
      return element.id === polygonId ;
    });

  // Remove the Polygon from the polygons Array on myMap
  this.myMap.polygons.splice(PolygonIndex, 1);
  // Now remove thePolygon from actaual MAP
  polygon.setMap(null);
}

// Update Polygon in Polygon Array on myMap
updatePolygon(polygon) {
  const polygonId = polygon.get('id');
  console.log('About to update Polygon : ' + polygonId );
  // Get new Path after we changed or moved the PolyGon
  const newPath = this.getPolygonCoordinates(polygon);

  const PolygonIndex = this.myMap.polygons.findIndex(function GetIndex(element) {
    return element.id === polygonId ;
  });

  // Set the updated Path for Polygon in myMap
  this.myMap.polygons[PolygonIndex].path = newPath;
}

// ******************************  Circle Function ******************************* //
// Circle Event Registration
registerCircleListner(circle) {

  google.maps.event.addListener(circle, 'radius_changed', () => {
    this.updateCircle(circle);
  });

  google.maps.event.addListener(circle, 'dragend', () => {
    this.updateCircle(circle);
  });

  google.maps.event.addListener(circle, 'rightclick', (event) => {
    this.deleteCircle(circle);
  });

  google.maps.event.addListener(circle, 'click', (event) => {
    console.log(circle);
  });


}

// Delete Circle from myMap as well as from display Map
deleteCircle(circle) {
  // if we have a Circle ID we can try to delete Circle
  const circleId = circle.get('id');
  console.log('About to delete Circle : ' + circleId );
  // Find the index based on Circle Id
  const CircleIndex = this.myMap.circles.findIndex(function GetIndex(element) {
      return element.id === circleId ;
    });
  // Remove the Polygon from the circles Array on myMap
  this.myMap.circles.splice(CircleIndex, 1);
  // Now remove the Circle from actaual MAP
  circle.setMap(null);
}

updateCircle(circle) {
   // if we have a Circle ID we can try to update Circle
   const circleId = circle.get('id');
   console.log('About to update Circle : ' + circleId );
     // Find the index based on Circle Id
   const CircleIndex = this.myMap.circles.findIndex(function GetIndex(element) {
    return element.id === circleId ;
  });
  // Set new Radius for Circle
   this.myMap.circles[CircleIndex].radius = circle.getRadius();
  // Set new Center for the Circle
   this.myMap.circles[CircleIndex].center = circle.getCenter();

}

// ******************************* Rectangle Function ********************************* //
// Rectangle Event Registration
registerRectangleListner(rectangle) {

    // Register Listener for DragEnd or Rectangle
    rectangle.addListener('dragstart', () => {
    console.log('Rectangle Drag Start!');
    this.isBeingDragged = true;

    const ne = rectangle.getBounds()!.getNorthEast();
    const sw = rectangle.getBounds()!.getSouthWest();

    console.log( ne + ' - ' + sw);

        });

  // Register Listener for DragEnd or Rectangle
    rectangle.addListener('dragend', () => {
    console.log('Rectangle Drag end!');
    this.isBeingDragged = false;
    this.updateRectangle(rectangle);

  });
  // Register Listener for Resize or Rectangle
    rectangle.addListener('bounds_changed', () => {
    if (!this.isBeingDragged) {
    console.log('Rectangle Size Change!');
    this.updateRectangle(rectangle);
    }

  });

    // Register Listener for click on Rectangle
    rectangle.addListener('click', () => {
    console.log('Rectangle Click!');
    });

     // Register Listener for click on Rectangle
    rectangle.addListener('rightclick', () => {
    console.log('Rectangle Right Click!');
    this.deleteRectangle(rectangle);
    });
  }

updateRectangle(rectangle) {
    // if we have a Rectangle ID we can try to update Rectangle
    const rectangleId = rectangle.get('id');
    console.log('About to update Rectangle : ' + rectangleId );
      // Find the index based on Rectangle Id
    const RectangleIndex = this.myMap.rectangle.findIndex(function GetIndex(element) {
     return element.id === rectangleId ;
   });
   // Set new Bounds for Rectangle
    const ne = rectangle.getBounds()!.getNorthEast();
    const sw = rectangle.getBounds()!.getSouthWest();
    this.myMap.rectangle[RectangleIndex].bounds = {north: ne.lat(), east: ne.lng(), south: sw.lat(), west: sw.lng()};
 }

 // Delete Circle from myMap as well as from display Map
deleteRectangle(rectangle) {
  // if we have a Circle ID we can try to delete Circle
  const rectangleId = rectangle.get('id');
  console.log('About to delete Rectangle : ' + rectangleId );
  // Find the index based on Rectangle Id
  const RectangleIndex = this.myMap.rectangle.findIndex(function GetIndex(element) {
    return element.id === rectangleId ;
  });
  // Remove the Polygon from the circles Array on myMap
  this.myMap.rectangle.splice(rectangleId, 1);
  // Now remove the Circle from actaual MAP
  rectangle.setMap(null);
}

savegeofilter() {
  this.googleservice.updateFilter(this.myMap.mapId.toString(), this.myMap).subscribe(
    res => console.log(res)
  );
}

showInput() {
  this.showTextInput = true;
  this.initAutoComplete();
}

hideInput() {
  this.showTextInput = false;
}

// hideOrShow(showInput: boolean) {
//   switch (showInput) {
//     case true:
//       this.container.insert(this.inputComponent.hostView);
//       this.initAutoComplete();
//       break;
//     case false:
//       this.container.detach();
//       break;
//   }
// }


codeAddress(address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({address}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
         this.map.setCenter(results[0].geometry.location);
      }
  });
}
}
