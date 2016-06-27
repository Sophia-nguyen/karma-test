/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router', 'angular2/common', 'angular2/http', 'ng2-translate/ng2-translate', './core/utils/Helper', './core/utils/BaseHTTP', './App', "./services/common/ConfigService", "./stores/account/AccountStore", "./stores/common/AppStore", "./stores/common/HeaderStore", "./stores/common/PurchaseCreditsStore", "./stores/user/UserStore"], function(exports_1) {
    var core_1, browser_1, router_1, common_1, http_1, ng2_translate_1, Helper_1, BaseHTTP_1, App_1, ConfigService_1, AccountStore_1, AppStore_1, HeaderStore_1, PurchaseCreditsStore_1, UserStore_1;
    var configService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (Helper_1_1) {
                Helper_1 = Helper_1_1;
            },
            function (BaseHTTP_1_1) {
                BaseHTTP_1 = BaseHTTP_1_1;
            },
            function (App_1_1) {
                App_1 = App_1_1;
            },
            function (ConfigService_1_1) {
                ConfigService_1 = ConfigService_1_1;
            },
            function (AccountStore_1_1) {
                AccountStore_1 = AccountStore_1_1;
            },
            function (AppStore_1_1) {
                AppStore_1 = AppStore_1_1;
            },
            function (HeaderStore_1_1) {
                HeaderStore_1 = HeaderStore_1_1;
            },
            function (PurchaseCreditsStore_1_1) {
                PurchaseCreditsStore_1 = PurchaseCreditsStore_1_1;
            },
            function (UserStore_1_1) {
                UserStore_1 = UserStore_1_1;
            }],
        execute: function() {
            configService = new ConfigService_1.ConfigService();
            configService.getConfigs().then(function (res) {
                browser_1.bootstrap(App_1.App, [
                    router_1.ROUTER_PROVIDERS,
                    http_1.HTTP_PROVIDERS,
                    http_1.HTTP_PROVIDERS,
                    common_1.FORM_PROVIDERS,
                    core_1.provide(ng2_translate_1.TranslateLoader, {
                        useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'src/app/core/languages', '.json'); },
                        deps: [http_1.Http]
                    }),
                    ng2_translate_1.TranslateService,
                    Helper_1.Helper,
                    BaseHTTP_1.BaseHTTP,
                    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                    AppStore_1.AppStore,
                    AccountStore_1.AccountStore,
                    HeaderStore_1.HeaderStore,
                    PurchaseCreditsStore_1.PurchaseCreditsStore,
                    UserStore_1.UserStore
                ]);
            });
        }
    }
});

//# sourceMappingURL=Main.js.map
