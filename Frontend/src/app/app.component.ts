import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD4IxkPUxZonZS0POoc6Paifv6CyXsKnF0',
      authDomain: 'ng-recipe-book-c8458.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;  }
}
