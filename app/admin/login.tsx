import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Lock, Mail, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email && password) {
      router.replace('/admin/dashboard');
    } else {
      Alert.alert("Erreur", "Veuillez remplir vos identifiants.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Bouton Retour */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <ChevronLeft size={24} color="#64748b" />
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconHeader}>
          <Lock size={40} color="#023e8a" />
        </View>
        
        <Text style={styles.title}>Espace Intervenants</Text>
        <Text style={styles.subtitle}>
          Connectez-vous pour accéder à la cellule de veille et gérer les signalements.
        </Text>

        <View style={styles.inputContainer}>
          <Mail size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Lock size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={handleLogin}
          style={styles.loginBtnContainer}
        >
          <LinearGradient
            colors={["#023e8a", "#0077b6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>Se connecter</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Accès réservé au personnel autorisé du Lycée des Calanques.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  backText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 30, 
    justifyContent: 'center',
    marginTop: -50 // Centre légèrement vers le haut
  },
  iconHeader: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#023e8a', 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#64748b', 
    textAlign: 'center', 
    marginBottom: 40, 
    marginTop: 10,
    lineHeight: 20,
    paddingHorizontal: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: { 
    flex: 1,
    paddingVertical: 15, 
    fontSize: 16, 
    color: '#1e293b' 
  },
  loginBtnContainer: {
    marginTop: 10,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#023e8a',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  loginBtn: { 
    padding: 18, 
    alignItems: 'center' 
  },
  loginBtnText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16,
    letterSpacing: 0.5
  },
  footerNote: {
    marginTop: 30,
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic'
  }
});