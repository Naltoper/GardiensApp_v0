import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldAlert, MessageSquare, Info, Phone, Mail, Lock } from 'lucide-react-native'; // Optionnel : installez lucide-react-native

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const menuButtons = [
    { title: "Fiche de Signalement", route: "/(tabs)/signalement", color: "#0077b6", icon: <ShieldAlert color="white" size={28} />, fullWidth: true },
    { title: "Mes signalements", route: "/(tabs)/mes-signalements", color: "#0096c7", icon: <MessageSquare color="white" size={24} /> },
    { title: "La Cellule", route: "/(tabs)/cellule", color: "#00b4d8", icon: <Info color="white" size={24} /> },
    { title: "Numéros Utiles", route: "/(tabs)/numeros", color: "#48cae4", icon: <Phone color="white" size={24} /> },
    { title: "Nous Contacter", route: "/(tabs)/contact", color: "#90e0ef", icon: <Mail color="white" size={24} /> },
    { title: "Espace Intervenants", route: "/admin/login", color: "#6c757d", icon: <Lock color="white" size={20} />, small: true },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* En-tête avec identité visuelle */}
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
             {/* Vous pourrez mettre ici le logo du lycée */}
             <Text style={styles.logoText}>GC</Text>
          </View>
          <Text style={styles.headerTitle}>Les Gardiens des Calanques</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>
            Un espace sécurisé pour briser le silence. Votre voix compte, votre anonymat est préservé.
          </Text>
        </View>
        
        {/* Grille de navigation optimisée */}
        <View style={styles.grid}>
          {menuButtons.map((btn, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.button, 
                { backgroundColor: btn.color },
                btn.fullWidth ? styles.fullWidthButton : styles.halfWidthButton,
                btn.small && styles.smallButton
              ]}
              activeOpacity={0.85}
              onPress={() => router.push(btn.route as any)}
            >
              <View style={styles.iconContainer}>{btn.icon}</View>
              <Text style={[styles.buttonText, btn.small && styles.smallButtonText]}>
                {btn.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note de réassurance */}
        <View style={styles.footer}>
          <View style={styles.securityBadge}>
            <Lock size={14} color="#0077b6" />
            <Text style={styles.footerNote}>Espace 100% anonyme et sécurisé</Text>
          </View>
          <Text style={styles.lyceeNote}>Projet du Lycée des Calanques de Marseille</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f9ff', // Bleu très clair (eau cristalline)
  },
  container: { 
    flexGrow: 1, 
    padding: 24, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 35,
    paddingTop: 20,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0077b6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  logoText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  headerTitle: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#023e8a', 
    textAlign: 'center',
    letterSpacing: 0.5
  },
  divider: {
    width: 50,
    height: 4,
    backgroundColor: '#caf0f8',
    borderRadius: 2,
    marginVertical: 15,
  },
  subtitle: { 
    fontSize: 15, 
    color: '#495057', 
    textAlign: 'center', 
    lineHeight: 22,
    paddingHorizontal: 15
  },
  grid: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12
  },
  button: { 
    padding: 20, 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8,
    elevation: 3,
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 30,
    marginBottom: 8,
  },
  halfWidthButton: {
    width: '48%',
    height: 120,
  },
  smallButton: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#edf2f4',
  },
  iconContainer: {
    marginBottom: 8,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 15, 
    fontWeight: '700', 
    textAlign: 'center' 
  },
  smallButtonText: {
    color: '#6c757d',
    marginLeft: 10,
    marginBottom: 0
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 30,
    alignItems: 'center',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  footerNote: {
    fontSize: 13,
    color: '#0077b6',
    fontWeight: '600',
    marginLeft: 6
  },
  lyceeNote: {
    fontSize: 11,
    color: '#adb5bd',
    textTransform: 'uppercase',
    letterSpacing: 1
  }
});