import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Simulation simple : si les champs sont remplis, on redirige
    if (email && password) {
      router.replace('/admin/dashboard');
    } else {
      Alert.alert("Erreur", "Veuillez remplir vos identifiants.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Espace Intervenants</Text>
      <Text style={styles.subtitle}>Connectez-vous pour gérer les signalements.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email professionnel"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1d3557', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30, marginTop: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  loginBtn: { backgroundColor: '#1d3557', padding: 18, borderRadius: 8, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});