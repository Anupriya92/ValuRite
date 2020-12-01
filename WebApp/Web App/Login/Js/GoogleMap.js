var geocoder;
var map;
var infowindow;
var marker;
/*function initialize(geopos, mapid) {
   // $('#modalloading1').modal('show');
   // if (mapid == "maploc") {
      //  $("#maploc").empty();
   // }
    var latlng;
    var mapOptions;
    //debugger
   /* if (geopos == "" || geopos == latlng) {
        //latlng = new google.maps.LatLng(13.0826802, 80.27071840000008);
        $('#modalloading1').modal('hide');
        mapOptions = {
            zoom: 10,
            center: latlng
        }
        //geocoder = new google.maps.Geocoder();
       // map = new google.maps.Map(document.getElementById(mapid), mapOptions);
        setMarker1(latlng);

    } else {
        latlng = JSON.parse(geopos);
        mapOptions = {
            zoom: 15,
            center: latlng
        }
        geocoder = new google.maps.Geocoder();
        map = new google.maps.Map(document.getElementById(mapid), mapOptions);
        //setMarker1(latlng);
    }*/


    //Adding click event on map
    /*google.maps.event.addListener(map, 'click', function (event) {
        setMapOnAll(null);
        geocoder.geocode({
            'latLng': event.latLng
        }, function (results, status) {
            var mapcountry = "";
            var mapstate = "";
            var mapcity = "";
            var maparea = "";
            var mapstreet = "";
            if (status == google.maps.GeocoderStatus.OK) {
                //alert(JSON.stringify(results[0]))
                if (results[0]) {
                    setMarker1(results[0].geometry.location)
                    //getaddress(results[0].geometry.location)
                    setdropvalues(results[0].address_components)
                }
            }
        });


    });*/
   /* try {
        if (mapid == "map") {
            var types = document.getElementById('divpropertydetails');
            var input = document.getElementById('address');
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(types);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')));
            //autocomplete.addListener('place_changed', fillInAddress);
            autocomplete.bindTo('bounds', map);
            autocomplete.addListener('place_changed', function () {
                infowindow.close();
                //marker.setVisible(false);
                setMapOnAll(null)
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    window.alert("Autocomplete's returned place contains no geometry");
                    return;
                }

                // If the place has a geometry, then present it on a map.
                //alert(place.geometry.viewport)
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);  // Why 17? Because it looks good.
                }

                //Set marker based on geopostion
                setMarker1(place.geometry.location)

                var address = '';
                if (place.address_components) {
                    address = [
                      (place.address_components[0] && place.address_components[0].short_name || ''),
                      (place.address_components[1] && place.address_components[1].short_name || ''),
                      (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                infowindow.open(map, marker);
            });
        }
    }
    catch (ex) {
        console.log(ex + "exception occurred")
    }
    if (mapid == "maploc") {
        google.maps.event.clearListeners(map, 'click');
        setMarkers(City12, streetName, Area, "");
    }
}*/

