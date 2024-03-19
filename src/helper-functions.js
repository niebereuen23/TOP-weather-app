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
  })
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
    setTimeout(() => { // This gives time for the 'click' listener of the suggestion button, otherwise while hidden it won't be triggered.
      itemListNode.style = 'visibility: hidden';
    }, 250);
  })
}

export { fillSuggestionsForm, clearSuggestions, addVisibilityToggle };