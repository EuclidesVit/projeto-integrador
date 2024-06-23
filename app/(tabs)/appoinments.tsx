import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getAppointments, complete, Appointment } from '@/scripts/utils';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = () => {
    const fetchedAppointments = getAppointments();
    setAppointments(fetchedAppointments);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAppointments();
    }, [])
  );

  const changeStatus = (index: number, newStatus: 'A fazer' | 'Em andamento' | 'Feita') => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index].status = newStatus;
    if(newStatus === "Feita") {
      complete(index)
    }
    setAppointments(updatedAppointments);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Agendamentos</ThemedText>
      <FlatList
        data={appointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.appointmentItem}>
            <Text style={styles.appointmentText}>Tarefa: {item.appointment}</Text>
            <Text style={styles.appointmentText}>Data: {formatDate(item.date)}</Text>
            <Text style={styles.appointmentText}>Status: {item.status}</Text>
            <View style={styles.statusButtons}>
              <TouchableOpacity onPress={() => changeStatus(index, 'A fazer')}>
                <Text style={styles.buttonText}>A fazer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStatus(index, 'Em andamento')}>
                <Text style={styles.buttonText}>Em andamento</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStatus(index, 'Feita')}>
                <Text style={styles.buttonText}>Feita</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appointmentItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appointmentText: {
    fontSize: 16,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buttonText: {
    color: '#4CAF50',
    fontSize: 14,
  },
});
