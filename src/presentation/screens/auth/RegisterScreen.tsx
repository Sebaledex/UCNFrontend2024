import { Button, Input, Layout, Text, Spinner, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import * as yup from 'yup';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { MyIcon } from '../../components/ui/MyIcon';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { login, signup } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    area: '', // Agregamos el campo de área
  });

  const emailSchema = yup.string().email();

  const validateEmail = async (email: string) => {
    try {
      await emailSchema.validate(email);
      return true;
    } catch (error) {
      return false;
    }
  };

  const onSignup = async () => {
    if (
      form.username.length === 0 ||
      form.password.length === 0 ||
      form.email.length === 0 ||
      form.name.length === 0 ||
      form.area.length === 0 // Validación para el campo área
    ) {
      Alert.alert('Error', 'Ingrese toda la información');
      return;
    }
    if (!(await validateEmail(form.email))) {
      Alert.alert('Error', 'Ingrese un correo electrónico válido');
      return;
    }
    setLoading(true);
    const wasSuccessful = await signup(form.name, form.username, form.email, form.password, form.area);
    if (wasSuccessful) {
      const wasSuccessful2 = await login(form.username, form.password);
      if (wasSuccessful2) {
        navigation.navigate('HomeScreen');
        return;
      }
    }
    setLoading(false);
    Alert.alert('Error', 'Usuario o email ya se encuentran registrados');
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.30 }}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Nombre"
            accessoryLeft={<MyIcon name="person-outline" />}
            value={form.name}
            onChangeText={(name) => setForm({ ...form, name })}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Username"
            accessoryLeft={<MyIcon name="person-add-outline" />}
            value={form.username}
            onChangeText={(username) => setForm({ ...form, username })}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={<MyIcon name="email-outline" />}
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
            <Select
              placeholder="Seleccione un área"
              value={form.area}
              onSelect={(index) => {
                // Aseguramos que index es de tipo IndexPath
                const selectedIndex = index as IndexPath;
                const selectedOption = ['Administracion', 'Transporte', 'Reparto'][selectedIndex.row];
                setForm({ ...form, area: selectedOption });
              }}
              style={{ marginBottom: 10 }}
            >
              <SelectItem title="Administracion" />
              <SelectItem title="Transporte" />
              <SelectItem title="Reparto" />
            </Select>

          <Button onPress={onSignup} disabled={loading}>
            {loading ? <Spinner size="small" /> : 'Registrarse'}
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
