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
    let searchInput = document.querySelector('#user-instructions');
    let searchBtn = document.querySelector('#search-btn');
    // console.log(response.data.answer);
    // let finalText = response.data.answer;
    // let splicedText = finalText.splice(0, 6);
    // console.log(splicedText);
    // console.log(finalText);
    searchParagraph.innerHTML = response.data.answer;

    // new Typewriter(searchParagraph, {
    //     strings: response.data.answer,
    //     autoStart: true,
    //     delay: 20,
    //     cursor: '',
    // });
    // let searchBtn = document.querySelector('#user-instructions');
    //searchBtn.disabled = false;
    //last update      searchInput.blur();
    //     searchBtn.value = ' ';
    //     searchInput.disabled = false;
    //     searchBtn.disabled = false;

    //     setTimeout(() => {
    //         searchInput.blur(); // Ensure keyboard closes properly
    //         searchInput.focus(); // Refocus to allow new input
    //     }, 500);
    // }
    searchInput.blur();
    setTimeout(() => {
        searchInput.disabled = false;
        searchBtn.disabled = false;
        searchInput.value = '';
        searchInput.focus(); // Refocus AFTER a slight delay
    }, 500);
}
async function searchVerse(event) {
    event.preventDefault(); // Prevents the reload that crashes mobile apps
    
    let searchBtn = document.querySelector('#search-btn');
    let searchInput = document.querySelector('#user-instructions');
    let searchParagraph = document.querySelector('#search-result-paragraph');

    // 1. CLEAR & LOCK
    let userWord = searchInput.value.trim(); // .trim() removes accidental spaces
    if (!userWord) {
        searchParagraph.innerHTML = 'Please enter a keyword.';
        return;
    }

    searchInput.disabled = true;
    searchBtn.disabled = true;
    searchParagraph.innerHTML = "Thinking...";

    let apiKey = 'fa90t5bf5523344e459f280fabbb9o83';
    
    // 2. THE FIX: Clean the prompt for the API
    let cleanPrompt = `give me one bible verse with the word ${encodeURIComponent(userWord)}`;
    let context = 'display only the verse';
    let apiUrl = `https://shecodes.io{cleanPrompt}&context=${context}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        // Only update if there is an actual answer
        if (response.data && response.data.answer) {
            searchParagraph.innerHTML = response.data.answer;
        } else {
            throw new Error("No data received");
        }
    } catch (error) {
        console.error('API Error:', error);
        searchParagraph.innerHTML = "Sorry, I couldn't find a verse for that word. Try again!";
    } finally {
        // 3. UNLOCK - Ensuring the bar never stays frozen
        searchInput.disabled = false;
        searchBtn.disabled = false;
        searchInput.value = ''; 
        searchInput.blur(); // Closes the mobile keyboard automatically
    }
}






// async function searchVerse(event) {
//     event.preventDefault();
//     console.log('Searching for a verse...');

//     let searchBtn = document.querySelector('#search-btn'); // Assuming you have a button with this ID
//     let searchInput = document.querySelector('#user-instructions');
//     let searchParagraph = document.querySelector('#search-result-paragraph');

//     let userInstructions = searchInput.value.trim();
//     if (!userInstructions) {
//         searchParagraph.innerHTML = 'Please enter a keyword to search.';
//         return;
//     }

//     let apiKey = 'fa90t5bf5523344e459f280fabbb9o83';
//     let prompt = `You are the best AI, and I believe you can help people to turn to God, give me one bible verse with the word ${userInstructions}`;
//     let context =
//         'Please try to be as precise as possible and choose only one answer, and display only the verse.';

//     let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

//     // Disable search button to prevent multiple clicks
//     searchInput.disabled = true;
//     searchBtn.disabled = true;

//     try {
//         const response = await axios.get(apiUrl); // Await the response
//         verseGenerator(response); // Handle the response in verseGenerator
//     } catch (error) {
//         console.error('Error fetching verse:', error);
//         searchParagraph.innerHTML = 'Failed to fetch verse. Try again.';
//     } finally {
//         // Ensure input is enabled again
//         searchInput.disabled = false;
//         searchBtn.disabled = false;
//         searchInput.value = ''; // Reset input
//         searchInput.blur(); // Close keyboard on mobile
//         // history.go(0.30);
//         //windows.location.reload();
//         window.location.href = window.location.href;

//         // Re-add event listener to prevent issues with the async call
//         let form = document.querySelector('#verse-generator-form');
//         form.removeEventListener('submit', searchVerse);
//         setTimeout(() => {
//             form.addEventListener('submit', searchVerse);
//             searchInput.focus(); // Refocus input
//         }, 300);
//     }
// }

//Adding async fun to fix the error     axios
//         .get(apiUrl)
//         .then(verseGenerator)
//         .catch((error) => {
//             console.error('Error fetching verse:', error);
//             searchParagraph.innerHTML = 'Failed to fetch verse. Try again.';
//         })
//         .finally(() => {
//             // Ensure input is enabled again
//             searchInput.disabled = false;
//             searchBtn.disabled = false;
//             searchInput.value = ''; // Reset input
//             searchInput.blur(); // Ensure the keyboard closes

//             // Remove and re-add event listener to refresh it
//             let form = document.querySelector('#verse-generator-form');
//             form.removeEventListener('submit', searchVerse);
//             setTimeout(() => {
//                 form.addEventListener('submit', searchVerse);
//                 searchInput.focus(); // Refocus input
//             }, 300);
//         });
// }
// axios.get(apiUrl).then(handleClick);

let inputWord = document.querySelector('#verse-generator-form');
// let buttonElement = document.querySelector('#search-btn');
inputWord.addEventListener('submit', searchVerse);

// inputWord.addEventListener('submit', handleClick);

// searchBtn.addEventListener('click', handleClick);
// let searchBtn = document.querySelector('#search-btn');
// searchBtn.addEventListener('click', handleClick);

let todaysVerseElement = document.querySelector('#todays-verse-btn');
todaysVerseElement.addEventListener('click', generateRandomVerse);
// todaysVerseElement.addEventListener('click', handleClick);
