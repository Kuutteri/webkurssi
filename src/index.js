import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

async function initializeCode() {
  const dogBreeds = ["akita", "poodle", "pomeranian", "husky", "boxer"];
  // Iterate through the dog breeds and fetch images
  for (const breed of dogBreeds) {
    const imageUrl = await getRandomDogImage(breed);
    createWikiItem(breed.charAt(0).toUpperCase() + breed.slice(1), imageUrl);
  }
}

async function getRandomDogImage(breed) {
  const apiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.message;
}

function createWikiItem(breed, imageUrl) {
  const wikiItem = document.createElement("div");
  wikiItem.classList.add("wiki-item");

  const header = document.createElement("h1");
  header.classList.add("wiki-header");
  header.textContent = breed;

  const wikiContent = document.createElement("div");
  wikiContent.classList.add("wiki-content");

  const wikiText = document.createElement("p");
  wikiText.classList.add("wiki-text");
  wikiText.textContent = breed + "s are good dogs";

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const wikiImg = document.createElement("img");
  wikiImg.classList.add("wiki-img");
  wikiImg.src = imageUrl;

  imgContainer.appendChild(wikiImg);
  wikiContent.appendChild(imgContainer);
  wikiContent.appendChild(wikiText);
  wikiItem.appendChild(header);
  wikiItem.appendChild(wikiContent);

  document.body.appendChild(wikiItem);
}
