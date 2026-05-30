import styled from "styled-components/native";

export const c = {
  bg: "#EEF2FB",
  card: "#FFFFFF",

  accent: "#0B49B7",
  accentDark: "#0B3F9F",
  yellow: "#FBBC05",

  text: "#132F6B",
  textSub: "#6F7F9F",

  success: "#10B981",
  successLight: "#EAFBF5",

  warning: "#F59E0B",
  warningLight: "#FFF7E6",

  danger: "#EF4444",
  dangerLight: "#FFF0F0",

  gray: "#6B7280",
  grayLight: "#F3F4F6",

  border: "#E1E8F8",
};

export const Container = styled.View`
  flex: 1;
  background-color: ${c.bg};
`;

export const HeaderBg = styled.View`
  background-color: ${c.accent};
  padding: 30px 24px 34px 24px;
  border-bottom-left-radius: 34px;
  border-bottom-right-radius: 34px;
  align-items: center;

  shadow-color: #0b2f78;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.16;
  shadow-radius: 18px;

  elevation: 7;
`;

export const AvatarWrapper = styled.View`
  width: 78px;
  height: 78px;
  border-radius: 39px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;

  shadow-color: #001b4d;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.14;
  shadow-radius: 12px;

  elevation: 5;
`;

export const AvatarText = styled.Text`
  font-size: 26px;
  font-weight: 900;
  color: ${c.accent};
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
`;

export const UserEmail = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #dbe7ff;
  margin-top: 4px;
`;

export const UserBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 999px;
  padding: 7px 12px;
  margin-top: 14px;
`;

export const UserBadgeText = styled.Text`
  font-size: 11px;
  font-weight: 900;
  color: ${c.accent};
  margin-left: 5px;
  text-transform: uppercase;
`;

export const StatsRow = styled.View`
  flex-direction: row;
  gap: 10px;
  padding: 0 18px;
  margin-top: -24px;
`;

export const StatCard = styled.View`
  flex: 1;
  background-color: ${c.card};
  border-radius: 22px;
  padding: 14px 10px;
  align-items: center;
  border-width: 1px;
  border-color: ${c.border};

  shadow-color: #0d2d7a;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;

  elevation: 4;
`;

export const StatIcon = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: ${(props) => props.bg || "#EEF4FF"};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const StatNumber = styled.Text`
  font-size: 22px;
  font-weight: 900;
  color: ${(props) => props.color || c.accent};
`;

export const StatLabel = styled.Text`
  font-size: 10px;
  font-weight: 800;
  color: ${c.textSub};
  text-transform: uppercase;
  margin-top: 2px;
`;

export const SectionHeader = styled.View`
  padding: 26px 22px 14px 22px;
`;

export const SectionTitle = styled.Text`
  font-size: 21px;
  font-weight: 900;
  color: ${c.accentDark};
`;

export const SectionSubtitle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${c.textSub};
  margin-top: 3px;
`;

export const OccurrenceCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${c.card};
  border-radius: 24px;
  margin: 0 22px 14px 22px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${c.border};

  shadow-color: #0d2d7a;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;

  elevation: 4;
`;

export const OccurrenceAccent = styled.View`
  width: 6px;
  background-color: ${(props) => props.color || c.gray};
`;

export const OccurrenceContent = styled.View`
  flex: 1;
  padding: 16px;
`;

export const OccurrenceTop = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const OccurrenceTitle = styled.Text`
  flex: 1;
  font-size: 15px;
  font-weight: 900;
  color: ${c.text};
  margin-right: 10px;
`;

export const StatusBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.bg || c.grayLight};
  border-radius: 999px;
  padding: 6px 9px;
`;

export const StatusText = styled.Text`
  font-size: 10px;
  font-weight: 900;
  color: ${(props) => props.color || c.gray};
  margin-left: 4px;
`;

export const OccurrenceDate = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${c.textSub};
  margin-top: 8px;
`;

export const RejectionBox = styled.View`
  background-color: ${c.dangerLight};
  border-radius: 16px;
  padding: 12px;
  margin-top: 12px;
  border-width: 1px;
  border-color: #ffd1d1;
`;

export const RejectionTitle = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: ${c.danger};
  margin-bottom: 4px;
`;

export const RejectionText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${c.textSub};
  line-height: 18px;
`;

export const ReopenBtn = styled.TouchableOpacity`
  height: 42px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #cfe0ff;
  background-color: #eef4ff;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 14px;
`;

export const ReopenBtnText = styled.Text`
  font-size: 13px;
  font-weight: 900;
  color: ${c.accent};
  margin-left: 6px;
`;

export const EmptyBox = styled.View`
  background-color: ${c.card};
  margin: 0 22px;
  border-radius: 24px;
  padding: 34px 22px;
  align-items: center;
  border-width: 1px;
  border-color: ${c.border};

  shadow-color: #0d2d7a;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;

  elevation: 4;
`;

export const EmptyTitle = styled.Text`
  font-size: 16px;
  font-weight: 900;
  color: ${c.accentDark};
  margin-top: 12px;
`;

export const EmptyText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${c.textSub};
  text-align: center;
  margin-top: 5px;
  line-height: 19px;
`;

export const ListFooter = styled.View`
  padding: 10px 22px 0 22px;
`;

export const LogoutBtn = styled.TouchableOpacity`
  height: 50px;
  border-radius: 16px;
  background-color: ${c.dangerLight};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-width: 1px;
  border-color: #ffd1d1;
`;

export const LogoutText = styled.Text`
  font-size: 14px;
  font-weight: 900;
  color: ${c.danger};
  margin-left: 8px;
`;