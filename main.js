const clickHereBtn = document.getElementById('click-here-btn')
const rows = document.querySelectorAll('.row');
const hideThis = document.querySelectorAll('.hide-this');
const container = document.querySelector('.container');
const selectionInfo = [
  "Read a Dumb Quote",
  "Inspirational Quote"
]
clickHereBtn.addEventListener('click', generateSelection);


function generateSelection(event) {
  for (let i = 0; i < hideThis.length; i++) {
    hideThis[i].classList.add("hidden");
  }

  for (let i = 0; i < selectionInfo.length; i++) {
    let rowContainer = document.createElement('div');
    rowContainer.classList.add("row", "justify-content-center", "this-one");
    let dumbHeading = document.createElement('h1');
    dumbHeading.className = "heading-selection";
    dumbHeading.textContent = selectionInfo[i]
    let buttonRow = document.createElement('div');
    buttonRow.classList.add("row", "justify-content-center", "this-one");
    let topButton = document.createElement('button');
    topButton.className = "circle-button";
    topButton.textContent = "Press";
    rowContainer.appendChild(dumbHeading);
    buttonRow.appendChild(topButton);
    container.appendChild(rowContainer);
    container.appendChild(buttonRow);
  }

  let dumbQuoteBtn = document.querySelectorAll('button')[1];
  let inspirationQuoteBtn = document.querySelectorAll('button')[2];
  dumbQuoteBtn.addEventListener("click", populateDumbPage);
  inspirationQuoteBtn.addEventListener("click", populateInspirePage)
}



//for dumb quote

function populateDumbPage(event) {
  const dumbTitle = document.createElement('h1');
  const currentRows = document.querySelectorAll('.this-one');


  //hide elements
  for (let i = 0; i < rows.length; i++) {
    currentRows[i].remove();

  }
  //create quote title
  dumbTitle.textContent = "Dumb Quote";
  dumbTitle.className = "quote-title";
  container.append(dumbTitle);

  $.ajax({
    Method: "GET",
    url: "https://tronalddump.io/random/quote",
    success: handleSuccess,
    error: handleError
  })

  function handleSuccess(data) {
    console.log(data);
    const quoteBox = document.createElement('div');
    const quoteTextContainer = document.createElement('div');
    const quoteText = document.createElement('div');
    quoteBox.classList.add("quote-box", "row");
    quoteTextContainer.classList.add('quote-text-container')
    quoteText.classList.add("quote-text");
    quoteText.innerText = `${data.value}

    -Donald Trump`;
    quoteTextContainer.append(quoteText);
    quoteBox.append(quoteTextContainer);
    container.append(quoteBox);
  }

  function handleError(err) {
    console.log(err);
  }

  const createHome = document.createElement('button');
  createHome.classList.add('return-home', 'btn-css');
  createHome.textContent = "Return to Home"
  createHome.addEventListener("click", returnHome);
  container.append(createHome);

}



//for inspiring quote

function populateInspirePage() {
  const dumbTitle = document.createElement('h1');
  const currentRows = document.querySelectorAll('.this-one');
  //hide elements
  for (let i = 0; i < rows.length; i++) {
    currentRows[i].remove();

  }
  //create quote title
  dumbTitle.textContent = "Inspiring Quote";
  dumbTitle.className = "quote-title";
  container.append(dumbTitle);

  $.ajax({
    Method: "GET",
    url: "https://quote-garden.herokuapp.com/api/v2/quotes/random",
    success: handleSuccess,
    error: handleError
  })

  function handleSuccess(data) {
    console.log(data);
    const quoteBox = document.createElement('div');
    const quoteTextContainer = document.createElement('div');
    const quoteText = document.createElement('div');
    quoteBox.classList.add("quote-box", "row");
    quoteTextContainer.classList.add('quote-text-container')
    quoteText.classList.add("quote-text");
    quoteText.innerText = `${data.quote.quoteText}

    -${data.quote.quoteAuthor}`;
    quoteTextContainer.append(quoteText);
    quoteBox.append(quoteTextContainer);
    container.append(quoteBox);
  }

  function handleError(err) {
    console.log(err);
  }


  const createHome = document.createElement('button');
  createHome.classList.add('return-home', 'btn-css');
  createHome.textContent = "Return to Home"
  createHome.addEventListener("click", returnHome);
  container.append(createHome);
}

function returnHome() {
  const hideBox = document.querySelector('.quote-box')
  container.removeChild(hideBox);
  const titleOfPage = document.querySelector('.quote-title');
  container.removeChild(titleOfPage);
  const homeButton = document.querySelector('.return-home');
  container.removeChild(homeButton);

  for (let i = 0; i < hideThis.length; i++) {
    hideThis[i].classList.remove("hidden");
  }
}
