import React, { useState } from "react";
import { Layout, Input, Button, Text, Spinner, Select, IndexPath, SelectItem } from "@ui-kitten/components";
import { StyleSheet, View, ScrollView, useWindowDimensions } from "react-native";
import { MyIcon } from "../../components/ui/MyIcon"; // Suponiendo que tienes un componente MyIcon
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useMachineStore } from "../../store/useMachineStore";

export const MachinaAddScreen = () => {
  const { addMachine, error } = useMachineStore();
  const [patenteLetters1, setPatenteLetters1] = useState(""); // Primeras dos letras
  const [patenteLetters2, setPatenteLetters2] = useState(""); // Segundas dos letras
  const [patenteNumbers, setPatenteNumbers] = useState(""); // Números
  const [areaIndex, setAreaIndex] = useState<IndexPath | undefined>(undefined); // Índice seleccionado
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const areas = ["Administracion", "Transporte", "Reparto"];
  const { height } = useWindowDimensions(); // Obtener el tamaño de la ventana

  const handleAddMachine = async () => {
    if (patenteLetters1 && patenteLetters2 && patenteNumbers && areaIndex !== undefined) {
      const formattedPatente = `${patenteLetters1}-${patenteLetters2}-${patenteNumbers}`;
      const selectedArea = areas[areaIndex.row];
      setLoading(true);
      await addMachine(formattedPatente, selectedArea);
      setSuccessMessage("¡Máquina agregada con éxito!");
      setLoading(false);
      setPatenteLetters1("");
      setPatenteLetters2("");
      setPatenteNumbers("");
      setAreaIndex(undefined);
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.05 }}>
          <Text category="h1" style={styles.title}>
            Agregar Máquina
          </Text>
          <Text category="p2" style={styles.subtitle}>
            Ingresa los datos de la nueva máquina
          </Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Text category="label" style={styles.label}>Patente</Text>
          <Layout style={styles.patenteContainer}>
            <Input
              placeholder="ZZ"
              value={patenteLetters1}
              maxLength={2}
              onChangeText={(text) => setPatenteLetters1(text.toUpperCase().replace(/[^A-Z]/g, ""))}
              style={styles.patenteInput}
            />
            <Text style={styles.dash}>-</Text>
            <Input
              placeholder="ZZ"
              value={patenteLetters2}
              maxLength={2}
              onChangeText={(text) => setPatenteLetters2(text.toUpperCase().replace(/[^A-Z]/g, ""))}
              style={styles.patenteInput}
            />
            <Text style={styles.dash}>-</Text>
            <Input
              placeholder="11"
              value={patenteNumbers}
              maxLength={2}
              onChangeText={(text) => setPatenteNumbers(text.replace(/[^0-9]/g, ""))}
              style={styles.patenteInput}
            />
          </Layout>
        </Layout>

        <Text category="label" style={styles.label}>Área</Text>
        <Select
          selectedIndex={areaIndex}
          onSelect={(index) => setAreaIndex(index as IndexPath)}
          value={areaIndex !== undefined ? areas[areaIndex.row] : "Selecciona un área"}
          style={styles.input}
        >
          {areas.map((area, index) => (
            <SelectItem key={index} title={area} />
          ))}
        </Select>

        {/* Success Message */}
        {successMessage && (
          <Text category="s1" style={styles.successMessage}>
            {successMessage}
          </Text>
        )}

        {/* Button to Add Machine */}
        <Layout>
          <Button 
            accessoryRight={loading ? () => <Spinner size="small" status="control" /> : <MyIcon name="checkmark-circle-outline" />}
            onPress={handleAddMachine} 
            disabled={
              !patenteLetters1 || 
              !patenteLetters2 || 
              !patenteNumbers || 
              areaIndex === undefined || 
              loading
            }
            style={styles.button}
          >
            {loading ? "Cargando..." : "Crear Máquina"}
          </Button>
        </Layout>

        {/* Button to Redirect to Home */}
        <Layout style={styles.homeButtonContainer}>
          <Button 
            status="basic" 
            onPress={() => navigation.navigate("HomeScreen")} 
            style={styles.homeButton}
          >
            Ir al Inicio
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 16,
    color: "#666",
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
  },
  patenteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  patenteInput: {
    width: "28%",
    textAlign: "center",
  },
  dash: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  input: {
    marginVertical: 8,
  },
  successMessage: {
    textAlign: "center",
    marginTop: 16,
    color: "green",
    fontSize: 16,
  },
  button: {
    marginTop: 24,
  },
  homeButtonContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  homeButton: {
    width: "100%",
  },
});