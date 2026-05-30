import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import api from "../../services/api";

import {
  Sheet,
  Handle,
  Header,
  CloseButton,
  TypeBadge,
  TypeLabel,
  TitleText,
  Section,
  SectionTitle,
  Description,
  MetaRow,
  MetaText,
  PhotoImage,
  PhotoListContent,
  CommentCard,
  CommentHeader,
  CommentAvatar,
  CommentAvatarText,
  CommentAuthor,
  CommentBody,
  CommentDate,
  EmptyText,
  LoadingWrapper,
} from "./styles";

const TYPE_CONFIG = {
  ROUBO: { icon: "alert", color: "#e53935", label: "Roubo", bg: "#fdecea" },
  ACIDENTE: { icon: "car-emergency", color: "#fb8c00", label: "Acidente", bg: "#fff3e0" },
  BARULHO: { icon: "volume-high", color: "#1e88e5", label: "Barulho", bg: "#e3f2fd" },
  INCENDIO: { icon: "fire", color: "#d32f2f", label: "Incêndio", bg: "#ffebee" },
};

const CATEGORY_CONFIG = {
  TRAFFIC: { icon: "car", color: "#f59e0b", label: "Trânsito", bg: "#fef3c7" },
  INFRASTRUCTURE: { icon: "hammer-wrench", color: "#ef4444", label: "Infraestrutura", bg: "#fee2e2" },
  SANITATION: { icon: "trash-can-outline", color: "#10b981", label: "Saneamento", bg: "#d1fae5" },
  SECURITY: { icon: "shield-outline", color: "#3b82f6", label: "Segurança", bg: "#dbeafe" },
  ENVIRONMENT: { icon: "leaf", color: "#22c55e", label: "Meio ambiente", bg: "#dcfce7" },
  OTHER: { icon: "alert-circle", color: "#6b7280", label: "Outras", bg: "#f3f4f6" },
};

const getConfig = (item) =>
  CATEGORY_CONFIG[item?.category] ??
  TYPE_CONFIG[item?.type] ?? {
    icon: "alert-circle",
    color: "#0B49B7",
    label: item?.category ?? item?.type ?? "Ocorrência",
    bg: "#eef4ff",
  };

function formatarTempo(data) {
  if (!data) return "";

  const dataCorrigida = data.endsWith("Z") ? data : `${data}Z`;

  const diff = Date.now() - new Date(dataCorrigida).getTime();

  const minutos = Math.max(1, Math.floor(diff / 60000));

  if (minutos < 60) {
    return `${minutos} min atrás`;
  }

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  if (minutosRestantes === 0) {
    return `${horas}h atrás`;
  }

  return `${horas}h ${minutosRestantes}min atrás`;
}

