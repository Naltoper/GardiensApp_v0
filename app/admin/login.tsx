import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Lock, Mail, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

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
      // Sur Android 'padding' fonctionne souvent mieux avec un ScrollView pour forcer la remontée
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      // On augmente l'offset pour compenser la barre de chiffres/suggestions
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Bouton Retour */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#64748b" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <View style={styles.innerContainer}>
          <View style={styles.iconHeader}>
            <Lock size={40} color="#023e8a" />
          </View>
          
          <Text style={styles.title}>Espace Intervenants</Text>
          <Text style={styles.subtitle}>
            Connectez-vous pour accéder à la cellule de veille.
          </Text>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email professionnel"
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
              style={styles.loginBtn}
            >
              <Text style={styles.loginBtnText}>Se connecter</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Accès réservé au personnel autorisé.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1, // Important pour que le ScrollView prenne toute la place
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingHorizontal: 24,
    position: 'absolute', // On le sort du flux pour qu'il ne bouge pas trop
    top: 0,
    zIndex: 10,
  },
  backText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  innerContainer: { 
    flex: 1,
    paddingHorizontal: 30, 
    justifyContent: 'center',
    paddingTop: 100, // On laisse de la place pour le bouton retour
    paddingBottom: 50, // Espace de sécurité en bas pour que le bouton remonte bien
  },
  iconHeader: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#023e8a', textAlign: 'center' },
  subtitle: { 
    fontSize: 14, 
    color: '#64748b', 
    textAlign: 'center', 
    marginBottom: 30, 
    marginTop: 8,
    lineHeight: 20 
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
  inputIcon: { marginRight: 12 },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, color: '#1e293b' },
  loginBtnContainer: {
    marginTop: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  loginBtn: { padding: 18, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footerNote: {
    marginTop: 20,
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
  }
});