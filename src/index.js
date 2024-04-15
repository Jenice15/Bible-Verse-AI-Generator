function getTodaysVerse(response) {
    let todaysVerseParagraph = document.querySelector('#todays-verse');
    todaysVerseParagraph.innerHTML = response.data.answer;
    console.log(response.data.answer);
}

function generateRandomVerse(event) {
    event.preventDefault();

    let apiKey = 'fa90t5bf5523344e459f280fabbb9o83';
    let prompt = `You are the best AI, and I believe you can help people to turn to God, give me one bible verse.`;
    let context =
        'Please try to be as precise as possible and choose only one answer, and disply only the verse in HTML format. And please do not display a joke or your reply!';
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
    axios.get(apiUrl).then(getTodaysVerse);
    console.log(apiUrl);
}

function verseGenerator(response) {
    let searchParagraph = document.querySelector('#search-result-paragraph');

    console.log(response.data.answer);
    searchParagraph.innerHTML = `${response.data.answer}`;

    new Typewriter(searchParagraph, {
        strings: response.data.answer,
        autoStart: true,
        delay: 20,
        cursor: '',
    });
}
function searchVerse(event) {
    event.preventDefault();
    let userInstructions = document.querySelector('#user-instructions').value;
    console.log(userInstructions);
    let apiKey = 'fa90t5bf5523344e459f280fabbb9o83';
    let prompt = `You are the best AI, and I believe you can help people to turn to God, give me one bible verse with the word ${userInstructions}`;
    let context =
        'Please try to be as precise as possible and choose only one answer, and disply only the verse in HTML format. And please do not display a joke or your reply!';
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    axios.get(apiUrl).then(verseGenerator);
    let searchParagraph = document.querySelector('#search-result-paragraph');
    searchParagraph.innerHTML = 'Generating a bible verse for you...';
    console.log(`prompt: ${prompt}`);
    console.log(searchParagraph);
}
let inputWord = document.querySelector('#verse-generator-form');
// let buttonElement = document.querySelector('#search-btn');
inputWord.addEventListener('submit', searchVerse);

// console.log(buttonElement);
console.log(inputWord);

let todaysVerseElement = document.querySelector('#todays-verse');
todaysVerseElement.addEventListener('click', generateRandomVerse);
