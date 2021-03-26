
import { Component, ElementRef, ViewChild } from '@angular/core';





@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css'],
})
export class SamplePageComponent {
    // myLatLng = { lat: 33.5201841, lng: -117.6889273 };

    mapOptions: google.maps.MapOptions = {
        // backgroundColor: string;
        center: { lat: 33.5201841, lng: -117.6889273 },
        // clickableIcons?: boolean;
        // controlSize?: number;
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: true,
        fullscreenControl: false,
        keyboardShortcuts: true,
        mapTypeControl: false,
        mapTypeId: 'roadmap',
        maxZoom: 20,
        minZoom: 14,
        // noClear?: boolean;
        panControl: true,
        // panControlOptions?: PanControlOptions;
        rotateControl: true,
        // rotateControlOptions?: RotateControlOptions;
        // scaleControl?: boolean;
        scrollwheel: true,
        // streetView?: StreetViewPanorama;
        streetViewControl: false,
        // streetViewControlOptions?: StreetViewControlOptions;
        // styles?: MapTypeStyle[];
        // tilt?: number;
        zoom: 17,
        /** The enabled/disabled state of the Zoom control. */
        zoomControl: true,
        // zoomControlOptions?: ZoomControlOptions;
    };
}