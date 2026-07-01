import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Row,
  Column,
  ScrollView as NativeScrollView,
  Spacer,
  Text,
  Button,
  Switch,
  Checkbox,
  Slider,
  Icon,
  TextInput,
  Collapsible,
  Picker,
  List,
  ListItem,
  FieldGroup,
} from "@drakkar.software/seahorse/primitives";

// Plain SF Symbol string — a real cross-platform icon additionally needs an
// Android drawable (e.g. via @expo/material-symbols), omitted here since
// expo-router eagerly bundles every app/ file to build its route table, and
// an unresolvable asset require in one screen would break the whole bundle.
const STAR = "star.fill" as const;

export default function NativeScreen() {
  const [switchOn, setSwitchOn] = useState(true);
  const [checked, setChecked] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [text, setText] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [view, setView] = useState("list");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["bottom"]}>
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ gap: 20 }}>
        {/* Everything shares one Column so it collapses into a single native Host —
            independent top-level Hosts as ScrollView siblings race their async
            size-reporting and render overlapping until each settles. */}
        <Column spacing={20}>
          <Text textStyle={{ fontSize: 22, fontWeight: "bold" }}>Native (@expo/ui)</Text>

          <Switch value={switchOn} onValueChange={setSwitchOn} label="Notifications" />

          <Column spacing={12}>
            <Text textStyle={{ fontWeight: "600" }}>Grouped controls (one Host)</Text>
            <Checkbox value={checked} onValueChange={setChecked} label="I agree" />
            <Slider value={sliderValue} onValueChange={setSliderValue} min={0} max={100} />
            <Row spacing={8}>
              <Icon name={STAR} size={20} color="orange" />
              <Spacer size={8} />
              <Button label="Save" variant="filled" onPress={() => {}} />
              <Button label="Cancel" variant="outlined" onPress={() => {}} />
            </Row>
            <NativeScrollView direction="horizontal">
              <Row spacing={12}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name={STAR} size={24} color="orange" />
                ))}
              </Row>
            </NativeScrollView>
          </Column>

          <TextInput value={text} onChangeText={setText} placeholder="Type here" />

          <Collapsible isOpen={detailsOpen} onOpenChange={setDetailsOpen} label="Details">
            <Text>Hidden content revealed when expanded.</Text>
          </Collapsible>

          <Picker selectedValue={view} onValueChange={setView}>
            <Picker.Item label="List view" value="list" />
            <Picker.Item label="Grid view" value="grid" />
          </Picker>

          <List>
            <ListItem leading={<Icon name={STAR} size={18} color="orange" />} supportingText="Supporting text">
              Row one
            </ListItem>
            <ListItem>Row two</ListItem>
          </List>

          <FieldGroup>
            <FieldGroup.Section title="Preferences">
              <ListItem>Setting A</ListItem>
              <ListItem>Setting B</ListItem>
            </FieldGroup.Section>
          </FieldGroup>
        </Column>
      </ScrollView>
    </SafeAreaView>
  );
}