function getInitials(name) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function OcorrenciaModal({ item, visible, onClose }) {
  const bottomSheetRef = useRef(null);

  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const snapPoints = useMemo(() => ["58%", "92%"], []);

  const cfg = getConfig(item);
  const data = details ?? item;

  useEffect(() => {
    if (visible && item) {
      bottomSheetRef.current?.snapToIndex(0);
      fetchDetails();
    } else {
      bottomSheetRef.current?.close();
      setDetails(null);
      setCommentText("");
      setCommentModalVisible(false);
      Keyboard.dismiss();
    }
  }, [visible, item]);

  async function fetchDetails() {
    setLoadingDetails(true);

    try {
      const [detailsRes, commentsRes] = await Promise.all([
        api.get(`/occurrences/${item.id}`),
        api.get(`/occurrences/${item.id}/comments`),
      ]);

      setDetails({
        ...detailsRes.data,
        comments: commentsRes.data,
      });
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os detalhes.");
    } finally {
      setLoadingDetails(false);
    }
  }

  async function handleSendComment() {
    if (!commentText.trim() || sendingComment) return;

    setSendingComment(true);

    try {
      const response = await api.post(`/occurrences/${item.id}/comments`, {
        text: commentText.trim(),
      });

      setDetails((prev) => ({
        ...prev,
        comments: [...(prev?.comments ?? []), response.data],
      }));

      setCommentText("");
      setCommentModalVisible(false);
      Keyboard.dismiss();
    } catch {
      Alert.alert("Erro", "Não foi possível enviar o comentário.");
    } finally {
      setSendingComment(false);
    }
  }

  function closeCommentModal() {
    Keyboard.dismiss();
    setCommentModalVisible(false);
  }

  function handleSheetChange(index) {
    if (index === -1) {
      onClose?.();
    }
  }

  const renderBackdrop = useMemo(
    () => (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.45}
        pressBehavior="close"
      />
    ),
    []
  );

  function renderHeader() {
    return (
      <>
        <Header>
          <View style={{ flex: 1, paddingRight: 14 }}>
            <TypeBadge bg={cfg.bg}>
              <MaterialCommunityIcons name={cfg.icon} size={14} color={cfg.color} />
              <TypeLabel color={cfg.color}>{cfg.label}</TypeLabel>
            </TypeBadge>

            <TitleText numberOfLines={2}>{item?.title}</TitleText>
          </View>

          <CloseButton activeOpacity={0.75} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={22} color="#8A9BC4" />
          </CloseButton>
        </Header>

        {loadingDetails ? (
          <LoadingWrapper>
            <ActivityIndicator size="large" color={cfg.color} />
          </LoadingWrapper>
        ) : (
          <>
            <Section>
              <SectionTitle>Descrição</SectionTitle>
              <Description>{data?.description || "Sem descrição informada."}</Description>

              {data?.createdAt ? (
                <MetaRow>
                  <MaterialCommunityIcons name="clock-outline" size={15} color="#8A9BC4" />
                  <MetaText>{formatarTempo(data.createdAt)}</MetaText>
                </MetaRow>
              ) : null}

              {data?.address ? (
                <MetaRow>
                  <MaterialCommunityIcons name="map-marker-outline" size={15} color="#8A9BC4" />
                  <MetaText>{data.address}</MetaText>
                </MetaRow>
              ) : null}

              <MetaRow>
                <MaterialCommunityIcons name="account-outline" size={15} color="#8A9BC4" />
                <MetaText>{data?.userName ?? "Usuário desconhecido"}</MetaText>
              </MetaRow>
            </Section>

            {data?.photoUrls?.length > 0 ? (
              <Section>
                <SectionTitle>Fotos ({data.photoUrls.length})</SectionTitle>

                <BottomSheetFlatList
                  data={data.photoUrls}
                  horizontal
                  keyExtractor={(_, index) => String(index)}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item: url }) => (
                    <PhotoImage source={{ uri: `${api.defaults.baseURL}${url}` }} />
                  )}
                  ListFooterComponent={<PhotoListContent />}
                />
              </Section>
            ) : null}

            <Section>
              <SectionTitle>Comentários ({data?.comments?.length ?? 0})</SectionTitle>
            </Section>
          </>
        )}
      </>
    );
  }

  function renderComment({ item: comment }) {
    return (
      <CommentCard>
        <CommentHeader>
          <CommentAvatar>
            <CommentAvatarText>{getInitials(comment.userName)}</CommentAvatarText>
          </CommentAvatar>

          <View style={{ flex: 1 }}>
            <CommentAuthor>{comment.userName ?? "Anônimo"}</CommentAuthor>

            {comment.createdAt ? (
              <CommentDate>{formatarTempo(comment.createdAt)}</CommentDate>
            ) : null}
          </View>
        </CommentHeader>

        <CommentBody>{comment.text}</CommentBody>
      </CommentCard>
    );
  }

  if (!item) return null;

  return (
    <>
      <Sheet
        ref={bottomSheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onChange={handleSheetChange}
        handleComponent={() => <Handle />}
        backgroundStyle={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
      >
        <BottomSheetFlatList
          data={loadingDetails ? [] : data?.comments ?? []}
          keyExtractor={(comment, index) => String(comment.id ?? index)}
          renderItem={renderComment}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            !loadingDetails ? <EmptyText>Nenhum comentário ainda.</EmptyText> : null
          }
          ListFooterComponent={
            !loadingDetails ? (
              <Pressable
                onPress={() => setCommentModalVisible(true)}
                style={{
                  marginHorizontal: 18,
                  marginTop: 8,
                  marginBottom: 30,
                  height: 54,
                  borderRadius: 18,
                  backgroundColor: "#EEF4FF",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  size={20}
                  color="#0B49B7"
                />
                <Text
                  style={{
                    color: "#0B49B7",
                    fontSize: 14,
                    fontWeight: "900",
                  }}
                >
                  Escrever comentário
                </Text>
              </Pressable>
            ) : null
          }
          contentContainerStyle={{
            paddingBottom: 18,
          }}
          showsVerticalScrollIndicator={false}
        />
      </Sheet>

      <Modal
        visible={commentModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeCommentModal}
      >
        <Pressable
          onPress={closeCommentModal}
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.55)",
            justifyContent: "center",
            paddingHorizontal: 18,
          }}
        >
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: 18,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.16,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 18,
              }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "900",
                    letterSpacing: 1,
                    color: "#7C93D8",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Adicionar comentário
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 18,
                    fontWeight: "600",
                    color: "#8A9BC4",
                  }}
                >
                  Compartilhe uma atualização sobre esta ocorrência.
                </Text>
              </View>

              <Pressable
                onPress={closeCommentModal}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: "#F1F5FF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons name="close" size={22} color="#8A9BC4" />
              </Pressable>
            </View>

            <View
              style={{
                minHeight: 132,
                borderRadius: 20,
                backgroundColor: "#F8FAFF",
                borderWidth: 1,
                borderColor: "#DFE8FF",
                paddingHorizontal: 14,
                paddingVertical: 12,
              }}
            >
              <TextInput
                placeholder="Escreva um comentário..."
                placeholderTextColor="#A7B6D8"
                value={commentText}
                onChangeText={setCommentText}
                multiline
                maxLength={280}
                autoFocus
                textAlignVertical="top"
                style={{
                  flex: 1,
                  minHeight: 108,
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#132F6B",
                  padding: 0,
                  margin: 0,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: "#A7B6D8",
                }}
              >
                {commentText.length}/280
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                onPress={closeCommentModal}
                style={{
                  height: 48,
                  minWidth: 120,
                  paddingHorizontal: 18,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#EEF2F8",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "900",
                    color: "#62739D",
                  }}
                >
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                disabled={!commentText.trim() || sendingComment}
                onPress={handleSendComment}
                style={{
                  width: 56,
                  height: 48,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    commentText.trim() && !sendingComment ? "#0B49B7" : "#CBD8F2",
                }}
              >
                {sendingComment ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <MaterialCommunityIcons name="send" size={21} color="#FFFFFF" />
                )}
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}