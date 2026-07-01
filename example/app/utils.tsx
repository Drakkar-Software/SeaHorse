import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { safeFormat } from "@drakkar.software/seahorse/utils/date";
import { isValidUrl, parseLinks } from "@drakkar.software/seahorse/utils";
import { useAutoOtaUpdate } from "@drakkar.software/seahorse/utils/ota-update";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
      }}
    >
      <Text style={{ fontSize: 14, color: "#6b7280" }}>{label}</Text>
      <Text style={{ fontSize: 14, fontFamily: "Menlo", color: "#111827" }}>{value}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: 16, gap: 4 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

export default function UtilsScreen() {
  // OTA update — skips in dev builds automatically
  useAutoOtaUpdate({ skipInDev: true });

  const now = new Date();
  const invalidDate = new Date("not-a-date");

  const links = parseLinks("https://example.com, https://docs.expo.dev");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }} edges={["bottom"]}>
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ gap: 16 }}>

        <Section title="safeFormat (date-fns wrapper)">
          <Row label="Valid date" value={safeFormat(now, "dd MMM yyyy")} />
          <Row label="With time" value={safeFormat(now, "HH:mm")} />
          <Row label="Invalid date" value={safeFormat(invalidDate, "dd MMM yyyy")} />
        </Section>

        <Section title="isValidUrl">
          <Row label="https://expo.dev" value={String(isValidUrl("https://expo.dev"))} />
          <Row label="not-a-url" value={String(isValidUrl("not-a-url"))} />
          <Row label="ftp://old.net" value={String(isValidUrl("ftp://old.net"))} />
        </Section>

        <Section title="parseLinks">
          {links.map((link, i) => (
            <Row key={i} label={`Link ${i + 1}`} value={link.url} />
          ))}
        </Section>

        <Section title="useAutoOtaUpdate">
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            OTA update check runs on mount in production builds. Skipped in dev mode ({__DEV__ ? "active" : "inactive"}).
          </Text>
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
}
