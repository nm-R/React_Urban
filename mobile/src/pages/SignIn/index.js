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
  ForgotButton,
  ForgotText,
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
} from "./styles";

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleLogin() {
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Preencha o e-mail e a senha para continuar.");
      return;
    }

    try {
      await signIn(email.trim(), password);
    } catch (error) {
      const message = error?.response?.data?.error;

      if (message === "Invalid credentials") {
        setErrorMessage("E-mail ou senha inválidos.");
        return;
      }

      if (message === "User not found") {
        setErrorMessage("Usuário não encontrado.");
        return;
      }

      setErrorMessage("Não foi possível entrar. Tente novamente.");
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
              <CardTitle>Bem-vindo</CardTitle>
              <CardSubtitle>Acesse sua conta para continuar</CardSubtitle>

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
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                </InputWrapper>
              </AreaInput>

              <ForgotButton activeOpacity={0.7}>
                <ForgotText>Esqueceu a senha?</ForgotText>
              </ForgotButton>

              {errorMessage ? (
                <ErrorBox>
                  <Feather name="alert-circle" size={18} color="#C62828" />
                  <ErrorText>{errorMessage}</ErrorText>
                </ErrorBox>
              ) : null}

              <SubmitButton
                activeOpacity={0.85}
                onPress={handleLogin}
                disabled={loadingAuth}
              >
                {loadingAuth ? (
                  <ActivityIndicator size={24} color="#FFFFFF" />
                ) : (
                  <SubmitText>Entrar</SubmitText>
                )}
              </SubmitButton>

            </Card>

            <Link>
              <LinkText>Ainda não tem conta?</LinkText>

              <LinkHighlight onPress={() => navigation.navigate("SignUp")}>
                Criar conta
              </LinkHighlight>
            </Link>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </Background>
  );
}
