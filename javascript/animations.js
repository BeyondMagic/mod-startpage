'use strict';

const blur = () => {
  if (document.styleSheets[1].cssRules[0].selectorText !== "#background::after")
    document.styleSheets[1].insertRule(`
      #background::after {
        transition: backdrop-filter ${blur_time} ${blur_effect};
        backdrop-filter: blur(${blur_background}px);
      }
  `, 0);
}

const unblur = () => {
  if (document.activeElement.id !== 'input' &&
      document.styleSheets[1].cssRules[0].selectorText === "#background::after")
    document.styleSheets[1].deleteRule(0);
}


(async function (){

  const containers = document.body.children;
  const form       = document.getElementById('form');
  
  // Start on 1 to ignore background itself
  for (let i = 1; i < containers.length; i++) {

    for (let child of containers[i].children) {

      if (containers[i].id !== 'links-container') {
    
        // Hover on UI
        child.addEventListener('mouseover', () => blur());
        child.addEventListener('mouseleave', () => unblur());

      }
      
    }

    // Focus on input search
    form.addEventListener('focusin', () => blur()); 
    form.addEventListener('focusout', () => unblur());

  }

  await new Promise(() => setTimeout(function () {
    form.children[0].focus();
  }, 100) );
 
})();
