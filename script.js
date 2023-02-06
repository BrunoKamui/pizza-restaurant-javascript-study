const getEl = (el) => document.querySelector(el);
const getAll = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  let pizzaItem = getEl('.models .pizza-item').cloneNode(true);
  
  getEl('.pizza-area').append(pizzaItem);
})
