import React from 'react';
import { Image, StyleSheet, Platform, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { Timer } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/Imagembanner.jpg')}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Time Master</ThemedText>
        <Timer />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Agendamento</ThemedText>
        <ThemedText>
        Toque aqui para agendar sua tarefa e ganhar 10 pontos.
        </ThemedText>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/appoinment')}
        >
          <ThemedText style={styles.buttonText}>Agendar Agora</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Missão 2: Explore Funcionalidades</ThemedText>
        <ThemedText>
          Descubra todas as funcionalidades do aplicativo e ganhe 30 pontos.
        </ThemedText>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Explorar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Missão 3: Conquiste uma Badge</ThemedText>
        <ThemedText>
          Complete 5 agendamentos para ganhar a badge de "Iniciante".
        </ThemedText>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Ver Minhas Badges</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Progresso Diário</ThemedText>
        <View style={styles.progressBar}>
          <View style={styles.progress}></View>
        </View>
        <ThemedText>Você está a 2 agendamentos de completar o desafio diário!</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 275,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 8,
  },
  progress: {
    height: '100%',
    width: '60%',
    backgroundColor: '#4CAF50',
  },
});
