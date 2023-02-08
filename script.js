const getEl = (el) => document.querySelector(el);
const getAll = (el) => document.querySelectorAll(el);

let modalCount = 1

//Pizza listing
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
    modalCount = 1

    getEl('.pizzaBig img').src = pizzaJson[key].img;
    getEl('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    getEl('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    getEl('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.', ',')}`;
    getEl('.pizzaInfo--size.selected').classList.remove('selected');
    
    getAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if(sizeIndex === 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    getEl('.pizzaInfo--qt').innerHTML = modalCount;

    getEl('.pizzaWindowArea').style.opacity = 0;
    getEl('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      getEl('.pizzaWindowArea').style.opacity = 1;
    }, 200) 
  });
  
  getEl('.pizza-area').append(pizzaItem);
});

// Modal Events
function closeModal() {
  getEl('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    getEl('.pizzaWindowArea').style.display = 'none';
  }, 500);
};

getAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((button) => {
  button.addEventListener('click', closeModal);
});

getEl('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalCount += 1;
  getEl('.pizzaInfo--qt').innerHTML = modalCount;
});

getEl('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if(modalCount > 1) {
    modalCount -= 1;
    getEl('.pizzaInfo--qt').innerHTML = modalCount;
  };
});

getAll('.pizzaInfo--size').forEach((size) => {
  size.addEventListener('click', (e) => {
    getEl('.pizzaInfo--size.selected').classList.remove('selected');
    e.currentTarget.classList.add('selected');
  });
});
