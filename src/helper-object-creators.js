const pubsub = {
    events: {},
    subscribe: function(event, callback) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    },

    publish: function(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => {
            callback(data);
        })
    },
}

// To get object based on specific JSON from Search API - weatherapi.com. High level is fillSuggestionsDiv(). Low level is the structure of the json file fetched from Search API. LocationSuggestionData is the abstraction.
class LocationAbstraction {
    constructor(locationItem) {
      // Initialize properties as arrays
      this.id = locationItem.id;
      this.name = locationItem.name;
      this.region = locationItem.region;
      this.country = locationItem.country;
    }
}

export { pubsub, LocationAbstraction };