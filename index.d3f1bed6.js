var e;(e="Ukraine",fetch(`https://restcountries.com/v3.1/name/${e}?fields=name.official,capital,population,flags.svg,languages`).then((e=>{throw e.ok&&e.json(),new Error(e.statusText)}))).then((e=>console.log(e)));
//# sourceMappingURL=index.d3f1bed6.js.map
