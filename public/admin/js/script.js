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

// Check box multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = document.querySelector("input[name = 'checkall']");
  // console.log(inputCheckAll);
  const inputsId = document.querySelectorAll("input[name = 'id']");
  // console.log(inputsId);

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = document.querySelectorAll(
        "input[name = 'id']:checked"
      ).length;
      // console.log("check count: ", countChecked);
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End Check box multi

// Form change Multi Status
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    console.log(checkboxMulti);
    const inputsChecked = document.querySelectorAll(
      "input[name = 'id']:checked"
    );
    // console.log(inputsChecked.length);

    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm");

      if (!isConfirm) {
        return;
      }
    }
    // console.log(typeChange);

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = document.querySelector("input[name = 'ids']");

      inputsChecked.forEach((input) => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          // console.log(`${id}-${position}`);
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      // console.log(ids.join(", "));
      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Chọn ít nhất một bản ghi");
    }
  });
}
//End Form change Multi Status

//Show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  // console.log(showAlert);
}
//End Show-alert

//upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImage_input = document.querySelector("[upload-image-input]");
  const uploadImage_preview = document.querySelector("[upload-image-preview]");

  uploadImage_input.addEventListener("change", (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      uploadImage_preview.src = URL.createObjectURL(file);
    }
  });
}
//End upload Image

//Delete file
const deleteFile = document.querySelector("[delete-file]");
if (deleteFile) {
  console.log(deleteFile);
  deleteFile.addEventListener("click", () => {
    const uploadImage_input = document.querySelector("[upload-image-input]");
    const uploadImage_preview = document.querySelector(
      "[upload-image-preview]"
    );
    if (uploadImage_input && uploadImage_preview) {
      uploadImage_input.value = "";
      uploadImage_preview.src = "";
    }
  });
}
//End Delete file

// Sort
const sort = document.querySelector("[sort]");
if (sort) {
  const sortSelect = document.querySelector("[sort-select]");
  const sortClear = document.querySelector("[sort-clear]");

  // sắp xếp
  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortKey, sortValue] = value.split("-");
    // console.log(sortKey);
    // console.log(sortValue);
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  });

  // Xóa sắp xếp
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url.href;
  });

  // Thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if (sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`;
    // console.log(stringSort);
    const optionSelected = sortSelect.querySelector(
      `option[value="${stringSort}"]`
    );
    console.log(optionSelected);
    optionSelected.selected = true;
  }
}
// End Sort
