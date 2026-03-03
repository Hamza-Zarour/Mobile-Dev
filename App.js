import React, { useRef, useState, useEffect } from "react";
import { BackHandler, ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => sub.remove();
  }, [canGoBack]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <WebView
          ref={webviewRef}
          style={styles.webview}
          source={{ uri: "https://www.google.com" }}
          onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.35)",
  },
});