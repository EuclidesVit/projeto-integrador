import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { useRouter } from 'expo-router';

import { Timer } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getAppointments, Appointment } from '@/scripts/utils';

export default function ExplorerScreen() {
  const [columns, setColumns] = useState([
    { id: '1', title: 'A fazer', tasks: [] },
    { id: '2', title: 'Em andamento', tasks: [] },
    { id: '3', title: 'Feitas', tasks: [] }
  ]);

  const router = useRouter();

  useEffect(() => {
    const fetchedAppointments = getAppointments();
    const updatedColumns: any = [
      { id: '1', title: 'A fazer', tasks: fetchedAppointments.filter(appointment => appointment.status === 'A fazer') },
      { id: '2', title: 'Em andamento', tasks: fetchedAppointments.filter(appointment => appointment.status === 'Em andamento') },
      { id: '3', title: 'Feitas', tasks: fetchedAppointments.filter(appointment => appointment.status === 'Feita') }
    ];
    setColumns(updatedColumns);
  }, []);

  const renderColumn = ({ item: column }: ListRenderItemInfo<typeof columns[0]>) => (
    <View style={styles.column}>
      <ThemedText type="subtitle">{column.title}</ThemedText>
      {column.tasks.map((task: Appointment, index: number) => (
        <View key={`${task.appointment}-${index}`} style={styles.taskCard}>
          <ThemedText>{task.appointment}</ThemedText>
          <ThemedText>{new Date(task.date).toLocaleString()}</ThemedText>
        </View>
      ))}
    </View>
  );

  const ListHeaderComponent = () => (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.titleRow}>
        <ThemedText type="title"style={styles.titleText}>
          Lista de Tarefas
        </ThemedText>
        <Timer></Timer>
      </View>
    </ThemedView>
  );

  return (
    <FlatList
      data={columns}
      renderItem={renderColumn}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      style={styles.board}
      contentContainerStyle={styles.boardContent}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#ddd'
  },

  titleText: {
    fontSize: 24,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginRight: 5
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  board: {
    flex: 1,
  },

  boardContent: {
    padding: 16,
  },

  column: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2
  },

  taskCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fafafa',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

});
