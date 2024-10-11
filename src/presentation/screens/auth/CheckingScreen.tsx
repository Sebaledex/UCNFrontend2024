import React, { useState, useEffect } from "react";
import { Layout, Text, Spinner } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, "CheckingScreen"> {}

export const CheckingScreen = ({ navigation }: Props) => {
  const { refresh } = useAuthStore(); // Utilizamos la función refresh del store de autenticación
  const { access_token, refresh_token } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkTokens = async () => {
      // Esperar 3 segundos antes de verificar los tokens
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const tokenIsValid = await refresh(); // Llama a la función refresh para verificar los tokens
      console.log({ access_token, refresh_token });
      if (tokenIsValid) {
        navigation.navigate("HomeScreen"); // Si es válido, navega a HomeScreen
      } else {
        navigation.navigate("LoginScreen"); // Si no es válido, navega a LoginScreen
      }
    };

    checkTokens(); // Ejecuta la función de verificación al montar el componente
  }, [navigation, refresh]);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading && (
        <>
          <Spinner size="large" status="primary" />
          <Text style={{ marginTop: 20 }}>Verificando tokens...</Text>
        </>
      )}
    </Layout>
  );
};
