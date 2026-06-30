import React from "react";
import { SegmentedControl as ExpoSegmentedControl } from "@expo/ui/community/segmented-control";
import type { SegmentedControlProps } from "@expo/ui/community/segmented-control";
import { useForgeTheme } from "../../theme/context";

export type { SegmentedControlProps } from "@expo/ui/community/segmented-control";

/**
 * Stylized cross-platform segmented control: @expo/ui community drop-in.
 * SwiftUI on iOS, Jetpack Compose on Android, vendored RN segmented control on web —
 * single import, no platform branching. `tintColor` defaults to the Forge theme primary
 * (Android/web only; native styling is used on iOS).
 */
export function SegmentedControl({ tintColor, ...props }: SegmentedControlProps) {
  const { colors } = useForgeTheme();
  return <ExpoSegmentedControl tintColor={tintColor ?? colors.primary} {...props} />;
}
