import axios from "axios";

console.log("script is running");

const countryList = document.getElementById('list-landen');

let URI = "https://restcountries.com/v2/all";

async function fetchData() {
    try {
        const response = await axios.get(URI);
        console.log(response);
        console.log(response.data);
        console.log(response.data[0]);
        console.log(response.data[0].name);
        console.log(response.data[0].population);
        console.log(response.data[0].region);

        response.data.sort((a,b) => {
            return a.population - b.population;
        });

        response.data.map((country) => {

            const {name, population,  region} = country;

            const countryListItem = document.createElement('li');
            countryListItem.setAttribute('class', 'country');

            const color = getRegionColor(region);
            countryListItem.setAttribute('class', color);
            countryListItem.textContent = name;


            const populationParagraph = document.createElement('p');
            populationParagraph.textContent = `has a population of ${population} people.`;
            countryListItem.appendChild(populationParagraph);

            const image = document.createElement('img');
            image.setAttribute('src',   country.flag);
            image.setAttribute('alt', `The flag of ${country.name}`);
            image.setAttribute('width', 100 );
            image.setAttribute('height', 50);
            countryListItem.appendChild(image);

            countryList.appendChild(countryListItem);

        });

    } catch(error) {
        console.error(error);
    }
}
fetchData();


function getRegionColor(region) {
        switch (region) {
        case 'Africa':
            return 'blue';
            break;
        case 'Americas':
            return 'green';
            break;
        case 'Asia':
            return 'red';
            break;
        case 'Europe':
            return 'yellow';
            break;
        case 'Oceania':
            return 'purple';
            break;
        default:
            return 'black';
    }
}



