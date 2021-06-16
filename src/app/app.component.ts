import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private _snackBar: MatSnackBar
  ) {}
  title = 'gocorna';
  date = '';
  time = '';
  // yyyy / mm / dd
  // endDate = new Date(2021, 4, 2);
  // startDate = new Date(2021, 4, 1);
  showTime = false;
  showFinalStatement = false;
  dataUploaded = false;

  enquiryForm = this.fb.group({
    name: [''],
    email: [''],
  });

  timeSlots: any;

  ngOnInit() {
    this.appService.getTimings().subscribe(
      (data) => {
        console.log(data);
        if ('message' in data) {
          this.timeSlots = data['message'];
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('You got data successfully');
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['red-snackbar'],
    });
  }

  timeSelected(time: any) {
    this.time = time;
    this.showFinalStatement = true;
  }
  getDate(val: any) {
    this.showTime = true;
    this.date = val;
  }

  onSubmit() {
    if (this.enquiryForm.value.name == '') {
      this.openSnackBar('Please specify the name', '');
    } else if (this.enquiryForm.value.email == '') {
      this.openSnackBar('Please specify the Email', '');
    } else if (!this.date) {
      this.openSnackBar('Please specify the date', '');
    } else if (!this.time) {
      this.openSnackBar('Please specify the timeslot', '');
    }
    if (this.date && this.time) {
      this.enquiryForm.value.date = this.date;
      this.enquiryForm.value.time = this.time;
      this.appService.publishData(this.enquiryForm.value).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // window.location.replace('dietnheal.in');
          console.log('data posted successfully');
          this.dataUploaded = true;
        }
      );
      console.log(this.enquiryForm.value);
    } else {
      console.log('Incomplete data');
      // this.openSnackBar('Please specify both date and time', '');
    }
  }
}
