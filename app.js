//GitHub - @killerbean3 - SimpleProductSearch-Javascript
//vars
let filteredProducts = [...products];
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");
const productsContainer = document.querySelector(".products-container");
const companiesDOM = document.querySelector(".companies");

//displaying products
const displayProducts = () => {
  //if statement
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
    return;
  }
  //runs if you have products
  productsContainer.innerHTML = filteredProducts
    .map(({ id, title, image, price }) => {
      return `<article class="product" data-id="${id}">
          <img
            src="${image}"
            class="product-img img"
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">£${price}</span>
          </footer>
        </article>`;
    })
    .join("");
};

//text filter
form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

//button filters
const displayButtons = () => {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];
  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `<button class="company-btn" data-id="${company}">${company}</button>`;
    })
    .join("");
};

companiesDOM.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("company-btn")) {
    if (el.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    searchInput.value = "";
    displayProducts();
  }
});

//invoke functions
displayButtons();
displayProducts();
