
//giving directions.js, add to fuctions folder

const axios = require('axios');
const striptags = require('striptags');
let direction_List = [];

// Takes direction request and returns google directions API list of directions
// Format: direction [walk | drive] from [source] to [destination]
module.exports = (body = "", callback) => {
    let res = '';
    let origin_addr = encodeURIComponent(body.substring(body.indexOf("from") + 5, body.lastIndexOf(" to ")).trim());
    let destination_addr = encodeURIComponent(body.substring(body.lastIndexOf(" to ") + 4, body.length).trim());
    let tranportation_mode = 'driving';
    let transport_mode = body.split(" ")[1];

    if(transport_mode == ("walk") || transport_mode == ("walking")){
        tranportation_mode = 'walking';
    } else if(transport_mode == ("bike") || transport_mode == ("biking")){
        tranportation_mode = 'bicycling';
    } else if(transport_mode == ("transit") || transport_mode == ("bus")){
        tranportation_mode = 'transit';
    } else{
        tranportation_mode = 'driving';
    }

    axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.HERE_APP_ID}&app_code=${process.env.HERE_APP_CODE}&searchtext=${origin_addr}&gen=9`)
    .then(function(responseFrom) {
    	
    	console.log(responseFrom.data.Response.View[0].Result[0].Location);
    	fromGeoLatitude = responseFrom.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude
    	fromGeoLongitude = responseFrom.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude

    	console.log(fromGeoLongitude, fromGeoLatitude);

    	axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.HERE_APP_ID}&app_code=${process.env.HERE_APP_CODE}&searchtext=${destination_addr}&gen=9`)
	    .then(function(responseTo) {

	    	// console.log(responseTo.data.Response.View[0].Result[0]);
	    	toGeoLatitude = responseTo.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude
    		toGeoLongitude = responseTo.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude

    		console.log(toGeoLongitude, toGeoLatitude);
	    	
	    	axios.get(`https://route.api.here.com/routing/7.2/calculateroute.json?app_id=${process.env.HERE_APP_ID}&app_code=${process.env.HERE_APP_CODE}&waypoint0=geo!${fromGeoLongitude},${fromGeoLatitude}&waypoint1=geo!${toGeoLongitude},${toGeoLatitude}&mode=fastest;car;traffic:disabled`)
		   	.then(function(response) {
		   		// console.log(response.data.response.route[0].leg[0]);
		   		callback(null, response.data.response.route[0]);

		   	}).catch(function (error) {
		   		console.log(error);
		   		callback(error);
		   	});

	    }).catch(function(error) {
	    	console.log(error);
	    	callback(error);
	    });

    }).catch(function(error) {
    	console.log(error);
    	callback(error);
    });
};

  //   axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin_addr}&destination=${destination_addr}&mode=${tranportation_mode}&key=${process.env.MAPS_API_KEY}`)
  //   .then(function (response) {
  //       //Parse Directions
        
  //       // time = JSON.stringify(response.data.routes[0].legs[0]);
  //       // var stringify = JSON.parse(time);
		// // for (var i = 0; i < stringify.length; i++) {
  //   		// console.log(stringify[i]['duration']['text']);
		// // }

  //       // console.log(response.data.routes[0].legs)
  //       // response.data.routes[0].legs.forEach(element => {
  //       	// time += element.duration.value;
  //           // let curr_step = element.html_instructions +" ("+ element.distance.text+")";
  //           // let regex = /(&nbsp;|<([^>]+)>)/ig;
  //           // direction_List.push(striptags(curr_step,["div"]).replace(regex, " "));
  //           // res = direction_List.join('\n\n');
  //        // });
  //       console.log(response.data.routes[0].legs[0].duration.text);
  //       res = response.data.routes[0].legs[0].duration.text;
  //   }).then(() =>{
  //       // let trans_mode = tranportation_mode + " directions ";
  //       // if(res.length > 1500){
  //       //     callback(null, trans_mode + "limited to 1500 chars...\n" + res.substr(0,1500) + "\n.....");
  //       // }else{
  //           callback(null, res);
  //       // }
  //   })
  //   .catch(function (error) {
  //       console.log(error);
  //       callback(err);
  //   });
