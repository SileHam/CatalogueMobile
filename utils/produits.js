
export function enrichirProduits(produits) {
  return produits.map((produit) => {
    let statutStock;

    if (produit.stock === 0) {
      statutStock = "Rupture";
    } else if (produit.stock <= 5) {
      statutStock = "Stock faible";
    } else {
      statutStock = "Disponible";
    }

    return {
      ...produit,
      statutStock
    };
  });
}
