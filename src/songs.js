import { topTracks, suggTracks } from "./script.js";

const topTracksEl = document.querySelector(".top-tracks");
const recTracksEl = document.querySelector(".rec-tracks");
const topTracksBtn = document.querySelector(".top");
const suggestionsBtn = document.querySelector(".suggestions");

const swiper = new Swiper(".mySwiper", {
  effect: "flip",
  grabCursor: true,
});

topTracksBtn.addEventListener("click", function () {
  swiper.slidePrev();
});

suggestionsBtn.addEventListener("click", function () {
  swiper.slideNext();
});

const displayTracks = function (topTracks, container) {
  container.classList[0] === "rec-tracks"
    ? topTracks.tracks.map((song) => {
        createDOM(song, container);
      })
    : topTracks.items.map((song) => createDOM(song, container));
};

const createDOM = function (song, container) {
  const li = document.createElement("li");
  const trackName = document.createElement("h2");
  const artistName = document.createElement("p");
  const trackImg = document.createElement("img");
  const details = document.createElement("div");

  trackImg.setAttribute("class", "track-img");
  trackImg.src = song.album.images[1].url;

  trackName.innerText = song.name;
  trackName.setAttribute("class", "track-name");

  artistName.innerText = song.artists[0].name;
  artistName.setAttribute("class", "artist-name");

  container.appendChild(li);
  details.setAttribute("class", "details");
  details.append(trackName, artistName);
  li.append(trackImg, details);
};
displayTracks(suggTracks, recTracksEl);
displayTracks(topTracks, topTracksEl);
