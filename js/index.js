// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  const priceElement = product.querySelector('.price span');
  const quantityElement = product.querySelector('.quantity input');

  const price = parseFloat(priceElement.innerText);
  const quantity = parseInt(quantityElement.value);

  const subtotal = price * quantity;

  const subtotalElement = product.querySelector('.subtotal span');
  subtotalElement.innerText = subtotal.toFixed(2);

  return subtotal;
}

function calculateAll() {

  const singleProduct = document.querySelector('.product');
  updateSubtotal(singleProduct);
  const products = document.querySelectorAll('.product'); // Select all products
  let total = 0;

  products.forEach(product => {
    total += updateSubtotal(product); 
  });

  // ITERATION 3: Update the total value in the DOM
  const totalElement = document.querySelector('#total-value span'); 
  totalElement.innerText = total.toFixed(2); 
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);

  const productRow = target.closest('.product');
  productRow.remove();

  calculateAll();
}

function addRemoveListeners() {
  const removeBtns = document.querySelectorAll('.btn-remove');
  removeBtns.forEach(button => {
    button.addEventListener('click', removeProduct);
  });
}

// ITERATION 5

function createProduct() {
  const nameInput = document.querySelector('.create-product input[type="text"]');
  const priceInput = document.querySelector('.create-product input[type="number"]');
  const name = nameInput.value;
  const price = parseFloat(priceInput.value).toFixed(2);

  if (!name || price <= 0) {
    alert('Please enter valid product details');
    return;
  }

  const tableBody = document.querySelector('#cart tbody');
  const newRow = document.createElement('tr');
  newRow.classList.add('product');
  newRow.innerHTML = `
    <td class="name"><span>${name}</span></td>
    <td class="price">$<span>${price}</span></td>
    <td class="quantity"><input type="number" value="0" min="0" placeholder="Quantity" /></td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action"><button class="btn btn-remove">Remove</button></td>
  `;

  tableBody.appendChild(newRow);

  addRemoveListeners();

  nameInput.value = '';
  priceInput.value = '';
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  
  addRemoveListeners();

  const createBtn = document.getElementById('create');
  createBtn.addEventListener('click', createProduct);
});
