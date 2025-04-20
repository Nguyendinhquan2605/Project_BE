//Cập nhật số lượng trong giỏ hàng
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
if (inputsQuantity.length > 0) {
  inputsQuantity.forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = input.getAttribute("product-id");
      const quantity = parseInt(input.value);
      console.log(productId);
      console.log(quantity);

      if (quantity > 0) {
        window.location.href = `/cart/update/${productId}/${quantity}`;
      }
    });
  });
}
//Cập nhật số lượng trong giỏ hàng
