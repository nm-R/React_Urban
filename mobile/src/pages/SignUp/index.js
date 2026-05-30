import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import {
  Background,
  TopAccent,
  CityShape,
  ScrollContent,
  LogoWrapper,
  LogoText,
  LogoPlus,
  LogoTagline,
  Card,
  CardTitle,
  CardSubtitle,
  AreaInput,
  InputLabel,
  InputWrapper,
  Input,
  ErrorBox,
  ErrorText,
  SubmitButton,
  SubmitText,
  Divider,
  DividerLine,
  DividerText,
  Link,
  LinkText,
  LinkHighlight,
} from "../SignIn/styles";

export default function SignUp() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSignUp() {
    setErrorMessage("");

    if (!nome.trim() || !email.trim() || !password) {
      setErrorMessage("Preencha todos os campos para continuar.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    Keyboard.dismiss();

    try {
      await signUp(email.trim(), password, nome.trim());
      navigation.navigate("SignIn");
    } catch (error) {
      const message = error?.response?.data?.error;

      if (message === "E-mail already registered") {
        setErrorMessage("Este e-mail já está cadastrado.");
        return;
      }

      setErrorMessage("Não foi possível criar sua conta. Tente novamente.");
    }
  }

  return (
    <Background>
      <TopAccent />
      <CityShape />

      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={30}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={ScrollContent}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <LogoWrapper>
              <LogoText>Urbano</LogoText>
              <LogoPlus>+</LogoPlus>
            </LogoWrapper>

            <LogoTagline>Soluções Urbanas</LogoTagline>

            <Card>
              <CardTitle>Criar conta</CardTitle>
              <CardSubtitle>Preencha os dados para se cadastrar</CardSubtitle>

              <AreaInput>
                <InputLabel>Nome</InputLabel>

                <InputWrapper>
                  <Feather
                    name="user"
                    size={18}
                    color="#0B49B7"
                    style={{ marginRight: 10 }}
                  />

                  <Input
                    placeholder="Seu nome completo"
                    placeholderTextColor="#A7B6D8"
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize="words"
                    autoCorrect={false}
                    returnKeyType="next"
                  />
                </InputWrapper>
              </AreaInput>

              <AreaInput>
                <InputLabel>E-mail</InputLabel>

                <InputWrapper>
                  <Feather
                    name="mail"
                    size={18}
                    color="#0B49B7"
                    style={{ marginRight: 10 }}
                  />

                  <Input
                    placeholder="seu@email.com"
                    placeholderTextColor="#A7B6D8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                  />
                </InputWrapper>
              </AreaInput>

              <AreaInput>
                <InputLabel>Senha</InputLabel>

                <InputWrapper>
                  <Feather
                    name="lock"
                    size={18}
                    color="#0B49B7"
                    style={{ marginRight: 10 }}
                  />

                  <Input
                    placeholder="••••••••"
                    placeholderTextColor="#A7B6D8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleSignUp}
                  />
                </InputWrapper>
              </AreaInput>

              {errorMessage ? (
                <ErrorBox>
                  <Feather name="alert-circle" size={18} color="#C62828" />
                  <ErrorText>{errorMessage}</ErrorText>
                </ErrorBox>
              ) : null}

              <SubmitButton
                activeOpacity={0.85}
                onPress={handleSignUp}
                disabled={loadingAuth}
              >
                {loadingAuth ? (
                  <ActivityIndicator size={24} color="#FFFFFF" />
                ) : (
                  <SubmitText>Cadastrar</SubmitText>
                )}
              </SubmitButton>
            </Card>

            <Link>
              <LinkText>Já tem uma conta?</LinkText>

              <LinkHighlight onPress={() => navigation.navigate("SignIn")}>
                Entrar
              </LinkHighlight>
            </Link>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </Background>
  );
}