import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SectionTitle,
  FormCard,
  InputRow,
  DateRow,
  TimeRow,
  ToggleRow,
  ChipSelect,
} from "@drakkar.software/seahorse/components";

const CATEGORY_OPTIONS = ["venue", "catering", "music", "photo"] as const;
const CATEGORY_LABELS: Record<(typeof CATEGORY_OPTIONS)[number], string> = {
  venue: "Venue",
  catering: "Catering",
  music: "Music",
  photo: "Photography",
};

export default function FormsScreen() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>(CATEGORY_OPTIONS[0]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }} edges={["bottom"]}>
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ gap: 16 }}>
        <SectionTitle title="Vendor Details" />
        <FormCard>
          <InputRow label="Name" value={name} onChangeText={setName} placeholder="Enter vendor name" />
          <InputRow
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            placeholder="Optional notes"
            multiline
          />
          <DateRow
            label="Event date"
            value={date}
            onChange={setDate}
            selectDateLabel="Pick a date"
            todayLabel="Today"
            clearLabel="Clear"
          />
          <TimeRow
            label="Start time"
            value={time}
            onChange={setTime}
            selectTimeLabel="Pick a time"
            confirmLabel="Confirm"
            clearLabel="Clear"
          />
          <ToggleRow
            label="Confirmed"
            value={confirmed}
            onToggle={() => setConfirmed((c) => !c)}
          />
        </FormCard>

        <SectionTitle title="Category" />
        <FormCard>
          <ChipSelect
            options={CATEGORY_OPTIONS}
            labels={CATEGORY_LABELS}
            value={category}
            onChange={setCategory}
          />
        </FormCard>
      </ScrollView>
    </SafeAreaView>
  );
}
