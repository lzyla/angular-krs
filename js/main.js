var app = angular.module("krsapp",[]);


app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.controller('krsappController', ["$scope", "$http", function ($scope, $http) {
	$scope.name = "";
	$scope.adress = "";
	$scope.www = "";
	$scope.type = "";
	$scope.krsfailed = "";
	$scope.searchBy = "krs_podmioty.krs";


	$scope.getData = function (krs) {
		if (krs === undefined ) {
			krs = $scope.inputKrs;
		}

		console.log($scope.searchBy);

		var url = "https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[" + $scope.searchBy + "]=" + krs;

		$http.get(url)
		.then(function(data){
			var dataobject = data.data.Dataobject;

			if(dataobject.length == 0) {
				$scope.krsfailed = "Nie ma takiego KRSu";
				return;
			}

			var entity = dataobject[0].data;
			$scope.name = entity['krs_podmioty.nazwa'];
			$scope.adress = entity['krs_podmioty.adres'];
			$scope.www = entity['krs_podmioty.www'];
			$scope.type = entity['krs_podmioty.forma_prawna_str'];

	       }, 
	       function(data){
	         alert("Błąd przy pobieraniu API");
	       }
	    );
	};

	

}]);