import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";
import { AuthContext } from "../../contexts/auth";

import {
  Background,
  TopAccent,
  Header,
  BrandArea,
  LogoText,
  LogoPlus,
  LogoTagline,
  GreetingArea,
  GreetingText,
  UserName,
  LocationRow,
  LocationText,
  MainAction,
  MainActionIcon,
  MainActionContent,
  MainActionTitle,
  MainActionText,
  Content,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  ViewAllButton,
  ViewAllText,
  OccurrenceCard,
  OccurrenceAccent,
  OccurrenceContent,
  OccurrenceTop,
  OccurrenceTitle,
  OccurrenceMeta,
  Badge,
  BadgeText,
  OccurrenceDescription,
  OccurrenceFooter,
  OccurrenceTime,
  ConfirmBadge,
  ConfirmText,
  EmptyBox,
  EmptyTitle,
  EmptyText,
} from "./styles";

const CATEGORY_MAP = {
  TRAFFIC: { label: "Trânsito", color: "#F59E0B" },
  INFRASTRUCTURE: { label: "Infraestrutura", color: "#EF4444" },
  SANITATION: { label: "Saneamento", color: "#10B981" },
  SECURITY: { label: "Segurança", color: "#3B82F6" },
  ENVIRONMENT: { label: "Meio ambiente", color: "#22C55E" },
  OTHER: { label: "Outros", color: "#6B7280" },
};

const saudacao = () => {
  const hora = new Date().getHours();

  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
};

const formatarTempo = (createdAt) => {
  const minutos = Math.floor((Date.now() - new Date(createdAt)) / 60000);

  if (minutos < 1) return "agora";
  if (minutos < 60) return `${minutos} min atrás`;
  if (minutos < 1440) return `${Math.floor(minutos / 60)}h atrás`;
  return `${Math.floor(minutos / 1440)}d atrás`;
};

export default function HomeScreen({ navigation }) {
  const [carregandoOcorrencias, setCarregandoOcorrencias] = useState(true);
  const [ocorrencias, setOcorrencias] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function buscarOcorrencias() {
      try {
        const { data } = await api.get("/occurrences/latest");

        const formatado = await Promise.all(
          data.map(async (o) => {
            try {
              const { data: comentarios } = await api.get(
                `/occurrences/${o.id}/comments`
              );

              return {
                id: o.id,
                titulo: o.title,
                categoria: o.category,
                descricao: o.description ?? "",
                tempo: formatarTempo(o.createdAt),
                confirmacoes: comentarios.length,
              };
            } catch {
              return {
                id: o.id,
                titulo: o.title,
                categoria: o.category,
                descricao: o.description ?? "",
                tempo: formatarTempo(o.createdAt),
                confirmacoes: 0,
              };
            }
          })
        );

        setOcorrencias(formatado);
      } catch (erro) {
        console.error("Erro ao buscar ocorrências:", erro);
      } finally {
        setCarregandoOcorrencias(false);
      }
    }

    buscarOcorrencias();
  }, []);

  function renderizarOcorrencia(item) {
    const ui = CATEGORY_MAP[item.categoria] ?? CATEGORY_MAP.OTHER;

    return (
      <OccurrenceCard
        key={item.id}
        activeOpacity={0.82}
        onPress={() =>
          navigation.navigate("Ocorrencias", { ocorrenciaId: item.id })
        }
      >
        <OccurrenceAccent color={ui.color} />

        <OccurrenceContent>
          <OccurrenceTop>
            <Badge color={ui.color}>
              <BadgeText>{ui.label}</BadgeText>
            </Badge>

            <OccurrenceTime>{item.tempo}</OccurrenceTime>
          </OccurrenceTop>

          <OccurrenceTitle numberOfLines={1}>{item.titulo}</OccurrenceTitle>

          <OccurrenceDescription numberOfLines={2}>
            {item.descricao || "Sem descrição informada."}
          </OccurrenceDescription>

          <OccurrenceFooter>
            <OccurrenceMeta>
              <Feather name="map-pin" size={12} color="#8A9BC4" />
              <OccurrenceTime>Ourinhos, SP</OccurrenceTime>
            </OccurrenceMeta>

            <ConfirmBadge>
              <Feather name="message-circle" size={12} color="#0B49B7" />
              <ConfirmText>{item.confirmacoes}</ConfirmText>
            </ConfirmBadge>
          </OccurrenceFooter>
        </OccurrenceContent>
      </OccurrenceCard>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B49B7" }}>
      <StatusBar style="dark" backgroundColor="#0B49B7" translucent={false} />

      <Background>
        <TopAccent />

        <Header>

          <GreetingArea>
            <GreetingText>{saudacao()},</GreetingText>
            <UserName numberOfLines={1}>{user?.name || "Usuário"}</UserName>

            <LocationRow>
              <Feather name="map-pin" size={13} color="#DDE7FF" />
              <LocationText>Ourinhos, SP</LocationText>
            </LocationRow>
          </GreetingArea>

          <MainAction
            activeOpacity={0.86}
            onPress={() => navigation.navigate("Ocorrencias")}
          >
            <MainActionIcon>
              <Feather name="plus" size={22} color="#0B49B7" />
            </MainActionIcon>

            <MainActionContent>
              <MainActionTitle>Reportar ocorrência</MainActionTitle>
              <MainActionText>
                Avise sobre problemas na cidade em poucos passos
              </MainActionText>
            </MainActionContent>

            <Feather name="chevron-right" size={22} color="#FFFFFF" />
          </MainAction>
        </Header>

        <Content showsVerticalScrollIndicator={false}>
          <SectionHeader>
            <SectionTitle>Últimas ocorrências</SectionTitle>

            <ViewAllButton
              activeOpacity={0.75}
              onPress={() => navigation.navigate("Ocorrencias")}
            >
              <ViewAllText>Ver todas</ViewAllText>
              <Feather name="arrow-right" size={14} color="#0B49B7" />
            </ViewAllButton>
          </SectionHeader>

          {carregandoOcorrencias ? (
            <ActivityIndicator color="#0B49B7" style={{ marginTop: 30 }} />
          ) : ocorrencias.length > 0 ? (
            ocorrencias.map(renderizarOcorrencia)
          ) : (
            <EmptyBox>
              <Feather name="check-circle" size={30} color="#0B49B7" />
              <EmptyTitle>Tudo tranquilo por aqui</EmptyTitle>
              <EmptyText>Nenhuma ocorrência recente encontrada.</EmptyText>
            </EmptyBox>
          )}
        </Content>
      </Background>
    </SafeAreaView>
  );
}