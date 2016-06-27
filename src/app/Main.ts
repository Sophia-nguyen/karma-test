/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {Helper} from './core/utils/Helper';
import {BaseHTTP} from './core/utils/BaseHTTP';


import {App} from './App';
import {ConfigService} from "./services/common/ConfigService";
import {AccountStore} from "./stores/account/AccountStore";
import {AppStore} from "./stores/common/AppStore";
import {HeaderStore} from "./stores/common/HeaderStore";
import {PurchaseCreditsStore} from "./stores/common/PurchaseCreditsStore";
import {UserStore} from "./stores/user/UserStore";


var configService = new ConfigService();
configService.getConfigs().then((res) => {
    bootstrap(App, [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        HTTP_PROVIDERS,
        FORM_PROVIDERS,
        provide(TranslateLoader, {
            useFactory: (http:Http) => new TranslateStaticLoader(http, 'src/app/core/languages', '.json'),
            deps: [Http]
        }),
        TranslateService,
        Helper,
        BaseHTTP,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
        AppStore,
        AccountStore,
        HeaderStore,
        PurchaseCreditsStore,
        UserStore
    ]);
});