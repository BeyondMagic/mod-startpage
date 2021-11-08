<p align="center">
  <img src="/.github/preview1.png">
</p>

<p align="center"><b>Modular Startpage</b></p>

<p align="center">Modular startpage is as simple as it can be, with each part of the page being easily removable or easy to add other things (on .json).</p>

---

## Features builtin

+ `data/config.json` : Easily disable, enable options and change parameters of the page.
+ ` data/links.json` : Modular so that you can add, remove, edit links and sections of links.
+ `data/quotes.json` : Modular so that you can add, remove, edit quotes easily.
+ ` data/background` : Easily change the background shown in the page (colours will adapt automatically)
+ `    data/profile` : Easily change the profile picture shown in the page. (disabled by default).

---

## Configuration Examples

Just add a new item on the `data/quotes.json`, the first sub-item must be the **quote**, the second: **artist**, the third: **source**.

```json
[
  [
    "Perhaps I was addicted to the dark side\nSomewhere inside my childhood witnessed my heart die\nAnd even though we both came from the same places\nThe money and the fame made us all change places",
    "Tupac",
    "Changes"
  ],
  [
    "Let death immediately stand before your eyes, and you will never desire anything bad or worldly.",
    "St. Anthony The Great"
  ]
]
```

It's basically self-explanatory, each object is a container, each cointainer cointains items, each item must contain the name, link and description of the website.

`data/links.json`

```json
{
  "school": [
    ["CR", "https://classroom.google.com/u/2/h", "Classroom..."]
  ],

  "fun": [
    ["renegal soundcloud", "https://soundcloud.com/renegal/tracks", "Cool songs."]
  ]
}
```

Self-explanatory:

`data/quotes.json`

```json
{
  "location": "Somewhere somewhere.",
  "name": "yourname",
  "show_profile": false,
  "blur_background": "11",
  "blur_time": "125ms",
  "blur_effect": "ease-in-out",
  "accent": "rgb(255, 166, 161)",
  "automatic_accent": true,
  "searches": {
    "google": ["https://www.google.com/search", "q"],
    "youtube": ["https://www.youtube.com/results", "search_query"],
    "github": ["https://github.com/search", "q"]
  }
}
```
---

## More examples

<p align="center">
  <img src="/.github/preview2.png">
</p>

<p align="center">
  <img src="/.github/preview3.png">
</p>

---

<p align="center">
  <a href="/LICENSE"><b>Unlicense License</b></a>
</p>
