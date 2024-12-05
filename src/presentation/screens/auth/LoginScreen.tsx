import React, { useState, useEffect } from "react";
import { Layout, Text, Input, Button, Spinner } from "@ui-kitten/components";
import { Alert, ScrollView, useWindowDimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MyIcon } from "../../components/ui/MyIcon";

interface Props extends StackScreenProps<RootStackParams, "LoginScreen"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [otherButtonsEnabled, setOtherButtonsEnabled] = useState<boolean>(true);

  const { height } = useWindowDimensions();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setForm({ username: "", password: "" });
    });

    return unsubscribe;
  }, [navigation]);

  const onLogin = async () => {
    try {
      if (form.username.length === 0 || form.password.length === 0) {
        Alert.alert("Error", "Ingrese información");
        return;
      }

      setLoading(true);
      setOtherButtonsEnabled(false);

      // Configurar temporizador de 4 segundos
      const timeoutId = setTimeout(() => {
        if (loading) {
          setLoading(false);
          setOtherButtonsEnabled(true);
          Alert.alert("Error", "Usuario o contraseña incorrectos. Intente nuevamente.");
        }
      }, 4000);

      const wasSuccessful = await login(form.username, form.password);

      // Limpiar temporizador si el login fue exitoso antes de los 4 segundos
      clearTimeout(timeoutId);

      if (wasSuccessful) {
        setLoading(false);
        setOtherButtonsEnabled(true);
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Error", "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ha ocurrido un error al iniciar sesión");
    } finally {
      setLoading(false);
      setOtherButtonsEnabled(true);
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Usuario"
            autoCapitalize="none"
            value={form.username}
            onChangeText={(username) => setForm({ ...form, username })}
            accessoryLeft={<MyIcon name="person-add-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Espacio */}
        <Layout style={{ height: 10 }} />

        {/* Botón */}
        <Layout>
          <Button
            accessoryRight={
              loading ? () => <Spinner size="small" status="control" /> : <MyIcon name="arrow-forward-outline" white />
            }
            onPress={onLogin}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </Button>
        </Layout>

        {/* Información adicional */}
        <Layout style={{ height: 50 }} />
        <Layout
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
         <Text>¿No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => otherButtonsEnabled && navigation.navigate("RegisterScreen")}
          >
            {" "}
            Crea una{" "}
          </Text>
        </Layout>

        <Layout style={{ height: 50 }} />
        <Layout
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>¿Olvidaste tu contraseña?</Text>
          <Text
            status="primary"
            //category="s1"
            //onPress={() => otherButtonsEnabled && navigation.navigate("ChangePassword")}
          >
            {" "}
            Cambiar contraseña{" "}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
