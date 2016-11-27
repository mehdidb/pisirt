var app = angular.module("PISIRT", ['ngCookies']);
app.controller("IoTController", ['$scope','$http','$interval','$cookies','$window', function ($scope,$http,$interval,$cookies,$window){
	$scope.getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	
	$scope.server_url = $scope.getCookie("serverURL");
		
	/** 
		Les conteneurs des diverses mesures
	*/
	
	$scope.Temperature_items = 
	[
		{
			id : 1, 
			value : 41, 
			date : new Date(1000*1460275200), 
			room : 1,
		},
		{
			id : 2, 
			value : 42,
			date : new Date(1000*1460277000), 
			room : 1,
		},
		{
			id : 3, 
			value : 42, 
			date : new Date(1000*1460278800), 
			room : 1,
		},
		{
			id : 4, 
			value : 40, 
			date : new Date(1000*1460280600), 
			room : 1,
		},
		{
			id : 5, 
			value : 40, 
			date : new Date(1000*1460282400), 
			room : 1,
		},
		{
			id : 6, 
			value : 40, 
			date : new Date(1000*1460284200), 
			room : 1,
		},
		{
			id : 7, 
			value : 39, 
			date : new Date(1000*1460286000), 
			room : 1,
		},
		{
			id : 8, 
			value : 1, 
			date : new Date(1000*1460287800), 
			room : 1,
		},
		{
			id : 1, 
			value : 41, 
			date : new Date(1000*1460275200), 
			room : 2,
		},
		{
			id : 2, 
			value : 42,
			date : new Date(1000*1460277000), 
			room : 2,
		},
		{
			id : 3, 
			value : 42, 
			date : new Date(1000*1460278800), 
			room : 2,
		},
		{
			id : 4, 
			value : 40, 
			date : new Date(1000*1460280600), 
			room : 2,
		},
		{
			id : 5, 
			value : 40, 
			date : new Date(1000*1460282400), 
			room : 2,
		},
		{
			id : 6, 
			value : 40, 
			date : new Date(1000*1460284200), 
			room : 2,
		},
		{
			id : 7, 
			value : 39, 
			date : new Date(1000*1460286000), 
			room : 2,
		},
		{
			id : 8, 
			value : 40, 
			date : new Date(1000*1460287800), 
			room : 2,
		}
	];
	
	$scope.Presence_items = 
	[
		{
			id : 1, 
			room : 1,
			state : 1, 
			date : new Date(1000*1460275200)
		},
		{
			id : 2, 
			room : 1,
			state : 1, 
			date : new Date(1000*1460277000)
		},
		{
			id : 3, 
			room : 1,
			state : 1, 
			date : new Date(1000*1460278800)
		},
		{
			id : 4, 
			room : 1,
			state : 1, 
			date : new Date(1000*1460280600)
		},
		{
			id : 5, 
			room : 1,
			state : 0, 
			date : new Date(1000*1460282400)
		},
		{
			id : 6, 
			room : 1,
			state : 1, 
			date : new Date(1000*1460284200)
		},
		{
			id : 7, 
			room : 1,
			state : 0, 
			date : new Date(1000*1460286000)
		},
		{
			id : 8, 
			room : 1,
			state : 0, 
			date : new Date(1000*1460287800)
		},
		{
			id : 9, 
			room : 1,
			state : 0, 
			date : new Date(1000*1460275200)
		},
		{
			id : 10, 
			room : 1,
			state : 0, 
			date : new Date(1000*1460277000)
		},
		{
			id : 11, 
			room : 1,
			state : 0, 
			date : new Date(1000*1460278800)
		},
		{
			id : 12, 
			room : 2,
			state : 1, 
			date : new Date(1000*1460280600)
		},
		{
			id : 13, 
			room : 2,
			state : 0, 
			date : new Date(1000*1460282400)
		},
		{
			id : 14, 
			room : 2,
			state : 1, 
			date : new Date(1000*1460284200)
		},
		{
			id : 15, 
			room : 2,
			state : 1, 
			date : new Date(1000*1460286000)
		},
		{
			id : 16, 
			room : 2,
			state : 1, 
			date : new Date(1000*(1460287800+1800*12))
		}
	];
	
	$scope.Light_items = 
	[
		{
			id : 1, 
			room : 5,
			state : 1, 
			light_state :0,
			date : new Date(1000*1460275200)
		},
		{
			id : 2, 
			room : 1,
			state : 1, 
			light_state :0,
			date : new Date(1000*1460277000)
		},
		{
			id : 3, 
			room : 1,
			state : 1, 
			light_state :0,
			date : new Date(1000*1460278800)
		},
		{
			id : 4, 
			room : 1,
			state : 1, 
			light_state :0,
			date : new Date(1000*146028600)
		},
		{
			id : 5, 
			room : 1,
			state : 0, 
			light_state :1,
			date : new Date(1000*1460282400)
		},
		{
			id : 6, 
			room : 1,
			state : 1, 
			light_state :0,
			date : new Date(1000*1460284200)
		},
		{
			id : 7, 
			room : 1,
			state : 0, 
			light_state :0,
			date : new Date(1000*1460286000)
		},
		{
			id : 8, 
			room : 1,
			state : 0, 
			light_state :0,
			date : new Date(1000*1460287800)
		},
		{
			id : 9, 
			room : 1,
			state : 2, 
			light_state :0,
			date : new Date(1000*1460275200)
		},
		{
			id : 10, 
			room : 1,
			state : 2, 
			light_state :0,
			date : new Date(1000*1460277000)
		},
		{
			id : 11, 
			room : 1,
			state : 2, 
			light_state :0,
			date : new Date(1000*1460278800)
		},
		{
			id : 12, 
			room : 2,
			state : 1, 
			light_state :0,
			date : new Date(1000*146028600)
		},
		{
			id : 13, 
			room : 2,
			state : 0, 
			light_state :0,
			date : new Date(1000*1460282400)
		},
		{
			id : 14, 
			room : 2,
			state : 1, 
			light_state :0,
			date : new Date(1000*1460284200)
		},
		{
			id : 15, 
			room : 2,
			state : 0, 
			light_state :0,
			date : new Date(1000*1460286000)
		},
		{
			id : 16, 
			room : 2,
			state : 0,
			light_state : 0, 
			date : new Date(1000*1460287800)
		}
	];
	
	$scope.Gaz_items = [];
	
	$scope.getTemp = function() {
		$http.get($scope.server_url + "/data/temperature").
        success(function(data, status) {
			data.date = new Date(data.date);
			console.log(data);
			$scope.Temperature_items = data;
			
        }).
		error(function(data, status) {
            console.log('unknown error');
        });
	}
	
	$scope.getLight = function() {
		$http.get($scope.server_url + "").
        success(function(data, status) {
			data.date = new Date(data.date);
            $scope.Light_items = data;
        }).
		error(function(data, status) {
            console.log('unknown error');
        });
	}
	
	$scope.getGaz = function() {
		$http.get($scope.server_url + "").
        success(function(data, status) {
			data.date = new Date(data.date);
            $scope.Gaz_items = data;
        }).
		error(function(data, status) {
            console.log('unknown error');
        });
	}
	/**
		Températures moyennes mensuelles
	*/
	
	$scope.avgTemperature = 
	[
		{
			avg : 10.7, 
			month : "Janvier", 
			min : 6.6,
			min : 14.8,
		},
		{
			avg : 11.5, 
			month : "Fevrier", 
			min : 7.1,
			min : 16.0,
		},
		{
			avg : 13.1, 
			month : "Mars", 
			min : 8.3,
			min : 17.9,
		},
		{
			avg : 15.7, 
			month : "Avril", 
			min : 10.4,
			min : 21.0,
		},
		{
			avg : 18.7, 
			month : "Mai", 
			min : 13.3,
			min : 24.0,
		},
		{
			avg : 22.9, 
			month : "Juin", 
			min : 17.1,
			min : 28.8,
		},
		{
			avg : 25.7, 
			month : "Juillet", 
			min : 19.5,
			min : 32.0,
		},
		{
			avg : 26.2, 
			month : "Aout", 
			min : 20.4,
			min : 32.1,
		},
		{
			avg : 24.3, 
			month : "Septembre", 
			min : 19.1,
			min : 29.5,
		},
		{
			avg : 20.3, 
			month : "Octobre", 
			min : 15.3,
			min : 25.3,
		},
		{
			avg : 15.7, 
			month : "Novembre", 
			min : 11.1,
			min : 20.3,
		},
		{
			avg : 11.7, 
			month : "Decembre", 
			min : 7.6,
			min : 15.8,
		}
	];
	
	/**
		La div qui est activé
		0->Acceuil
		1->Temperature
		2->Presence
		3->Light
		4->Gaz
		5->Configuration
	*/
	
	$scope.shDiv = 0;
	
	/**
		Le timer qui rafraichit les données
	*/
	
	$scope.refreshTime = 10000;
	
	/**
		La classe qui est actuellement sélectionnée
	*/
	
	$scope.AppRoom = -1;
	
	/**
		Le conteneur des diverses alertes
	*/
	
	$scope.alerts = [];
	
	/**
		Variable qui renseigne sur l'état de la connexion
	*/
	$scope.logged = false;
	
	/**
		Nom d'utililisateur
	*/
	
	$scope.user = 'user';
	
	/**
		Données pour le graphe de la température
	*/
	
	$scope.dataTemperature = [];
	
	/**
		Marge de température avant l'activation de l'alerte
	*/
	
	$scope.marge = 2;
	
	/**
		Affichage ou non de l'historique des alertes
	*/
	
	$scope.permut = 0;
	
	/**
		Contient les messages relatifs à chaque service
	*/
	
	$scope.text = new Object();
	
	/**
		Fonctions du service présence
		DEBUT
	*/
	
	$scope.Presence_checkPresence = function(room) {
		var data = $scope.Presence_items;
		data.sort(function(a,b){
		  // Turn your strings into dates, and then subtract them
		  // to get a value that is either negative, positive, or zero.
		  return b.date - a.date;
		});
		
		var ret;
		for (var i=0;i<data.length;i++) {
			if (data[i].room == room) {
				ret = data[i].state;
			}
		}
		
		return ret;
	}
	
	$scope.Presence_getLastOne = function(room) {
		var data = $scope.Presence_items;
		data.sort(function(a,b){
		  // Turn your strings into dates, and then subtract them
		  // to get a value that is either negative, positive, or zero.
		  return b.date - a.date;
		});
		
		var ret;
		for (var i=0;i<data.length;i++) {
			if (data[i].room == room) {
				ret = data[i];
			}
		}
		
		return ret;
	}
	
	$scope.Presence_getTime = function(room) {
		var data = $scope.Presence_items;
		for (var i in data) {
			if (data[i].room == room) {
				return data[i].date;
			}
		}
		
		return new Date();
	}
	
	$scope.Presence_updateText = function() {
		var room = $scope.AppRoom;
		var date = $scope.Presence_getTime(room);
		if ($scope.Presence_checkPresence(room) == true) {
			$scope.text.presence = 'Presence detected at ' + $scope.dateFunction(date) + ' in room ' + $scope.showRoom(room);
		} else {
			$scope.text.presence = 'No presence detected at ' + $scope.dateFunction(date) + ' in room ' + $scope.showRoom(room);
		}
	}
	
	$scope.Presence_intrusionAlert = function(room) {
		var data = $scope.Presence_getLastOne(room);
		if (data.state == 1) {
			if ( (19 <= data.date.getHours() && data.date.getHours() <= 23) || (0 <= data.date.getHours() && data.date.getHours() <= 6) ) {
				var obj = 
				{
					"name" : "Intrusion",
					"text" : "Alert intrusion DETECTED",
					"state" : 1,
					"room" : room,
					"date" : data.date,
					"color" : "red",
					"opt" : ""
				}
				
				$scope.alerts.push(obj);
			}
		}
	}
	
	/**
		Fonctions du service présence
		FIN
	*/
	
	/**
		Fonctions du service luminosité
		DEBUT
	*/
	
	$scope.Light_checkLight = function(room) {
		var data = $scope.Light_items;
		for (var i in data) {
			if (data[i].room == room) {
				return data[i].light_state;
			}
		}
	}
	
	$scope.Light_updateText = function() {
		var room = $scope.AppRoom;
		var date = $scope.Presence_getTime(room);

		if (($scope.Presence_checkPresence(room)==true) && ($scope.Light_checkLight(room)==true)) {
			$scope.text.light = 'Light is ON and there is some persons there on ' + $scope.dateFunction(date) + ' in room ' + $scope.showRoom(room);
		} 
		if (($scope.Presence_checkPresence(room)==true) && ($scope.Light_checkLight(room)==false)){
			$scope.text.light = 'Light is OFF and no person is here on ' + $scope.dateFunction(date) + ' in room ' + $scope.showRoom(room);
		}
		if (($scope.Presence_checkPresence(room) == false) && ($scope.Light_checkLight(room)==true)){
			$scope.text.light = 'Light is ON and no one is here on ' + $scope.dateFunction(date) + ' in room ' + $scope.showRoom(room);
		}
		if (($scope.Presence_checkPresence(room) == false) && ($scope.Light_checkLight(room)==false)){
			$scope.text.light = 'Light is OFF and no one is here on ' + $scope.dateFunction(date) + ' in room ' + $scope.showRoom(room);
		}
	}
	
	$scope.Light_alert = function(room) {
		var data = $scope.Light_items;
		data.sort(function(a,b){
		  // Turn your strings into dates, and then subtract them
		  // to get a value that is either negative, positive, or zero.
		  return b.date - a.date;
		});
		var obj;
		for (var i in data) {
			if (data[i].room == room) {
				if ( ($scope.Presence_checkPresence(room) == 1) && (data[i].light_state == 0) ) {
					obj = 
					{
						"name" : "Lights OFF",
						"text" : "Switch ON lights",
						"state" : 1,
						"light_state" : 0,
						"room" : room,
						"date" : data[i].date,
						"color" : "red",
						"opt" : ""
					}
				}
				if ( ($scope.Presence_checkPresence(room) == 0) && (data[i].light_state == 1) ) {
					obj = 
					{
						"name" : "Lights ON",
						"text" : "Switch OFF lights",
						"state" : 1,
						"light_state" : 0,
						"room" : room,
						"date" : data[i].date,
						"color" : "red",
						"opt" : ""
					}
				}
			}
		}
		
		$scope.alerts.push(obj);
	}
	
	/**
		Fonctions du service luminosité
		FIN
	*/
	
	/**
		Fonctions du service température
		DEBUT
	*/
	
	$scope.Temperature_convertToGraph = function() {
		var out = [];
		var x = [], y = [];
		var elem = new Object();
		var data = $scope.Temperature_items;
		
		for(var i in data) {
			if (data[i].room == $scope.AppRoom) {
				x.push($scope.dateFunction(data[i].date));
				y.push(data[i].value);
			}
		}
		
		elem.x = x;
		elem.y = y;
		elem.type = "scatter";
		out.push(elem);
		$scope.dataTemperature = out;
		if (x.length == 0) {
			$scope.text.temperature = 'No data to draw';
			document.getElementById("myDiv").innerHTML = "No data to draw";
			return false;
		} else {
			$scope.text.temperature = '';
			document.getElementById("myDiv").innerHTML = "";
			return true;
		}
	}
	
	$scope.Temperature_drawGraph = function() { 
		if ($scope.Temperature_convertToGraph() == true) {
			Plotly.newPlot('myDiv', $scope.dataTemperature);
		}
	}
	
	$scope.Temperature_getLastOne = function(room) { 
		var data = $scope.Temperature_items;
		var ret;
		for(var i in data) {
			if (data[i].room == room) {
				ret = data[i];
			}
		}
		
		return ret;
	}
	
	$scope.Temperature_alerteTemperature = function(room) {
		var dataT = $scope.Temperature_getLastOne(room);
		if (typeof dataT == 'undefined') {
			return;
		}
		
		var date_AUX = new Date();
		var Temperature_Saison = $scope.avgTemperature[date_AUX.getMonth()].avg;
		var Temperature = dataT.value;
		if (Temperature - Temperature_Saison > $scope.marge) {
			if ($scope.Presence_checkPresence(room) == 1) {
				var data = 
				{
					"name" : "Temperature",						
					"text" : "Switch ON air cooling",
					"state" : 1,
					"light_state" : 0,
					"room" : room,
					"date" : dataT.date,
					"color" : "red",
					"opt" : ""
				}
				
				$scope.alerts.push(data);
			}
		} else if (Temperature_Saison - Temperature > $scope.marge) {
			
			if ($scope.Presence_checkPresence(room) == 0) {
				var data = 
				{
					"name" : "Temperature",						
					"text" : "Switch OFF air cooling",
					"state" : 1,
					"light_state" : 0,
					"room" : room,
					"date" : dataT.date,
					"color" : "blue",
					"opt" : ""
				}
				
			
				$scope.alerts.push(data);
			}	
		}
	}
	
	/**
		Fonctions du service température
		FIN
	*/
	
	/**
		Fonction d'actualisation des alertes
	*/
	
	$scope.updateFunction = function() {
		if ($scope.AppRoom != -1) {
			$scope.getTemp();
			$scope.Light_alert(1);
			$scope.Light_alert(2);
			$scope.Presence_intrusionAlert(1);
			$scope.Presence_intrusionAlert(2);
			$scope.Temperature_alerteTemperature(1);
			$scope.Temperature_alerteTemperature(2);
			
		}
		
		if ($scope.shDiv == 1) {
			$scope.Temperature_drawGraph();
		}
		
		if ($scope.shDiv == 2) {
			$scope.Presence_updateText();
		}
		
		if ($scope.shDiv == 3) {
			$scope.Light_updateText();
		}
	}
	
	/**
		Fonction de changement des divs (température, acceuil, luminosité, ...)
	*/
	
	$scope.showDiv = function(id) {
		$scope.shDiv = id;
		$scope.permut = 0;
		if ($scope.logged == false) {
			$scope.shDiv = 0;
			alert('Please log in before');
		}
		
		if ($scope.AppRoom == -1 && $scope.logged) {
			$scope.shDiv = 0;
			alert('Please choose a classroom');
		}
	}
	
	/**
		Fonction qui relie l'id de la classe avec son nom
	*/
	
	$scope.showRoom = function(id) {
		if (id == 1) {
			return 'B4';
		}
		if (id == 2) {
			return 'B2';
		}
	}
	
	/**
		Fonction qui permet de choisir la classe
	*/
	
	$scope.chooseClassRoom = function(id) {
		$scope.AppRoom = id;
		alert('You selected room ' + $scope.showRoom(id));
	}
	
	/**
		Fonction qui formate la date
	*/
	
	$scope.dateFunction = function(data) {
		var date = data.getDate();
		if (date < 10) {
			date = '0' + date;
		}
		var month = data.getMonth();
		if (month < 10) {
			month = '0' + month;
		}
		var year = data.getFullYear();
		var hours = data.getHours();
		if (hours < 10) {
			hours = '0' + hours;
		}
		var minutes = data.getMinutes();
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		return (date + '/' + month + '/' + year + ' ' + hours + ':' + minutes);
	}
	
	/**
		Fonction qui permet de se connecter
	*/
	
	$scope.loginFunction = function() {
		if ($scope.logged == false) {
			var login = document.getElementById('loginText').value;
			var pass = document.getElementById('passwordText').value;
			if (login == 'admin' && pass == 'admin') {
				$scope.logged = true;
				$scope.user = login;
			} else if (login != '' && pass != '') {
				alert('Login or password incorrect');
			}
		}
	}
	
	/**
		Fonction qui permet de se déconnecter
	*/
	
	$scope.logoutFunction = function() {
		if ($scope.logged == true) {
			$scope.logged = false;
			$scope.user = 'user';
			$scope.shDiv = 0;
			document.getElementById('loginText').value='';
			document.getElementById('passwordText').value='';
		}
	}
	
	/**
		Fonction qui permet de permuter l'interface principale et l'historique
	*/
	
	$scope.showHistory = function() {
		$scope.permut = 1 - $scope.permut;
	}
	
	
	$scope.updateLink = function() {
		$scope.server_url = document.getElementById("url").value;
		
		//$cookies.dotobject = someSessionObj;
		//$scope.usingCookies = { 'cookies.dotobject' : $cookies.dotobject, "cookieStore.get" : $cookieStore.get('dotobject') };
		var d = new Date();
		d.setTime(d.getTime() + (365*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = "serverURL="+$scope.server_url+"; "+expires;
		
		
		
		//$scope.usingCookieStore = { "cookieStore.get" : $cookieStore.get('obj'), 'cookies.dotobject' : $cookies.obj, };
	}
	
	$interval($scope.updateFunction, $scope.refreshTime);
}]);