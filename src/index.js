import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const debounce = require('lodash.debounce')

const countryContainer = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info');
const form = document.querySelector('#search-box')



form.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
    
    
    



function onInput() {
    const countryName = form.value.trim();
    if (countryName === '') {
        return Notiflix.Notify.failure('Поле не может быть пустым');
    }

    fetchCountries(countryName).then(res => {
        if (res.length > 1 && res.length <= 10) {
            resetCountryContainer();
            resetCountryInfo();
            fetchCountries(countryName).then(data =>
                countryContainer.innerHTML = data.map(country =>
                    `<li><img src="${country.flags.svg}" alt="">${country.name.common}</li>`).join(''))
        }
        ;
    
        if (res.length > 10) {
            resetCountryContainer();
            resetCountryInfo();
            return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        };
        if (res.length === 1) {
            resetCountryContainer();
            resetCountryInfo();
            createCardMarkup(res[0]);
        };
        
    }).catch(() => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        resetCountryContainer();
        resetCountryInfo();
    
    });
};


function resetCountryContainer() {
    countryContainer.innerHTML = '';
};


function resetCountryInfo() {
    countryInfo.innerHTML = '';
};


function createCardMarkup (el) {
    resetCountryContainer();
    resetCountryInfo();
        
    countryInfo.innerHTML = `<h1 class="country-info__title">
        <img src="${el.flags.svg}" alt="flag of ${el.name.official}" class="country-info__img">
        ${el.name.official}</h1>
        <ul class="country-info__list">
          <li><h3>Capital:</h3>${el.capital}</li>
          <li><h3>Population:</h3>${el.population}</li>
          <li><h3>Languages:</h3>${Object.values(el.languages)}</li>
        </ul>`
};