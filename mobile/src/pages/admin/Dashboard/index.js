import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import api from "../../../services/api";

import {
  c,
  Container,
  HeaderBg,
  HeaderTitle,
  HeaderSub,
  SectionTitle,
  StatsGrid,
  StatCard,
  StatIconWrapper,
  StatNumber,
  StatLabel,
  QuickCard,
  QuickIconWrapper,
  QuickInfo,
  QuickTitle,
  QuickSub,
  Badge,
  BadgeText,
} from "./styles";

export default function Dashboard() {
  const navigation = useNavigation();
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  async function loadStats() {
    setLoading(true);
    try {
      const [pending, rejected, expired] = await Promise.all([
        api.get("/occurrences/admin?status=PENDING"),
        api.get("/occurrences/admin?status=REJECTED"),
        api.get("/occurrences/admin?status=EXPIRED"),
      ]);

      setStats({
        pending:  pending.data.length,
        rejected: rejected.data.length,
        expired:  expired.data.length,
        total:    pending.data.length + rejected.data.length + expired.data.length,
      });
    } catch {
      setStats({ pending: 0, rejected: 0, expired: 0, total: 0 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <HeaderBg>
        <HeaderTitle>Painel Admin</HeaderTitle>
        <HeaderSub>Visão geral das ocorrências</HeaderSub>
      </HeaderBg>

      <SectionTitle>Resumo</SectionTitle>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={c.accent}
          style={{ marginTop: 24 }}
        />
      ) : (
        <>
          <StatsGrid>
            <StatCard>
              <StatIconWrapper bg={c.warningLight}>
                <Feather name="clock" size={18} color={c.warning} />
              </StatIconWrapper>
              <StatNumber color={c.warning}>{stats.pending}</StatNumber>
              <StatLabel>Pendentes</StatLabel>
            </StatCard>

            <StatCard>
              <StatIconWrapper bg={c.dangerLight}>
                <Feather name="x-circle" size={18} color={c.danger} />
              </StatIconWrapper>
              <StatNumber color={c.danger}>{stats.rejected}</StatNumber>
              <StatLabel>Rejeitadas</StatLabel>
            </StatCard>

            <StatCard>
              <StatIconWrapper bg={c.grayLight}>
                <Feather name="archive" size={18} color={c.gray} />
              </StatIconWrapper>
              <StatNumber color={c.gray}>{stats.expired}</StatNumber>
              <StatLabel>Expiradas</StatLabel>
            </StatCard>

            <StatCard>
              <StatIconWrapper bg={c.accentLight}>
                <Feather name="list" size={18} color={c.accent} />
              </StatIconWrapper>
              <StatNumber color={c.accent}>{stats.total}</StatNumber>
              <StatLabel>Total</StatLabel>
            </StatCard>
          </StatsGrid>

          <SectionTitle>Ações rápidas</SectionTitle>

          <QuickCard onPress={() => navigation.navigate("Ocorrencias")}>
            <QuickIconWrapper bg={c.warningLight}>
              <Feather name="alert-circle" size={20} color={c.warning} />
            </QuickIconWrapper>
            <QuickInfo>
              <QuickTitle>Revisar pendentes</QuickTitle>
              <QuickSub>Aprovar ou rejeitar ocorrências</QuickSub>
            </QuickInfo>
            {stats.pending > 0 && (
              <Badge bg={c.warning}>
                <BadgeText>{stats.pending}</BadgeText>
              </Badge>
            )}
            <Feather name="chevron-right" size={18} color={c.textMuted} />
          </QuickCard>

          <QuickCard onPress={() => navigation.navigate("Comentarios")}>
            <QuickIconWrapper bg={c.dangerLight}>
              <Feather name="message-circle" size={20} color={c.danger} />
            </QuickIconWrapper>
            <QuickInfo>
              <QuickTitle>Moderar comentários</QuickTitle>
              <QuickSub>Remover comentários inapropriados</QuickSub>
            </QuickInfo>
            <Feather name="chevron-right" size={18} color={c.textMuted} />
          </QuickCard>
        </>
      )}
    </Container>
  );
}