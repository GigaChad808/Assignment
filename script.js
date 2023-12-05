// Retrieving necessary DOM elements
const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');

// Array to store all products retrieved from the API
let allProducts = []; 

// Function to filter products based on search input and category selection
function filterProducts(products) {
  // Retrieving search term and selected category, converting to lowercase for case-insensitive comparison
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value.toLowerCase();

  // Filtering products based on the search term and selected category
  return products.filter(product =>
    (product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)) &&
    (selectedCategory === '' || product.category.toLowerCase() === selectedCategory)
  );
}

// Function to display products based on filter criteria
function displayProducts(products) {
  // Clearing the products container before displaying new products
  productsContainer.innerHTML = '';

  // Filtering products based on the search term and selected category
  const filteredProducts = filterProducts(products);

  // Displaying each filtered product in the products container
  filteredProducts.forEach(product => {
    // Creating a product card element
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    // Populating product card HTML with product information
    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>Price: $${product.price}</p>
      <p>Discount: ${product.discountPercentage}%</p>
      <p>Category: ${product.category}</p>
      <button onclick="showProductDetails(${product.id})">View Details</button>
    `;
    // Appending product card to the products container
    productsContainer.appendChild(productCard);
  });
}

// Fetching product data from an API
fetch('https://dummyjson.com/products') 
  .then(response => response.json())
  .then(data => {
    // Storing all retrieved products
    allProducts = data.products; 

    // Displaying all products initially
    displayProducts(allProducts);

    // Extracting unique categories from the products and populating the category select element
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

// Event listener for search input to display products based on updated search term
searchInput.addEventListener('input', () => {
  displayProducts(allProducts); 
});

// Event listener for category select to display products based on selected category
categorySelect.addEventListener('change', () => {
  displayProducts(allProducts); 
});

// Function to display detailed information of a selected product in a modal
function showProductDetails(productId) {
  // Finding the selected product from all products based on its ID
  const selectedProduct = allProducts.find(product => product.id === productId);

  // Creating modal content with detailed product information
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.innerHTML = `
    <h2>${selectedProduct.title}</h2>
    <img src="${selectedProduct.thumbnail}" alt="${selectedProduct.title}" />
    <p>Description: ${selectedProduct.description}</p>
    <p>Price: $${selectedProduct.price}</p>
    <p>Discount: ${selectedProduct.discountPercentage}%</p>
    <p>Category: ${selectedProduct.category}</p>
    <p>Stock: ${selectedProduct.stock}</p>
    <p>Rating: ${selectedProduct.rating}</p>
    <p>Brand: ${selectedProduct.brand}</p>
    <button onclick="closeProductDetails()">Close</button>
  `;

  // Creating a modal element and appending the modal content to it
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display= 'flex';
  modal.appendChild(modalContent);

  // Appending the modal to the document body
  document.body.appendChild(modal);

  // Adding an event listener to the close button within the modal to remove the modal from the document body
  modalContent.querySelector('button').addEventListener('click', () => {
    document.body.removeChild(modal); 
  });
}

// Function to close the product details modal
function closeProductDetails() {
  // Removing the modal from the document body
  const modal = document.querySelector('.modal');
  document.body.removeChild(modal);
}
