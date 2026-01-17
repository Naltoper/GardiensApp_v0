import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldAlert, MessageSquare, Info, Phone, Mail, Lock } from 'lucide-react-native';

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
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* En-tête avec votre logo en rond */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo}
              resizeMode="cover" // "cover" remplit mieux le cercle
            />
          </View>
          <Text style={styles.headerTitle}>Les Gardiens des Calanques</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>
            Un espace sécurisé pour briser le silence. Votre voix compte, votre anonymat est préservé.
          </Text>
        </View>
        
        {/* Grille de navigation */}
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

        {/* Note de réassurance et bas de page */}
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
    backgroundColor: '#f0f9ff',
  },
  container: { 
    flexGrow: 1, 
    padding: 24, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60, // Moitié de la largeur pour faire un cercle parfait
    backgroundColor: '#fff',
    elevation: 8, // Ombre sur Android
    shadowColor: '#000', // Ombre sur iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    padding: 3, // Petit espace entre le bord blanc et le logo
    marginBottom: 15,
    overflow: 'hidden', // Très important pour que l'image soit coupée en rond
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#023e8a', 
    textAlign: 'center',
    letterSpacing: 0.5
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#00b4d8',
    borderRadius: 2,
    marginVertical: 12,
  },
  subtitle: { 
    fontSize: 14, 
    color: '#495057', 
    textAlign: 'center', 
    lineHeight: 20,
    paddingHorizontal: 20
  },
  grid: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12
  },
  button: { 
    padding: 15, 
    borderRadius: 18, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5,
    elevation: 3,
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 25,
    marginBottom: 5,
  },
  halfWidthButton: {
    width: '48%',
    height: 110,
  },
  smallButton: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dee2e6'
  },
  iconContainer: {
    marginBottom: 6,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '700', 
    textAlign: 'center' 
  },
  smallButtonText: {
    color: '#6c757d',
    marginLeft: 10,
    marginBottom: 0
  },
  footer: {
    marginTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#caf0f8'
  },
  footerNote: {
    fontSize: 12,
    color: '#0077b6',
    fontWeight: '600',
    marginLeft: 6
  },
  lyceeNote: {
    fontSize: 10,
    color: '#adb5bd',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center'
  }
});