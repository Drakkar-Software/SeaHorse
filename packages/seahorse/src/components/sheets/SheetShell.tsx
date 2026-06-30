import React from "react";
import { Platform, Modal, View } from "react-native";
import { Pressable } from "react-native-css/components";
import { Host, BottomSheet, RNHostView } from "@expo/ui";

interface SheetShellProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

/**
 * Platform-adaptive modal shell.
 * Native: @expo/ui BottomSheet (SwiftUI on iOS, Compose on Android — native OS sheet).
 * Web: react-native-web Modal with a tap-to-dismiss backdrop overlay.
 */
export function SheetShell({ visible, onDismiss, children }: SheetShellProps) {
  if (Platform.OS === "web") {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onDismiss}
      >
        {/* Backdrop: tap anywhere outside the card to dismiss */}
        <Pressable
          onPress={onDismiss}
          style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          {/* Inner View claims the responder so taps on the card don't reach the backdrop */}
          <View onStartShouldSetResponder={() => true}>
            {children}
          </View>
        </Pressable>
      </Modal>
    );
  }

  // Native: @expo/ui universal BottomSheet. Host is zero-sized absolute so it
  // does not affect the layout of siblings. The sheet presents as a native OS
  // modal on top of everything (SwiftUI .sheet on iOS, ModalBottomSheet on Android).
  return (
    <Host style={{ position: "absolute", width: 0, height: 0 }}>
      <BottomSheet isPresented={visible} onDismiss={onDismiss}>
        <RNHostView matchContents><>{children}</></RNHostView>
      </BottomSheet>
    </Host>
  );
}
