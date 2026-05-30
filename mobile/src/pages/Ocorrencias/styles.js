import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #eef2fb;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #eef2fb;
`;

export const HintCard = styled.View`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 82px;

  background-color: #ffffff;
  border-radius: 20px;
  padding: 13px 15px;

  border-width: 1px;
  border-color: #e1e8f8;

  shadow-color: #0d2d7a;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.1;
  shadow-radius: 16px;

  elevation: 6;
`;

export const HintTitle = styled.Text`
  font-size: 13px;
  font-weight: 900;
  color: #0b3f9f;
`;

export const HintText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: #6f7f9f;
  margin-top: 3px;
  line-height: 15px;
`;

export const CounterBadge = styled.View`
  position: absolute;
  right: 16px;
  bottom: 18px;

  background-color: #ffffff;
  border-radius: 999px;
  padding: 9px 13px;

  border-width: 1px;
  border-color: #e1e8f8;

  shadow-color: #0d2d7a;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;

  elevation: 4;
`;
export const CounterText = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: #0b49b7;
`;

export const MapButtonsWrapper = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
  gap: 10px;
`;

export const MapButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;

  background-color: #ffffff;
  align-items: center;
  justify-content: center;

  border-width: 1px;
  border-color: #e1e8f8;

  shadow-color: #0d2d7a;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.1;
  shadow-radius: 16px;

  elevation: 6;
`;

export const MarkerBubble = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;

  background-color: #ffffff;
  align-items: center;
  justify-content: center;

  border-width: 2px;
  border-color: ${(props) => props.color || "#6b7280"};

  shadow-color: #000000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.12;
  shadow-radius: 6px;

  elevation: 4;
`;