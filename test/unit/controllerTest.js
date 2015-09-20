'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;



  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    
    }));

    describe('TodoCtrl Testing', function() {
      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},

          {str:"Hello?? This is Sung", exp: "Hello??"},
          {str:"Hello?? \nThis is Sung \n 123", exp: "Hello??"}

        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }


      });

      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });

      it('addToDo Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        scope.input = {wholeMsg: "test"};
        scope.addTodo();

        scope.input = {wholeMsg: ""};
        scope.addTodo();

      });

      it('increaseMax Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $window: window
        });

        scope.maxQuestion = 1;
        scope.totalCount = 10;
        scope.increaseMax();

        scope.maxQuestion = 11;
        scope.totalCount = 1;
        scope.increaseMax();

      });

      it('FBLogout', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        scope.FBLogout();
        expect(scope.isAdmin).toBeFalsy();
      });

      // it('FBLogin', function() {

      //   var ctrl = controller('TodoCtrl', {
      //     $scope: scope,
      //   });

      //   scope.FBLogin();

      // });

      it('markAll test', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var questionList=[{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 3,
          order: 3
        },{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 2,
          order: 6
        }]

        scope.markAll();       

      });

      it('removeTodo test', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });
        scope.removeTodo();     
      });

      it('revertEditing test', function() {
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });
        var test_todo = {wholeMsg: "test"};  
        scope.originalTodo = {wholeMsg: "test"};
        scope.revertEditing(test_todo);     
      });

      it('doneEditing test', function() {
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var test_todo = {wholeMsg: "test"};        
        scope.doneEditing(test_todo);  

        var test_todo = {wholeMsg: ""};        
        scope.doneEditing(test_todo);      
      });

      it('clearCompletedTodos test', function() {
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        scope.clearCompletedTodos();

      });

      it('toggleCompleted test', function() {
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

      var test_todo = {completed: false};
      scope.toggleCompleted(test_todo);

      });

      it('markAll test', function() {
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var allCompleted = [
          {wholeMsg: "newTodo", completed: true},
          {wholeMsg: "newTodo21", completed: true}
        ];

        scope.todos = [{wholeMsg: "newTodo", completed: true},{}];
        // scope.markAll(allCompleted);
      });

      it('editTodo test', function() {
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var test_todo = {wholeMsg: "test"};        
        scope.editTodo(test_todo);  
      });

      it('addEcho test', function() {
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var test_todo = {
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 2,
          order: 3
        };  
        scope.addEcho(test_todo);
        expect(test_todo.echo).toBe(3);
        expect(test_todo.order).toBe(2);

      });

      it('watchcollection test', function() {
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var test_todo = [{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 2,
          order: 3
        },{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: true,
          timestamp: 0,
          tags: "...",
          echo: 20,
          order: 2
        },{}];  

        scope.todos = test_todo;
        scope.$digest();


       

      });





    });
  });
