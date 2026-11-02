
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Switch,
  TextInput,
  View
} from "react-native";

import { chargerProduits } from "./services/api";
import { enrichirProduits } from "./utils/produits";
import CarteProduit from "./components/CarteProduit";

export default function App() {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("Toutes");
const [enStockUniquement, setEnStockUniquement] = useState(false);
  const categories = [
    "Toutes",
    ...new Set(produits.map((produit) => produit.category))
  ];

  
const produitsFiltres = produits.filter((produit) => {
  const correspondNom = produit.title
    .toLowerCase()
    .includes(recherche.trim().toLowerCase());

  const correspondCategorie =
    categorie === "Toutes" ||
    produit.category === categorie;

  const correspondStock =
    !enStockUniquement || produit.stock > 0;

  return correspondNom && correspondCategorie && correspondStock;
});


  async function recupererProduits() {
    setChargement(true);
    setErreur(null);

    try {
      const liste = await chargerProduits();
      setProduits(enrichirProduits(liste));
    } catch (e) {
      setErreur(e.message);
    } finally {
      setChargement(false);
    }
  }

  useEffect(() => {
    recupererProduits();
  }, []);

  function voirDetails(id) {
    const produit = produits.find((p) => p.id === id);

    if (produit) {
      Alert.alert("Produit sélectionné", produit.title);
    }
  }

  return (
    <SafeAreaView style={styles.conteneur}>
      <Text style={styles.titre}>CatalogueMobile</Text>

      {chargement ? (
        <View style={styles.centre}>
          <ActivityIndicator size="large" />
          <Text>Chargement...</Text>
        </View>
      ) : erreur ? (
        <View style={styles.centre}>
          <Text>{erreur}</Text>
          <Button title="Réessayer" onPress={recupererProduits} />
        </View>
      ) : (
        <>
          <TextInput
            style={styles.recherche}
            placeholder="Rechercher un produit..."
            value={recherche}
            onChangeText={setRecherche}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.listeCategories}
            contentContainerStyle={styles.contenuCategories}
          >
            {categories.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.boutonCategorie,
                  categorie === cat && styles.categorieActive
                ]}
                onPress={() => setCategorie(cat)}
              >
                <Text
                  style={[
                    styles.texteCategorie,
                    categorie === cat && styles.texteCategorieActive
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.compteur}>
            {produitsFiltres.length} résultat(s)
          </Text>


<View style={styles.ligneStock}>
  <Text style={styles.texteStock}>
    En stock uniquement
  </Text>

  <Switch
    value={enStockUniquement}
    onValueChange={setEnStockUniquement}
  />
</View>

          <ScrollView
            style={styles.liste}
            contentContainerStyle={styles.contenuListe}
          >
            {produitsFiltres.length === 0 ? (
              <Text style={styles.aucunResultat}>
                Aucun produit trouvé
              </Text>
            ) : (
              produitsFiltres.map((produit) => (
                <CarteProduit
                  key={produit.id}
                  produit={produit}
                  onVoirDetails={voirDetails}
                />
              ))
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6"
  },
  titre: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12
  },
  compteur: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 15
  },
  centre: {
    alignItems: "center",
    gap: 12
  },
  liste: {
    flex: 1
  },
  contenuListe: {
    paddingBottom: 30
  },
  recherche: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15
  },
  listeCategories: {
    flexGrow: 0,
    marginBottom: 15
  },
  contenuCategories: {
    gap: 8,
    paddingRight: 16
  },
  boutonCategorie: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB"
  },
  categorieActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB"
  },
  texteCategorie: {
    color: "#374151"
  },
  texteCategorieActive: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  aucunResultat: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#6B7280"
  },
  
ligneStock: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  padding: 12,
  borderRadius: 10,
  marginBottom: 15
},
texteStock: {
  fontSize: 16,
  color: "#374151"
}

});
