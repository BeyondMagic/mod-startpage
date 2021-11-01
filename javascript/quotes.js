'use strict';

fetch("./data/quotes.json")
.then(response => response.json())
.then(json => {

  const loadDate = () => {
    const date = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleString('en-gb', options);
  }

  // Load a different quote everyday
  if (loadDate() !== localStorage['time-old-quote']) {

    const quote = json[json.length * Math.random() | 0];
    localStorage['time-old-quote'] = loadDate(); // old quote to verify in next load page

    localStorage['old-quote'] = quote[0];
    localStorage['old-author'] = quote[1];
    localStorage['old-source'] = quote[2];

    console.log('[quotes.js] New quote loaded! New day! New you!')

  }
  else
    console.log('[quotes.js] No quotes loaded! Have a good day! You got this!');

  // Quote to BODY
  document.getElementById('quote').innerHTML = localStorage['old-quote'];

  // Author to BODY ( if there is )
  if (localStorage['old-author'] !== 'undefined')
    document.getElementById('author').innerHTML = localStorage['old-author']
  else
    document.getElementById('author').remove();

  // Source to BODY ( if there is )
  if (localStorage['old-source'] !== 'undefined') 
    document.getElementById('source').innerHTML = localStorage['old-source']
  else
    document.getElementById('source').remove();

});
