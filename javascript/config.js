'use strict';

// Public global variables

let blur_background,    // Level of blur on the image
    blur_time,        // Time to blur and unblur
    blur_effect,      // Effect of blur transitioning [ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(n,n,n,n)]
    accent,           // Accent of the page
    automatic_accent, // Overrides 'accent' to instead create one from the image
    searches;         // Searches to be used by the input and form

// config.json handling

fetch("./data/config.json")
.then(response => response.json())
.then(json => {

  let where = document.getElementById('location');
  let name = document.getElementById('name');
  
  console.log("[config.js] quotes.json has loaded.");

  if (json.location) {
    where.textContent = json.location;
    console.log("[config.js] location has loaded.");
  }
  else {
    console.log("[config.js] no location was found.");
    where.remove();
  }

  if (json.name) {
    name.textContent = json.name;
    console.log("[config.js] name has loaded.");
  }
  else {
    console.log("[config.js] no name was found.");
    name.remove();
  }

  // Public global variables for other .js files
  blur_background  = json.blur_background;
  blur_time        = json.blur_time;
  blur_effect      = json.blur_effect;
  accent           = json.accent;
  automatic_accent = json.automatic_accent;
  searches         = json.searches;

  // search.js
  load_engines();
  
});
