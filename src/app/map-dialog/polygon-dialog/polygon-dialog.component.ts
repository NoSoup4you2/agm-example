import { NgModule } from '@angular/core';
// import { ICbLookup } from './../../models/shared';
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'app-polygon-dialog',
    templateUrl: './polygon-dialog.component.html',
    styleUrls: ['./polygon-dialog.component.scss']
})
export class PolygonDialogComponent implements OnInit{
    id: string;
    description: string;
    subject: string;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;



    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialog: MatDialog,
                public dialogRef: MatDialogRef<PolygonDialogComponent>) {
    }
    ngOnInit(): void {
    this.id = this.data.id;
    this.description = this.data.description;
    this.subject = this.data.subject;
    this.strokeColor = this.data.O.strokeColor;
    this.strokeOpacity = this.data.strokeOpacity;
    this.strokeWeight = this.data.strokeWeight;

    console.log(this.data.O.strokeColor);
    }

    cancel() {
        // closing itself and sending data to parent component
        this.dialogRef.close({ data: 'you cancelled' })
      }

      confirm() {
        // closing itself and sending data to parent component
        this.dialogRef.close({ data: { action: 'update', fillColor: this.strokeColor }});
      }

      sliderOnChange(value) {
          console.log('Slider change : ' );
          console.log(value);
          this.strokeOpacity = value;
      }

}
