//          Variables
let fatherCon = document.querySelector(".father-container");
let MoreCon = document.querySelector(".more-container");
let input = document.querySelector("#header .first .searchWrapper .search");
let logout = document.querySelector("#header .first .logout .btn");
let results = document.querySelector(".ShowResults .results .count");
let order = document.querySelector(".ShowResults .orders .order");
let bookmarks = document.querySelector(".bookmarks .body");
let BmName = document.querySelector(".bookmarks .body .liked .names .name");
let BmTitile = document.querySelector(".bookmarks .body .liked .names .title");
let asosiy = document.querySelector("main");
let books = document.querySelector("main .books");
// let pagination = document.querySelector("main .pagination");
// pagination.style.display = 'none'
let nenaydeno = document.querySelector(".nenaydeno");
nenaydeno.style.display = "none";
// variables end...

//  check localStorage
if (!localStorage.getItem("TrueLogin")) {
  window.location.replace("../pages/index.html");
}
logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("../pages/index.html");
});

async function main() {
  input.addEventListener("input", function () {
    books.innerHTML = "";
    asosiy.style.ovrflow = "";
    const ulTag = document.querySelector(".pagination ul");

function pagination(totalPages, page) {
  let liTag = "";
  let beforePage = page - 1; //4
  let afterPage = page + 1; //5
  let activeLi = "";
  let totalP = totalPages;
  // if page is greater than 1  then show the prev button
  // display prev button
  if (page > 1) {
    liTag += `<li class="btn prev"onClick="pagination(${totalP}, ${page - 1})">
                <span>
                <ion-icon name="chevron-back-outline"></ion-icon>
                prev
                </span>
              </li>`;
  }

  //add page one if there is more than 2 pages
  if (page > 2) {
    liTag += `        <li class="num " onClick="pagination(${totalPages}, ${1})"><span>1</span></li>
    `;
    //add dots   if there is more than 3 pages

    if (page > 3) {
      liTag += `        <li class="dots"><span>...</span></li>
      `;
    }
  }
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == totalPages - 1) {
    afterPage = afterPage + 1;
  }
  for (let pageNum = beforePage; pageNum <= afterPage; pageNum++) {
    if (pageNum > totalPages) {
      continue;
    }
    if (pageNum == 0) {
      continue;
    }
    page == pageNum ? (activeLi = "active") : (activeLi = "");

    liTag += `<li class="num ${activeLi}" onClick="pagination(${totalPages}, ${pageNum})"><span>${pageNum}</span></li>`;
    //4 5 6
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="num " onClick="pagination(${totalPages}, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn next"onClick="pagination(${totalP}, ${page + 1})">
  <span>next<ion-icon name="chevron-forward-outline"></ion-icon></span>
</li>`;
  }

  ulTag.innerHTML = liTag;
}
pagination(100, 10);
    setTimeout(() => {
      // pagination.style.display = "block"
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${input.value}&startIndex=0&maxResults=6`
      )
        .then((res) => res.json())
        .then((data) => {
          results.innerHTML = data.totalItems;
          if (data.totalItems === undefined) {
            nenaydeno.style.display = "block";
            results.innerHTML = 0;
          }
          if (input.value === "") {
            nenaydeno.style.display = "none";
          } else {
            nenaydeno.style.display = "none";
          }
          let items = data.items;
          console.log(items);
          items?.forEach((e) => {
            let imgLink =
              e.volumeInfo.imageLinks.thumbnail ||
              e.volumeInfo.imageLinks.smallThumbnail;
            // HTML add books
            let card = document.createElement("div");
            card.className = "card";
            // img
            let divImg = document.createElement("div");
            divImg.className = "img";
            let img = document.createElement("img");
            img.src = `${imgLink}`;
            // books name
            let booksname = document.createElement("div");
            booksname.className = "booksname";
            let help = `${e.volumeInfo.title}`;
            let arr = help.split(" ");
            booksname.innerHTML = `${arr[0]} ${arr[1]}`;
            let author = document.createElement("div");
            author.className = "name";
            author.innerHTML = e.volumeInfo.authors;
            // year
            let year = document.createElement("div");
            year.className = "year";
            year.innerHTML = e.volumeInfo.publishedDate;
            // double btn
            let dblbtn = document.createElement("div");
            dblbtn.className = "doublebtn";
            let bookmark = document.createElement("div");
            bookmark.className = "bookmark";
            bookmark.innerHTML = "Bookmark";
            dblbtn.appendChild(bookmark);
            let more = document.createElement("div");
            more.className = "more";
            more.innerHTML = "More Info";
            dblbtn.appendChild(more);
            let read = document.createElement("div");
            read.className = "read";
            read.innerHTML = "Read";

            // appendChilds
            divImg.appendChild(img);
            card.appendChild(divImg);
            card.appendChild(booksname);
            card.appendChild(author);
            card.appendChild(year);
            card.appendChild(dblbtn);
            card.appendChild(read);
            books.appendChild(card);

            bookmark.addEventListener("click", () => {
              BookMark();
            });
            read.addEventListener("click", () => {
              window.open(`${e.accessInfo.webReaderLink}`, "_blank");
            });
            more.addEventListener("click", () => {
              console.log("clickedasd");
              MoreInfo();
            });

            //   Bookmark
            function BookMark() {
              let liked = document.createElement("div");
              let names = document.createElement("div");
              let name = document.createElement("div");
              let title = document.createElement("div");
              let change = document.createElement("div");
              let read = document.createElement("a");
              let deletee = document.createElement("i");
              let toString = liked.toString();
              // add classes
              liked.className = "liked";
              names.className = "names";
              name.className = "name";
              title.className = "title";
              change.className = "change";
              read.className = "read";
              read.href = `${e.accessInfo.webReaderLink}`;
              deletee.className = "delete";
              read.setAttribute("target", "_blank");
              read.classList.add("bx");
              read.classList.add("bx-book-open");
              deletee.classList.add("bx");
              deletee.classList.add("bxs-tag-x");
              //
              name.innerHTML = `${arr[0]} ${arr[1]}`;
              title.innerHTML = e.volumeInfo.authors;

              // appenChild's
              bookmarks.appendChild(liked);
              liked.appendChild(names);
              liked.appendChild(change);
              names.appendChild(name);
              names.appendChild(title);
              change.appendChild(read);
              change.appendChild(deletee);


              deletee.addEventListener("click", () => {
                bookmarks.removeChild(liked);
              });
            }
            function MoreInfo() {
              console.log("asdasdf");
              let op_container = document.createElement("div");
              let moreinfo = document.createElement("div");
              //
              op_container.className = "opacity-container";
              moreinfo.className = "MoreInfo";
              //
              op_container.style.display = "block";
              moreinfo.style.display = "block";
              //
              MoreCon.appendChild(op_container);
              MoreCon.appendChild(moreinfo);
              console.log(MoreCon);

              let tamplate = `
      <div class="head">
        <div class="name">${e.volumeInfo.title}</div>
        <i class="bx bx-x"></i>
      </div>
      <div class="bodysc">
      <div class="img">
        <img src="${e.volumeInfo.imageLinks.thumbnail}" alt=""/>
        <div class="description">
        ${e.volumeInfo.description}
        </div>
      </div>
      <div class="informations">
        <div class="author">
          <span>Authors: </span>
          <span class="all a-names" id="i1">${e.volumeInfo.authors}</span>
        </div>
        <br>
        <div class="published">
          <span>Published:</span>
          <span class="all pub-date">${e.volumeInfo.publishedDate}</span>
        </div>
        <br>
        <div class="publishers">
          <span>Publishers</span>
          <span class="all pub-name">${e.volumeInfo.publisher}</span>
        </div>
        <br>
        <div class="catigories">
          <span>Categories:</span>
          <span class="all category">${e.volumeInfo.categories}</span>
        </div>
        <br>
        <div class="pages-count">
          <span>Pages Count</span>
          <span class="all p-count">${e.volumeInfo.pageCount}</span>
        </div>
      </div>
      </div>
      <div class="footer">
        <button class="read">Read</button>
      </div>
                `;
              moreinfo.innerHTML = tamplate;
              let X = document.querySelector(".bx-x");
              let read = document.querySelector(".footer .read");
              X.addEventListener("click", () => {
                // MoreCon.style.display = "none";
                MoreCon.innerHTML = "";
              });
              read.addEventListener("click", () => {
                window.open(`${e.accessInfo.webReaderLink}`, "_blank");
              });
            }
          });
        });
    }, 300);
    // input
  });
}
//   main
main();


