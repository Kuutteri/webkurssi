import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

async function initializeCode() {
  const dogBreeds = ["pomeranian", "bulldog", "poodle", "husky", "dalmatian"];
  for (const breed of dogBreeds) {
    const image = await getDogImageByBreed(breed);
    const summary = await getDogSummaryByBreed(breed);
    createWikiItem(breed.charAt(0).toUpperCase() + breed.slice(1), image, summary);
  }
}

async function getDogImageByBreed(breed) {
  const apiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.message;
}

async function getDogSummaryByBreed(breed) {
  try {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch Wikipedia summary for ${breed}`);
    }
    const data = await response.json();
    return data.extract || "Summary unavailable";
  } catch (error) {
    console.error(error);
    return "Failed to fetch Wikipedia summary";
  }
}

function createWikiItem(breed, imageUrl, summary) {
  const wikiItem = document.createElement("div");
  wikiItem.classList.add("wiki-item");

  const header = document.createElement("h1");
  header.classList.add("wiki-header");
  header.textContent = breed;

  const wikiContent = document.createElement("div");
  wikiContent.classList.add("wiki-content");

  const wikiText = document.createElement("p");
  wikiText.classList.add("wiki-text");
  wikiText.textContent = summary;

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