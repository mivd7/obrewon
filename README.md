## O'Brewon
The app for thirsty beer lovers, which will help you find the closest brewery near you and shows you how to get there. Bottoms up! You can view a live demo of the app [here](https://obrewon.mivd.be/) .

### How to run
1. Clone the repository
2. Install the dependencies with yarn or npm: `npm install` || `yarn install`
3. Run the app: `npm run start` || `yarn start`

### Feature list
 - Find the closest brewery based on zipcode input
 - See location of all breweries on map, highlight the one closest
 - See location of own zipcode input + closest found brewery on a map
 - Know the distance between the input location and the brewery location
 - Automatically set user location based on browser geolocation API (if allowed)
 - Configure own location in a setup wizard at the start of the app
 - Filter breweries based on whether they are open today or not
 - Set my travel method (bike or car)
 - Show a route between my location and closest brewery
 
### Description
This is a map app build with React and [React Leaflet](https://react-leaflet.js.org/), which is an extension of the [LeafletJS](https://leafletjs.com/) interactive map library. It utilizes resources from [OpenStreetMap](https://www.openstreetmap.org/), for displaying the map and [Styled Components](https://styled-components.com/) for styling of the non map elements. 

This app makes use of two external api's:

 - [GeoApify](https://www.geoapify.com/) for finding location coordinates
 - [OpenRouteService](https://openrouteservice.org/) for calculating routes between coordinates

Both these API's have a limited amount of requests per day, attached to an API key. For code demonstration purposes these keys are included in the repository but normally they should be in a gitignored .env file. 

Finally the list of breweries comes from the supplied breweries data file. Because of the limited amount of requests on the GeoApify Api (3000 a day), I added latitude and longitude coordinates to this data for each brewery. These are loaded locally by React in this demo app and then stored in the Redux store, normalle these would probably come from an API with a GET all call.

### Process
I broke the process of making this app into three sprints:
 1. Input zipcode and get correct closest brewery result, show it in a simple popup to the user
	 https://github.com/mivd7/obrewon/pull/2
	 ![v1](https://media.giphy.com/media/NXYWl52yuaWLRTOXwC/source.gif)
 2. Find user location and adjust map to show both the location and the closest brewery
 https://github.com/mivd7/obrewon/pull/4
 ![v2](https://media.giphy.com/media/4WkmXCnEkPpicsorAn/source.gif)
 3.  Calculate a route based on user location or search input and show it. Make a wizard that configures it. This is the final version of the app
 [obrewon.mivd.be](https://obrewon.mivd.be)

### Further Development
Because the challenge was to make this in one week, there's obviously still features that could be added if there was more time. Some features that I would make if I had more time:

 - The app could be made more mobile-friendly, or even turned into a full native mobile app.
 - Track your GPS location changes as you move about to track your route. 
 - Show more details about the breweries such as website, image of the brewery etc. (which weren't included in the original breweries data file)
 - Have a backend that stores data about the user so it remembers when you revisit the app
 - After finding a route, be able to share a link which loads the app and shows the route
 - Add unit tests and end-to-end tests to ensure performance of the app