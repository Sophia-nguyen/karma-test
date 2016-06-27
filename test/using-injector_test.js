System.register(['angular2/testing', 'angular2/angular2'], function(exports_1) {
    var testing_1, angular2_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            testing_1.describe('default test injector', function () {
                testing_1.it('should provide default id', testing_1.inject([angular2_1.APP_ID], function (id) {
                    testing_1.expect(id).toBe('a');
                }));
            });
        }
    }
});
//# sourceMappingURL=using-injector_test.js.map