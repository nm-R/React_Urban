import styled from "styled-components/native";

export const c = {
  bg:           "#F0F4FF",
  card:         "#FFFFFF",
  accent:       "#1B4FBB",
  accentLight:  "rgba(27,79,187,0.1)",
  text:         "#111827",
  textSub:      "#6B7280",
  textMuted:    "#9CA3AF",
  border:       "#E4EAF7",
  success:      "#10b981",
  successLight: "rgba(16,185,129,0.1)",
  warning:      "#f59e0b",
  warningLight: "rgba(245,158,11,0.1)",
  danger:       "#EF4444",
  dangerLight:  "rgba(239,68,68,0.1)",
  gray:         "#6b7280",
  grayLight:    "rgba(107,114,128,0.1)",
};

export const Container = styled.View`
  flex: 1;
  background-color: ${c.bg};
`;

export const HeaderBg = styled.View`
  background-color: ${c.accent};
  padding: 52px 24px 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
`;

export const FilterRow = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  gap: 8px;
`;

export const FilterChip = styled.TouchableOpacity`
  padding: 7px 16px;
  border-radius: 20px;
  border-width: 1.5px;
  align-self: flex-start;
  border-color: ${({ selected, color }) => (selected ? color : c.border)};
  background-color: ${({ selected, bg }) => (selected ? bg : c.card)};
`;

export const FilterChipText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${({ selected, color }) => (selected ? color : c.textSub)};
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { padding: 16, gap: 10 },
  showsVerticalScrollIndicator: false,
})``;

/* ← alterado para TouchableOpacity para suportar onPress */
export const OccurrenceCard = styled.TouchableOpacity`
  background-color: ${c.card};
  border-radius: 16px;
  padding: 16px;
`;

export const CardRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${c.text};
  flex: 1;
  margin-right: 8px;
`;

export const StatusBadge = styled.View`
  padding: 3px 10px;
  border-radius: 20px;
  background-color: ${({ bg }) => bg};
`;

export const StatusText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${({ color }) => color};
`;

export const CardMeta = styled.Text`
  font-size: 12px;
  color: ${c.textMuted};
  margin-bottom: 2px;
`;

export const CardDescription = styled.Text`
  font-size: 13px;
  color: ${c.textSub};
  margin: 6px 0 12px;
`;

export const ActionRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const ActionBtn = styled.TouchableOpacity`
  flex: 1;
  height: 38px;
  border-radius: 10px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 6px;
`;

export const ActionBtnText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${({ color }) => color};
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${c.textMuted};
  font-size: 13px;
  margin-top: 40px;
`;

export const RejectModal = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: flex-end;
`;

export const RejectSheet = styled.View`
  background-color: ${c.card};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px;
`;

export const RejectTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: ${c.text};
  margin-bottom: 12px;
`;

export const RejectInput = styled.TextInput.attrs({
  placeholderTextColor: c.textMuted,
  multiline: true,
})`
  background-color: ${c.bg};
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  color: ${c.text};
  min-height: 80px;
  margin-bottom: 16px;
`;

export const RejectActions = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const RejectBtn = styled.TouchableOpacity`
  flex: 1;
  height: 46px;
  border-radius: 12px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
`;

export const RejectBtnText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${({ color }) => color};
`;