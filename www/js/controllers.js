angular.module('attendance.controllers', ['ngCordova'])
    .controller('DashCtrl', function($scope) {
        var blueCatsAppToken = '61687109-905F-4436-91F8-E602F514C96D';

        var sdkOptions = {
            trackBeaconVisits: true, //Log visits to beacons to the BlueCats api
            useLocalStorage: true, //Cache beacons in local db for offline availability
            cacheAllBeaconsForApp: true, //Cache all beacons on startup
            discoverBeaconsNearby: true, //Cache beacons as detected by the device
            cacheRefreshTimeIntervalInSeconds: 300 //Period to check for changes in seconds
        };

        $scope.click = function() {
            console.log('Clicked');
            com.bluecats.beacons.startPurringWithAppToken(blueCatsAppToken, function() {
                console.log('Connected');
            }, logError, sdkOptions);
        }

        function logError() {
            console.log('Error');
        }
    })
    .controller('AccountCtrl', function($scope, $cordovaDevice) {
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
