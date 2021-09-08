import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-firebase-demo';
  FirebaseData;
  itemsValue: Array<any> = [];
  itemsKey: Array<any> = [];
  myItems: any;

  constructor(public db: AngularFireDatabase) {
    this.FirebaseData = db;
  }

  ngOnInit() {
    this.getValues();
     this.FirebaseData.object('user1').valueChanges().subscribe(val => {
      this.myItems = val
      console.log(val);
    });
  }

  getValues() {
    this.FirebaseData.list('user1').valueChanges().subscribe(val => {
      this.itemsValue = val;
      console.log('values', this.itemsValue);
    });
    this.getKeys();
  }

  getKeys() {
    this.FirebaseData.list('user1').snapshotChanges().subscribe(keyObj => {
      this.itemsKey = keyObj.map(x => x.key);
      console.log('keys', this.itemsKey);
    });
  }
}
