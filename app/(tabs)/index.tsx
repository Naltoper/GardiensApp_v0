import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  // Liste des boutons du menu principal
  const menuButtons = [
    { 
      title: "Fiche de Signalement", 
      route: "/(tabs)/signalement", 
      color: "#e63946" 
    },
    { 
      title: "Mes signalements", 
      route: "/(tabs)/mes-signalements", 
      color: "#457b9d" 
    },
    { 
      title: "La Cellule", 
      route: "/(tabs)/cellule", 
      color: "#1d3557" 
    },
    { 
      title: "Numéros Utiles", 
      route: "/(tabs)/numeros", 
      color: "#2a9d8f" 
    },
    { 
      title: "Nous Contacter", 
      route: "/(tabs)/contact", 
      color: "#f4a261" 
    },
    { 
      title: "Espace Intervenants", 
      route: "/admin/login", 
      color: "#6d6875" 
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* En-tête de l'application */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Les Gardiens des Calanques</Text>
        <Text style={styles.subtitle}>
          Vous n&apos;êtes pas seuls. Signalez en toute sécurité et suivez vos échanges.
        </Text>
      </View>
      
      {/* Grille de navigation */}
      <View style={styles.grid}>
        {menuButtons.map((btn) => (
          <TouchableOpacity 
            key={btn.route}
            style={[styles.button, { backgroundColor: btn.color }]}
            activeOpacity={0.8}
            onPress={() => router.push(btn.route as any)}
          >
            <Text style={styles.buttonText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Note de bas de page sur l'anonymat */}
      <View style={styles.footer}>
        <Text style={styles.footerNote}>
          Anonymat garanti
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f8f9fa' 
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#005f73', 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    textAlign: 'center', 
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 10
  },
  grid: { 
    width: '100%', 
    gap: 15 
  },
  button: { 
    padding: 20, 
    borderRadius: 15, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 4 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  footer: {
    marginTop: 40,
    paddingBottom: 20
  },
  footerNote: {
    fontSize: 12,
    color: '#aaa',
    fontStyle: 'italic'
  }
});