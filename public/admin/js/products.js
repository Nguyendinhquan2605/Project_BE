//Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  buttonsChangeStatus.forEach((buttons) => {
    buttons.addEventListener("click", () => {
      const statusCurrent = buttons.getAttribute("data-status");
      const id = buttons.getAttribute("data-id");
      // console.log(statusCurrent);
      // console.log(id);
      const statusChange = statusCurrent === "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
//End Change Status

// Delete-Item
const buttonsDelete = document.querySelectorAll("[button-delete ]");
if (buttonsDelete.length > 0) {
  // console.log(buttonsDelete);
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  // console.log(path);
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này");

      if (isConfirm) {
        const id = button.getAttribute("data-id");
        console.log(">>> check id: ", id);
        const action = path + `/${id}?_method=DELETE`;
        console.log(action);
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
// End Delete-Item
