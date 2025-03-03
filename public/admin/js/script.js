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
