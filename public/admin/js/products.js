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
