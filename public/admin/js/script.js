// Buttons status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  //   console.log(url);

  buttonStatus.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      //   console.log(status);

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      console.log(url);
      window.location.href = url.href;
    });
  });
}
// console.log(buttonStatus);

// Form Search
const formSearch = document.querySelector("#form-search");
let url = new URL(window.location.href);

if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
// console.log(buttonPagination);
if (buttonPagination) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      console.log(page);

      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }

      window.location.href = url.href;
    });
  });
}
// End Pagination
