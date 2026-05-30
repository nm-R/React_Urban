import styled from "styled-components/native";

export const Background = styled.View`
  flex: 1;
  background-color: #eef2fb;
`;

export const TopAccent = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 7px;
  background-color: #fbbc05;
  z-index: 2;
`;

export const CityShape = styled.View`
  position: absolute;
  bottom: -45px;
  left: -35px;
  right: -35px;
  height: 155px;
  background-color: #d8e2f7;
  opacity: 0.6;
  border-top-left-radius: 90px;
  border-top-right-radius: 90px;
`;

export const ScrollContent = {
  flexGrow: 1,
  justifyContent: "center",
  paddingHorizontal: 30,
  paddingTop: 20,
  paddingBottom: 0,
};

export const LogoWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 4px;
`;

export const LogoText = styled.Text`
  font-size: 46px;
  font-weight: 900;
  color: #0b49b7;
  letter-spacing: -1.5px;
`;

export const LogoPlus = styled.Text`
  font-size: 46px;
  font-weight: 900;
  color: #fbbc05;
`;

export const LogoTagline = styled.Text`
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3.2px;
  color: #6f86bd;
  text-transform: uppercase;
  margin-bottom: 26px;
`;

export const Card = styled.View`
  width: 100%;
  background-color: #ffffff;
  border-radius: 26px;
  padding: 28px 24px;
  border-width: 1px;
  border-color: #e1e8f8;

  shadow-color: #0d2d7a;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.08;
  shadow-radius: 18px;

  elevation: 4;
`;

export const CardTitle = styled.Text`
  font-size: 25px;
  font-weight: 900;
  color: #0b3f9f;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

export const CardSubtitle = styled.Text`
  font-size: 14px;
  color: #5f6f96;
  margin-bottom: 24px;
`;

export const AreaInput = styled.View`
  width: 100%;
  margin-bottom: 14px;
`;

export const InputLabel = styled.Text`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #6f86bd;
  margin-bottom: 8px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f6f8ff;
  border-radius: 16px;
  border-width: 1.5px;
  border-color: #d8e2f7;
  padding: 0 14px;
  height: 54px;

  shadow-color: #0d2d7a;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.03;
  shadow-radius: 4px;

  elevation: 1;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 15px;
  color: #0d2d7a;
  height: 54px;
`;

export const ForgotButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: 2px;
  margin-bottom: 16px;
`;

export const ForgotText = styled.Text`
  font-size: 12px;
  color: #0b49b7;
  font-weight: 700;
`;

export const ErrorBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #fff0f0;
  border-width: 1px;
  border-color: #ffc9c9;
  border-radius: 15px;
  padding: 12px 14px;
  margin-bottom: 16px;
`;

export const ErrorText = styled.Text`
  flex: 1;
  margin-left: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #c62828;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  border-radius: 16px;
  background-color: #0b49b7;
  align-items: center;
  justify-content: center;

  shadow-color: #0b49b7;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;

  elevation: 5;
`;

export const SubmitText = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.5px;
`;

export const Link = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  margin-bottom: 30px;
`;

export const LinkText = styled.Text`
  font-size: 13px;
  color: #6f7f9f;
`;

export const LinkHighlight = styled.Text`
  font-size: 13px;
  color: #fbbc05;
  font-weight: 900;
  margin-left: 5px;
`;