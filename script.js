const getEl = (el) => document.querySelector(el);
const getAll = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  let pizzaItem = getEl('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('a').setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    let key = e.currentTarget.getAttribute('data-key');

    getEl('.pizzaBig img').src = pizzaJson[key].img;
    getEl('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    getEl('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    getEl('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.', ',')}`;
    
    getAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if(sizeIndex === 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    getEl('.pizzaWindowArea').style.opacity = 0;
    getEl('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      getEl('.pizzaWindowArea').style.opacity = 1;
    }, 200) 
  });
  
  getEl('.pizza-area').append(pizzaItem);
})
