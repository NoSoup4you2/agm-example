import { Guid } from 'guid-typescript';

export class MapObjects {
    mapId: string ;
    markers = '';
    polygons: Polygon[] = [];
    circles: Circle[] = [];
    rectangle: Rectangle[] = [];
  }


export class Polygon {
    id: string ;
    subject?: string;
    description?: string;
    clickable?: boolean;
    dragableable?: boolean;
    editable?: boolean;
    geodesic?: boolean;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    path: Array<LatLng>;

  }
export class Circle {
    id: string ;
    subject?: string;
    description?: string;
    clickable?: boolean;
    dragableable?: boolean;
    editable?: boolean;
    geodesic?: boolean;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    center: LatLng;
    radius: number;

  }

export class Rectangle {
    id: string ;
    subject?: string;
    description?: string;
    clickable?: boolean;
    dragableable?: boolean;
    editable?: boolean;
    geodesic?: boolean;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    bounds: Bounds;


  }

export class LatLng {
    lat: number;
    lng: number;
}

export class Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
