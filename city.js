let input = document.getElementById('search');
let result = document.querySelector('.results');

const cities = [];

fetch('https://gist.githubusercontent.com/bfkaradag/96cd5dcb85926ce739e402b996cfa351/raw/c27124b016efe8d0872bbcb72fb9f8b68dcf6172/turkiye-il-ilce-nufus.json')

    .then(resp => resp.json())
    .then(data => {
        cities.push(...data)
    })
    .catch(error => console.log(error))


const findCities = (word, cities) => {
    return cities.filter(place => {
        const regex = new RegExp(word, "gi");
        return place.city.match(regex) || place.district.match(regex)
    })
}

const addItem = (e) => {
    const arrayMatch = findCities(e.target.value, cities);

    const matchHTML = arrayMatch.map(match => {

        const regex = new RegExp(e.target.value, 'g');
        const cityName = match.city.replace(regex, `<span class="hl">${e.target.value}</span>`);
        const distrcitName = match.district.replace(regex, `<span class="hl">${e.target.value}</span>`)

        return `
        <li>
            <span class="name">${cityName}, ${distrcitName}</span>
            <span class="population">${match.population}</span>
        </li>

        `
    }).join('')
    result.innerHTML = matchHTML;
}

input.addEventListener('keyup', addItem)