import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Hammer } from 'lucide-react-native';

interface DemoRibbonProps {
  isFloating?: boolean; // True = par-dessus tout, False = dans le contenu
}

export default function DemoRibbon({ isFloating = false }: DemoRibbonProps) {
  const containerStyle = isFloating ? styles.floatingContainer : styles.inlineContainer;

  // Fonction qui affiche la boîte d'explication
  const showExplanation = () => {
    Alert.alert(
      "Version de démonstration",
      "Ceci est un prototype de l'application Gardiens Des Calanques. \n\nCertaines fonctionnalités ne sont pas encore implémentées ou sont incomplete. \n\nCe prototype permet d'explorer un apperçu de l'application finale.",
      [{ text: "J'ai compris", style: "default" }]
    );
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity 
        style={styles.ribbon} 
        onPress={showExplanation}
        activeOpacity={0.7}
      >
        <Hammer color="white" size={20} strokeWidth={2.5} />
        <Text style={styles.text}>VERSION DÉMO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  inlineContainer: {
    marginVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  ribbon: {
    flexDirection: 'row',
    alignItems: 'center',
    // Couleur orange/rouge vive avec transparence (0.8)
    backgroundColor: 'rgba(249, 82, 16, 0.76)', 
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    
    // Bordure fine
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});