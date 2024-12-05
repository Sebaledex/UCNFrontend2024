import React, { useState } from "react";
import { Layout, Input, Button, Text, Spinner } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { useRespuestaStore } from "../../store/useRespuestaStore";


export const ProductScreen = () => {
  const [patente, setPatente] = useState("ABC");
  const [fecha_respuesta, setFechaRespuesta] = useState("2024-11-26T10:00:00Z");
  const [geolocalizacion, setGeolocalizacion] = useState({
    latitud: -33.4489,
    longitud: -70.6693,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Datos proporcionados (puedes ajustar esto según tu lógica)
  const userId = "674834b350b3a694cfd5dc89";
  const cuestionarioId = "6748569278960afab51828c0";
  const respuestas = [
    { numero: 1, respuestaSeleccionada: "No" },
    { numero: 2, respuestaSeleccionada: "No" },
  ];

  const { submitResponse } = useRespuestaStore();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitResponse(userId, cuestionarioId, respuestas, patente, fecha_respuesta, geolocalizacion);
      setSuccessMessage("Respuesta enviada correctamente.");
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <Text category="h1" style={styles.title}>Prueba de Envío</Text>

        <Text category="label" style={styles.label}>Patente</Text>
        <Input
          value={patente}
          onChangeText={setPatente}
          style={styles.input}
        />

        <Text category="label" style={styles.label}>Fecha de Respuesta</Text>
        <Input
          value={fecha_respuesta}
          onChangeText={setFechaRespuesta}
          style={styles.input}
        />

        <Text category="label" style={styles.label}>Geolocalización</Text>
        <Input
          value={String(geolocalizacion.latitud)}
          onChangeText={(lat) =>
            setGeolocalizacion((prev) => ({ ...prev, latitud: parseFloat(lat) }))
          }
          placeholder="Latitud"
          style={styles.input}
        />
        <Input
          value={String(geolocalizacion.longitud)}
          onChangeText={(lon) =>
            setGeolocalizacion((prev) => ({ ...prev, longitud: parseFloat(lon) }))
          }
          placeholder="Longitud"
          style={styles.input}
        />

        <Button onPress={handleSubmit} disabled={loading}>
          {loading ? <Spinner size="small" /> : "Enviar Respuesta"}
        </Button>
        {successMessage && <Text category="s1" style={styles.success}>{successMessage}</Text>}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: { marginBottom: 16 },
  label: { marginVertical: 8 },
  input: { marginBottom: 16 },
  success: { marginTop: 16, color: "green" },
});
