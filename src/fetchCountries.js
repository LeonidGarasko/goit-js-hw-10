export const fetchCountries = (name) => {
    // const searchParams = URLSearchParams({
   
    // });

    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`)
        .then(response => {
        if (response.ok) {
            response.json()
        }
        throw new Error(response.statusText);
    });
};