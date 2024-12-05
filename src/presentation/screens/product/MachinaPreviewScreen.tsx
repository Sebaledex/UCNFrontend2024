import React, { useEffect, useState } from "react";
import { Layout, Text, Card, Divider, Spinner, Button, Select, SelectItem } from "@ui-kitten/components";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigator";
import { Machine } from "../../../domain/entities/machine.entity";
import { useMachineStore } from "../../store/useMachineStore";

export const MachinaPreviewScreen = () => {
  const { machines, fetchAllMachines, error } = useMachineStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [selectedArea, setSelectedArea] = useState<"Administracion" | "Transporte" | "Reparto" | null>(null);

  // Filtrar máquinas por área seleccionada
  const filteredMachines = selectedArea ? machines.filter(machine => machine.area === selectedArea) : machines;

  useEffect(() => {
    fetchAllMachines();
  }, []);

  if (error) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">{error}</Text>
        <Button onPress={fetchAllMachines}>Reintentar</Button>
      </Layout>
    );
  }

  if (machines.length === 0) {
    return (
      <Layout style={styles.centered}>
        <Spinner size="large" />
      </Layout>
    );
  }

  const renderMachineItem = ({ item }: { item: Machine }) => (
    <Card style={styles.card} status="info">
      <Text style={styles.title}>{item.patente}</Text>
      <Divider />
      <Text>{item.area}</Text>
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Layout style={styles.selectContainer}>
          <Text category="h6">Selecciona un área:</Text>
          <Select
            placeholder="Selecciona un área"
            value={selectedArea}
            onSelect={(index) => setSelectedArea(index.row === 0 ? "Administracion" : index.row === 1 ? "Transporte" : "Reparto")}
          >
            <SelectItem title="Administración" />
            <SelectItem title="Transporte" />
            <SelectItem title="Reparto" />
          </Select>
        </Layout>

        <FlatList
          data={filteredMachines}
          keyExtractor={(item) => item._id}
          renderItem={renderMachineItem}
          ItemSeparatorComponent={() => <Divider />}
        />
      </ScrollView>

      <Button
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        Volver Al Home
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 100,
  },
  selectContainer: {
    marginBottom: 20,
  },
});