import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function NumerosScreen() {
  const call = (num: string) => Linking.openURL(`tel:${num}`);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Numéros d'urgence"}</Text>
      
      <TouchableOpacity style={styles.card} onPress={() => call('3020')}>
        <Text style={styles.cardTitle}>Non au Harcèlement</Text>
        <Text style={styles.cardNumber}>3020</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => call('3018')}>
        <Text style={styles.cardTitle}>Cyber-Harcèlement</Text>
        <Text style={styles.cardNumber}>3018</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f1faee' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#2a9d8f' },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardNumber: { fontSize: 24, fontWeight: 'bold', color: '#2a9d8f' }
});