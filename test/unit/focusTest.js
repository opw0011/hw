/*global todomvc */
'use strict';

beforeEach(module('todomvc'));

describe('Testing todo focus', function() {
  var scope, compile, browser, timeout;

  beforeEach(inject(function($rootScope, $compile, $browser) {
    scope = $rootScope.$new();
    compile = $compile;
    browser = $browser;
    timeout = $timeout;
  }));

  it('should place focus on the element it is applied to when the expression it binds to evaluates to true', function() {
    var elem = angular.element('<input todo-focus="focus">');
    spyOn(elem, 'focus');
    scope.focus = false;
    compile(elem)(scope);
    scope.$digest();

    scope.$apply(function () {
      scope.focus = true;
    });

    expect(elem.focus).toHaveBeenCalled();
  });

});
