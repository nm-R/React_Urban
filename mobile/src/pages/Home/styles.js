import styled from "styled-components/native";

export const Background = styled.View`
  flex: 1;
  background-color: #eef2fb;
`;

export const TopAccent = styled.View`
  height: 6px;
  background-color: #fbbc05;
`;

export const Header = styled.View`
  background-color: #0b49b7;
  padding: 18px 24px 22px 24px;
  border-bottom-left-radius: 34px;
  border-bottom-right-radius: 34px;

  shadow-color: #0b2f78;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.16;
  shadow-radius: 18px;

  elevation: 7;
`;

export const GreetingArea = styled.View`
  margin-bottom: 22px;
`;

export const GreetingText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #dbe7ff;
`;

export const UserName = styled.Text`
  font-size: 31px;
  font-weight: 900;
  color: #ffffff;
  margin-top: 2px;
`;

export const LocationRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const LocationText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: #dbe7ff;
  margin-left: 5px;
`;

export const MainAction = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.16);
  border-radius: 24px;
  padding: 16px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.18);

  shadow-color: #001b4d;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.12;
  shadow-radius: 14px;

  elevation: 4;
`;

export const MainActionIcon = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  shadow-color: #001b4d;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;

  elevation: 3;
`;

export const MainActionContent = styled.View`
  flex: 1;
`;

export const MainActionTitle = styled.Text`
  font-size: 15px;
  font-weight: 900;
  color: #ffffff;
`;

export const MainActionText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #dbe7ff;
  margin-top: 3px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 24px 22px 0 22px;
`;

export const SectionHeader = styled.View`
  margin-bottom: 16px;
`;

export const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: 900;
  color: #0b3f9f;
`;

export const SectionSubtitle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #6f7f9f;
  margin-top: 4px;
`;

export const ViewAllButton = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 999px;
  padding: 8px 12px;
  margin-top: 12px;
  border-width: 1px;
  border-color: #dfe7f7;

  shadow-color: #0d2d7a;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;

  elevation: 2;
`;

export const ViewAllText = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: #0b49b7;
  margin-right: 6px;
`;

export const OccurrenceCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 24px;
  margin-bottom: 14px;
  overflow: hidden;
  border-width: 1px;
  border-color: #e1e8f8;

  shadow-color: #0d2d7a;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;

  elevation: 4;
`;

export const OccurrenceAccent = styled.View`
  width: 6px;
  background-color: ${(props) => props.color || "#6b7280"};
`;

export const OccurrenceContent = styled.View`
  flex: 1;
  padding: 16px;
`;

export const OccurrenceTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
`;

export const Badge = styled.View`
  background-color: ${(props) => `${props.color || "#6b7280"}18`};
  border-radius: 999px;
  padding: 5px 10px;
`;

export const BadgeText = styled.Text`
  font-size: 10px;
  font-weight: 900;
  color: #46546f;
`;

export const OccurrenceTitle = styled.Text`
  font-size: 15px;
  font-weight: 900;
  color: #132f6b;
`;

export const OccurrenceDescription = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #6f7f9f;
  line-height: 18px;
  margin-top: 6px;
`;

export const OccurrenceFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

export const OccurrenceMeta = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const OccurrenceTime = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: #8a9bc4;
  margin-left: 4px;
`;

export const ConfirmBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #eef4ff;
  border-radius: 999px;
  padding: 7px 10px;
  margin-left: 10px;
`;

export const ConfirmText = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: #0b49b7;
  margin-left: 4px;
`;

export const EmptyBox = styled.View`
  background-color: #ffffff;
  border-radius: 24px;
  padding: 34px 20px;
  align-items: center;
  border-width: 1px;
  border-color: #e1e8f8;

  shadow-color: #0d2d7a;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;

  elevation: 4;
`;

export const EmptyTitle = styled.Text`
  font-size: 16px;
  font-weight: 900;
  color: #0b3f9f;
  margin-top: 12px;
`;

export const EmptyText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #6f7f9f;
  text-align: center;
  margin-top: 4px;
`;