import { pubsub, LocationArray } from './helper-object-creators';

// Get raw weather JSON file
async function getLocationSuggestionsRaw(searchQuery) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=d6c74dbc2e1f43d7b0355502241003&q=${searchQuery}`);
    if (!response.ok) {
      throw new Error(`Code ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('An error occurred: ', error);
  }
}

function getRawWeatherData(locationId) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=d6c74dbc2e1f43d7b0355502241003&q=${locationId}`)
    .then(response => {
      response.json()
        .then(json => {
          if (!response.ok) {
            throw new Error(`Code ${json.error.code}: ${json.error.message}`);
          }
          console.log(json);
          return json;
        }).catch(error => {
          console.error('An error occurred while parsing the file: ', error);
        })
    }).catch(error => {
      console.error('An error occurred: ', error);
    })
}

export { getLocationSuggestionsRaw, getRawWeatherData };


