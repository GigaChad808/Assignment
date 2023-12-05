const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
let allProducts = []; 



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