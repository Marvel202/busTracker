     //get token at https://account.mapbox.com
     mapboxgl.accessToken = 'pk.eyJ1IjoibWFydmVsMjAyIiwiYSI6ImNsMngybnFhdjBsaWMzaWxncDVqenFzdnIifQ.SW84Wi1C48DE9FDLaUiwjA'


     var map = new mapboxgl.Map({
         container: 'map',
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [-71.12946164, 42.36076542],
         zoom: 12
     })

     var marker = new mapboxgl.Marker()
         .setLngLat([-71.1000671, 42.33253216])
         .addTo(map);
     const busStops = [
         [-71.12946164, 42.36076542],
         [-71.08623634, 42.32964538],
         [-71.1000671, 42.33253216],
         [-71.12389568, 42.368193529],
         [-71.11911682, 42.33444458],
         [-71.12305071, 42.343261129],
         [-71.1185238, 42.37487795]

     ]

     var counter = 0;
     function move() {
         setTimeout(() => {
             if (counter >= busStops.length) return;
             marker.setLngLat(busStops[counter]);
             counter++;
             move();
         }, 1000)
     }

     async function run() {
         const locations = await getBusLocations();
         console.log(new Date());
         console.log(locations);

         // timer
         setTimeout(run, 15000);
     }

     async function getBusLocations() {
         const url = 'https://api-v3.mbta.com/vehicles?filter[route]=66&include=trip'
         const response = await fetch(url);
         const json = await response.json();
         return json.data;
     }


     run()