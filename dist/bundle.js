/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fetch-api.js":
/*!**************************!*\
  !*** ./src/fetch-api.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLocationSuggestionsRaw: () => (/* binding */ getLocationSuggestionsRaw),
/* harmony export */   getRawWeatherData: () => (/* binding */ getRawWeatherData)
/* harmony export */ });
/* harmony import */ var _helper_object_creators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper-object-creators */ "./src/helper-object-creators.js");


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
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=d6c74dbc2e1f43d7b0355502241003&q=${locationId}`).then(response => {
    response.json().then(json => {
      if (!response.ok) {
        throw new Error(`Code ${json.error.code}: ${json.error.message}`);
      }
      console.log(json);
      return json;
    }).catch(error => {
      console.error('An error occurred while parsing the file: ', error);
    });
  }).catch(error => {
    console.error('An error occurred: ', error);
  });
}


/***/ }),

/***/ "./src/helper-functions.js":
/*!*********************************!*\
  !*** ./src/helper-functions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addVisibilityToggle: () => (/* binding */ addVisibilityToggle),
/* harmony export */   clearSuggestions: () => (/* binding */ clearSuggestions),
/* harmony export */   fillSuggestionsForm: () => (/* binding */ fillSuggestionsForm)
/* harmony export */ });
const searchSuggestionsList = document.querySelector('#search-suggestions');
function fillSuggestionsForm(locationArray) {
  clearSuggestions();
  if (locationArray.length === 0) {
    return;
  }
  locationArray.map(element => {
    const suggestionItem = document.createElement('button');
    suggestionItem.setAttribute('type', 'button');
    suggestionItem.textContent = `${element.name}, ${element.region}, ${element.country}`;
    suggestionItem.addEventListener('click', e => {
      console.log(element);
      pubsub.publish('getWeatherData', element.id); // TODO: Subscribe functions
    });
    searchSuggestionsList.appendChild(suggestionItem);
  });
}
function clearSuggestions() {
  searchSuggestionsList.textContent = '';
}

// Reusable function. Takes inputNode e.g. a search field and itemListNode e.g. the container div for the suggestions we want to display/hide based on search field focus state
function addVisibilityToggle(inputNode, itemListNode) {
  inputNode.addEventListener('focus', () => {
    itemListNode.style = 'visibility: visible';
  });
  inputNode.addEventListener('blur', () => {
    setTimeout(() => {
      // This gives time for the 'click' listener of the suggestion button, otherwise while hidden it won't be triggered.
      itemListNode.style = 'visibility: hidden';
    }, 250);
  });
}


/***/ }),

/***/ "./src/helper-object-creators.js":
/*!***************************************!*\
  !*** ./src/helper-object-creators.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocationAbstraction: () => (/* binding */ LocationAbstraction),
/* harmony export */   pubsub: () => (/* binding */ pubsub)
/* harmony export */ });
const pubsub = {
  events: {},
  subscribe: function (event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  },
  publish: function (event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => {
      callback(data);
    });
  }
};

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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch-api */ "./src/fetch-api.js");
/* harmony import */ var _helper_object_creators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper-object-creators */ "./src/helper-object-creators.js");
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper-functions */ "./src/helper-functions.js");




// HTML selectors
const searchInput = document.querySelector('#search-input');
const suggestionsForm = document.querySelector('#search-form');
const suggestionList = document.querySelector('#search-suggestions');

// Enabling Event listeners

(0,_helper_functions__WEBPACK_IMPORTED_MODULE_2__.addVisibilityToggle)(searchInput, suggestionList);

// On 'input' event to trigger location suggestions
searchInput.addEventListener('input', async () => {
  let query = searchInput.value;
  if (query.length < 3) {
    // No API called for less than 3 character searches
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_2__.clearSuggestions)();
    return;
  }
  try {
    let locationSuggestionsParsed = await (0,_fetch_api__WEBPACK_IMPORTED_MODULE_0__.getLocationSuggestionsRaw)(query);
    console.log(locationSuggestionsParsed);
    const locations = [];
    locationSuggestionsParsed.map(element => {
      locations.push(new _helper_object_creators__WEBPACK_IMPORTED_MODULE_1__.LocationAbstraction(element));
    });
    console.log(locations);
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_2__.fillSuggestionsForm)(locations);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
});

// On 'enter' event to trigger search directly
suggestionsForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log('pepe');
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFDO0lBQ3RDLE1BQU1DLFNBQVMsR0FBRyxFQUFFO0lBQ3BCRCx5QkFBeUIsQ0FBQ2xDLEdBQUcsQ0FBQ0MsT0FBTyxJQUFJO01BQ3ZDa0MsU0FBUyxDQUFDWixJQUFJLENBQUMsSUFBSUcsd0VBQW1CLENBQUN6QixPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUM7SUFDRmhCLE9BQU8sQ0FBQ00sR0FBRyxDQUFDNEMsU0FBUyxDQUFDO0lBQ3RCdkMsc0VBQW1CLENBQUN1QyxTQUFTLENBQUM7RUFDaEMsQ0FBQyxDQUNELE9BQU9uRCxLQUFLLEVBQUU7SUFDWkMsT0FBTyxDQUFDRCxLQUFLLENBQUMsNkJBQTZCLEVBQUVBLEtBQUssQ0FBQztFQUNyRDtBQUNGLENBQUMsQ0FBQzs7QUFFRjtBQUNBOEMsZUFBZSxDQUFDckIsZ0JBQWdCLENBQUMsUUFBUSxFQUFFQyxDQUFDLElBQUk7RUFDOUNBLENBQUMsQ0FBQzBCLGNBQWMsQ0FBQyxDQUFDO0VBQ2xCbkQsT0FBTyxDQUFDTSxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRlbXBsYXRlLy4vc3JjL2ZldGNoLWFwaS5qcyIsIndlYnBhY2s6Ly90b3AtdGVtcGxhdGUvLi9zcmMvaGVscGVyLWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b3AtdGVtcGxhdGUvLi9zcmMvaGVscGVyLW9iamVjdC1jcmVhdG9ycy5qcyIsIndlYnBhY2s6Ly90b3AtdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHVic3ViLCBMb2NhdGlvbkFycmF5IH0gZnJvbSAnLi9oZWxwZXItb2JqZWN0LWNyZWF0b3JzJztcblxuLy8gR2V0IHJhdyB3ZWF0aGVyIEpTT04gZmlsZVxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25TdWdnZXN0aW9uc1JhdyhzZWFyY2hRdWVyeSkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL3NlYXJjaC5qc29uP2tleT1kNmM3NGRiYzJlMWY0M2Q3YjAzNTU1MDIyNDEwMDMmcT0ke3NlYXJjaFF1ZXJ5fWApO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZSAke3Jlc3BvbnNlLnN0YXR1c306ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkOiAnLCBlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmF3V2VhdGhlckRhdGEobG9jYXRpb25JZCkge1xuICBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9ZDZjNzRkYmMyZTFmNDNkN2IwMzU1NTAyMjQxMDAzJnE9JHtsb2NhdGlvbklkfWApXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2UuanNvbigpXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZSAke2pzb24uZXJyb3IuY29kZX06ICR7anNvbi5lcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcbiAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHBhcnNpbmcgdGhlIGZpbGU6ICcsIGVycm9yKTtcbiAgICAgICAgfSlcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZDogJywgZXJyb3IpO1xuICAgIH0pXG59XG5cbmV4cG9ydCB7IGdldExvY2F0aW9uU3VnZ2VzdGlvbnNSYXcsIGdldFJhd1dlYXRoZXJEYXRhIH07XG5cblxuIiwiY29uc3Qgc2VhcmNoU3VnZ2VzdGlvbnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1zdWdnZXN0aW9ucycpO1xuXG5mdW5jdGlvbiBmaWxsU3VnZ2VzdGlvbnNGb3JtKGxvY2F0aW9uQXJyYXkpIHtcbiAgY2xlYXJTdWdnZXN0aW9ucygpO1xuICBcbiAgaWYgKGxvY2F0aW9uQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxvY2F0aW9uQXJyYXkubWFwKGVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IHN1Z2dlc3Rpb25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3VnZ2VzdGlvbkl0ZW0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIHN1Z2dlc3Rpb25JdGVtLnRleHRDb250ZW50ID0gYCR7ZWxlbWVudC5uYW1lfSwgJHtlbGVtZW50LnJlZ2lvbn0sICR7ZWxlbWVudC5jb3VudHJ5fWA7XG4gICAgc3VnZ2VzdGlvbkl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ2dldFdlYXRoZXJEYXRhJywgZWxlbWVudC5pZCk7IC8vIFRPRE86IFN1YnNjcmliZSBmdW5jdGlvbnNcbiAgICAgIFxuICAgIH0pO1xuICAgIHNlYXJjaFN1Z2dlc3Rpb25zTGlzdC5hcHBlbmRDaGlsZChzdWdnZXN0aW9uSXRlbSk7XG4gIH0pXG59XG5cblxuZnVuY3Rpb24gY2xlYXJTdWdnZXN0aW9ucygpIHtcbiAgc2VhcmNoU3VnZ2VzdGlvbnNMaXN0LnRleHRDb250ZW50ID0gJyc7XG59XG5cblxuLy8gUmV1c2FibGUgZnVuY3Rpb24uIFRha2VzIGlucHV0Tm9kZSBlLmcuIGEgc2VhcmNoIGZpZWxkIGFuZCBpdGVtTGlzdE5vZGUgZS5nLiB0aGUgY29udGFpbmVyIGRpdiBmb3IgdGhlIHN1Z2dlc3Rpb25zIHdlIHdhbnQgdG8gZGlzcGxheS9oaWRlIGJhc2VkIG9uIHNlYXJjaCBmaWVsZCBmb2N1cyBzdGF0ZVxuZnVuY3Rpb24gYWRkVmlzaWJpbGl0eVRvZ2dsZShpbnB1dE5vZGUsIGl0ZW1MaXN0Tm9kZSkge1xuICBpbnB1dE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XG4gICAgaXRlbUxpc3ROb2RlLnN0eWxlID0gJ3Zpc2liaWxpdHk6IHZpc2libGUnO1xuICB9KTtcbiAgaW5wdXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIFRoaXMgZ2l2ZXMgdGltZSBmb3IgdGhlICdjbGljaycgbGlzdGVuZXIgb2YgdGhlIHN1Z2dlc3Rpb24gYnV0dG9uLCBvdGhlcndpc2Ugd2hpbGUgaGlkZGVuIGl0IHdvbid0IGJlIHRyaWdnZXJlZC5cbiAgICAgIGl0ZW1MaXN0Tm9kZS5zdHlsZSA9ICd2aXNpYmlsaXR5OiBoaWRkZW4nO1xuICAgIH0sIDI1MCk7XG4gIH0pXG59XG5cbmV4cG9ydCB7IGZpbGxTdWdnZXN0aW9uc0Zvcm0sIGNsZWFyU3VnZ2VzdGlvbnMsIGFkZFZpc2liaWxpdHlUb2dnbGUgfTsiLCJjb25zdCBwdWJzdWIgPSB7XG4gICAgZXZlbnRzOiB7fSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSB0aGlzLmV2ZW50c1tldmVudF0gfHwgW107XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudF0pIHJldHVybjtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgfSxcbn1cblxuLy8gVG8gZ2V0IG9iamVjdCBiYXNlZCBvbiBzcGVjaWZpYyBKU09OIGZyb20gU2VhcmNoIEFQSSAtIHdlYXRoZXJhcGkuY29tLiBIaWdoIGxldmVsIGlzIGZpbGxTdWdnZXN0aW9uc0RpdigpLiBMb3cgbGV2ZWwgaXMgdGhlIHN0cnVjdHVyZSBvZiB0aGUganNvbiBmaWxlIGZldGNoZWQgZnJvbSBTZWFyY2ggQVBJLiBMb2NhdGlvblN1Z2dlc3Rpb25EYXRhIGlzIHRoZSBhYnN0cmFjdGlvbi5cbmNsYXNzIExvY2F0aW9uQWJzdHJhY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uSXRlbSkge1xuICAgICAgLy8gSW5pdGlhbGl6ZSBwcm9wZXJ0aWVzIGFzIGFycmF5c1xuICAgICAgdGhpcy5pZCA9IGxvY2F0aW9uSXRlbS5pZDtcbiAgICAgIHRoaXMubmFtZSA9IGxvY2F0aW9uSXRlbS5uYW1lO1xuICAgICAgdGhpcy5yZWdpb24gPSBsb2NhdGlvbkl0ZW0ucmVnaW9uO1xuICAgICAgdGhpcy5jb3VudHJ5ID0gbG9jYXRpb25JdGVtLmNvdW50cnk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBwdWJzdWIsIExvY2F0aW9uQWJzdHJhY3Rpb24gfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdldExvY2F0aW9uU3VnZ2VzdGlvbnNSYXcsIGdldFJhd1dlYXRoZXJEYXRhIH0gZnJvbSAnLi9mZXRjaC1hcGknO1xuaW1wb3J0IHsgcHVic3ViLCBMb2NhdGlvbkFic3RyYWN0aW9uIH0gZnJvbSAnLi9oZWxwZXItb2JqZWN0LWNyZWF0b3JzJztcbmltcG9ydCB7IGZpbGxTdWdnZXN0aW9uc0Zvcm0sIGNsZWFyU3VnZ2VzdGlvbnMsIGFkZFZpc2liaWxpdHlUb2dnbGUgfSBmcm9tICcuL2hlbHBlci1mdW5jdGlvbnMnO1xuXG4vLyBIVE1MIHNlbGVjdG9yc1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWlucHV0Jyk7XG5jb25zdCBzdWdnZXN0aW9uc0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWZvcm0nKTtcbmNvbnN0IHN1Z2dlc3Rpb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1zdWdnZXN0aW9ucycpXG5cbi8vIEVuYWJsaW5nIEV2ZW50IGxpc3RlbmVyc1xuXG5hZGRWaXNpYmlsaXR5VG9nZ2xlKHNlYXJjaElucHV0LCBzdWdnZXN0aW9uTGlzdCk7XG5cbi8vIE9uICdpbnB1dCcgZXZlbnQgdG8gdHJpZ2dlciBsb2NhdGlvbiBzdWdnZXN0aW9uc1xuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBhc3luYyAoKSA9PiB7XG4gIGxldCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICBpZiAocXVlcnkubGVuZ3RoIDwgMykgeyAvLyBObyBBUEkgY2FsbGVkIGZvciBsZXNzIHRoYW4gMyBjaGFyYWN0ZXIgc2VhcmNoZXNcbiAgICBjbGVhclN1Z2dlc3Rpb25zKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgbGV0IGxvY2F0aW9uU3VnZ2VzdGlvbnNQYXJzZWQgPSBhd2FpdCBnZXRMb2NhdGlvblN1Z2dlc3Rpb25zUmF3KHF1ZXJ5KTtcbiAgICBjb25zb2xlLmxvZyhsb2NhdGlvblN1Z2dlc3Rpb25zUGFyc2VkKTtcbiAgICBjb25zdCBsb2NhdGlvbnMgPSBbXTtcbiAgICBsb2NhdGlvblN1Z2dlc3Rpb25zUGFyc2VkLm1hcChlbGVtZW50ID0+IHtcbiAgICAgIGxvY2F0aW9ucy5wdXNoKG5ldyBMb2NhdGlvbkFic3RyYWN0aW9uKGVsZW1lbnQpKTtcbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKGxvY2F0aW9ucyk7XG4gICAgZmlsbFN1Z2dlc3Rpb25zRm9ybShsb2NhdGlvbnMpO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBzdWdnZXN0aW9uczpcIiwgZXJyb3IpO1xuICB9XG59KVxuXG4vLyBPbiAnZW50ZXInIGV2ZW50IHRvIHRyaWdnZXIgc2VhcmNoIGRpcmVjdGx5XG5zdWdnZXN0aW9uc0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc29sZS5sb2coJ3BlcGUnKTtcbn0pIl0sIm5hbWVzIjpbInB1YnN1YiIsIkxvY2F0aW9uQXJyYXkiLCJnZXRMb2NhdGlvblN1Z2dlc3Rpb25zUmF3Iiwic2VhcmNoUXVlcnkiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwiZ2V0UmF3V2VhdGhlckRhdGEiLCJsb2NhdGlvbklkIiwidGhlbiIsImNvZGUiLCJtZXNzYWdlIiwibG9nIiwiY2F0Y2giLCJzZWFyY2hTdWdnZXN0aW9uc0xpc3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJmaWxsU3VnZ2VzdGlvbnNGb3JtIiwibG9jYXRpb25BcnJheSIsImNsZWFyU3VnZ2VzdGlvbnMiLCJsZW5ndGgiLCJtYXAiLCJlbGVtZW50Iiwic3VnZ2VzdGlvbkl0ZW0iLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJuYW1lIiwicmVnaW9uIiwiY291bnRyeSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHVibGlzaCIsImlkIiwiYXBwZW5kQ2hpbGQiLCJhZGRWaXNpYmlsaXR5VG9nZ2xlIiwiaW5wdXROb2RlIiwiaXRlbUxpc3ROb2RlIiwic3R5bGUiLCJzZXRUaW1lb3V0IiwiZXZlbnRzIiwic3Vic2NyaWJlIiwiZXZlbnQiLCJjYWxsYmFjayIsInB1c2giLCJkYXRhIiwiZm9yRWFjaCIsIkxvY2F0aW9uQWJzdHJhY3Rpb24iLCJjb25zdHJ1Y3RvciIsImxvY2F0aW9uSXRlbSIsInNlYXJjaElucHV0Iiwic3VnZ2VzdGlvbnNGb3JtIiwic3VnZ2VzdGlvbkxpc3QiLCJxdWVyeSIsInZhbHVlIiwibG9jYXRpb25TdWdnZXN0aW9uc1BhcnNlZCIsImxvY2F0aW9ucyIsInByZXZlbnREZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==