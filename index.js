import Navigo from "navigo";
import { capitalize } from "lodash";
// importing all as a Module object
//import * as components from "./components";
import * as state from "./store";
// importing all by name
import { Header, Nav, Main, Footer } from "./components";
import axios from "axios";
import "./env";

// add menu toggle to bars icon in nav bar
/*document.querySelector(".fa-bars").addEventListener("click", () => {
  document.querySelector("nav > ul").classList.toggle("hidden--mobile");
});*/

// get data from an API endpoint
axios
  .get("https://jsonplaceholder.typicode.com/posts")
  // handle the response from the API
  .then(response => {
    // for each post in the response Array,
    response.data.forEach(post => {
      // add it to state.Blog.posts
      state.Blog.posts.push(post);
    });
    const params = router.lastRouteResolved().params;
    // if params exists (any page but Home),
    if (params) {
      // re-render the page
      render(state[params.page]);
    }
  });

// axios
//.get(/* your API endpoint from above */)
//.then(response => {
//   state.Home.weather.city = response.name;
//   state.Home.weather.temp = response.main.temp;
//   state.Home.weather.description = response.weather.main;
// })
//remove the API key and put after ID= and before`${process.env.OPEN_WEATHER_API_KEY}`
//.catch(err => console.log(err));

axios
  .get(`https://api.github.com/users/Sridevi15k/repos`, {
    headers: {
      Authorization: `${process.env.GITHUB__TOKEN}`
    }
  })
  .then(response => console.log(response.data));

const router = new Navigo(window.location.origin);

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
${Header(st)}
${Nav(state.Links)}
${Main(st)}
${Footer()}
`;
  router.updatePageLinks();

  addPicOnFormSubmit(st);
  addNavEventListeners();
}

render(state.Home);

router
  .on({
    "/": () => render(state.Home),
    ":page": params => render(state[capitalize(params.page)])
  })
  .resolve();

function addPicOnFormSubmit(st) {
  if (st.view === "Form") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      // convert HTML elements to Array
      let inputList = Array.from(event.target.elements);
      // remove submit button from list
      inputList.pop();
      // construct new picture object
      let newPic = inputList.reduce((pictureObject, input) => {
        pictureObject[input.name] = input.value;
        return pictureObject;
      }, {});
      // add new picture to state.Gallery.pictures
      state.Gallery.pictures.push(newPic);
      render(state.Gallery);
    });
  }
}

function addNavEventListeners() {
  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}

// populating gallery with pictures
/*const gallerySection = document.querySelector("#gallery");
dogPictures.forEach(pic => {
  let img = document.createElement("img");
  img.src = pic.url;
  img.alt = pic.title;
  gallerySection.appendChild(img);
});*/

// handle form submission
// document.querySelector("register").addEventListener("submit", event => {
//   event.preventDefault();
//   Array.from(event.target.elements).forEach(el => {
//     console.log("Input Type: ", el.type);
//     console.log("Name: ", el.name);
//     console.log("Value: ", el.value);
//   });
// });
