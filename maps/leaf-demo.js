// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/

	var map = L.map( 'map', {
	  center: [20.0, 5.0],
	  minZoom: 2,
	  zoom: 2
	})

	streetmap = L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	  subdomains: ['a', 'b', 'c']
	});

	map.addLayer(streetmap);
	var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' )

	var myIcon = L.icon({
	  iconUrl: myURL + 'images/pin24.png',
	  iconRetinaUrl: myURL + 'images/pin48.png',
	  iconSize: [29, 24],
	  iconAnchor: [9, 21],
	  popupAnchor: [0, -14]
	})

	markersObjs = [markers_sur_america, markers_norte_america, markers_europa, markers_africa, markers_asia]
	var lyrs = [];
	markersObjs.forEach(function(mrkrs){
		var markersArray = [];
		for ( var i=0; i < mrkrs.length; ++i )
		{
		  marker = L.marker( [mrkrs[i].lat, mrkrs[i].lng], {icon: myIcon} )
		   .bindPopup( '<a href="' + mrkrs[i].url + '" target="_blank">' + mrkrs[i].name + '</a>' );
		   markersArray.push(marker);
		}
		lyrGroup = L.layerGroup(markersArray);
		map.addLayer(lyrGroup);
		lyrs.push(lyrGroup);
	});
	
	var baseMaps = {		
		"OpenStreetMap": streetmap
	};

	var overlayMaps = {
		"Sur America": lyrs[0],
		"Norte America": lyrs[1],
		"Europa": lyrs[2],
		"Africa": lyrs[3],
		"Asia": lyrs[4],
	};
	
	L.control.layers(baseMaps, overlayMaps).addTo(map);
	
	
	