import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

import {
  AlertTriangle,
  Car,
  Construction,
  Leaf,
  Shield,
  Trash2,
} from "lucide-react-native";

import api from "../../services/api";
import OcorrenciaModal from "../../components/OcorrenciaModal";
import CriarOcorrenciaModal from "../../components/CriarOcorrenciaModal";

import {
  Container,
  LoadingContainer,
  MapButton,
  MapButtonsWrapper,
  HintCard,
  HintTitle,
  HintText,
  CounterBadge,
  CounterText,
  MarkerBubble,
} from "./styles";

const INITIAL_REGION = {
  latitude: -22.9797,
  longitude: -49.8697,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const SHOW_CIRCLES_DELTA = 0.035;

const CATEGORY_MAP = {
  TRAFFIC: { Icon: Car, color: "#f59e0b" },
  INFRASTRUCTURE: { Icon: Construction, color: "#ef4444" },
  SANITATION: { Icon: Trash2, color: "#10b981" },
  SECURITY: { Icon: Shield, color: "#3b82f6" },
  ENVIRONMENT: { Icon: Leaf, color: "#22c55e" },
};

const DEFAULT_CATEGORY = {
  Icon: AlertTriangle,
  color: "#6b7280",
};

const getIconByCategory = (cat) => CATEGORY_MAP[cat] ?? DEFAULT_CATEGORY;

const CUSTOM_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#f0f0ed" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5a6473" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f0f0ed" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#c9cdd4" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#e8e8e3" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#d8e8d0" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d8d8d2" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#e8e0d0" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c0d8e8" }],
  },
];

export default function Ocorrencias({ route, navigation }) {
  const mapRef = useRef(null);

  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selected, setSelected] = useState(null);
  const [newCoordinate, setNewCoordinate] = useState(null);
  const [previewRadius, setPreviewRadius] = useState(null);

  const [showCircles, setShowCircles] = useState(
    INITIAL_REGION.latitudeDelta <= SHOW_CIRCLES_DELTA,
  );

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    loadOccurrences();
  }, []);

  useEffect(() => {
    if (!route.params?.ocorrenciaId || ocorrencias.length === 0) return;

    const ocorrencia = ocorrencias.find(
      (o) => o.id === route.params.ocorrenciaId,
    );

    if (ocorrencia) {
      setSelected(ocorrencia);
      navigation.setParams({ ocorrenciaId: undefined });
    }
  }, [route.params?.ocorrenciaId, ocorrencias]);

  async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Ative a localização para ver sua posição no mapa.",
      );
    }
  }

  async function loadOccurrences() {
    try {
      setRefreshing(true);

      const response = await api.get("/occurrences");
      setOcorrencias(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as ocorrências.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function centerOnUser() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Ative a localização para centralizar o mapa.",
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      mapRef.current?.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        },
        500,
      );
    } catch {
      Alert.alert("Erro", "Não foi possível obter sua localização.");
    }
  }

  function handleRegionChangeComplete(region) {
    const shouldShow = region.latitudeDelta <= SHOW_CIRCLES_DELTA;

    setShowCircles((prev) => {
      if (prev === shouldShow) return prev;
      return shouldShow;
    });
  }

  function focusPreviewArea(coordinate) {
  if (!coordinate || !mapRef.current) return;

  mapRef.current.animateCamera(
    {
      center: {
        latitude: coordinate.latitude - 0.0025,
        longitude: coordinate.longitude,
      },
      zoom: 16,
    },
    { duration: 500 }
  );
}

function handleLongPress(event) {
  const coordinate = event.nativeEvent.coordinate;

  setNewCoordinate(coordinate);
  focusPreviewArea(coordinate);
}

  function handleOcorrenciaCriada() {
    loadOccurrences();
  }

  function handleClose() {
    setNewCoordinate(null);
    setPreviewRadius(null);
  }

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#0B49B7" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={INITIAL_REGION}
        customMapStyle={CUSTOM_MAP_STYLE}
        showsCompass={false}
        rotateEnabled={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onLongPress={handleLongPress}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
        followsUserLocation={false}
      >
        {newCoordinate && (
          <>
            <Marker coordinate={newCoordinate} anchor={{ x: 0.45, y: 0.45 }}>
              <MarkerBubble color={DEFAULT_CATEGORY.color}>
                <AlertTriangle size={20} color={DEFAULT_CATEGORY.color} />
              </MarkerBubble>
            </Marker>

            {previewRadius && showCircles && (
              <Circle
                center={newCoordinate}
                radius={previewRadius}
                strokeWidth={2}
                strokeColor={`${DEFAULT_CATEGORY.color}99`}
                fillColor={`${DEFAULT_CATEGORY.color}1F`}
              />
            )}
          </>
        )}

        {ocorrencias.map((item) => {
          const { Icon, color } = getIconByCategory(item.category);

          const coordinate = {
            latitude: item.latitude,
            longitude: item.longitude,
          };

          return (
            <React.Fragment key={item.id}>
              {showCircles && (
                <Circle
                  center={coordinate}
                  radius={item.radius}
                  strokeWidth={2}
                  strokeColor={`${color}99`}
                  fillColor={`${color}1F`}
                />
              )}

              <Marker
                coordinate={coordinate}
                onPress={() => setSelected(item)}
                anchor={{ x: 0.45, y: 0.45 }}
              >
                <MarkerBubble color={color}>
                  <Icon size={20} color={color} />
                </MarkerBubble>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapView>

      <HintCard>
        <View>
          <HintTitle>Ocorrências no mapa</HintTitle>
          <HintText>
            Segure no mapa para reportar. Aproxime o zoom para ver os raios.
          </HintText>
        </View>
      </HintCard>

      <CounterBadge>
        <CounterText>{ocorrencias.length} ocorrências</CounterText>
      </CounterBadge>

      <MapButtonsWrapper>
        <MapButton activeOpacity={0.8} onPress={centerOnUser}>
          <Feather name="crosshair" size={19} color="#0B49B7" />
        </MapButton>

        <MapButton activeOpacity={0.8} onPress={loadOccurrences}>
          {refreshing ? (
            <ActivityIndicator size="small" color="#0B49B7" />
          ) : (
            <Feather name="refresh-cw" size={18} color="#0B49B7" />
          )}
        </MapButton>
      </MapButtonsWrapper>

      <OcorrenciaModal
        item={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />

      <CriarOcorrenciaModal
        visible={!!newCoordinate}
        coordinate={newCoordinate}
        onClose={handleClose}
        onCreate={handleOcorrenciaCriada}
        onRadiusChange={setPreviewRadius}
      />
    </Container>
  );
}
