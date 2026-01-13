import { View, Text, StyleSheet } from 'react-native';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discuter avec un intervenant</Text>
      <Text style={styles.info}>{"L'interface de chat sera disponible ici bientôt pour poser vos questions en direct."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  info: { textAlign: 'center', color: '#666' }
});