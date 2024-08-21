import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import { TranslateService } from '@ngx-translate/core';
@Component({selector: 'app-root', templateUrl: './app.component.html', template: '<button (click)="requestPermission()">Request Permission</button>'})
export class AppComponent implements OnInit {
    title = 'af-notification';
    message : any = null;
    constructor(private translate: TranslateService) {
        // const defaultLang = environment.defaultLanguage;
        // translate.setDefaultLang(defaultLang);
        // translate.use(defaultLang);
    }
    ngOnInit(): void {
        // this.requestPermission();
        // this.listen();
    }
    // requestPermission() {


    //     const messaging = getMessaging();

    //     //console.log("Hurraaayy!!! we got the vapidKey.....", environment.firebaseConfig.vapidKey);
    //     getToken(messaging, {vapidKey: environment.firebaseConfig.vapidKey}).then((currentToken) => {

    //         if (currentToken) {
    //             //console.log("Hurraaa!!! we got the token.....");
    //             //console.log(currentToken);
    //         } else {
    //             //console.log('No registration token available. Request permission to generate one.');
    //         }
    //     }).catch((err) => {
    //         //console.log('An error occurred while retrieving token.123 ', err);
    //     });
    // }
    // listen() {
    //     const messaging = getMessaging();
    //     onMessage(messaging, (payload) => {
    //         //console.log('Message received. ', payload);
    //         this.message = payload;
    //     });
    // }
}
