import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  const bgColor = '#8bd8efff'; // Définis ta couleur ici une seule fois

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="black" translucent={false} />
      
      <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]} edges={['top', 'bottom']}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#000dbfff' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '800', fontSize: 18 },
            headerShadowVisible: false,
            
            // C'EST CETTE LIGNE QU'IL FAUT CHANGER :
            contentStyle: { backgroundColor: bgColor }, 
          }}
        >
          <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} /> 
          {/* ... reste des écrans */}
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Cette couleur ne se verra que si le Stack ne prend pas toute la place
  },
});