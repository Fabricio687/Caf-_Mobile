// Importa componentes básicos do React Native
import { View, Text, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
// Importa componente para área segura
import { SafeAreaView } from "react-native-safe-area-context";
// Importa hook useState para gerenciar estado
import { useState } from "react";
// Importa componentes de navegação do Expo Router
import { router } from "expo-router";
// Importa axios para fazer requisições HTTP
import axios from 'axios';

// URL do seu backend. Se estiver em um dispositivo real, use o IP da sua máquina.
const API_URL = 'http://10.0.2.2:5000/api/auth';

// Componente da tela de registro
export default function Register() {
  // Estado para armazenar o nome de usuário digitado
  const [username, setUsername] = useState("");
  // Estado para armazenar a senha digitada
  const [password, setPassword] = useState("");

  // Função que é chamada quando o usuário clica no botão de registro
  async function handleRegister() {
    // Verifica se ambos os campos estão preenchidos
    if (!username.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        email: username,
        password: password,
      });

      // Se o registro for bem-sucedido, exibe um alerta e navega de volta para o login
      Alert.alert("Sucesso", response.data.message);
      router.replace("/login");

    } catch (error) {
      // Se houver um erro, exibe a mensagem de erro do backend.
      Alert.alert("Erro", error.response?.data?.message || 'Ocorreu um erro no registro.');
    }
  }

  return (
    // Container principal com área segura e fundo branco
    <SafeAreaView className="flex-1 bg-white">
      {/* Componente que ajusta a tela quando o teclado aparece */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportamento diferente para iOS e Android
        className="flex-1"
      >
        {/* Seção da imagem de fundo */}
        <View className="flex-1 bg-gray-100">
          {/* Imagem de fundo de café do Unsplash */}
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" }}
            className="flex-1"
            resizeMode="cover" // A imagem cobre toda a área disponível
          />
        </View>

        {/* Seção do formulário de registro */}
        <View className="bg-white px-8 py-12 rounded-t-3xl -mt-8">
          {/* Título de boas-vindas */}
          <Text className="text-2xl font-bold text-gray-800 text-center mb-8">
            Crie sua conta
          </Text>

          {/* Container dos campos de entrada */}
          <View className="space-y-4 mb-6">
            {/* Campo de usuário */}
            <View className="bg-gray-50 rounded-xl px-4 py-4">
              <TextInput
                placeholder="E-mail" // Texto de placeholder
                placeholderTextColor="#9CA3AF" // Cor do placeholder
                value={username} // Valor controlado pelo estado
                onChangeText={setUsername} // Atualiza o estado quando o texto muda
                className="text-gray-800 text-base"
                autoCapitalize="none" // Não capitaliza automaticamente
              />
            </View>

            {/* Campo de senha */}
            <View className="bg-gray-50 rounded-xl px-4 py-4">
              <TextInput
                placeholder="Senha" // Texto de placeholder
                placeholderTextColor="#9CA3AF" // Cor do placeholder
                value={password} // Valor controlado pelo estado
                onChangeText={setPassword} // Atualiza o estado quando o texto muda
                secureTextEntry // Esconde o texto digitado (senha)
                className="text-gray-800 text-base"
              />
            </View>
          </View>

          {/* Botão de registro */}
          <TouchableOpacity
            onPress={handleRegister} // Chama a função de registro quando pressionado
            className="bg-orange-500 rounded-xl py-4 mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Registrar
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
