import React, { useEffect, useState } from "react";
import { Layout, Text, Input, Button, Card, Divider, Spinner } from "@ui-kitten/components";
import { FlatList, StyleSheet } from "react-native";
import { useMachineStore } from "../../store/useMachineStore";
import { Machine } from "../../../domain/entities/machine.entity";

export const ProductScreen = () => {
  const { machines, fetchAllMachines, addMachine, error } = useMachineStore();
  const [patente, setPatente] = useState("");
  const [area, setArea] = useState<"Administracion" | "Transporte" | "Reparto">("Administracion");

  useEffect(() => {
    fetchAllMachines();
  }, []);

  const handleAddMachine = () => {
    if (patente && area) {
      addMachine(patente, area);
      setPatente("");
    }
  };

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
      <FlatList
        data={machines}
        keyExtractor={(item) => item._id}
        renderItem={renderMachineItem}
        ItemSeparatorComponent={() => <Divider />}
      />
      <Divider />
      <Input
        placeholder="Patente"
        value={patente}
        onChangeText={setPatente}
        style={styles.input}
      />
      <Input
        placeholder="Área (Administracion, Transporte, Reparto)"
        value={area}
        onChangeText={(text) => setArea(text as any)}
        style={styles.input}
      />
      <Button onPress={handleAddMachine} disabled={!patente || !area}>
        Agregar Máquina
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
  input: {
    marginVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});