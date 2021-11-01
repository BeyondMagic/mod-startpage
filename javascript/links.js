'use strict';

fetch("./data/links.json")
.then(response => response.json())
.then(json => {

  console.log('[links.json] links.json has loaded.');
  

  
  const names = Object.keys(json);
  const link = document.getElementById('links');
  const container = document.getElementById('links-container');


  // Link hovering for more information
  const hover_link = (label, ms) => {
    window.clearTimeout(label.timeout);
    label.timeout = window.setTimeout(() => {
      label.classList.add('show-label');
    }, ms);
  }
  
  const unhover_link = label => {
    window.clearTimeout(label.timeout);
    label.timeout = window.setTimeout(() => {
      label.classList.remove('show-label');  
    }, 500);   
  };

  
  
  names.forEach(group => {

    link.insertAdjacentHTML( 'beforeend',
      `<div id="${group}" class="dark">
         <div class="group-label">${group}</div>
         <section></section>
        </div>` );
    const links = json[group];

    for (let i = 0; i < links.length; i++) {

      const link_box = links[i];

      const box = document.getElementById(group).children[1];
      box.addEventListener('mouseover', () => blur());
      box.addEventListener('mouseleave', () => unblur());
      
      box.insertAdjacentHTML( 'beforeend', `
        <a href="${link_box[1]}">${link_box[0]}</a>
        <span>${link_box[2]}</span>`);

      const l_child   = box.children[i*2],
            l_sibling = l_child.nextElementSibling;

      l_child.addEventListener('mouseover',
        () => hover_link(l_sibling, 750));
      l_child.addEventListener('mouseleave',
        () => unhover_link(l_sibling));

      l_sibling.addEventListener('mouseover',
        () => hover_link(l_sibling, 0));
      l_sibling.addEventListener('mouseleave',
        () => unhover_link(l_sibling));


    };
  });


  
  // Overflow horizontal wheel
  const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  }

  container.addEventListener('wheel', evt => {

    let overflownElement;
    
    switch (evt.target.nodeName) {

      case 'A':
      case 'SPAN':
        overflownElement = evt.target.parentElement;
        break;
      case 'SECTION':
        overflownElement = evt.target;
        break;
      case 'DIV':
        if (evt.target.classList[0] === 'dark')
          overflownElement = evt.target.children[0];

    };

    if ( !overflownElement || !isOverflown(overflownElement) )
      container.scrollLeft += evt.deltaY;
  });
  
});
