const input   = document.querySelector("input[type=text]");
const overlay = document.querySelector(".overlay");
const floater = document.querySelector(".floater");
const body    = document.body;

const bookmarkForm  = document.querySelector(".bookmark-form");
const bookmarksList = document.querySelector(".bookmarks-list");
const bookmarkInput = bookmarkForm.querySelector('input[type="text"]');
const bookmarks     = JSON.parse(localStorage.getItem("bookmarks")) || [];
const apiUrl        = "https://opengraph.io/api/1.0/site";
const appId         = "58858c7bcf07b61e64257391";

// const myUrl         = encodeURIComponent('https://google.com');  

fillBookmarksList(bookmarks); // fill bookmarks list from local storage on entering the page

//=================================================================================== listeners
input.addEventListener("focusin", focus);
input.addEventListener("focusout", outOfFocus);

function focus() {
  body.classList.add("show-floater");
}

function outOfFocus() {
  if (body.classList.contains("show-floater")) {
    body.classList.remove("show-floater");
  }
}

//=============================================== Form submission
bookmarkForm.addEventListener("submit", createBookmark);
bookmarksList.addEventListener("click", removeBookmark);

//    =================================================================================== Bookmarks logic
function createBookmark(e) {
  e.preventDefault();

  const title = bookmarkInput.value;

  if (title == "") return;
  const url = encodeURIComponent(bookmarkInput.value);

  fetch(`${apiUrl}/${url}/?app_id=${appId}`)
    .then((response) => response.json())
    .then((data) => {

      const bookmark = {
        title: data.hybridGraph.title,
        image: data.hybridGraph.image,
        link: data.hybridGraph.url,
      };

      bookmarks.push(bookmark); // add a new bookmark to the bookmarks
      storeBookmarks(bookmarks); // store bookmarks in local storage
      fillBookmarksList(bookmarks); //update the bookmarks list
      bookmarkForm.reset(); //clears the input box for next value
    })
    .catch((error) => {
      console.log(String(error.message ?? error))
      alert(
        "a problem occured, please check that your link is correct and try again"
      );
    });
}

function fillBookmarksList(bookmarks = []) {
  const bookmarksHtml = bookmarks
    .map((bookmark, i) => {
      return `
          <div class="bookmark" data-id="${i}">
            <div class="img" style="background-image:url('${bookmark.image}"></div>
            <a href="${bookmark.link}" target="_blank">
            ${bookmark.title} 
            </a>
            <span class="glyphicon glyphicon-remove"></span>
          </div>
         `;
    })
    .join("");
  bookmarksList.innerHTML = bookmarksHtml;
}

function storeBookmarks(bookmarks = []) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function removeBookmark(e) {
  if (!e.target.matches(".glyphicon-remove")) return; // error handling for empty input
  const index = e.target.parentNode.dataset.id; //find index
  bookmarks.splice(index, 1); //remove from bookmark
  fillBookmarksList(bookmarks); //fill the list
  storeBookmarks(bookmarks); //store back in local storage
}
