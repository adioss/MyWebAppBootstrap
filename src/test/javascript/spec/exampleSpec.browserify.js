require('angular-mocks/angular-mocks');
describe("Example test suite", function() {
    var $compile, $rootScope, $httpBackend;
    beforeEach(angular.mock.module('mainApp'));
    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = $injector.get('$httpBackend');
    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("Example edit test suite", function() {
        it('Should correctly init view', function() {
            // Given
            var $scope = $rootScope.$new();
            $scope.currentComponent = {id: 1};
            // And
            var mockedBackend = {name: 'testName', url: 'testUrl'};
            $httpBackend.when('GET', 'api/example/load/1').respond(mockedBackend);

            // When
            var $element = $compile("<example-edit id='1'></example-edit>")($scope);
            $httpBackend.flush();

            //Then
            expect($element.isolateScope().model).toEqual(mockedBackend.data);
            expect($element.find("button").length).toEqual(3);
            expect($element.find("input").length).toEqual(2);
        });
    });

});
