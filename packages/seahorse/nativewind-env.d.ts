/// <reference types="nativewind/types" />

// Stubs for optional peer dependencies not installed in devDeps.
// These only need to be accurate enough for TypeScript to resolve types
// used in SeaHorse's own source; consumers install the real packages.

declare module "expo-haptics" {
  export enum ImpactFeedbackStyle {
    Light = "light",
    Medium = "medium",
    Heavy = "heavy",
  }
  export enum NotificationFeedbackType {
    Success = "success",
    Warning = "warning",
    Error = "error",
  }
  export function impactAsync(style?: ImpactFeedbackStyle): Promise<void>;
  export function notificationAsync(type?: NotificationFeedbackType): Promise<void>;
  export function selectionAsync(): Promise<void>;
}

declare module "@expo/html-elements" {
  import type { ViewProps, TextProps } from "react-native";
  import type { ComponentType } from "react";
  export const Section: ComponentType<ViewProps & { className?: string }>;
  export const Nav: ComponentType<ViewProps & { className?: string }>;
  export const Footer: ComponentType<ViewProps & { className?: string }>;
  export const Main: ComponentType<ViewProps & { className?: string }>;
  export const H1: ComponentType<TextProps & { className?: string }>;
  export const H2: ComponentType<TextProps & { className?: string }>;
  export const H3: ComponentType<TextProps & { className?: string }>;
  export const H4: ComponentType<TextProps & { className?: string }>;
  export const H5: ComponentType<TextProps & { className?: string }>;
  export const H6: ComponentType<TextProps & { className?: string }>;
  export const P: ComponentType<TextProps & { className?: string }>;
}

// react-native-svg: SvgProps extends ViewProps so it picks up nativewind's
// className augmentation. Explicit color/fill/stroke mirror the real package.
declare module "react-native-svg" {
  import type { ViewProps } from "react-native";
  import type { ComponentType, ReactNode } from "react";
  export interface SvgProps extends ViewProps {
    color?: string;
    fill?: string;
    fillOpacity?: number | string;
    stroke?: string;
    strokeWidth?: number | string;
    strokeOpacity?: number | string;
    strokeLinecap?: "butt" | "round" | "square";
    strokeLinejoin?: "miter" | "round" | "bevel";
    strokeDasharray?: number | string;
    strokeDashoffset?: number | string;
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    preserveAspectRatio?: string;
    opacity?: number | string;
    x?: number | string;
    y?: number | string;
    r?: number | string;
    cx?: number | string;
    cy?: number | string;
    rx?: number | string;
    ry?: number | string;
    d?: string;
    children?: ReactNode;
  }
  const Svg: ComponentType<SvgProps>;
  export { Svg };
  export default Svg;
  export const Circle: ComponentType<SvgProps>;
  export const Rect: ComponentType<SvgProps>;
  export const Path: ComponentType<SvgProps>;
  export const G: ComponentType<SvgProps>;
  export const Line: ComponentType<SvgProps>;
  export const Polygon: ComponentType<SvgProps>;
  export const Polyline: ComponentType<SvgProps>;
  export const Text: ComponentType<SvgProps>;
  export const TSpan: ComponentType<SvgProps>;
  export const Ellipse: ComponentType<SvgProps>;
  export const Defs: ComponentType<SvgProps>;
  export const ClipPath: ComponentType<SvgProps>;
  export const Stop: ComponentType<SvgProps>;
  export const LinearGradient: ComponentType<SvgProps>;
  export const RadialGradient: ComponentType<SvgProps>;
  export const Mask: ComponentType<SvgProps>;
  export const Use: ComponentType<SvgProps>;
  export const Symbol: ComponentType<SvgProps>;
  export const ForeignObject: ComponentType<SvgProps>;
  export const Image: ComponentType<SvgProps>;
}

// Ambient stubs for peer dependency subpaths not resolvable at build time
declare module "expo-file-system/legacy" {
  export const cacheDirectory: string | null;
  export enum EncodingType {
    UTF8 = "utf8",
    Base64 = "base64",
  }
  export function writeAsStringAsync(
    fileUri: string,
    contents: string,
    options?: { encoding?: EncodingType },
  ): Promise<void>;
  export function readAsStringAsync(
    fileUri: string,
    options?: { encoding?: EncodingType },
  ): Promise<string>;
}

declare module "expo-sqlite/kv-store" {
  export class SQLiteStorage {
    constructor(databaseName?: string);
    getItemSync(key: string): string | null;
    setItemSync(key: string, value: string): void;
    removeItemSync(key: string): void;
    getAllKeysSync(): string[];
    closeSync(): void;
  }
}
