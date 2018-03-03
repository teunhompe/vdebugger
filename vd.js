javascript:(function() { 

	var tourOperatorMap = {'A1':'AlltoursX',
					'AL':'Alltours',
					'AR':'TUI',
					'AS':'TUI Steden',
					'BF':'Bentour',
					'CR':'Cor en Don',
					'DE':'Dertour',
					'FTI':'FTI',
					'JI':'De Jong Intra',
					'NE':'Neckermann',
					'RI':'Riva',
					'SA':'Sunair',
					'TC':'Thomas Cook Vliegen',
					'XC':'Thomas Cook Eigen Vervoer',
					'YVD':'VakantieDiscounter',
	};


	var offerInfo = document.getElementById("offerInfo");
	if(!offerInfo) {
		var offerInfoContainer = document.createElement("div");	
		offerInfoContainer.id="offerInfoContainer";
		var offerInfo = document.createElement("p");
		offerInfo.id="offerInfo";
		offerInfoContainer.style = "position: fixed; top: 0px; left: 0; z-index: 666; width: 100%; background-color: #e1f4ff;"; 
		offerInfo.style = "border: 4px solid #ff007d; margin: 0; padding: .5em; ";
		document.body.prepend(offerInfoContainer);
		offerInfoContainer.appendChild(offerInfo);
	}

	var G7URL = getG7URL();
	var TOInfo = getTouroperatorInfo();
	
	
	if(G7URL && TOInfo[0]) {
		var tourOperatorInfo = (TOInfo[0]) ? 
								"Offer from " + TOInfo[0] + " (" + 
									(TOInfo[1]) ? TOInfo[1] :
									"Unknown touroperatorcode." + ")" 
								: "Offer unavailable";
		var G7Link = (G7URL) ? "<a style=\"color: #38b4f2; text-decoration: underline;\" href=\""+ G7URL +"\" target=\"_blank\">Check the TripAPI logs</a>" : "";
		offerInfo.innerHTML = tourOperatorInfo + "<br/>" + G7Link;
	}
	else offerInfo.innerHTML = "Please check price to get offer info";
	
	var accoID = getAccoID();
	if(accoID) {
		var accoLink = "<a href=\"https://tools.elmar.nl/accommodations/" + accoID + "\" target=\"_blank\">Accomanager</a>";
		offerInfo.innerHTML += "<br/>" + accoLink;
	}



	

	function getAccoID() {
		if(dataLayer) return dataLayer[0].accoId;
		else return false;
	}

	function getTouroperatorInfo() {
		var tourOperatorCode = document.getElementById("to-info") ? document.getElementById("to-info").innerHTML : false;
		if(tourOperatorCode) {
			var tourOperatorName = tourOperatorMap[tourOperatorCode];
			if(!tourOperatorName) tourOperatorName = false;
		}
		return [tourOperatorCode, tourOperatorName]
	}


	function getG7URL() {
		var G7_link = document.getElementById("g7-info") ? document.getElementById("g7-info").href : false;
		if(G7_link) { 
			var currentLocation = window.location.href;
			if(currentLocation.includes("boeking")) {
				var bookingID = currentLocation.substring(currentLocation.indexOf("vd"), currentLocation.indexOf("/", currentLocation.indexOf("vd")));
				G7_link = "/internal/messages/" + bookingID;
			}
		}
		return G7_link;
	}


})();	
