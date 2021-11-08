'use strict';

(async function (){

  const getAverageRGB = background => {

    let canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        i = -4,
        rgb = {r:0, g:0, b:0},
        image_path = background.style.backgroundImage.replace(/^url\(\"|\"\)$/g, ''),
        count = 0;

    document.body.insertAdjacentHTML('beforeend', `<img id="background-img" src="${image_path}">`);
    let img_dummy = document.getElementById('background-img');

    const height = canvas.height = img_dummy.height;
    const width = canvas.width = img_dummy.width;

    context.drawImage(img_dummy, 0, 0);
    const data = context.getImageData(0, 0, width, height);
    
    while ( (i += 5 * 4) < data.data.length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
    }

    // ~~ Used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    // Brighten dark colours
    if (rgb.r < 127 || rgb.g < 127 || rgb.b < 127) {

      rgb.r = rgb.r + 30;
      rgb.g = rgb.g + 30;
      rgb.b = rgb.b + 30;

    }

    img_dummy.remove();
    return rgb;

  };


  // Insert temporary colour
  if (localStorage['last-accent'])
    document.styleSheets[0].insertRule(`
      :root {

        --accent-colour: ${localStorage['last-accent']};

      }
    `, 0);

  await new Promise(() => setTimeout(function () {

    // Remove temporary colour
    if (localStorage['last-accent'])
      document.styleSheets[0].deleteRule(0); 
    
    if (automatic_accent === true) {
      let rgb = getAverageRGB(document.getElementById('background'));
      accent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
   }
    else if (!accent || accent === '')
      console.log('[ui.js] "accent" property was not found. Please verify "/data/config.json".');
      
    document.styleSheets[0].insertRule(`
      :root {

        --accent-colour: ${accent};

      }
    `, 0)

    localStorage['last-accent'] = accent;
    
  }, 1000) );

})();
