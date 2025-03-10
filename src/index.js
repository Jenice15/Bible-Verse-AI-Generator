function getTodaysVerse(response) {
    let todaysVerseParagraph = document.querySelector('#todays-verse');
    todaysVerseParagraph.innerHTML = response.data.answer;
    console.log(response.data.answer);
}
function generateRandomVerse(event) {
    event.preventDefault();

    let apiKey = 'fa90t5bf5523344e459f280fabbb9o83';
    let prompt = `You are the best AI, and I believe you can help people to turn to God give me one bible verse.Please do not include the following text: "html". Here is an example of a verse "Hebrews 11:1 - Now faith is the substance of things hoped for, the evidence of things not seen".`;
    let context =
        'Please try to be as precise as possible and choose only one answer. And please do not display a joke or your reply!';
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
    axios.get(apiUrl).then(getTodaysVerse);
    console.log(apiUrl);
}

// function handleClick() {
//     console.log('before search verse');
//     searchVerse();
//     console.log('after search verse');
//     window.location.href();
//     console.log('after reload');
// }

function verseGenerator(response) {
    let searchParagraph = document.querySelector('#search-result-paragraph');
    let searchBtn = document.querySelector('#user-instructions');
    // console.log(response.data.answer);
    // let finalText = response.data.answer;
    // let splicedText = finalText.splice(0, 6);
    // console.log(splicedText);
    // console.log(finalText);
    searchParagraph.innerHTML = `${response.data.answer}`;

    new Typewriter(searchParagraph, {
        strings: response.data.answer,
        autoStart: true,
        delay: 20,
        cursor: '',
    });
    // let searchBtn = document.querySelector('#user-instructions');
    //searchBtn.disabled = false;
    searchBtn.value = '';
    searchBtn.focus();
    //searchBtn.focus();
}

function searchVerse(event) {
    event.preventDefault();
    console.log('new');
    let userInstructions = document.querySelector('#user-instructions').value;
    let apiKey = 'fa90t5bf5523344e459f280fabbb9o83';
    let prompt = `You are the best AI, and I believe you can help people to turn to God, give me one bible verse with the word ${userInstructions}`;
    let context =
        'Please try to be as precise as possible and choose only one answer, and disply only the verse in HTML format. Please do not display a joke or your reply,also do not display HTML text';
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    axios.get(apiUrl).then(verseGenerator);
    // axios.get(apiUrl).then(handleClick);

    let searchParagraph = document.querySelector('#search-result-paragraph');
    searchParagraph.innerHTML = 'Generating a bible verse for you...';
}
let inputWord = document.querySelector('#verse-generator-form');
// let buttonElement = document.querySelector('#search-btn');
inputWord.addEventListener('submit', searchVerse);

document
    .querySelector('#user-instructions')
    .addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchVerse(event);
        }
    });
// inputWord.addEventListener('submit', handleClick);

let searchBtn = document.querySelector('#user-instructions');
// searchBtn.addEventListener('click', handleClick);
// let searchBtn = document.querySelector('#search-btn');
// searchBtn.addEventListener('click', handleClick);

let todaysVerseElement = document.querySelector('#todays-verse-btn');
todaysVerseElement.addEventListener('click', generateRandomVerse);
// todaysVerseElement.addEventListener('click', handleClick);
