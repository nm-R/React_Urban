import styled from "styled-components/native";

export const c = {
  bg: "#F0F4FF",
  card: "#FFFFFF",
  accent: "#1B4FBB",
  text: "#111827",
  textSub: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E4EAF7",
  danger: "#EF4444",
  dangerLight: "rgba(239,68,68,0.1)",
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

export const List = styled.FlatList.attrs({
  contentContainerStyle: { padding: 16, gap: 10 },
  showsVerticalScrollIndicator: false,
})``;

export const OccurrenceBlock = styled.View`
  background-color: ${c.card};
  border-radius: 16px;
  padding: 16px;
`;

export const OccurrenceTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${c.text};
  margin-bottom: 10px;
`;

export const CommentRow = styled.View`
  border-top-width: 1px;
  border-top-color: ${c.border};
  padding-top: 10px;
  margin-top: 4px;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;

export const CommentInfo = styled.View`
  flex: 1;
`;

export const CommentAuthor = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${c.text};
`;

export const CommentBody = styled.Text`
  font-size: 13px;
  color: ${c.textSub};
  margin-top: 2px;
`;

export const CommentDate = styled.Text`
  font-size: 11px;
  color: ${c.textMuted};
  margin-top: 3px;
`;

export const DeleteBtn = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background-color: ${c.dangerLight};
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${c.textMuted};
  font-size: 13px;
  margin-top: 40px;
`;