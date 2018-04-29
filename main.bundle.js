webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "mat-toolbar {\r\n    background-color: pink;\r\n    margin-bottom: 12px;\r\n}\r\n\r\n.card-container {\r\n    padding: 0 30px 0 30px;\r\n}\r\n\r\n.card-container::before , .card-container::after {\r\n    content: \" \";\r\n    display: table;\r\n}\r\n\r\n.card-container::after {\r\n    clear: both;\r\n}\r\n\r\napp-card {\r\n    max-width: 100%;\r\n    margin: 0 12px 12px 12px;\r\n    float: left;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\n  <mat-toolbar-row fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n      <h2>My Memory Match Game</h2>\n      <div>Number of Attempts: {{ attemptsCounter }}</div>\n      <button (click)=\"resetGameBoard()\">Reset</button>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<div class=\"card-container\">\n\t<app-card *ngFor=\"let number of cards; let i = index\" \n\t\t\t\t[myNumber]=\"number\" \n\t\t\t\t(click)=\"registerSelection(number, i)\">\n\t</app-card>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_card_component__ = __webpack_require__("./src/app/card/card.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(cd) {
        var _this = this;
        this.cd = cd;
        this.STARTING_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.cardSelectionOne = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        this.cardSelectionTwo = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        this.pauseActionUntilCheck = false;
        this.lastIndex = null;
        this.attemptsCounter = 0;
        this.setUpCards();
        //Set up subscription of whenever the second card is selected
        //Wait 1 second before executing in order to ensure time for card to flip
        this.cardSelectionTwo.debounceTime(1000).subscribe(function (card) {
            if (card) {
                _this.checkMatch();
            }
        });
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.initChildrenArray();
    };
    /**
     * Function that takes the appropriate action when a card is selected from the game board.
     * If the pause action flag is set, no further cards can be selected. This is to ensure
     * that the user doesn't quickly select more than two cards at a time until the first two cards are checked.
     * This function is also ensure that the card selection cannot be undone.
     * @param cardNumber The number that belongs to the card selected
     * @param index The index of the card within the card array
     */
    AppComponent.prototype.registerSelection = function (cardNumber, index) {
        if (this.pauseActionUntilCheck) {
            return;
        }
        //You can't undo your selection
        if (this.lastIndex === index) {
            return;
        }
        this.children[index].flipCard();
        if (this.cardSelectionOne.value) {
            //this is the second selection
            this.attemptsCounter++;
            this.cardSelectionTwo.next(this.children[index]);
            this.pauseActionUntilCheck = true;
        }
        else {
            //this is the first selection
            this.cardSelectionOne.next(this.children[index]);
        }
        this.lastIndex = index;
    };
    /**
     * Function that will reset the entire gameboard back to the default state
     */
    AppComponent.prototype.resetGameBoard = function () {
        this.attemptsCounter = 0;
        this.cardSelectionOne.next(null);
        this.cardSelectionTwo.next(null);
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.resetCard();
        }
        this.setUpCards();
        this.cd.detectChanges();
        this.initChildrenArray();
    };
    /**
     * Set the children array based on the ViewChildren variable
     */
    AppComponent.prototype.initChildrenArray = function () {
        this.children = this.childrenComponents.toArray();
    };
    /**
     * Helper function which sets up the cards variable
     */
    AppComponent.prototype.setUpCards = function () {
        var doubleArray = this.STARTING_VALUES.concat(this.STARTING_VALUES);
        this.cards = this.shuffleArray(doubleArray);
    };
    /**
     * Function that checks whether the two selected cards
     * are a match or not. If they are, set the cards to success.
     * Otherwise, flip the cards back over
     */
    AppComponent.prototype.checkMatch = function () {
        if (this.cardSelectionOne.value.getNumber() === this.cardSelectionTwo.value.getNumber()) {
            //They are a match, set success
            this.cardSelectionOne.value.setSuccess();
            this.cardSelectionTwo.value.setSuccess();
        }
        else {
            //Not a success, flip back over
            this.cardSelectionOne.value.flipCard();
            this.cardSelectionTwo.value.flipCard();
        }
        this.cardSelectionOne.next(null);
        this.cardSelectionTwo.next(null);
        this.lastIndex = null;
        this.pauseActionUntilCheck = false;
    };
    /**
     * Using a JavaScript implementation of the
     * Durstenfeld shuffle, a computer-optimized version
     * of Fisher-Yates
     * Found at https://stackoverflow.com/a/12646864
     * @param array
     */
    AppComponent.prototype.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
        return array.slice(0);
        var _a;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_3__card_card_component__["a" /* CardComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], AppComponent.prototype, "childrenComponents", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__ = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__card_card_component__ = __webpack_require__("./src/app/card/card.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var MATERIAL_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MatButtonModule */],
    __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MatToolbarModule */],
    __WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MatCardModule */],
    __WEBPACK_IMPORTED_MODULE_3__angular_material__["c" /* MatGridListModule */],
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__card_card_component__["a" /* CardComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                MATERIAL_COMPONENTS,
                __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["a" /* FlexLayoutModule */]
            ],
            exports: [
                MATERIAL_COMPONENTS,
                __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["a" /* FlexLayoutModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/card/card.component.css":
/***/ (function(module, exports) {

module.exports = "mat-card{\r\n    font-size: 120px;\r\n    text-align: center;\r\n    height: 150px;\r\n    width: 150px;\r\n    padding: 24px 0;\r\n    background-color: grey;\r\n}\r\n\r\n.card{\r\n    background-color: pink;\r\n}\r\n\r\n.success {\r\n    background-color: greenyellow;\r\n}"

/***/ }),

/***/ "./src/app/card/card.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card [class.card]=\"showNumber\" [class.success]=\"success\">\n\t<mat-card-content *ngIf=\"showNumber; else empty\">\n\t\t{{ myNumber }}\n\t</mat-card-content>\n\t<ng-template #empty>\n\t\t<mat-card-content></mat-card-content>\n\t</ng-template>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/card/card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CardComponent = /** @class */ (function () {
    function CardComponent() {
        this.showNumber = false;
        this.success = false;
    }
    /**
     * Getter for the myNumber variable
     * Returns myNumber variable
     */
    CardComponent.prototype.getNumber = function () {
        return this.myNumber;
    };
    /**
     * Sets the success variable to true
     * Once this variable is set to true, no way for it to be undone unless the card is reset
     */
    CardComponent.prototype.setSuccess = function () {
        this.success = true;
    };
    /**
     * Function to toggle the showNumber variable
     */
    CardComponent.prototype.flipCard = function () {
        if (!this.success) {
            this.showNumber = !this.showNumber;
        }
    };
    /**
     * Function to reset the card back to it's original state
     */
    CardComponent.prototype.resetCard = function () {
        this.showNumber = false;
        this.success = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], CardComponent.prototype, "myNumber", void 0);
    CardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-card',
            template: __webpack_require__("./src/app/card/card.component.html"),
            styles: [__webpack_require__("./src/app/card/card.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CardComponent);
    return CardComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map