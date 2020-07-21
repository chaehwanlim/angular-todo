import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  work: string;
  due: Date | null;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  work: string;
  due: Date | null;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDetail, {
      width: '400px',
      data: {work: this.work, due: this.due}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');
        this.work = result.work;
        this.due = result.due;  
      }
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogDetail {
  constructor(
    public dialogRef: MatDialogRef<DialogDetail>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  /* onSave(): void {
    const returnData = {
      work: this.form.contro
    }

    this.dialogRef.close(returnData);
  } */
}
