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
  margin-top: 8px;
  margin-bottom: 6px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 2px 22px 12px 22px;
  border-bottom-width: 1px;
  border-bottom-color: #edf1fa;
`;

export const HeaderInfo = styled.View`
  flex: 1;
  padding-right: 14px;
`;

export const SheetTitle = styled.Text`
  font-size: 20px;
  font-weight: 900;
  color: #0b3f9f;
`;

export const SheetSubtitle = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #6f7f9f;
  margin-top: 3px;
  line-height: 16px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #f4f6fd;
  align-items: center;
  justify-content: center;
`;

export const Section = styled.View`
  padding: ${(props) =>
    props.compact ? "12px 22px 0 22px" : "16px 22px 0 22px"};
`;

export const SectionTitle = styled.Text`
  font-size: 11px;
  font-weight: 900;
  color: #7a8fc4;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export const FieldLabel = styled.Text`
  font-size: 11px;
  font-weight: 900;
  color: #6f86bd;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
`;

export const InputBox = styled.View`
  height: 48px;
  border-radius: 16px;
  background-color: #f6f8ff;
  border-width: 1.5px;
  border-color: #dfe7f7;
  padding: 0 14px;
  justify-content: center;
`;

export const TextAreaBox = styled.View`
  min-height: 94px;
  max-height: 126px;
  border-radius: 16px;
  background-color: #f6f8ff;
  border-width: 1.5px;
  border-color: #dfe7f7;
  padding: 0 14px;
`;

export const HelperText = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: #9aa9cc;
  align-self: flex-end;
  margin-top: 4px;
  margin-bottom: 9px;
`;

export const CategoryGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 9px;
`;

export const CategoryChip = styled.TouchableOpacity`
  width: 48%;
  min-height: 52px;
  border-radius: 16px;
  padding: 9px;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.selected ? props.bg : "#f8faff")};
  border-width: 1.5px;
  border-color: ${(props) => (props.selected ? props.color : "#e1e8f8")};
`;

export const CategoryIcon = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${(props) => (props.selected ? "#ffffff" : props.bg)};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const CategoryText = styled.Text`
  flex: 1;
  font-size: 11px;
  font-weight: 900;
  color: ${(props) => (props.selected ? props.color : "#46546f")};
`;

export const RadiusCard = styled.View`
  background-color: transparent;
  border-radius: 16px;
  padding: 0;
  border-width: 0px;
`;
export const RadiusTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RadiusValue = styled.Text`
  font-size: 22px;
  font-weight: 900;
  color: #0b49b7;
`;

export const RadiusHint = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: #6f7f9f;
  margin-top: 0;
`;

export const SliderWrapper = styled.View`
  margin-top: -2px;
  margin-bottom: -11px;
`;

export const PhotosRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const PhotoThumb = styled.View`
  width: 74px;
  height: 74px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #eef2fb;
`;

export const RemoveBadge = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: rgba(239, 68, 68, 0.95);
  align-items: center;
  justify-content: center;
`;

export const RemoveBadgeText = styled.Text`
  font-size: 18px;
  line-height: 19px;
  font-weight: 900;
  color: #ffffff;
`;

export const AddPhotoBtn = styled.TouchableOpacity`
  width: 74px;
  height: 74px;
  border-radius: 16px;
  background-color: #eef4ff;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: #cfe0ff;
  border-style: dashed;
`;

export const AddPhotoText = styled.Text`
  font-size: 10px;
  font-weight: 900;
  color: #0b49b7;
  margin-top: 4px;
`;

export const Footer = styled.View`
  padding: 10px 22px 14px 22px;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #edf1fa;
`;

export const CreateBtn = styled.TouchableOpacity`
  height: 48px;
  border-radius: 16px;
  background-color: #0b49b7;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  shadow-color: #0b49b7;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 5;
`;

export const CreateBtnDisabled = styled.TouchableOpacity`
  height: 48px;
  border-radius: 16px;
  background-color: #cbd5e8;
  align-items: center;
  justify-content: center;
`;

export const CreateBtnText = styled.Text`
  font-size: 14px;
  font-weight: 900;
  color: #ffffff;
  margin-left: 7px;
`;