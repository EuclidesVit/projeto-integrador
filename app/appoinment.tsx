import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

import { Timer } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { addAppointment } from '@/scripts/utils';

export default function HomeScreen() {
  const [appointment, setAppointment] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const handleSchedule = () => {
    if (appointment && date) {
      const newAppointment = { appointment, date: date.toISOString() };
      addAppointment(newAppointment);
      Alert.alert('Agendamento realizado!', `\nTarefa: ${appointment}\nData: ${date.toLocaleString()}`);
      router.push('/appointments');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

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
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Agende agora a sua tarefa</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Tarefa"
          value={appointment}
          onChangeText={setAppointment}
        />
        <TouchableOpacity onPress={showDateTimePicker}>
          <TextInput
            style={styles.input}
            placeholder="Data e Hora"
            value={date.toLocaleString()}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleSchedule}>
          <ThemedText style={styles.buttonText}>Agendar</ThemedText>
        </TouchableOpacity>
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
  formContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
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
});
