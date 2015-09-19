/*global todomvc */
'use strict';

describe('todoEscape directive', function () {
  var scope, compile, element;

  beforeEach(inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      scope.escapeCallback = jasmine.createSpy('escapeCallback');
      compile = $compile;
  }));

  beforeEach(function() {
      var elem = angular.element('<input todo-escape="escapeCallback">');
      element = compile(elem)(scope);

  });

  it('should call callback function on escape', function() {
    // given
    var givenEvent = { keyCode: 27 };

    // when
    element.triggerHandler('keydown', givenEvent);
    $scope.$digest();
    expect(scope.escapeCallback).toHaveBeenCalled();
  });

  it('should not call escape callback when other key is down', function () {
    // given
    var givenEvent = { keyCode: 1 };

    // when
    element.triggerHandler('keydown', givenEvent);
    $scope.$digest();
    expect(scope.escapeCallback).not.toHaveBeenCalled();
  });

  it('should unbind keydown event when scope is destroyed', function() {
    // given
    spyOn(element, 'unbind');

    // when
    scope.$destroy();
    expect(element.unbind).toHaveBeenCalledWith('keydown');
  });
});
