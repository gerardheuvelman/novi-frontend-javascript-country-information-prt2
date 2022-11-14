import axios from "axios";

console.log( "Script is running" )


// 1. Data Fetchen

// Create reference
const resultDiv = document.getElementById('result');

async function fetchData(query) {
    const URI = 'https://restcountries.com/v2/name/';

    // Verwijzing naar error message
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await axios.get(URI + query);
        console.log(response.data[0]);
        console.log(response.data[0].currencies.length);
        console.log(response.data[0].currencies[0].name);

        console.log(response.data[0].languages.length);
        console.log(response.data[0].languages[0].name);

        const {name, flag, subregion, population, capital} = response.data[0];

        const languages = response.data[0].languages;
        const numberOfLanguages = languages.length;

        console.log(name);
        console.log(flag);
        console.log(subregion);
        console.log(population);
        console.log(capital);

        // Leeg de div
        resultDiv.replaceChildren();

        const flagImage = document.createElement("img");
        flagImage.setAttribute('src', flag);
        flagImage.setAttribute('class', 'flag-image');
        flagImage.setAttribute('alt', `The flag of ${name}`);
        flagImage.setAttribute('width', 100);
        flagImage.setAttribute('height', 50);

        const firstLine = document.createElement('p');
        firstLine.setAttribute('class', 'first-line');
        firstLine.textContent = name;

        const secondLine = document.createElement('p');
        secondLine.setAttribute('class', 'second-line');
        secondLine.textContent = `${name} is situated in ${subregion}. It has a population of ${population} people.`;

        const thirdLine = document.createElement('p');
        thirdLine.setAttribute('class', 'third-line');

        if (response.data[0].currencies.length === 1) {
            thirdLine.textContent = `The capital is ${capital} and you pay with ${response.data[0].currencies[0].name}`;
        } else {
            thirdLine.textContent = `The capital is ${capital} and you pay with ${response.data[0].currencies[0].name} or with ${response.data[0].currencies[1].name}`;
        }
        const fourthLine = document.createElement('p');
        fourthLine.setAttribute('class', 'fourth-line');

        const fourthLineString = createFourthLine(languages);
        fourthLine.textContent = fourthLineString;

        resultDiv.appendChild(flagImage);
        resultDiv.appendChild(firstLine);
        resultDiv.appendChild(secondLine);
        resultDiv.appendChild(thirdLine);
        resultDiv.appendChild(fourthLine);

        errorMessage.textContent = "";

    } catch ( error ) {

        // Check welke error message van toepassing is
        if ( error.response.status === 404 ) {
            errorMessage.textContent = "Page Not Found | 404"
        }
        if ( error.response.status === 500 ) {
            errorMessage.textContent = "Internal Server Error | 500"
        }
    }
} // IIFE --> Immediately Invoked Function Expression

// 2. Event Listeners
// Create reference
const queryInput = document.getElementById( 'search-query');
const btn = document.getElementById( 'button');

// Implement event listener
btn.addEventListener( 'click', () => {
    fetchData( queryInput.value );
} );

function createFourthLine(languages) {
    let lineString = "They speak ";
    lineString = lineString + languages[0].name + " ";

    if (languages.length > 1) {
        for (let i = 1; i < languages.length; i++) {
            lineString = lineString + " and " + languages[i].name;
        }
    }
    lineString = lineString + ".";
    return lineString;
}