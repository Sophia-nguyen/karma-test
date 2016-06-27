/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {Component, Injectable, ElementRef, Inject} from 'angular2/core';

@Injectable()
@Component({
    selector: 'main-app',
    templateUrl: './src/app/App.html'

})
@RouteConfig(ALL_ROUTES)
export class App {
    constructor() {
        
    }
}