function setdropvalues(addComp) {
    //alert("123123")

    var addressarr = {
    };

    for (var i in addComp) {
        console.log("\n" + addComp[i].types + ": " + addComp[i].long_name)
        addressarr[addComp[i].types] = addComp[i].long_name;
    }

    if (addressarr.hasOwnProperty("street_number")) {
        $("#txtdoorNo").val(addressarr["street_number"])
    }
    if (addressarr.hasOwnProperty("route")) {
        $("#txtRoadName").val(addressarr["route"]);
    }
    if (addressarr.hasOwnProperty("postal_code")) {
        $("#txtproppin").val(addressarr["postal_code"])
    }

    if (addressarr.hasOwnProperty("premise")) {
        $("#txtpropLM").val(addressarr["premise"])
    }
    //debugger
    //$("#txtproppin").val(addressarr["postal_code"])
    if (addressarr.hasOwnProperty("country,political")) {
        GetState(addressarr["country,political"], 0);
    }
    if (addressarr.hasOwnProperty("administrative_area_level_1,political")) {
        Getcity(addressarr["administrative_area_level_1,political"], 0);
    }
    if (addressarr.hasOwnProperty("administrative_area_level_2,political")) {
        getarea(addressarr["administrative_area_level_2,political"], 0);
    }
    if (addressarr.hasOwnProperty("political,sublocality,sublocality_level_1")) {
        getstreet(addressarr["political,sublocality,sublocality_level_1"], 0);
    }
    setTimeout(function () {
        if ($("#ddlpropcountry option[value='" + addressarr["country,political"] + "']").length) {
            // $("#ddlpropcountry").select2("val", addressarr["country,political"]);
            $("#ddlpropcountry").val(addressarr["country,political"]);
            $("#ddlpropcountry").trigger('change.select2');
        }
        else {
            //resetcustomdrop("ddlpropcountry");
            $("#ddlpropcountry").append("<option value='" + addressarr["country,political"] + "'>" + addressarr["country,political"] + "</option>");
            $("#ddlpropcountry").val(addressarr["country,political"]);
            $("#ddlpropcountry").trigger('change.select2');
            //$("#ddlpropcountry").select2("val", addressarr["country,political"]);
        }
      if ($("#ddlpropstate option[value='" + addressarr["administrative_area_level_1,political"] + "']").length) {
            //resetcustomdrop("ddlpropstate");
            $("#ddlpropstate").val(addressarr["administrative_area_level_1,political"])
            $("#ddlpropstate").trigger('change.select2');
            //$("#ddlpropstate").select2("val", addressarr["administrative_area_level_1,political"]);
        }
        else {
            $("#ddlpropstate").append("<option value='" + addressarr["administrative_area_level_1,political"] + "'>" + addressarr["administrative_area_level_1,political"] + "</option>");
            $("#ddlpropstate").val(addressarr["administrative_area_level_1,political"]);
            $("#ddlpropstate").trigger('change.select2');
        }
        if ($("#ddlpropcity option[value='" + addressarr["administrative_area_level_2,political"] + "']").length) {
            $("#ddlpropcity").val(addressarr["administrative_area_level_2,political"]);
            $("#ddlpropcity").trigger('change.select2');
        }
        else {
            $("#ddlpropcity").append("<option value='" + addressarr["administrative_area_level_2,political"] + "'>" + addressarr["administrative_area_level_2,political"] + "</option>");
            $("#ddlpropcity").trigger('change.select2');
            $("#ddlpropcity").val(addressarr["administrative_area_level_2,political"]);
        }
        if (addressarr.hasOwnProperty("political,sublocality,sublocality_level_1")) {
            if ($("#ddlareaname option[value='" + addressarr["political,sublocality,sublocality_level_1"] + "']").length) {
                $("#ddlareaname").val(addressarr["political,sublocality,sublocality_level_1"]);
                $("#ddlareaname").trigger('change.select2');
            }
            else {
                var areaddl = $("#ddlareaname option:first");
                areaddl.after($("<option />").val(addressarr["political,sublocality,sublocality_level_1"]).text(addressarr["political,sublocality,sublocality_level_1"]));
                $("#ddlareaname").val(addressarr["political,sublocality,sublocality_level_1"]);
                $("#ddlareaname").trigger('change.select2');
            }
        }
        else {
            var a;
            var option = "";
            if (addressarr["political,sublocality,sublocality_level_1"] == a) {
            }
            else {
                option = "<option value='" + addressarr["political,sublocality,sublocality_level_1"] + "'>" + addressarr["political,sublocality,sublocality_level_1"] + "</option>";
            }
            $("#ddlareaname").append(option);
        }
        if (addressarr.hasOwnProperty("political,sublocality,sublocality_level_2")) {
            var streetddl = $("#ddlstreetname option:first");
            if ($("#ddlstreetname option[value='" + addressarr["political,sublocality,sublocality_level_2"] + "']").length) {
                $("#ddlstreetname").val(addressarr["political,sublocality,sublocality_level_2"]);
                $("#ddlstreetname").trigger('change.select2');
            }
            else {
                streetddl.after($("<option />").val(addressarr["political,sublocality,sublocality_level_2"]).text(addressarr["political,sublocality,sublocality_level_2"]));
                $("#ddlstreetname").val(addressarr["political,sublocality,sublocality_level_2"]);
                $("#ddlstreetname").trigger('change.select2');
            }
        }
        //$('#modalloading').modal('hide');

    }, 5000)
   // $('#modalloading').modal('show');



}

