/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
System.register(['angular2/core', 'angular2/router', 'ng2-translate/ng2-translate', './Routes', './components/common/navbar/NavbarComponent', './components/common/header/HeaderComponent', "./core/utils/Security", "./stores/common/AppStore", "./actions/account/AccountActions", "./actions/common/AppActions", "./core/common/Enum", "./PubnubClient", "../app/core/utils/Helper", "./core/utils/LoggedInRouterOutlet", "./stores/account/AccountStore", "./stores/user/UserStore"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, ng2_translate_1, Routes_1, NavbarComponent_1, HeaderComponent_1, Security_1, AppStore_1, AccountActions_1, AppActions_1, Enum_1, PubnubClient_1, Helper_1, LoggedInRouterOutlet_1, AccountStore_1, UserStore_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (Routes_1_1) {
                Routes_1 = Routes_1_1;
            },
            function (NavbarComponent_1_1) {
                NavbarComponent_1 = NavbarComponent_1_1;
            },
            function (HeaderComponent_1_1) {
                HeaderComponent_1 = HeaderComponent_1_1;
            },
            function (Security_1_1) {
                Security_1 = Security_1_1;
            },
            function (AppStore_1_1) {
                AppStore_1 = AppStore_1_1;
            },
            function (AccountActions_1_1) {
                AccountActions_1 = AccountActions_1_1;
            },
            function (AppActions_1_1) {
                AppActions_1 = AppActions_1_1;
            },
            function (Enum_1_1) {
                Enum_1 = Enum_1_1;
            },
            function (PubnubClient_1_1) {
                PubnubClient_1 = PubnubClient_1_1;
            },
            function (Helper_1_1) {
                Helper_1 = Helper_1_1;
            },
            function (LoggedInRouterOutlet_1_1) {
                LoggedInRouterOutlet_1 = LoggedInRouterOutlet_1_1;
            },
            function (AccountStore_1_1) {
                AccountStore_1 = AccountStore_1_1;
            },
            function (UserStore_1_1) {
                UserStore_1 = UserStore_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(helper, accountStore, userStore, element, translate, router, appStore, accountActions) {
                    this.helper = helper;
                    this.accountStore = accountStore;
                    this.userStore = userStore;
                    this.router = router;
                    this.element = $(element.nativeElement);
                    this.translate = translate;
                    this.appStore = appStore;
                    this.accountActions = accountActions;
                    this.translationConfig();
                }
                App.prototype.ngOnInit = function () {
                    var _this = this;
                    this.appStore.subscribe(function (payload) {
                        if (payload.type === AppActions_1.ACCESS_SUCCESSFUL) {
                            _this.accessSuccessful(payload.data);
                        }
                    });
                };
                App.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    //Check when routes on change
                    this.router.subscribe(function (path) { return _this.handleRoutes(path); });
                    //check user has been login
                    var accountInLocalStorage = this.accountStore.getAccountInfo(null);
                    if (Security_1.default.getLogin() == 'Y' && accountInLocalStorage) {
                        this.accessSuccessful({
                            currentAccount: accountInLocalStorage
                        });
                    }
                };
                //TODO: Thuy will change this function to  handle permission
                App.prototype.handleRoutes = function (path) {
                    if (!Security_1.default.getLogin()) {
                        this.hasAccount = false;
                    }
                };
                /**
                 * This method is invoked when user access to the MGL pages successfully after user login,
                 * switch account, access to other account or reload page. Then, it will update local storage
                 * for account as well as start the socket io to connect client to server.
                 *
                 * @param data contains the following properties:
                 *      currentAccount: The account that user is accessing.
                 *      previousAccount: This field is optional. This field has value when user switch account.
                 *                       It holds the previous account of user.
                 */
                App.prototype.accessSuccessful = function (data) {
                    var _this = this;
                    if (data && data.currentAccount) {
                        setTimeout(function () {
                            _this.hasAccount = true;
                        });
                        // Init Pubnub client
                        PubnubClient_1.PubnubClient.init();
                        // Subscribe events
                        PubnubClient_1.PubnubClient.subscribe(data.currentAccount._id, Enum_1.EVENT.Subscribe.StyleChanged, function () {
                            _this.helper.generateSimpleModal({
                                header: _this.helper.translate('modal.whiteLabel.header'),
                                content: _this.helper.translate('modal.whiteLabel.content'),
                                type: Enum_1.MODAL_TYPE.YesNoModal,
                                onAccept: function () {
                                    window.location.reload();
                                }
                            });
                        });
                        PubnubClient_1.PubnubClient.subscribe(data.currentAccount._id, Enum_1.EVENT.Subscribe.AccountChanged, function (data) {
                            _this.accountActions.changeAccount(data);
                        });
                        if (data.previousAccount) {
                            PubnubClient_1.PubnubClient.unSubscribe(data.previousAccount._id);
                        }
                    }
                };
                App.prototype.onLogout = function () {
                    // Unsubscribe all channels
                    PubnubClient_1.PubnubClient.unSubscribeAll();
                    //Clear all session in local store
                    Security_1.default.clearLocalStore();
                    this.hasAccount = false;
                    //Redirect to login page
                    this.router.navigate(["/Login"]);
                };
                App.prototype.translationConfig = function () {
                    var userLang = this.userStore.getLanguage() || 'en';
                    this.translate.use(userLang);
                };
                App = __decorate([
                    core_1.Injectable(),
                    core_1.Component({
                        selector: 'main-app',
                        templateUrl: './src/app/App.html',
                        directives: [router_1.RouterOutlet, NavbarComponent_1.NavbarComponent, HeaderComponent_1.HeaderComponent, LoggedInRouterOutlet_1.LoggedInRouterOutlet],
                        providers: [AccountActions_1.AccountActions],
                        pipes: [ng2_translate_1.TranslatePipe]
                    }),
                    router_1.RouteConfig(Routes_1.ALL_ROUTES), 
                    __metadata('design:paramtypes', [Helper_1.Helper, AccountStore_1.AccountStore, UserStore_1.UserStore, core_1.ElementRef, ng2_translate_1.TranslateService, router_1.Router, AppStore_1.AppStore, AccountActions_1.AccountActions])
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});

//# sourceMappingURL=App.js.map
