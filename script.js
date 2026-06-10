const app = document.querySelector("#app");
const dialog = document.querySelector("#preview");
const previewImage = document.querySelector("#previewImage");
const previewTitle = document.querySelector("#previewTitle");
const closePreview = document.querySelector("#closePreview");
const productSelect = document.querySelector("#productSelect");

function labelFromFilename(file) {
  return file
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function openPreview(src, product, colorName) {
  previewImage.src = src;
  previewImage.alt = `${product.code} ${colorName}`;
  previewTitle.textContent = `${product.name} — ${colorName}`;
  dialog.showModal();
}

const allProductsOption = document.createElement("option");
allProductsOption.value = "all";
allProductsOption.textContent = "Tous";
productSelect.appendChild(allProductsOption);

PRODUCTS.forEach(product => {
  const option = document.createElement("option");
  option.value = product.code;
  option.textContent = `${product.name} (${product.code})`;
  productSelect.appendChild(option);
});

for (const product of PRODUCTS) {
  const section = document.createElement("section");
  section.className = "product";
  section.dataset.productCode = product.code;

  const title = document.createElement("h2");
  title.textContent = `${product.code} — ${product.name}`;
  section.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "grid";

  product.images.forEach(file => {
    const colorName = labelFromFilename(file);
    const src = `images/${product.code}/${file}`;

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${src}" alt="${product.code} ${colorName}" loading="lazy">
      <p>${colorName}</p>
    `;

    card.addEventListener("click", () => {
      openPreview(src, product, colorName);
    });

    grid.appendChild(card);
  });

  section.appendChild(grid);
  app.appendChild(section);
}

productSelect.addEventListener("change", () => {
  document.querySelectorAll(".product").forEach(section => {
    section.hidden =
      productSelect.value !== "all" &&
      section.dataset.productCode !== productSelect.value;
  });
});

closePreview.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
