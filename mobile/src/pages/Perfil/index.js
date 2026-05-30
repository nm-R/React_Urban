import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";

import {
  c,
  Container,
  HeaderBg,
  AvatarWrapper,
  AvatarText,
  UserName,
  UserEmail,
  UserBadge,
  UserBadgeText,
  StatsRow,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  OccurrenceCard,
  OccurrenceAccent,
  OccurrenceContent,
  OccurrenceTop,
  OccurrenceTitle,
  StatusBadge,
  StatusText,
  OccurrenceDate,
  RejectionBox,
  RejectionTitle,
  RejectionText,
  ReopenBtn,
  ReopenBtnText,
  EmptyBox,
  EmptyTitle,
  EmptyText,
  LogoutBtn,
  LogoutText,
  ListFooter,
} from "./styles";

const STATUS_CONFIG = {
  APPROVED: {
    label: "Aprovada",
    color: c.success,
    bg: c.successLight,
    icon: "check-circle",
  },
  PENDING: {
    label: "Pendente",
    color: c.warning,
    bg: c.warningLight,
    icon: "clock",
  },
  REJECTED: {
    label: "Rejeitada",
    color: c.danger,
    bg: c.dangerLight,
    icon: "x-circle",
  },
  EXPIRED: {
    label: "Expirada",
    color: c.gray,
    bg: c.grayLight,
    icon: "rotate-ccw",
  },
};

function formatarTempo(data) {
  const diff = Date.now() - new Date(data).getTime();
  const minutos = Math.floor(diff / 60000);

  if (minutos < 1) return "agora";
  if (minutos < 60) return `${minutos} min atrás`;

  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `${horas}h atrás`;

  const dias = Math.floor(horas / 24);
  if (dias === 1) return "ontem";
  return `${dias} dias atrás`;
}

export default function Perfil() {
  const { user, logOut } = useContext(AuthContext);

  const [occurrences, setOccurrences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reopening, setReopening] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadMyOccurrences();
    }, [])
  );

  async function loadMyOccurrences(isRefresh = false) {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await api.get("/occurrences/my");
      setOccurrences(response.data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar suas ocorrências.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleReopen(id) {
    setReopening(id);

    try {
      await api.post(`/occurrences/${id}/reopen`);
      await loadMyOccurrences();
    } catch {
      Alert.alert("Erro", "Não foi possível reabrir a ocorrência.");
    } finally {
      setReopening(null);
    }
  }

  function handleLogout() {
    Alert.alert("Sair", "Deseja encerrar a sessão?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: logOut,
      },
    ]);
  }

  const total = occurrences.length;
  const approved = occurrences.filter((o) => o.status === "APPROVED").length;
  const pending = occurrences.filter((o) => o.status === "PENDING").length;

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  function renderOccurrence({ item }) {
    const cfg = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.PENDING;

    return (
      <OccurrenceCard activeOpacity={0.85}>
        <OccurrenceAccent color={cfg.color} />

        <OccurrenceContent>
          <OccurrenceTop>
            <OccurrenceTitle numberOfLines={2}>{item.title}</OccurrenceTitle>

            <StatusBadge bg={cfg.bg}>
              <Feather name={cfg.icon} size={12} color={cfg.color} />
              <StatusText color={cfg.color}>{cfg.label}</StatusText>
            </StatusBadge>
          </OccurrenceTop>

          <OccurrenceDate>
            Criada {formatarTempo(item.createdAt)}
          </OccurrenceDate>

          {item.status === "REJECTED" && item.rejectionReason ? (
            <RejectionBox>
              <RejectionTitle>Motivo da rejeição</RejectionTitle>
              <RejectionText>{item.rejectionReason}</RejectionText>
            </RejectionBox>
          ) : null}

          {item.status === "EXPIRED" ? (
            <ReopenBtn
              activeOpacity={0.8}
              onPress={() => handleReopen(item.id)}
              disabled={reopening === item.id}
            >
              {reopening === item.id ? (
                <ActivityIndicator size="small" color={c.accent} />
              ) : (
                <>
                  <Feather name="rotate-ccw" size={15} color={c.accent} />
                  <ReopenBtnText>Reabrir ocorrência</ReopenBtnText>
                </>
              )}
            </ReopenBtn>
          ) : null}
        </OccurrenceContent>
      </OccurrenceCard>
    );
  }

  function renderHeader() {
    return (
      <>
        <HeaderBg>
          <AvatarWrapper>
            <AvatarText>{initials}</AvatarText>
          </AvatarWrapper>

          <UserName numberOfLines={1}>{user?.name ?? "Usuário"}</UserName>
          <UserEmail numberOfLines={1}>{user?.email ?? ""}</UserEmail>

          <UserBadge>
            <Feather name="map-pin" size={12} color="#0B49B7" />
            <UserBadgeText>Colaborador urbano</UserBadgeText>
          </UserBadge>
        </HeaderBg>

        <StatsRow>
          <StatCard>
            <StatIcon bg="#EEF4FF">
              <Feather name="file-text" size={17} color={c.accent} />
            </StatIcon>
            <StatNumber color={c.accent}>{total}</StatNumber>
            <StatLabel>Total</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon bg={c.successLight}>
              <Feather name="check-circle" size={17} color={c.success} />
            </StatIcon>
            <StatNumber color={c.success}>{approved}</StatNumber>
            <StatLabel>Aprovadas</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon bg={c.warningLight}>
              <Feather name="clock" size={17} color={c.warning} />
            </StatIcon>
            <StatNumber color={c.warning}>{pending}</StatNumber>
            <StatLabel>Pendentes</StatLabel>
          </StatCard>
        </StatsRow>

        <SectionHeader>
          <View>
            <SectionTitle>Minhas ocorrências</SectionTitle>
            <SectionSubtitle>Acompanhe seus envios recentes</SectionSubtitle>
          </View>
        </SectionHeader>
      </>
    );
  }

  function renderEmpty() {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color={c.accent}
          style={{ marginTop: 30 }}
        />
      );
    }

    return (
      <EmptyBox>
        <Feather name="clipboard" size={30} color={c.accent} />
        <EmptyTitle>Nenhuma ocorrência ainda</EmptyTitle>
        <EmptyText>
          Quando você reportar algo na cidade, suas ocorrências aparecerão aqui.
        </EmptyText>
      </EmptyBox>
    );
  }

  return (
    <Container>
      <FlatList
        data={loading ? [] : occurrences}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderOccurrence}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 28,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadMyOccurrences(true)}
            colors={[c.accent]}
            tintColor={c.accent}
          />
        }
        ListFooterComponent={
          <ListFooter>
            <LogoutBtn activeOpacity={0.8} onPress={handleLogout}>
              <Feather name="log-out" size={18} color={c.danger} />
              <LogoutText>Encerrar sessão</LogoutText>
            </LogoutBtn>
          </ListFooter>
        }
      />
    </Container>
  );
}