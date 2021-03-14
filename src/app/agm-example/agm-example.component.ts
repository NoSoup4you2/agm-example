import { Component, OnInit } from '@angular/core';
declare const google: any;


@Component({
  selector: 'app-agm-example',
  templateUrl: './agm-example.component.html',
  styleUrls: ['./agm-example.component.css'],
})
export class AgmExampleComponent implements OnInit {
  lat = 33.52012157647301;
  lng = -117.6893127;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;

  polygonPts = [
    {lat: 33.52012157647301, lng: -117.69132120080262},
    {lat: 33.51890510991933, lng: -117.68890721268922},
    {lat: 33.52145430327933, lng: -117.68720132775574},
    {lat: 33.52193729987104, lng: -117.68987280793458},
    {lat: 33.52012157647301, lng: -117.69132120080262}
  ];
  constructor() {}

  ngOnInit() {
    this.setCurrentPosition();
  }

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager = (map: any) => {
    const self = this;
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon', 'circle'],
      },
      polygonOptions: {
        draggable: true,
        editable: true,
      },
      circleOptions: {
        draggable: true,
        editable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(
              paths.getAt(p),
              'set_at',
              () => {
                if (!event.overlay.drag) {
                  self.updatePointList(event.overlay.getPath());
                }
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'insert_at',
              () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'remove_at',
              () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
          }
          self.updatePointList(event.overlay.getPath());
          this.selectedShape = event.overlay;
          this.selectedShape.type = event.type;
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          self.drawingManager.setDrawingMode(null);
          // To hide:
          self.drawingManager.setOptions({
            drawingControl: false,
          });
        }
      }
    );
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  deleteSelectedShape() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      this.pointList = [];
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true,
      });
    }
  }

  updatePointList(path) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(
        path.getAt(i).toJSON()
      );
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(
      path
    );
  }
}
