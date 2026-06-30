import React from "react";
import { Platform, Modal, View, useWindowDimensions } from "react-native";
import { Pressable } from "react-native-css/components";
import { BottomSheet, RNHostView } from "@expo/ui";
import { presentationBackground } from "@expo/ui/swift-ui/modifiers";

interface SheetShellProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  /** iOS only: paint the full sheet chrome (drag-indicator zone + safe-area inset) with this color. */
  backgroundColor?: string;
}

/**
 * Platform-adaptive modal shell.
 * Native: @expo/ui BottomSheet (SwiftUI on iOS, Compose on Android — native OS sheet).
 * Web: react-native-web Modal with a tap-to-dismiss backdrop overlay.
 */
export function SheetShell({ visible, onDismiss, children, backgroundColor }: SheetShellProps) {
  const { width } = useWindowDimensions();

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

  // Native: @expo/ui universal BottomSheet.
  // - No outer <Host> needed: BottomSheet creates its own Host internally.
  // - RNHostView bridges raw RN children into the SwiftUI tree.
  // - matchContents=true is kept for auto-height, but children are wrapped in a
  //   full-width View (screen width minus the BottomSheet's 2×16px internal insets)
  //   so the measured width fills the sheet instead of shrinking to content intrinsic width.
  //   This prevents the grey side-bars that appeared when the host was narrower than the sheet.
  const modifiers = backgroundColor ? [presentationBackground(backgroundColor)] : undefined;

  return (
    <BottomSheet isPresented={visible} onDismiss={onDismiss} modifiers={modifiers}>
      <RNHostView matchContents>
        <View style={{ width: width - 32 }}>
          {children}
        </View>
      </RNHostView>
    </BottomSheet>
  );
}
