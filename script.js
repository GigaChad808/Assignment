const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
let allProducts = []; 

function filterProducts(products) {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value.toLowerCase();

  return products.filter(product =>
    (product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)) &&
    (selectedCategory === '' || product.category.toLowerCase() === selectedCategory)
  );
}

function displayProducts(products) {

  productsContainer.innerHTML = '';

  
  const filteredProducts = filterProducts(products);

  filteredProducts.forEach(product => {
    
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>Price: $${product.price}</p>
      <p>Discount: ${product.discountPercentage}%</p>
      <p>Category: ${product.category}</p>
      <button onclick="showProductDetails(${product.id})">View Details</button>
    `;
    productsContainer.appendChild(productCard);
  });
}

fetch('https://dummyjson.com/products') 
  .then(response => response.json())
  .then(data => {
    allProducts = data.products; 

   
    displayProducts(allProducts);

   
    const categories = [...new Set(data.products.map(product => product.category))];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  
  });


searchInput.addEventListener('input', () => {
  displayProducts(allProducts); 
});

categorySelect.addEventListener('change', () => {
  displayProducts(allProducts); 
});



function showProductDetails(productId) {
  
  const selectedProduct = allProducts.find(product => product.id === productId);

 
  const modalContent = document.createElement('div');
  modalContent.innerHTML = `
    <h2>${selectedProduct.title}</h2>
    <img src="${selectedProduct.thumbnail}" alt="${selectedProduct.title}" />
    <p>Description: ${selectedProduct.description}</p>
    <p>Price: $${selectedProduct.price}</p>
    <p>Discount: ${selectedProduct.discountPercentage}%</p>
    <p>Category: ${selectedProduct.category}</p>
  

    <button onclick="closeProductDetails()">Close</button>
  `;

 
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.appendChild(modalContent);


  document.body.appendChild(modal);

  
  modalContent.querySelector('button').addEventListener('click', () => {
    document.body.removeChild(modal); 
  });
}