import "dotenv/config";

export default {
  expo: {
    name: "urbano",
    slug: "urbano",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    androidStatusBar: {
      backgroundColor: "#0B49B7",
      barStyle: "light-content",
      translucent: false,
    },

    androidNavigationBar: {
      backgroundColor: "#FFFFFF",
      barStyle: "dark-content",
    },

    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
      infoPlist: {
        NSPhotoLibraryUsageDescription:
          "Permitir acesso às fotos para anexar imagens nas ocorrências.",
        NSCameraUsageDescription:
          "Permitir acesso à câmera para tirar fotos das ocorrências.",
      },
    },

    android: {
      edgeToEdgeEnabled: false,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      permissions: [
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "CAMERA",
        "ACCESS_FINE_LOCATION",
      ],
    },

    web: {
      favicon: "./assets/favicon.png",
    },

    plugins: [
      "expo-font",
      [
        "expo-image-picker",
        {
          photosPermission:
            "Permitir acesso às fotos para anexar imagens nas ocorrências.",
          cameraPermission:
            "Permitir acesso à câmera para tirar fotos das ocorrências.",
        },
      ],
    ],
  },
};