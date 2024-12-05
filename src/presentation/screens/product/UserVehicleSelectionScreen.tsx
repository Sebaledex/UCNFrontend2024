import React, { useEffect, useState } from "react";
import {
  Layout,
  Text,
  Card,
  Divider,
  Spinner,
  Button,
  Modal,
} from "@ui-kitten/components";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";
import { useMachineStore } from "../../store/useMachineStore";
import { Machine } from "../../../domain/entities/machine.entity";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigator";

export const UserVehicleSelectionScreen = () => {
  const { machines, fetchAllMachines, error } = useMachineStore();
  const { user, status } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(status === "checking");
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "UserVehicleSelectionScreen">>();
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Filtrar máquinas por área del usuario
  const filteredMachines = user
    ? machines.filter((machine) => machine.area === user.area)
    : [];

  useEffect(() => {
    fetchAllMachines();
  }, []);

  const handleMachinePress = (machine: Machine) => {
    setSelectedMachine(machine); // Almacena la máquina seleccionada
    setModalVisible(true); // Muestra el modal
  };

  const handleConfirmSelection = () => {
    const { id } = route.params; // ID del cuestionario
    const machinePatente = selectedMachine?.patente || "unknown"; // Patente de la máquina
  
    // Log de las variables
    console.log("Navegando con los parámetros:");
    console.log("ID del cuestionario:", id || "unknown");
    console.log("Patente de la máquina:", machinePatente);
    console.log("ID del usuario:", user?.id || "unknown");
  
    // Navegación a la pantalla de detalles
    navigation.navigate("QuestionDetailScreen", {
      id: id || "unknown", // ID del cuestionario
      machinePatente,
      userId: user?.id || "unknown", // ID del usuario
    });
  
    setModalVisible(false);
  };
  
  const renderMachineItem = ({ item }: { item: Machine }) => (
    <Card
      style={styles.machineCard}
      status="info"
      onPress={() => handleMachinePress(item)}
    >
      <Text style={styles.machineTitle}>{item.patente}</Text>
      <Divider />
      <Text>{item.area}</Text>
    </Card>
  );

  if (loading) {
    return (
      <Layout style={styles.centered}>
        <Spinner size="large" />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">{error}</Text>
        <Button onPress={fetchAllMachines}>Reintentar</Button>
      </Layout>
    );
  }

  if (machines.length === 0 || filteredMachines.length === 0) {
    return (
      <Layout style={styles.centered}>
        <Text>No hay máquinas disponibles para tu área.</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Barra azul superior */}
        <View style={styles.header}>
          <Text category="h5" style={styles.headerText}>
            Datos del Usuario
          </Text>
        </View>

        {/* Mostrar datos del usuario */}
        <View style={styles.userInfo}>
          <Text style={styles.userText}>
            ID: <Text style={styles.userInfoBold}>{user?.id || "No disponible"}</Text>
          </Text>
          <Text style={styles.userText}>
            Nombre: <Text style={styles.userInfoBold}>{user?.name || "No disponible"}</Text>
          </Text>
          <Text style={styles.userText}>
            Email: <Text style={styles.userInfoBold}>{user?.email || "No disponible"}</Text>
          </Text>
          <Text style={styles.userText}>
            Área: <Text style={styles.userInfoBold}>{user?.area || "No disponible"}</Text>
          </Text>
        </View>

        {/* Mensaje de máquinas */}
        <Text category="h5" style={styles.machineTitle}>
          Seleccione máquina para empezar
        </Text>

        {/* Mostrar la lista de máquinas */}
        <FlatList
          data={filteredMachines}
          keyExtractor={(item) => item._id}
          renderItem={renderMachineItem}
          ItemSeparatorComponent={() => <Divider />}
          contentContainerStyle={styles.machineList}
        />
      </ScrollView>

      {/* Botón para regresar al Home */}
      <Button style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
        Volver Al Home
      </Button>

      {/* Modal para confirmar selección */}
      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Card disabled={true} style={styles.modalCard}>
          <Text style={styles.modalTitle}>¿Deseas continuar?</Text>
          <Text>
            Has seleccionado la máquina:{" "}
            <Text style={styles.modalTextBold}>{selectedMachine?.patente || "No disponible"}</Text>
          </Text>
          <View style={styles.modalButtonContainer}>
            <Button style={styles.modalButton} onPress={handleConfirmSelection}>
              Sí
            </Button>
            <Button
              style={styles.modalButton}
              appearance="outline"
              onPress={() => setModalVisible(false)}
            >
              No
            </Button>
          </View>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 100,
  },
  header: {
    backgroundColor: "#1F4A6F",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  userText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  userInfoBold: {
    fontWeight: "bold",
    color: "#1F4A6F",
  },
  machineTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1F4A6F",
  },
  machineCard: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  machineList: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalTextBold: {
    fontWeight: "bold",
    color: "#1F4A6F",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});
