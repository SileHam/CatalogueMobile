
export async function chargerProduits() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des produits");
    }

    const data = await response.json();

    return data.products;
  } catch (erreur) {
    throw new Error("Impossible de charger les produits : " + erreur.message);
  }
}
