import React, { useEffect, useState } from "react";
import {
  Modal,
  Alert,
  ActivityIndicator,
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import api from "../../services/api";

const { width, height } = Dimensions.get("window");

const c = {
  bg: "#F0F4FF",
  card: "#FFFFFF",
  accent: "#1B4FBB",
  accentLight: "rgba(27,79,187,0.1)",
  text: "#111827",
  textSub: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E4EAF7",
  success: "#10b981",
  danger: "#EF4444",
};

const CATEGORY_CONFIG = {
  TRAFFIC: {
    icon: "car",
    color: "#f59e0b",
    label: "Trânsito",
    bg: "#fef3c7",
  },
  INFRASTRUCTURE: {
    icon: "hammer-wrench",
    color: "#ef4444",
    label: "Infraestrutura",
    bg: "#fee2e2",
  },
  SANITATION: {
    icon: "trash-can-outline",
    color: "#10b981",
    label: "Saneamento",
    bg: "#d1fae5",
  },
  SECURITY: {
    icon: "shield-outline",
    color: "#3b82f6",
    label: "Segurança",
    bg: "#dbeafe",
  },
  ENVIRONMENT: {
    icon: "leaf",
    color: "#22c55e",
    label: "Meio ambiente",
    bg: "#dcfce7",
  },
  OTHER: {
    icon: "alert-circle",
    color: "#6b7280",
    label: "Outras",
    bg: "#f3f4f6",
  },
};

const TYPE_CONFIG = {
  ROUBO: {
    icon: "alert",
    color: "#e53935",
    label: "Roubo",
    bg: "#fdecea",
  },
  ACIDENTE: {
    icon: "car-emergency",
    color: "#fb8c00",
    label: "Acidente",
    bg: "#fff3e0",
  },
  BARULHO: {
    icon: "volume-high",
    color: "#1e88e5",
    label: "Barulho",
    bg: "#e3f2fd",
  },
  INCENDIO: {
    icon: "fire",
    color: "#d32f2f",
    label: "Incêndio",
    bg: "#ffebee",
  },
};

const getConfig = (item) =>
  CATEGORY_CONFIG[item?.category] ??
  TYPE_CONFIG[item?.type] ?? {
    icon: "alert-circle",
    color: c.accent,
    label: item?.category ?? item?.type ?? "Ocorrência",
    bg: c.accentLight,
  };

export default function OcorrenciaAdminModal({
  item,
  visible,
  isPending,
  acting,
  onClose,
  onApprove,
  onReject,
}) {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (visible && item) fetchDetails();
    else setDetails(null);
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

  if (!item) return null;

  const cfg = getConfig(item);
  const data = details ?? item;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.sheet}>
          <View style={s.handle} />

          {/* HEADER */}
          <View style={s.header}>
            <View style={[s.badge, { backgroundColor: cfg.bg }]}>
              <MaterialCommunityIcons
                name={cfg.icon}
                size={14}
                color={cfg.color}
              />
              <Text style={[s.badgeLabel, { color: cfg.color }]}>
                {cfg.label}
              </Text>
            </View>

            <Text style={s.headerTitle} numberOfLines={2}>
              {item.title}
            </Text>

            <TouchableOpacity onPress={onClose} style={s.closeBtn}>
              <MaterialCommunityIcons
                name="close"
                size={22}
                color={c.textMuted}
              />
            </TouchableOpacity>
          </View>

          {/* ADMIN ACTIONS */}
          {isPending && (
            <View style={s.adminBar}>
              <TouchableOpacity
                style={[s.adminBtn, { backgroundColor: "rgba(16,185,129,0.12)" }]}
                onPress={() => onApprove(item.id)}
                disabled={acting === item.id}
              >
                {acting === item.id ? (
                  <ActivityIndicator size="small" color={c.success} />
                ) : (
                  <>
                    <MaterialCommunityIcons name="check" size={16} color={c.success} />
                    <Text style={[s.adminBtnText, { color: c.success }]}>
                      Aprovar
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[s.adminBtn, { backgroundColor: "rgba(239,68,68,0.12)" }]}
                onPress={() => onReject(item.id)}
                disabled={acting === item.id}
              >
                <MaterialCommunityIcons name="close" size={16} color={c.danger} />
                <Text style={[s.adminBtnText, { color: c.danger }]}>
                  Rejeitar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* CONTENT */}
          {loadingDetails ? (
            <View style={s.loadingBox}>
              <ActivityIndicator size="large" color={cfg.color} />
            </View>
          ) : (
            <ScrollView contentContainerStyle={s.scroll}>
              {/* META */}
              <View style={s.metaCard}>
                <Text style={s.metaText}>
                  {new Date(data.createdAt).toLocaleString("pt-BR")}
                </Text>

                {data.address && (
                  <Text style={s.metaText}>{data.address}</Text>
                )}

                <Text style={s.metaText}>
                  {data.userName ?? "Usuário desconhecido"}
                </Text>
              </View>

              {/* DESCRIPTION */}
              <View style={s.section}>
                <Text style={s.sectionTitle}>Descrição</Text>
                <Text style={s.description}>
                  {data.description || "—"}
                </Text>
              </View>

              {/* PHOTOS */}
              {data.photoUrls?.length > 0 && (
                <View style={s.section}>
                  <Text style={s.sectionTitle}>
                    Fotos ({data.photoUrls.length})
                  </Text>

                  <FlatList
                    data={data.photoUrls}
                    horizontal
                    keyExtractor={(_, i) => String(i)}
                    renderItem={({ item: url }) => (
                      <Image
                        source={{
                          uri: `${api.defaults.baseURL}${url}`,
                        }}
                        style={s.photo}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}

              {/* COMMENTS (somente leitura) */}
              <View style={s.section}>
                <Text style={s.sectionTitle}>
                  Comentários ({data.comments?.length ?? 0})
                </Text>

                {data.comments?.length > 0 ? (
                  data.comments.map((c, i) => (
                    <View key={c.id ?? i} style={s.commentCard}>
                      <Text style={s.commentAuthor}>
                        {c.userName ?? "Anônimo"}
                      </Text>
                      <Text style={s.commentBody}>{c.text}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={s.emptyComments}>
                    Nenhum comentário ainda.
                  </Text>
                )}
              </View>

              <View style={{ height: 30 }} />
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: c.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
    overflow: "hidden",
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: c.border,
    borderRadius: 2,
    alignSelf: "center",
    marginVertical: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: 12,
    gap: 6,
  },

  badgeLabel: {
    fontSize: 12,
    fontWeight: "700",
  },

  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: c.text,
  },

  closeBtn: {
    padding: 4,
  },

  adminBar: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },

  adminBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  adminBtnText: {
    fontWeight: "700",
  },

  loadingBox: {
    padding: 40,
  },

  scroll: {
    padding: 16,
  },

  metaCard: {
    backgroundColor: c.bg,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  metaText: {
    color: c.textSub,
    fontSize: 13,
  },

  section: {
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: c.textMuted,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: c.text,
  },

  photo: {
    width: width * 0.6,
    height: 150,
    borderRadius: 12,
    marginRight: 10,
  },

  commentCard: {
    backgroundColor: c.bg,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },

  commentAuthor: {
    fontWeight: "700",
    color: c.text,
    marginBottom: 4,
  },

  commentBody: {
    color: c.textSub,
  },

  emptyComments: {
    color: c.textMuted,
    fontStyle: "italic",
  },
});