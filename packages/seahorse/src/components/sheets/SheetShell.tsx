import React from "react";
import { Platform, Modal, View } from "react-native";
import { Pressable } from "react-native-css/components";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useBottomSheetModal } from "./useBottomSheetModal";

interface SheetShellProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

/**
 * Platform-adaptive modal shell.
 * Native: @gorhom/bottom-sheet BottomSheetModal (pan-to-close, animated backdrop).
 * Web: react-native-web Modal with a tap-to-dismiss backdrop overlay.
 *
 * gorhom's BottomSheetModal silently never presents on web under
 * react-native-reanimated 4.x, so the web branch uses RN's own Modal instead.
 */
export function SheetShell({ visible, onDismiss, children }: SheetShellProps) {
  // Hook always called (rules of hooks). On web the ref is never attached, so
  // present()/dismiss() are no-ops — harmless.
  const { ref, renderBackdrop } = useBottomSheetModal(visible);

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

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onDismiss={onDismiss}
      backgroundStyle={{ backgroundColor: "transparent" }}
      handleComponent={() => null}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}
