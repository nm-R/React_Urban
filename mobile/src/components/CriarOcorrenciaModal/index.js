import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, Keyboard, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  AlertTriangle,
  Camera,
  Car,
  CheckCircle,
  Construction,
  Image as ImageIcon,
  Leaf,
  Shield,
  Trash2,
  X,
} from "lucide-react-native";

import api from "../../services/api";

import {
  Sheet,
  Handle,
  Header,
  HeaderInfo,
  SheetTitle,
  SheetSubtitle,
  CloseButton,
  Section,
  SectionTitle,
  FieldLabel,
  InputBox,
  TextAreaBox,
  HelperText,
  CategoryGrid,
  CategoryChip,
  CategoryIcon,
  CategoryText,
  RadiusCard,
  RadiusTop,
  RadiusValue,
  RadiusHint,
  SliderWrapper,
  PhotosRow,
  PhotoThumb,
  RemoveBadge,
  RemoveBadgeText,
  AddPhotoBtn,
  AddPhotoText,
  Footer,
  CreateBtn,
  CreateBtnDisabled,
  CreateBtnText,
} from "./styles";

const MIN_RADIUS = 25;
const MAX_RADIUS = 500;
const STEP = 25;
const MAX_PHOTOS = 5;

const CATEGORIES = [
  { key: "TRAFFIC", label: "Trânsito", Icon: Car, color: "#f59e0b", bg: "#fef3c7" },
  { key: "INFRASTRUCTURE", label: "Infraestrutura", Icon: Construction, color: "#ef4444", bg: "#fee2e2" },
  { key: "SECURITY", label: "Segurança", Icon: Shield, color: "#3b82f6", bg: "#dbeafe" },
  { key: "SANITATION", label: "Saneamento", Icon: Trash2, color: "#10b981", bg: "#d1fae5" },
  { key: "ENVIRONMENT", label: "Meio ambiente", Icon: Leaf, color: "#22c55e", bg: "#dcfce7" },
  { key: "OTHER", label: "Outras", Icon: AlertTriangle, color: "#6b7280", bg: "#f3f4f6" },
];

