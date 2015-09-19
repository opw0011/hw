'use strict';

beforeEach(module("todomvc"));

describe('todoBlur directive', function () {
  var scope, compile;

  beforeEach(inject(function ($rootScope, $compile, $browser) {
    scope = $rootScope.$new();
    compile = $compile;
    var elem = angular.element('<input todo-blur="blur">');
    spyOn(elem, 'bind').and.returnValue('blur');
    compile(elem)(scope);
    scope.$apply(function() {
      elem.attrs.escape();
    })
  }));

  it('should execute an expression when the element it is applied to loses focus', function (done) {
    scope.$destroy();
    expect(scope.blur).toHaveBeenCalled();
  });
});
