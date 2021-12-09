// NOTE: 
//  Functions and Methods are named capitalized without symbols, such as 'repeatIntegers'.
//  Variables are used with 'const' and 'let' and are named lowcase, such as 'blur_level'.
//
// MAINTAINER: (s)
//  João F. BeyondMagic <koetemagie@gmail.com>
//
// Unlicense 🄯 2021 : https://github.com/BeyondMagic/mod-startpage

// IIFE to avoid globals
window.addEventListener('DOMContentLoaded', async () => {

  // To get all the current configuration we need to apply certain settings.
  fetch('./data/config.json')
  .then(response => response.json())
  .then(json => {

    class Engines {

      constructor (current_engine = localStorage['engine']) {

        this._form           = document.getElementById('form')
        this._input          = document.getElementById('input')
        this._label          = document.getElementById('input-label')
        this._current_engine = parseInt(current_engine)

      }

      initial () {

        // To verify if it is a number or is defined.
        if ( !Number.isInteger(this._current_engine) ) this._current_engine = 0;

        this.set()

        // To change engine when we press CTRL + Up
        this._input.addEventListener( 'keydown', e => {

          if (e.ctrlKey && e.code === 'ArrowUp') this.set( json.searches[this._current_engine++] )

          if (e.ctrlKey && e.code === 'ArrowDown') this.set( json.searches[this._current_engine--] )

        });

      }

      set (engine = []) {

        // To reset to 0 if it goes overt the length of engines available.
        if ( this._current_engine >= json.searches.length ) this._current_engine = 0;
        // To reset to 0 if it goes below the length of engines available.
        if ( this._current_engine < 0 ) this._current_engine = json.searches.length - 1;

        engine                 = json.searches[this._current_engine]
        localStorage['engine'] = this._current_engine

        const name       = engine[0],
              search     = engine[1],
              parameters = engine[2]

        this._label.textContent = `Search on ${name.charAt(0).toUpperCase() + name.slice(1)}`
        this._form.setAttribute('action', search)
        this._input.setAttribute('name', parameters)

      }

    }

    class Blur {

      constructor (level = 5, effect, delay) {

        this._style_sheet = document.styleSheets[1]
        this._blur_level  = level
        this._blur_effect = effect
        this._blur_delay  = delay

      }

      initial( _containers = document.body.children,
               _search_bar = document.getElementById('form'),
               _background = document.getElementById('background') ) {

        // Start on 1 to ignore background itself.
        for (let i = 1; i < _containers.length; i++) {

          for (let child of _containers[i].children) {

            if (_containers[i].id !== 'links-container') {
          
              // To blur when we hover things.
              child.addEventListener('mouseover', () => this.blur() );
              child.addEventListener('mouseleave', () => this.unblur() );

            }
            
          }

        }

        _search_bar.addEventListener('focusin', () => this.blur()); 
        _search_bar.addEventListener('focusout', () => this.unblur());

      }

      blur () {

        if ( this._style_sheet.cssRules[0].selectorText !== '#background::after' ) {

          this._style_sheet.insertRule(`
            #background::after {
              transition: backdrop-filter ${this._blur_time} ${this._blur_effect};
              backdrop-filter: blur(${this._blur_level}px);
              pointer: cursor;
            }
          `, 0);

        }

      }

      unblur () {

        if ( document.activeElement.id                  !== 'input' &&
             this._style_sheet.cssRules[0].selectorText === '#background::after' ) {

          this._style_sheet.deleteRule(0);

        }

      }

    }

    class Links {

      constructor () {

        this._container   = document.getElementById('links')
        this._parent      = document.getElementById('links-container')
        this._hover_delay = 500 // miliseconds

      }

      initial () {

        fetch("./data/links.json")
        .then(response => response.json())
        .then( links => {

          Object.keys(links).forEach( group => {

            this._container.insertAdjacentHTML( 'beforeend',
              `<div id="${group}" class="dark">
                 <div class="group-label">${group}</div>
                 <section id="links-${group}"></section>
               </div>` )

            for (let i = 0; i < links[group].length; i++) {

              const box = document.getElementById(`links-${group}`);
              
              box.addEventListener('mouseover', () => blurMethod.blur());
              box.addEventListener('mouseleave', () => blurMethod.unblur());
              
              box.insertAdjacentHTML( 'beforeend', `
                <a href="${links[group][i][1]}">${links[group][i][0]}</a>
                <span>${links[group][i][2]}</span>`);

              const link_child   = box.children[i*2],         // To only select the link elements.
                    link_sibling = link_child.nextElementSibling // Select label of the link.

              link_child.addEventListener( 'mouseover', () => this.hover( link_sibling, 750 ) );
              link_child.addEventListener( 'mouseleave', () => this.unhover( link_sibling ) );

              link_sibling.addEventListener( 'mouseover', () => this.hover(link_sibling) );
              link_sibling.addEventListener( 'mouseleave', () => this.unhover(link_sibling) );


            }
          })
 

        })

      }

      hover (label, ms = 0) {

        window.clearTimeout( label.timeout )
        label.timeout = window.setTimeout( () => label.classList.add('show-label'), ms)

      }

      unhover (label) {

        window.clearTimeout( label.timeout )
        label.timeout = window.setTimeout( () => label.classList.remove('show-label'), this._hover_delay)

      }

      overflow () {

        const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => scrollHeight > clientHeight || scrollWidth > clientWidth;

        // Overflow horizontal wheel.
        // HACK: a better way to find the parent element to scroll horizontal.
        this._parent.addEventListener('wheel', (evt, overflownElement) => {

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

          if ( !overflownElement || !isOverflown(overflownElement) ) this._parent.scrollLeft += evt.deltaY;

        });

      }

    }

    class Time {

      constructor () {

        this._separator = '<span class="dots">:</span>'
        this._container = document.getElementById('time')

      }

      format (i) {

        if (i < 10) i = '0' + i;
        return i;

      }

      async update (date = new Date()) {

        const [hour, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()].map(e => this.format(e)); 

        this._container.innerHTML = ''
        this._container.insertAdjacentHTML( 'beforeend', `${hour}${this._separator}${minute}${this._separator}${second}` );

        await delay(500)

        this.update()

      }

    }

    class Quotes { 

      constructor () {

        // To set already the default elements of each type of data.
        this._quote  = document.getElementById('quote')
        this._author = document.getElementById('author')
        this._source = document.getElementById('source')


      }

      initial () {

        fetch('./data/quotes.json')
        .then( response => response.json() )
        .then( quotes => {

          // To load a different quote everyday
          if ( this.date() !== localStorage['time-old-quote'] ) {

            const quote = quotes[quotes.length * Math.random() | 0]

            localStorage['old-quote']  = quote[0]
            localStorage['old-author'] = quote[1]
            localStorage['old-source'] = quote[2]

            return localStorage['time-old-quote'] = this.date()

          }

        })

        this.set()

      }

      set (quote = localStorage['old-quote'], author = localStorage['old-author'], source = localStorage['old-source']) {

        this._quote.innerHTML = quote;

        if ( author !== 'undefined' ) this._author.innerHTML = author
        else this._author.remove();

        if ( source !== 'undefined' ) this._source.innerHTML = source
        else this._source.remove();

      }

      date (current = new Date()) {

        return current.toLocaleString('en-gb', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

      }

    }

    class Background {

      constructor () {

        this._default_color = json.accent
        this._style_sheet   = document.styleSheets[0]

      }

      initial (accent = '') {

        if ( json.automatic_accent === true ) {

          const rgb = this.average( document.getElementById('background') );
          accent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

        } else accent = this._default_color;

        this.set(accent)

      }

      set (colour = '') {

        this._style_sheet.insertRule(`
           :root {

             --accent-colour: ${colour};

           }
         `, 0)

        localStorage['last-accent'] = colour;

      }

      average (element) {

        let canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            i = -4,
            rgb = {r:0, g:0, b:0},
            image_path = element.style.backgroundImage.replace(/^url\(\"|\"\)$/g, ''),
            count = 0;

        document.body.insertAdjacentHTML('beforeend', `<img id="background-img" src="${image_path}">`);
        let img_dummy = document.getElementById('background-img');

        const height = canvas.height = img_dummy.height;
        const width  = canvas.width  = img_dummy.width;

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
        if ( rgb.r < 127 || rgb.g < 127 || rgb.b < 127 ) {

          rgb.r = rgb.r + 30;
          rgb.g = rgb.g + 30;
          rgb.b = rgb.b + 30;

        }

        img_dummy.remove();
        return rgb;

      }

    }

    const blurMethod  = new Blur( json.blur_background, json.blur_effect, json.blur_time )
    const linksMethod = new Links()

    new Engines().initial()
    blurMethod.initial()

    linksMethod.initial()
    linksMethod.overflow()

    new Time().update()
    new Quotes().initial()
    new Background().initial()

  });

});