export default function CriarOcorrenciaModal({
  visible,
  coordinate,
  onClose,
  onCreate,
  onRadiusChange,
}) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["42%", "82%"], []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [radius, setRadius] = useState(100);
  const [category, setCategory] = useState("TRAFFIC");
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const selectedCategory =
    CATEGORIES.find((item) => item.key === category) ?? CATEGORIES[0];

  const canSubmit = title.trim().length > 0 && !!coordinate && !submitting;

  const hasDraft =
    title.trim() || description.trim() || photos.length > 0 || radius !== 100;

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
      Keyboard.dismiss();
    }
  }, [visible]);

  useEffect(() => {
    onRadiusChange?.(visible ? radius : null);
  }, [radius, visible]);

  function expandSheet() {
    bottomSheetRef.current?.snapToIndex(1);
  }

  function reset() {
    setTitle("");
    setDescription("");
    setRadius(100);
    setCategory("TRAFFIC");
    setPhotos([]);
  }

  function requestClose() {
    if (submitting) return;

    if (hasDraft) {
      Alert.alert("Descartar ocorrência?", "Os dados preenchidos serão perdidos.", [
        { text: "Continuar editando", style: "cancel" },
        {
          text: "Descartar",
          style: "destructive",
          onPress: () => {
            reset();
            onClose?.();
          },
        },
      ]);
      return;
    }

    onClose?.();
  }

  async function pickPhotos() {
    if (photos.length >= MAX_PHOTOS) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Acesso à galeria negado.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: MAX_PHOTOS - photos.length,
        quality: 0.7,
      });

      if (result.canceled) return;

      const selected = result.assets.map((asset, index) => ({
        uri: asset.uri,
        name: asset.fileName || `photo_${Date.now()}_${index}.jpg`,
        type: asset.mimeType || "image/jpeg",
      }));

      setPhotos((current) => [...current, ...selected].slice(0, MAX_PHOTOS));
    } catch {
      Alert.alert("Erro", "Falha ao abrir galeria.");
    }
  }

  async function takePhoto() {
    if (photos.length >= MAX_PHOTOS) return;

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Acesso à câmera negado.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.7,
      });

      if (result.canceled) return;

      const asset = result.assets[0];

      setPhotos((current) =>
        [
          ...current,
          {
            uri: asset.uri,
            name: asset.fileName || `camera_${Date.now()}.jpg`,
            type: asset.mimeType || "image/jpeg",
          },
        ].slice(0, MAX_PHOTOS)
      );
    } catch {
      Alert.alert("Erro", "Falha ao abrir câmera.");
    }
  }

  function removePhoto(index) {
    setPhotos((current) => current.filter((_, i) => i !== index));
  }

  function handleRadiusChange(value) {
    const rounded = Math.round(value / STEP) * STEP;
    setRadius(Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, rounded)));
  }

  async function submit() {
    if (!canSubmit) return;

    setSubmitting(true);

    try {
      const form = new FormData();

      form.append("data", {
        string: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          radius,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }),
        type: "application/json",
        name: "data",
      });

      photos.forEach((photo) => {
        form.append("photos", {
          uri: photo.uri,
          name: photo.name,
          type: photo.type,
        });
      });

      await api.post("/occurrences", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      reset();
      onCreate?.();
      onClose?.();
    } catch {
      Alert.alert("Erro", "Falha ao criar ocorrência.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSheetChange(index) {
    if (index === -1) requestClose();
  }

  const renderBackdrop = useMemo(
    () => (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.45}
        pressBehavior="none"
      />
    ),
    []
  );

  function renderFooter(props) {
    return (
      <BottomSheetFooter {...props} bottomInset={0}>
        <Footer>
          {canSubmit ? (
            <CreateBtn activeOpacity={0.85} onPress={submit}>
              {submitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <CheckCircle size={18} color="#FFFFFF" />
                  <CreateBtnText>Criar ocorrência</CreateBtnText>
                </>
              )}
            </CreateBtn>
          ) : (
            <CreateBtnDisabled disabled>
              <CreateBtnText>
                {submitting ? "Enviando..." : "Informe um título"}
              </CreateBtnText>
            </CreateBtnDisabled>
          )}
        </Footer>
      </BottomSheetFooter>
    );
  }

  if (!coordinate) return null;

  return (
    <Sheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      onChange={handleSheetChange}
      handleComponent={() => <Handle />}
      backgroundStyle={{
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      }}
    >
      <Header>
        <HeaderInfo>
          <SheetTitle>Nova ocorrência</SheetTitle>
          <SheetSubtitle>Ajuste o raio e veja o preview no mapa.</SheetSubtitle>
        </HeaderInfo>

        <CloseButton activeOpacity={0.75} onPress={requestClose}>
          <X size={20} color="#8A9BC4" />
        </CloseButton>
      </Header>

      <Section compact>
        <SectionTitle>Área afetada</SectionTitle>

        <RadiusCard>
          <RadiusTop>
            <View>
              <RadiusValue>{radius}m</RadiusValue>
              <RadiusHint>Raio visível no mapa em tempo real.</RadiusHint>
            </View>

            <MaterialCommunityIcons
              name="map-marker-radius-outline"
              size={24}
              color={selectedCategory.color}
            />
          </RadiusTop>

          <SliderWrapper>
            <Slider
              minimumValue={MIN_RADIUS}
              maximumValue={MAX_RADIUS}
              step={STEP}
              value={radius}
              minimumTrackTintColor={selectedCategory.color}
              maximumTrackTintColor="#DDE4F5"
              thumbTintColor={selectedCategory.color}
              onValueChange={handleRadiusChange}
            />
          </SliderWrapper>
        </RadiusCard>
      </Section>

      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 170 }}
      >
        <Section compact>
          <SectionTitle>Categoria</SectionTitle>

          <CategoryGrid>
            {CATEGORIES.map((item) => {
              const selected = category === item.key;
              const Icon = item.Icon;

              return (
                <CategoryChip
                  key={item.key}
                  activeOpacity={0.8}
                  selected={selected}
                  color={item.color}
                  bg={item.bg}
                  onPress={() => setCategory(item.key)}
                >
                  <CategoryIcon selected={selected} bg={item.bg}>
                    <Icon size={15} color={item.color} />
                  </CategoryIcon>

                  <CategoryText selected={selected} color={item.color}>
                    {item.label}
                  </CategoryText>
                </CategoryChip>
              );
            })}
          </CategoryGrid>
        </Section>

        <Section>
          <SectionTitle>Informações</SectionTitle>

          <FieldLabel>Título</FieldLabel>
          <InputBox>
            <BottomSheetTextInput
              value={title}
              onChangeText={setTitle}
              onFocus={expandSheet}
              placeholder="Ex: Buraco na avenida"
              placeholderTextColor="#A7B6D8"
              maxLength={80}
              style={{
                flex: 1,
                height: 46,
                fontSize: 15,
                fontWeight: "700",
                color: "#132F6B",
              }}
            />
          </InputBox>

          <HelperText>{title.length}/80 caracteres</HelperText>

          <FieldLabel>Descrição</FieldLabel>
          <TextAreaBox>
            <BottomSheetTextInput
              value={description}
              onChangeText={setDescription}
              onFocus={expandSheet}
              placeholder="Descreva o que está acontecendo..."
              placeholderTextColor="#A7B6D8"
              multiline
              maxLength={280}
              style={{
                flex: 1,
                minHeight: 78,
                maxHeight: 116,
                fontSize: 14,
                fontWeight: "600",
                color: "#132F6B",
                textAlignVertical: "top",
                paddingTop: 10,
              }}
            />
          </TextAreaBox>

          <HelperText>{description.length}/280 caracteres</HelperText>
        </Section>

        <Section compact>
          <SectionTitle>Fotos ({photos.length}/{MAX_PHOTOS})</SectionTitle>

          <PhotosRow>
            {photos.map((photo, index) => (
              <PhotoThumb key={`${photo.uri}-${index}`}>
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: "100%", height: "100%" }}
                />

                <RemoveBadge
                  activeOpacity={0.8}
                  onPress={() => removePhoto(index)}
                >
                  <RemoveBadgeText>×</RemoveBadgeText>
                </RemoveBadge>
              </PhotoThumb>
            ))}

            {photos.length < MAX_PHOTOS ? (
              <>
                <AddPhotoBtn activeOpacity={0.8} onPress={pickPhotos}>
                  <ImageIcon size={17} color="#0B49B7" />
                  <AddPhotoText>Galeria</AddPhotoText>
                </AddPhotoBtn>

                <AddPhotoBtn activeOpacity={0.8} onPress={takePhoto}>
                  <Camera size={17} color="#0B49B7" />
                  <AddPhotoText>Câmera</AddPhotoText>
                </AddPhotoBtn>
              </>
            ) : null}
          </PhotosRow>
        </Section>
      </BottomSheetScrollView>
    </Sheet>
  );
}