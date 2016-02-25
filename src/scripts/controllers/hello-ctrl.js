/**
 * Created by haner on 16/2/25.
 */

module.exports = function(app){

    //require('../../asset/css/index.css');

    //添加 controller
    app.controller('appCtrl',["$scope", function($scope){
        $scope.info = 'hello angular';
        $scope.path = "/tmpl/hello.html";
    }]);

};
