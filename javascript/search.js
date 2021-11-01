'use strict';

let actual_query = 0,
    queries_max;

const set_engine = (name, engine) => {

  let [form, input, label] = [
    document.getElementById('form'),
    document.getElementById('input'),
    document.getElementById('input-label')
  ];
  
  label.textContent = `Search on ${name.charAt(0).toUpperCase() + name.slice(1)}`;
  form.setAttribute('action', engine[0]);
  input.setAttribute('name', engine[1]);
  
};

const load_engines = () => {

  const searches_names = Object.keys(searches);
  let name;

  if (actual_query === searches_names.length) actual_query = 0;

  if (localStorage['last-engine'] !== undefined)
    name = localStorage['last-engine']
  else
    name = searches_names[actual_query++];

  set_engine(name, searches[name]);

  console.log(`[config.js => searches.js] searches (${name}) has loaded.`);

};

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.code === 'ArrowUp') load_engines();
});
