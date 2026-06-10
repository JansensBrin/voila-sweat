const app = document.querySelector("#app");
const dialog = document.querySelector("#preview");
const previewImage = document.querySelector("#previewImage");
const previewTitle = document.querySelector("#previewTitle");
const closePreview = document.querySelector("#closePreview");

function labelFromFilename(file) {
  return file
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

for (const product of PRODUCTS) {
  const section = document.createElement("section");
  section.className = "product";

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
      previewImage.src = src;
      previewImage.alt = `${product.code} ${colorName}`;
      previewTitle.textContent = `${product.code} — ${colorName}`;
      dialog.showModal();
    });

    grid.appendChild(card);
  });

  section.appendChild(grid);
  app.appendChild(section);
}

closePreview.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
