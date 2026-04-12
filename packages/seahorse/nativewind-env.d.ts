/// <reference types="nativewind/types" />

// Simple stubs for optional peer dependencies not installed in devDeps.
// Imports from these resolve to `any`; consumers have the real packages.
declare module "expo-haptics";
declare module "expo-secure-store";
declare module "expo-local-authentication";
declare module "expo-file-system";
declare module "expo-document-picker";
declare module "expo-print";
declare module "expo-sharing";
declare module "expo-sqlite";
declare module "expo-updates";
declare module "@expo/html-elements";
declare module "@gorhom/bottom-sheet";
declare module "@react-native-async-storage/async-storage";
declare module "react-native-svg";
declare module "sonner";
declare module "sonner-native";

// Subpath stubs for peer deps whose package exports don't include these paths
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
