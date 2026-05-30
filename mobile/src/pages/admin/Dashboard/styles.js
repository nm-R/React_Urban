import styled from "styled-components/native";

export const c = {
  bg: "#F0F4FF",
  card: "#FFFFFF",
  accent: "#1B4FBB",
  accentLight: "rgba(27,79,187,0.1)",
  text: "#111827",
  textSub: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E4EAF7",
  success: "#10b981",
  successLight: "rgba(16,185,129,0.1)",
  warning: "#f59e0b",
  warningLight: "rgba(245,158,11,0.1)",
  danger: "#EF4444",
  dangerLight: "rgba(239,68,68,0.1)",
  gray: "#6b7280",
  grayLight: "rgba(107,114,128,0.1)",
};

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 32 },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${c.bg};
`;

export const HeaderBg = styled.View`
  background-color: ${c.accent};
  padding: 52px 24px 28px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 2px;
`;

export const HeaderSub = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

export const SectionTitle = styled.Text`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${c.textSub};
  margin: 24px 20px 10px;
`;

export const StatsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 12px;
  gap: 10px;
`;

export const StatCard = styled.View`
  width: 48%;
  background-color: ${c.card};
  border-radius: 16px;
  padding: 16px;
`;

export const StatIconWrapper = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const StatNumber = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: ${({ color }) => color ?? c.accent};
`;

export const StatLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${c.textMuted};
  margin-top: 2px;
`;

export const QuickCard = styled.TouchableOpacity`
  background-color: ${c.card};
  border-radius: 16px;
  margin: 0 16px 10px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

export const QuickIconWrapper = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
`;

export const QuickInfo = styled.View`
  flex: 1;
`;

export const QuickTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${c.text};
`;

export const QuickSub = styled.Text`
  font-size: 12px;
  color: ${c.textMuted};
  margin-top: 2px;
`;

export const Badge = styled.View`
  min-width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: ${({ bg }) => bg ?? c.danger};
  align-items: center;
  justify-content: center;
  padding: 0 6px;
`;

export const BadgeText = styled.Text`
  font-size: 11px;
  font-weight: 800;
  color: #fff;
`;