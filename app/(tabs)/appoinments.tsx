import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { appointments } from '@/scripts/utils';

export default function AppointmentsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Agendamentos</ThemedText>
      <FlatList
        data={appointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text style={styles.appointmentText}>Tarefa: {item.appointment}</Text>
            <Text style={styles.appointmentText}>Data: {item.date ?? new Date().toString()}</Text>
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
});
