import styled from "styled-components/native";
import BottomSheet from "@gorhom/bottom-sheet";

export const Sheet = styled(BottomSheet)`
  shadow-color: #000000;
  shadow-offset: 0px -8px;
  shadow-opacity: 0.14;
  shadow-radius: 18px;

  elevation: 14;
`;

export const Handle = styled.View`
  align-self: center;
  width: 42px;
  height: 5px;
  border-radius: 999px;
  background-color: #d8deea;
  margin-top: 10px;
  margin-bottom: 8px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 22px 18px 22px;
  border-bottom-width: 1px;
  border-bottom-color: #edf1fa;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  background-color: #f4f6fd;
  align-items: center;
  justify-content: center;
`;

export const TypeBadge = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.bg || "#eef4ff"};
  border-radius: 999px;
  padding: 7px 11px;
  margin-bottom: 10px;
`;

export const TypeLabel = styled.Text`
  font-size: 11px;
  font-weight: 900;
  color: ${(props) => props.color || "#0b49b7"};
  margin-left: 5px;
`;

export const TitleText = styled.Text`
  font-size: 19px;
  font-weight: 900;
  color: #132f6b;
  line-height: 24px;
`;

export const LoadingWrapper = styled.View`
  padding: 38px 0;
  align-items: center;
  justify-content: center;
`;

export const Section = styled.View`
  padding: 18px 22px 0 22px;
`;

export const SectionTitle = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: #7a8fc4;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #26344f;
  line-height: 21px;
  margin-bottom: 12px;
`;

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const MetaText = styled.Text`
  flex: 1;
  font-size: 12px;
  font-weight: 600;
  color: #7c8aa6;
  margin-left: 7px;
`;

export const PhotoImage = styled.Image`
  width: 132px;
  height: 94px;
  border-radius: 18px;
  margin-right: 10px;
  background-color: #eef2fb;
`;

export const PhotoListContent = styled.View`
  width: 12px;
`;

export const CommentCard = styled.View`
  background-color: #f8faff;
  border-radius: 20px;
  padding: 14px;
  margin: 0 22px 12px 22px;
  border-width: 1px;
  border-color: #edf1fa;
`;

export const CommentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const CommentAvatar = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #eef4ff;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const CommentAvatarText = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: #0b49b7;
`;

export const CommentAuthor = styled.Text`
  font-size: 13px;
  font-weight: 900;
  color: #26344f;
`;

export const CommentBody = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #46546f;
  line-height: 20px;
`;

export const CommentDate = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: #9aa9cc;
  margin-top: 2px;
`;

export const EmptyText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #8a9bc4;
  text-align: center;
  margin: 12px 22px 18px 22px;
`;

export const InputArea = styled.View`
  flex-direction: row;
  align-items: flex-end;

  margin: 8px 22px 28px 22px;
  padding: 10px 12px;

  background-color: #ffffff;
  border-radius: 28px;

  border-width: 1px;
  border-color: #e1e8f8;

  shadow-color: #0b49b7;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 18px;

  elevation: 5;
`;

export const CommentInputWrapper = styled.View`
  flex: 1;
  min-height: 46px;
  max-height: 104px;

  background-color: #f4f6fd;
  border-radius: 22px;

  padding: 0 14px;

  border-width: 1px;
  border-color: #dfe7f7;
`;

export const SendButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  border-radius: 23px;

  background-color: #0b49b7;

  align-items: center;
  justify-content: center;

  margin-left: 9px;
`;

export const SendButtonDisabled = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  border-radius: 23px;

  background-color: #cbd5e8;

  align-items: center;
  justify-content: center;

  margin-left: 9px;
`;