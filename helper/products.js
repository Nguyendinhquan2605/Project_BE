module.exports.PriceNew_Products = (products) => {
  const newProducts = products.map((items) => {
    items.priceNew =
      (items.price * (100 - items.discountPercentage)).toFixed(0) / 100;
    return items;
  });
  return newProducts;
};

module.exports.PriceNew_Product = (product) => {
  const priceNew =
    (product.price * (100 - product.discountPercentage)).toFixed(0) / 100;

  return priceNew;
};
