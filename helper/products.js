module.exports.PriceNew_Products = (products) => {
  const newProducts = products.map((items) => {
    items.priceNew =
      (items.price * (100 - items.discountPercentage)).toFixed(0) / 100;
    return items;
  });
  return newProducts;
};
