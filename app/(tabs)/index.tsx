import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const menuButtons = [
    { title: "Fiche de Signalement", route: "/signalement", color: "#e63946" },
    { title: "La Cellule", route: "/cellule", color: "#457b9d" },
    { title: "Numéros Utiles", route: "/numeros", color: "#2a9d8f" },
    { title: "Nous Contacter", route: "/contact", color: "#f4a261" },
    { title: "Espace Intervenants", route: "/admin/login", color: "#1d3557" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>{"Les Gardiens des Calanques"}</Text>
      <Text style={styles.subtitle}>{"Vous n'êtes pas seuls. Signalez en toute sécurité."}</Text>
      
      <View style={styles.grid}>
        {menuButtons.map((btn) => (
          <TouchableOpacity 
            key={btn.route}
            style={[styles.button, { backgroundColor: btn.color }]}
            onPress={() => router.push(btn.route as any)}
          >
            <Text style={styles.buttonText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 20, backgroundColor: '#f8f9fa' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#005f73', marginTop: 40 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40, marginTop: 10 },
  grid: { width: '100%', gap: 15 },
  button: { padding: 20, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }
});