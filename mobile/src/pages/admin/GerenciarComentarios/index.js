import React, { useCallback, useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import api from "../../../services/api";

import {
  c,
  Container,
  HeaderBg,
  HeaderTitle,
  List,
  OccurrenceBlock,
  OccurrenceTitle,
  CommentRow,
  CommentInfo,
  CommentAuthor,
  CommentBody,
  CommentDate,
  DeleteBtn,
  EmptyText,
} from "./styles";

export default function GerenciarComentarios() {
  const [occurrences, setOccurrences] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [deleting, setDeleting]       = useState(null);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  async function load() {
    setLoading(true);
    try {
      // Busca ocorrências aprovadas e carrega os comentários de cada uma
      const occRes = await api.get("/occurrences");

      const withComments = await Promise.all(
        occRes.data.map(async (occ) => {
          const commRes = await api.get(`/occurrences/${occ.id}/comments`);
          return { ...occ, comments: commRes.data };
        })
      );

      // Filtra só as que têm comentários
      setOccurrences(withComments.filter((o) => o.comments.length > 0));
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os comentários.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(occurrenceId, commentId) {
    Alert.alert(
      "Remover comentário",
      "Deseja remover este comentário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            setDeleting(commentId);
            try {
              await api.delete(
                `/occurrences/${occurrenceId}/comments/${commentId}`
              );
              setOccurrences((prev) =>
                prev
                  .map((o) =>
                    o.id === occurrenceId
                      ? { ...o, comments: o.comments.filter((c) => c.id !== commentId) }
                      : o
                  )
                  .filter((o) => o.comments.length > 0)
              );
            } catch {
              Alert.alert("Erro", "Não foi possível remover o comentário.");
            } finally {
              setDeleting(null);
            }
          },
        },
      ]
    );
  }

  return (
    <Container>
      <HeaderBg>
        <HeaderTitle>Comentários</HeaderTitle>
      </HeaderBg>

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
            <EmptyText>Nenhum comentário encontrado.</EmptyText>
          }
          renderItem={({ item: occ }) => (
            <OccurrenceBlock>
              <OccurrenceTitle numberOfLines={1}>{occ.title}</OccurrenceTitle>

              {occ.comments.map((comment) => (
                <CommentRow key={comment.id}>
                  <CommentInfo>
                    <CommentAuthor>{comment.userName ?? "Anônimo"}</CommentAuthor>
                    <CommentBody>{comment.text}</CommentBody>
                    {comment.createdAt && (
                      <CommentDate>
                        {new Date(comment.createdAt).toLocaleString("pt-BR")}
                      </CommentDate>
                    )}
                  </CommentInfo>

                  <DeleteBtn
                    onPress={() => handleDelete(occ.id, comment.id)}
                    disabled={deleting === comment.id}
                  >
                    {deleting === comment.id ? (
                      <ActivityIndicator size="small" color={c.danger} />
                    ) : (
                      <Feather name="trash-2" size={15} color={c.danger} />
                    )}
                  </DeleteBtn>
                </CommentRow>
              ))}
            </OccurrenceBlock>
          )}
        />
      )}
    </Container>
  );
}