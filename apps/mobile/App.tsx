import { SafeAreaView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useMemo, useState } from "react";
import { AbcTemplateSteps } from "@nana/shared";

export default function App() {
  const [index, setIndex] = useState(0);
  const step = AbcTemplateSteps[index];
  const progress = useMemo(() => `${index + 1}/${AbcTemplateSteps.length}`, [index]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <View style={{ padding: 20, gap: 12 }}>
        <Text style={{ color: "white", fontSize: 28, fontWeight: "700" }}>Caregiver Recording</Text>
        <Text style={{ color: "#cbd5e1", fontSize: 18 }}>Step {progress}: {step.label}</Text>
        <View style={{ backgroundColor: "#1e293b", borderRadius: 18, padding: 24 }}>
          <Text style={{ color: "#fff", fontSize: 60, textAlign: "center", fontWeight: "800" }}>{step.overlayText}</Text>
          <Text style={{ color: "#e2e8f0", marginTop: 10, fontSize: 20, textAlign: "center" }}>{step.prompt}</Text>
          <Text style={{ color: "#94a3b8", marginTop: 10 }}>Tip: {step.tip}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
          {['Record', 'Stop', 'Re-record', 'Next'].map((label) => (
            <TouchableOpacity key={label} style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: label==='Record' ? '#22c55e':'#334155' }} onPress={() => label==='Next' && setIndex((p) => Math.min(p + 1, AbcTemplateSteps.length - 1))}>
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={AbcTemplateSteps}
          horizontal
          renderItem={({ item, index: i }) => (
            <View style={{ marginRight: 8, padding: 8, borderRadius: 999, backgroundColor: i <= index ? '#22c55e' : '#475569' }}>
              <Text style={{ color: "white", fontWeight: "700" }}>{item.label}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
