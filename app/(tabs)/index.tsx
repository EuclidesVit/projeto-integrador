import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getAppointments, Appointment } from '@/scripts/utils';

export default function HomeScreen() {
  const router = useRouter();
  const [doneTasksCount, setDoneTasksCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointmentsAndCalculate = () => {
      const fetchedAppointments = getAppointments();
      const countDoneTasks = fetchedAppointments.filter(appointment => appointment.status === 'Feita').length;
      const points = fetchedAppointments.reduce((total, appointment) => total + (appointment.points || 0), 0);
      setDoneTasksCount(countDoneTasks);
      setTotalPoints(points);
    };

    fetchAppointmentsAndCalculate();
  }, [appointments]);

  const progress = (doneTasksCount / 5) * 100;

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
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Agendamento</ThemedText>
        <ThemedText>
          Toque aqui para agendar sua tarefa e ganhar 3 pontos.
        </ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/appoinment')}>
          <ThemedText style={styles.buttonText}>Agendar Agora</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Acompanhamento de tarefas</ThemedText>
        <ThemedText>
          Descubra todas as tarefas a fazer, em processo e feitas.
        </ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/explorer")}>
          <ThemedText style={styles.buttonText}>Explorar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Sua Pontuação</ThemedText>
        <ThemedText>
          Você tem {totalPoints} pontos. Conclua mais tarefas para ganhar mais pontos.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Progresso Diário</ThemedText>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]}></View>
        </View>
        <ThemedText>Você está a {5 - doneTasksCount} agendamentos de completar o desafio diário!</ThemedText>
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
    backgroundColor: '#4CAF50',
  },
});
