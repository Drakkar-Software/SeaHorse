import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const sections = [
  {
    title: "Components",
    description: "UI building blocks: badges, cards, search, FAB, timeline…",
    route: "/components" as const,
  },
  {
    title: "Form Elements",
    description: "FormSection, InputRow, DateRow, ToggleRow, ChipSelect…",
    route: "/forms" as const,
  },
  {
    title: "Native (@expo/ui)",
    description: "Button, Switch, Checkbox, Slider, TextInput, Picker, List…",
    route: "/native" as const,
  },
  {
    title: "Utilities",
    description: "safeFormat, secure-store, crypto, app-lock, OTA update…",
    route: "/utils" as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["bottom"]}>
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ gap: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#111827", marginBottom: 8 }}>
          SeaHorse
        </Text>
        <Text style={{ fontSize: 16, color: "#6b7280", marginBottom: 16 }}>
          Generic UI components and utilities for React Native / Expo apps.
        </Text>

        {sections.map((section) => (
          <TouchableOpacity
            key={section.route}
            onPress={() => router.push(section.route)}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#f3f4f6",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#111827", marginBottom: 4 }}>
              {section.title}
            </Text>
            <Text style={{ fontSize: 14, color: "#6b7280" }}>
              {section.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
