import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Chemin ajusté

export default function SignalementScreen() {
  const [isAnonyme, setIsAnonyme] = useState(true);
  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!desc.trim()) {
      Alert.alert("Erreur", "Veuillez décrire la situation.");
      return;
    }

    setLoading(true);

    // Simulation d'un jeton unique pour le chat anonyme 
    // (Dans l'idéal, on utiliserait Expo SecureStore pour le garder en mémoire)
    const userToken = "user_" + Math.random().toString(36).slice(2, 9);

    const { error } = await supabase
      .from('reports')
      .insert([
        { 
          content: desc, 
          is_anonyme: isAnonyme, 
          author_name: isAnonyme ? "Anonyme" : nom,
          user_token: userToken,
          status: "Non traité"
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible d'envoyer le signalement.");
    } else {
      Alert.alert("Succès", "Ton signalement a bien été transmis aux Gardiens.");
      setDesc('');
      setNom('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fiche de Signalement</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Rester anonyme ?</Text>
        <Switch 
          value={isAnonyme} 
          onValueChange={setIsAnonyme}
          trackColor={{ false: "#767577", true: "#2a9d8f" }}
        />
      </View>

      {!isAnonyme && (
        <View style={styles.section}>
          <Text style={styles.label}>Ton Nom / Prénom / Classe :</Text>
          <TextInput 
            style={styles.inputSmall} 
            placeholder="Ex: Jean Dupont, 3ème B" 
            value={nom}
            onChangeText={setNom}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Description des faits :</Text>
        <TextInput
          style={styles.inputLarge}
          multiline
          placeholder="Que s'est-il passé ?"
          value={desc}
          onChangeText={setDesc}
        />
      </View>

      <TouchableOpacity 
        style={[styles.btn, { opacity: loading ? 0.5 : 1 }]} 
        onPress={handleSend}
        disabled={loading}
      >
        <Text style={styles.btnText}>{loading ? "Envoi en cours..." : "Envoyer le signalement"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#e63946' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#f8f9fa', borderRadius: 10, marginBottom: 20 },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  inputSmall: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 },
  inputLarge: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, height: 120, textAlignVertical: 'top' },
  btn: { backgroundColor: '#e63946', padding: 18, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});