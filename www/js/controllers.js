angular.module('attendance.controllers', ['ngCordova'])
    .controller('DashCtrl', function($scope) {
        var blueCatsAppToken = '61687109-905F-4436-91F8-E602F514C96D';

        var sdkOptions = {
            discoverBeaconsNearby: true, //Cache beacons as detected by the device
            cacheRefreshTimeIntervalInSeconds: 300 //Period to check for changes in seconds
        };

        $scope.isClicked = false;
        console.log($scope.isClicked);
        $scope.click = function() {
            com.bluecats.beacons.startPurringWithAppToken(blueCatsAppToken, success, logError, sdkOptions);
        }

        function success() {
            var user = window.localStorage.account;

            if (user == 'null' || !user) {
                alert('Please add account details');
            } else {
                user = JSON.parse(user);
                alert('Attendence Taken for ' + user.firstname);
                $scope.isClicked = true;
            }
        }

        function logError() {
            alert("You're not in the class, you cannot sign in");
        }
    })
    .controller('AccountCtrl', function($scope, $cordovaDevice) {
        $scope.isSignedIn = true;
        if (window.localStorage.account == 'null' || !window.localStorage.account) {
            $scope.isSignedIn = false;
        }
        $scope.student = {};

        $scope.submit = function() {
            if ($scope.student.firstname == null || $scope.student.lastname == null || $scope.student.studentId == null) {
                alert('All input required');
            } else {
                $scope.student.UUID = $cordovaDevice.getUUID();
                window.localStorage['account'] = JSON.stringify($scope.student);
                $scope.student = {};
            }
        }
    })
