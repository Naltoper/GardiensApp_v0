import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import * as SecureStore from 'expo-secure-store';

export default function SignalementScreen() {
  const [isAnonyme, setIsAnonyme] = useState(true);
  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = async () => {
    if (!desc.trim()) {
      Alert.alert("Erreur", "Veuillez décrire la situation.");
      return;
    }

    setLoading(true);

    // --- GESTION DU TOKEN UNIQUE ---
    let userToken;
    const TOKEN_KEY = 'user_report_token';

    try {
      if (Platform.OS === 'web') {
        // Version Web : Utilisation du localStorage
        userToken = localStorage.getItem(TOKEN_KEY);
        if (!userToken) {
          userToken = "user_" + Math.random().toString(36).slice(2, 9);
          localStorage.setItem(TOKEN_KEY, userToken);
        }
      } else {
        // Version Mobile : Utilisation de SecureStore
        userToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (!userToken) {
          userToken = "user_" + Math.random().toString(36).slice(2, 9);
          await SecureStore.setItemAsync(TOKEN_KEY, userToken);
        }
      }
    } catch (e) {
      console.error("Erreur lors de la gestion du token", e);
      // Fallback au cas où le stockage échoue
      userToken = "temp_" + Math.random().toString(36).slice(2, 9);
    }

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
      Alert.alert("Erreur", "Impossible d'envoyer le signalement. Vérifie ta connexion.");
    } else {
      setIsSent(true); 
      setDesc('');
      setNom('');
    }
  };

  // --- ÉCRAN DE CONFIRMATION ---
  if (isSent) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Text style={{ fontSize: 60 }}>✅</Text>
        </View>
        <Text style={styles.successTitle}>Signalement transmis</Text>
        <Text style={styles.successText}>
          Ta parole a été recueillie avec succès. Les membres de la cellule vont analyser ton message et agir pour t&apos;aider.
        </Text>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => setIsSent(false)}>
          <Text style={styles.btnSecondaryText}>Nouveau signalement</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- FORMULAIRE ---
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Fiche de Signalement</Text>

      <View style={styles.switchContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Rester anonyme ?</Text>
          <Text style={styles.subLabel}>Ton identité sera masquée</Text>
        </View>
        <Switch 
          value={isAnonyme} 
          onValueChange={setIsAnonyme}
          trackColor={{ false: "#767577", true: "#2a9d8f" }}
          thumbColor={isAnonyme ? "#ffffff" : "#f4f3f4"}
        />
      </View>

      {!isAnonyme && (
        <View style={styles.section}>
          <Text style={styles.label}>Ton identité :</Text>
          <TextInput 
            style={styles.inputSmall} 
            placeholder="Nom, Prénom et Classe" 
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
          placeholder="Raconte-nous ce qu'il se passe de la manière la plus précise possible..."
          value={desc}
          onChangeText={setDesc}
        />
      </View>

      <TouchableOpacity 
        style={[styles.btn, { opacity: loading ? 0.5 : 1 }]} 
        onPress={handleSend}
        disabled={loading}
      >
        <Text style={styles.btnText}>{loading ? "Transmission..." : "Envoyer le signalement"}</Text>
      </TouchableOpacity>
      
      {/* Texte dynamique sur la confidentialité */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          {isAnonyme 
            ? "🛡️ Ce signalement est strictement anonyme. Aucune donnée personnelle n'est enregistrée." 
            : "👤 Ce signalement est nominatif. Seuls les intervenants autorisés de la cellule pourront consulter ton nom."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 25, color: '#e63946' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, backgroundColor: '#f0f4f8', borderRadius: 12, marginBottom: 25 },
  section: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: '700', color: '#1d3557' },
  subLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  inputSmall: { borderWidth: 1.5, borderColor: '#e1e8ed', borderRadius: 10, padding: 15, marginTop: 10, fontSize: 16, backgroundColor: '#fdfdfd' },
  inputLarge: { borderWidth: 1.5, borderColor: '#e1e8ed', borderRadius: 10, padding: 15, height: 150, textAlignVertical: 'top', marginTop: 10, fontSize: 16, backgroundColor: '#fdfdfd' },
  btn: { backgroundColor: '#e63946', padding: 20, borderRadius: 12, alignItems: 'center', shadowColor: '#e63946', shadowOpacity: 0.3, shadowRadius: 5, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  
  infoBox: { marginTop: 25, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#457b9d' },
  infoText: { color: '#457b9d', fontSize: 13, lineHeight: 18, fontStyle: 'italic', textAlign: 'center' },
  
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 35, backgroundColor: '#fff' },
  successIcon: { marginBottom: 25 },
  successTitle: { fontSize: 28, fontWeight: 'bold', color: '#2a9d8f', marginBottom: 15, textAlign: 'center' },
  successText: { fontSize: 17, color: '#444', textAlign: 'center', marginBottom: 40, lineHeight: 24 },
  btnSecondary: { paddingVertical: 10, borderBottomWidth: 1.5, borderBottomColor: '#999' },
  btnSecondaryText: { color: '#666', fontWeight: '700', fontSize: 16 }
});