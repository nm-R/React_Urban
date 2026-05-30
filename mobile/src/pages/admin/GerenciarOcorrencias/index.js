import React, { useCallback, useState } from "react";
import { Alert, ActivityIndicator, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import api from "../../../services/api";
import OcorrenciaAdminModal from "../../../components/OcorrenciaAdminModal";

import {
  c,
  Container,
  HeaderBg,
  HeaderTitle,
  FilterRow,
  FilterChip,
  FilterChipText,
  List,
  OccurrenceCard,
  CardRow,
  CardTitle,
  StatusBadge,
  StatusText,
  CardMeta,
  CardDescription,
  ActionRow,
  ActionBtn,
  ActionBtnText,
  EmptyText,
  RejectModal,
  RejectSheet,
  RejectTitle,
  RejectInput,
  RejectActions,
  RejectBtn,
  RejectBtnText,
} from "./styles";

const STATUS_MAP = {
  pending:  "PENDING",
  rejected: "REJECTED",
  expired:  "EXPIRED",
};

const FILTERS = [
  { key: "pending",  label: "Pendentes",  color: c.warning, bg: c.warningLight },
  { key: "rejected", label: "Rejeitadas", color: c.danger,  bg: c.dangerLight  },
  { key: "expired",  label: "Expiradas",  color: c.gray,    bg: c.grayLight    },
];

export default function GerenciarOcorrencias() {
  const [filter, setFilter]               = useState("pending");
  const [occurrences, setOccurrences]     = useState([]);
  const [loading, setLoading]             = useState(true);
  const [acting, setActing]               = useState(null);
  const [rejectTarget, setRejectTarget]   = useState(null);
  const [rejectReason, setRejectReason]   = useState("");
  const [sendingReject, setSendingReject] = useState(false);
  const [selectedItem, setSelectedItem]   = useState(null);

  const loadOccurrences = useCallback(async (status) => {
    setLoading(true);
    setOccurrences([]);
    try {
      const { data } = await api.get(
        `/occurrences/admin?status=${STATUS_MAP[status]}`
      );
      setOccurrences(data);
    } catch (err) {
      const message =
        err?.response?.data?.message ??
        "Não foi possível carregar as ocorrências.";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadOccurrences(filter);
    }, [filter, loadOccurrences])
  );

  async function handleApprove(id) {
    setActing(id);
    try {
      await api.patch(`/occurrences/${id}/approve`);
      setOccurrences((prev) => prev.filter((o) => o.id !== id));
      setSelectedItem(null);
    } catch (err) {
      const message =
        err?.response?.data?.message ??
        "Não foi possível aprovar a ocorrência.";
      Alert.alert("Erro", message);
    } finally {
      setActing(null);
    }
  }

  async function handleReject() {
    if (!rejectReason.trim()) {
      Alert.alert("Atenção", "Informe o motivo da rejeição.");
      return;
    }
    setSendingReject(true);
    try {
      await api.patch(`/occurrences/${rejectTarget}/reject`, {
        reason: rejectReason.trim(),
      });
      setOccurrences((prev) => prev.filter((o) => o.id !== rejectTarget));
      setSelectedItem(null);
      setRejectTarget(null);
      setRejectReason("");
    } catch (err) {
      const message =
        err?.response?.data?.message ??
        "Não foi possível rejeitar a ocorrência.";
      Alert.alert("Erro", message);
    } finally {
      setSendingReject(false);
    }
  }

  const currentFilter = FILTERS.find((f) => f.key === filter);

  return (
    <Container>
      <HeaderBg>
        <HeaderTitle>Ocorrências</HeaderTitle>
      </HeaderBg>

      <FilterRow>
        {FILTERS.map((f) => (
          <FilterChip
            key={f.key}
            selected={filter === f.key}
            color={f.color}
            bg={f.bg}
            onPress={() => setFilter(f.key)}
          >
            <FilterChipText selected={filter === f.key} color={f.color}>
              {f.label}
            </FilterChipText>
          </FilterChip>
        ))}
      </FilterRow>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={c.accent}
          style={{ marginTop: 40 }}
        />
      ) : (
        <List
          data={occurrences}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            <EmptyText>
              Nenhuma ocorrência {currentFilter?.label.toLowerCase()}.
            </EmptyText>
          }
          renderItem={({ item }) => (
            <OccurrenceCard onPress={() => setSelectedItem(item)} activeOpacity={0.8}>
              <CardRow>
                <CardTitle numberOfLines={2}>{item.title}</CardTitle>
                <StatusBadge bg={currentFilter?.bg}>
                  <StatusText color={currentFilter?.color}>
                    {currentFilter?.label}
                  </StatusText>
                </StatusBadge>
              </CardRow>

              <CardMeta>
                {new Date(item.createdAt).toLocaleString("pt-BR")} · {item.userName}
              </CardMeta>

              {item.description ? (
                <CardDescription numberOfLines={2}>
                  {item.description}
                </CardDescription>
              ) : null}

              {filter === "pending" && (
                <ActionRow>
                  <ActionBtn
                    bg={c.successLight}
                    onPress={() => handleApprove(item.id)}
                    disabled={acting === item.id}
                  >
                    {acting === item.id ? (
                      <ActivityIndicator size="small" color={c.success} />
                    ) : (
                      <>
                        <Feather name="check" size={14} color={c.success} />
                        <ActionBtnText color={c.success}>Aprovar</ActionBtnText>
                      </>
                    )}
                  </ActionBtn>

                  <ActionBtn
                    bg={c.dangerLight}
                    onPress={() => setRejectTarget(item.id)}
                    disabled={acting === item.id}
                  >
                    <Feather name="x" size={14} color={c.danger} />
                    <ActionBtnText color={c.danger}>Rejeitar</ActionBtnText>
                  </ActionBtn>
                </ActionRow>
              )}
            </OccurrenceCard>
          )}
        />
      )}

      {/* ── Modal de detalhes (admin) ── */}
      <OcorrenciaAdminModal
        item={selectedItem}
        visible={!!selectedItem}
        isPending={filter === "pending"}
        acting={acting}
        onClose={() => setSelectedItem(null)}
        onApprove={handleApprove}
        onReject={(id) => {
          setSelectedItem(null);
          setRejectTarget(id);
        }}
      />

      {/* ── Modal de rejeição ── */}
      <Modal
        visible={!!rejectTarget}
        transparent
        animationType="fade"
        onRequestClose={() => setRejectTarget(null)}
      >
        <RejectModal>
          <RejectSheet>
            <RejectTitle>Motivo da rejeição</RejectTitle>

            <RejectInput
              placeholder="Descreva o motivo..."
              value={rejectReason}
              onChangeText={setRejectReason}
            />

            <RejectActions>
              <RejectBtn
                bg={c.bg}
                onPress={() => {
                  setRejectTarget(null);
                  setRejectReason("");
                }}
              >
                <RejectBtnText color={c.textSub}>Cancelar</RejectBtnText>
              </RejectBtn>

              <RejectBtn
                bg={c.dangerLight}
                onPress={handleReject}
                disabled={sendingReject}
              >
                {sendingReject ? (
                  <ActivityIndicator size="small" color={c.danger} />
                ) : (
                  <RejectBtnText color={c.danger}>Confirmar</RejectBtnText>
                )}
              </RejectBtn>
            </RejectActions>
          </RejectSheet>
        </RejectModal>
      </Modal>
    </Container>
  );
}