/*function setMapOnAll(map) {
    marker.setMap(map);
}*/

function setMarker1(loc) {
    var latlngobj = loc;
    latlngobj = JSON.stringify(latlngobj);
    latitudelong = latlngobj;
    marker = new google.maps.Marker({
        map: map,
        position: loc,
        center: loc,
        draggable: true,
        animation: google.maps.Animation.BOUNCE
    });
    //alert(JSON.stringify(loc))
    infowindow = new google.maps.InfoWindow({
        //content: JSON.stringify(loc)
        content: "Property Location",
        //position: loc,
        //center:loc
    });
    //infowindow.open(map, marker);
    //map.center = loc;
    //map.setZoom(17);      // This will trigger a zoom_changed on the map
    //map.setCenter(loc);
    //marker.addListener('click', function () {
    //    infowindow.open(map, marker);
    //});
    //get marker location on drag
    google.maps.event.addListener(marker, "dragend", function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        myLatLng = new google.maps.LatLng(lat, lng);
        // alert(JSON.stringify(myLatLng))
        latitudelong = JSON.stringify(myLatLng)
        getaddress(myLatLng)
    });
    //}
}


//convert address to latlong 
function codeAddress(addr) {
   // setMapOnAll(null);
    var address = addr
   /* geocoder.geocode({ 'address': address }, function (results, status) {
        //alert(results[0].geometry.location)
        setMarker1(results[0].geometry.location);
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
        infowindow.setContent(address);
    });*/
}

//global Json Object to store Guide Line Values for the matched Records
var guidelinevalsq;
function calme(rer) {
   // alert(rer.d)
    var Jsonob = JSON.parse(rer.d)
    guidelinevalsq = Jsonob;
    //alert(Jsonob.PerSqft.length)
    var loopcount = Jsonob.PerSqft.length;
    for (var i = 0; i < loopcount + 1; i++) {
        //alert(1)
        if (i == loopcount) {
            setTimeout(function () {
                setMarker1(JSON.parse(localStorage.getItem('LatLongitue')))
            }, 1000)
        } else {
            var address = Jsonob.StreetName[i] + ", " + Jsonob.Village[i];
            getlat(address, i);
        }
    }

}

function getlat(address, i) {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            setMarker2(results[0].geometry.location, i)
        } else {
            if (status == "OVER_QUERY_LIMIT") {
                //alert(address);
            }
            else {
                //alert('Geocode was not successful for the following reason: ' + status + "___" + address);
            }
        }
        //infowindow.setContent(address);
    });


}


var marker1 = [];
function setMarker2(loc, m) {
    var latlngobj = loc;
    latlngobj = JSON.stringify(latlngobj);
    latitudelong = latlngobj;
    //alert(marker1.toString())
    marker1[m] = new google.maps.Marker({
        map: map,
        position: loc,
        animation: google.maps.Animation.BOUNCE
    });
    infowindow = new google.maps.InfoWindow({
        //content: guidelinevalsq.PerSqft[m] + " __ " + guidelinevalsq.Village[m] + " __ " + guidelinevalsq.StreetName[m] + " __ " + guidelinevalsq.SROLOC[m]
        content: guidelinevalsq.PerSqft[m]
    });
    infowindow.open(map, marker1[m]);
}

function getaddress(latlong) {
    var latitude = latlong.lat();
    var longitude = latlong.lng();
    geocoder.geocode({ 'latLng': latlong }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                infowindow.setContent(results[1].formatted_address)
            }
        }
    });
}

//Auto complete
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    //debugger
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
