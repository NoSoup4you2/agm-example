import { Component, OnInit } from '@angular/core';
import { LatLngBounds } from '@agm/core';
import {GoogleService} from '../services/google.service';

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


  polygonPts = [
    {lat: 33.52012157647301, lng: -117.69132120080262},
    {lat: 33.51890510991933, lng: -117.68890721268922},
    {lat: 33.52145430327933, lng: -117.68720132775574},
    {lat: 33.52193729987104, lng: -117.68987280793458},
    {lat: 33.52012157647301, lng: -117.69132120080262}
  ];

  markerPts = [
    {
      alpha: 1,
      docid: 'farm::03228285-5236-478B-8169-900B927501EE',
      lat: 33.5202468,
      lng: -117.6901303,
      occupied: '0'
    },
    {
      alpha: 1,
      docid: 'farm::0443A0FD-2E13-4B7C-BE67-70D433D90ACB',
      lat: 33.5218586,
      lng: -117.6885149,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::09FD5033-1266-452B-8468-D85B2D715575',
      lat: 33.5198285,
      lng: -117.6885607,
      occupied: 'O'
    },
    {
      alpha: 1,
      docid: 'farm::0B5C9FBC-60F3-4789-B2B7-23A625BC56CF',
      lat: 33.5206537,
      lng: -117.6891565,
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

  constructor(
    private googleservice: GoogleService
  ) {}

  ngOnInit() {
    this.setCurrentPosition();

    


  }

  onMapReady(map) {
    this.initDrawingManager(map);
    const bounds: LatLngBounds = new google.maps.LatLngBounds()
    for (let i = 0; i < this.markerPts.length; i++) {
      bounds.extend(new google.maps.LatLng(this.markerPts[i].lat, this.markerPts[i].lng))
  }
  map.fitBounds(bounds);

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
}
