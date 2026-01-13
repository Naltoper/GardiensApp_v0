import { ScrollView, Text, StyleSheet } from 'react-native';

export default function CelluleScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Qui sommes-nous ?</Text>
      <Text style={styles.text}>
        {`"Les Gardiens des Calanques" est une cellule dédiée à la lutte contre le harcèlement scolaire. 
        Notre mission est d'écouter, protéger et agir pour que chaque élève se sente en sécurité.`}
      </Text>
      <Text style={styles.subtitle}>Nos engagements :</Text>
      <Text style={styles.item}>• Anonymat total des élèves.</Text>
      <Text style={styles.item}>• Réponse rapide des intervenants.</Text>
      <Text style={styles.item}>• Soutien psychologique et médiation.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#457b9d', marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  text: { fontSize: 16, lineHeight: 24, color: '#333' },
  item: { fontSize: 16, marginTop: 10, color: '#555' }
});