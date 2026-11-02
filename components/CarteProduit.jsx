
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet
} from "react-native";

export default function CarteProduit({ produit, onVoirDetails }) {
  let couleurStock;

  if (produit.stock === 0) {
    couleurStock = "#DC2626";
  } else if (produit.stock <= 5) {
    couleurStock = "#D97706";
  } else {
    couleurStock = "#16A34A";
  }

  return (
    <View style={styles.carte}>
      <Image
        source={{ uri: produit.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.titre}>{produit.title}</Text>

      <Text style={styles.info}>
        Catégorie : {produit.category}
      </Text>

      <Text style={styles.info}>
        Note : {produit.rating} / 5
      </Text>

      <Text style={styles.prix}>
        {produit.price.toFixed(2)} UM
      </Text>

      <Text style={[styles.stock, { color: couleurStock }]}>
        {produit.statutStock} : {produit.stock}
      </Text>

      <Pressable
        style={styles.bouton}
        onPress={() => onVoirDetails(produit.id)}
      >
        <Text style={styles.texteBouton}>
          Voir les détails
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  carte: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  image: {
    width: "100%",
    height: 180
  },
  titre: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 10
  },
  info: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5
  },
  prix: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 10
  },
  stock: {
    fontWeight: "bold",
    marginTop: 8
  },
  bouton: {
    backgroundColor: "#2563EB",
    padding: 13,
    borderRadius: 9,
    alignItems: "center",
    marginTop: 15
  },
  texteBouton: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});
