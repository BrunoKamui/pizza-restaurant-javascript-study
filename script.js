const getEl = (el) => document.querySelector(el);
const getAll = (el) => document.querySelectorAll(el);

let cart = [];
let modalCount = 1;
let modalKey = 0;

//Pizza listing
pizzaJson.forEach((item, index) => {
  let pizzaItem = getEl('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('a').setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    let key = e.currentTarget.getAttribute('data-key');
    modalCount = 1;
    modalKey = key;

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

getEl('.pizzaInfo--addButton').addEventListener('click', () => {
  let size = parseInt(getEl('.pizzaInfo--size.selected').getAttribute('data-key'));
  let id = pizzaJson[modalKey].id;
  let identifier = id+'@'+size;

  let key = cart.findIndex((item) => item.identifier === identifier);

  if(key > -1) {
    cart[key].qt += modalCount;
  } else {
    cart.push({
      identifier: identifier,
      id: id,
      size: size,
      qt: modalCount
    })
  }

  updateCart();
  closeModal();
});

// Mobile Cart Events
getEl('.menu-openner span').addEventListener('click', () => {
  if(cart.length > 0) {
    getEl('aside').style.left = '0';
  }
})

getEl('.menu-closer').addEventListener('click', () => {
  getEl('aside').style.left = '100vw';
})

// Cart Events
function updateCart() {
  getEl('.menu-openner span').innerHTML = cart.length;
  
  if(cart.length > 0) {
    getEl('aside').classList.add('show');
    getEl('.cart').innerHTML = '';
    
    let subTotal = 0;
    let discount = 0;
    let total = 0;
    
    for(let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id === cart[i].id);
      subTotal += pizzaItem.price * cart[i].qt;
      
      let cartItem = getEl('.models .cart--item').cloneNode(true);
      
      let pizzaSizeName;
      switch(cart[i].size) {
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
          case 2:
            pizzaSizeName = 'G';
            break;
          }
          
          let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
          
          cartItem.querySelector('img').src = pizzaItem.img;
          cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
          cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
          
          cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
            cart[i].qt += 1;
            updateCart();
          })
          
          cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
            if(cart[i].qt > 1) {
              cart[i].qt -= 1;
            } else {
              cart.splice(i, 1);
            }
            updateCart();
          })
          
          getEl('.cart').append(cartItem);
        }
        
        discount = subTotal * 0.1;
        total = subTotal - discount;
        
        getEl('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2).replace('.', ',')}`
        getEl('.desconto span:last-child').innerHTML = `R$ ${discount.toFixed(2).replace('.', ',')}`
        getEl('.total span:last-child').innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`
        
  } else {
    getEl('aside').classList.remove('show');
    getEl('aside').style.left = '100vw';
  }
}
