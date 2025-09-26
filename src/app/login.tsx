import { View, Text, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";
import axios from 'axios';

// URL do seu backend. Este endereço é universal para emuladores Android e se conecta ao seu computador.
const API_URL = 'http://10.0.2.2:5000/api/auth';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: username,
        password: password,
      });

      // Se a resposta for bem-sucedida, exibe um alerta e navega
      Alert.alert("Sucesso", response.data.message);
      // Redireciona para a tela do menu
      router.replace("/menu");

    } catch (error) {
      Alert.alert("Erro", error.response?.data?.message || 'Ocorreu um erro no login.');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-gray-100">
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" }}
            className="flex-1"
            resizeMode="cover"
          />
        </View>

        <View className="bg-white px-8 py-12 rounded-t-3xl -mt-8">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-8">
            Bem vindo ao Café
          </Text>

          <View className="space-y-4 mb-6">
            <View className="bg-gray-50 rounded-xl px-4 py-4">
              <TextInput
                placeholder="Usuário"
                placeholderTextColor="#9CA3AF"
                value={username}
                onChangeText={setUsername}
                className="text-gray-800 text-base"
                autoCapitalize="none"
              />
            </View>

            <View className="bg-gray-50 rounded-xl px-4 py-4">
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="text-gray-800 text-base"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-orange-500 rounded-xl py-4 mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Logar
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-600 text-sm">
              Não tem conta?{" "}
            </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text className="text-orange-500 font-medium text-sm ml-1">
                  Clique para registrar-se
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
