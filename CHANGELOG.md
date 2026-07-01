# Changelog

All notable changes to `@drakkar.software/seahorse` will be documented here.

## [0.10.1] — 2026-07-01

### Internal

- Bumped all Expo peer deps from SDK 56 to SDK 57 (`@expo/ui`, `@expo/html-elements`, `expo-document-picker`, `expo-file-system`, `expo-haptics`, `expo-local-authentication`, `expo-print`, `expo-secure-store`, `expo-sharing`, `expo-sqlite`, `expo-updates`).
- Updated `react-native` devDep and peer dep to `0.86.0`, `@expo/ui` devDep to `57.0.1` to match example app.
- Bumped `react-native-reanimated` peer range to `4.5.0` and `react-native-worklets` peer range to `^0.10.0` (was `>=0.3.0`) — required for React Native 0.86 compatibility (`react-native-reanimated@4.3.1`/`react-native-worklets@0.8.x` don't support RN 0.86).

---

## [0.10.0] — 2026-06-30

### Changed

- **`SegmentedControl` — reimplemented as the `@expo/ui/community/segmented-control` drop-in (BREAKING).**
  Now renders a native SwiftUI segmented control on iOS, Jetpack Compose on Android, and a vendored
  RN segmented control on web — single import, no platform branching (mirrors the `Sheet` migration).
  Public API changes from `{ segments, activeKey, onSelect }` to the @expo/ui native props
  (`values`, `selectedIndex`, `onChange`/`onValueChange`, `tintColor`, `appearance`, …). `tintColor`
  defaults to the Forge theme primary (Android/web only). Requires the optional `@expo/ui` peer.

---

## [0.9.0] — 2026-06-30

### Fixed

- **`Sheet` (SheetShell) — crash on web: `Cannot find native module 'ExpoUI'`.**
  The web branch rendered an RN `Modal`, but the file still had top-level
  `import { BottomSheet, RNHostView } from "@expo/ui"` and
  `import { presentationBackground } from "@expo/ui/swift-ui/modifiers"` — both call
  `requireNativeModule('ExpoUI')` at module-evaluation time, before the `Platform.OS`
  check ever runs, crashing any web bundle that pulls in `Sheet`/`ConfirmSheet`/
  `RenameSheet`/`DatePickerModal`/`TimePickerModal`.

### Changed

- **`Sheet` (SheetShell) — native backend swapped to `@expo/ui/community/bottom-sheet`.**
  Single cross-platform import replaces the universal `BottomSheet` + `RNHostView` +
  `presentationBackground` + hand-rolled web `Modal`/`Pressable` backdrop. SwiftUI sheet
  on iOS, Material3 `ModalBottomSheet` on Android, `vaul` drawer on web — web now gets a
  real swipeable drawer instead of a plain modal. The public
  `{ visible, onDismiss, children, backgroundColor? }` API is unchanged.
  `visible` maps to `index={visible ? 0 : -1}`; `backgroundColor` maps to
  `backgroundStyle={{ backgroundColor }}` (was iOS-only `presentationBackground`, now
  applied on all three platforms).

---

## [0.8.1] — 2026-06-30

### Fixed

- **`Sheet` (SheetShell) — fixed grey side-bars, top overflow, and off-center content on iOS.**
  `RNHostView matchContents` was locking the SwiftUI host to the content's intrinsic width (~QR size),
  so the sheet's own background showed as grey bars on both sides, spinners were off-center, and the
  auto-height measurement was taken off the shrunk host causing top overflow.
  Fix: removed the redundant outer `<Host>` (the universal `BottomSheet` already creates its own),
  and wrapped children in a `View` sized to `windowWidth − 32` (the 2×16px BottomSheet internal
  insets) so the measured width equals the full sheet width.

### Added

- **`Sheet` — new optional `backgroundColor?: string` prop.**
  When provided, passes `presentationBackground(color)` as a modifier to `@expo/ui` `BottomSheet`
  so the full sheet chrome (drag-indicator zone + home-indicator safe-area inset) is tinted to match
  the content background. No-op on web.

---

## [0.8.0] — 2026-06-30

### Changed

- **`Sheet` (SheetShell) — native branch migrated from `@gorhom/bottom-sheet` to `@expo/ui` `BottomSheet`.**
  Replaces gorhom's `BottomSheetModal` (and the internal `useBottomSheetModal` hook) with the Expo
  universal `BottomSheet` component — SwiftUI `.sheet()` on iOS, Jetpack Compose `ModalBottomSheet`
  on Android. The public `{ visible, onDismiss, children }` API is unchanged. Content is hosted via
  `RNHostView matchContents` for intrinsic sizing. Web branch (RN `Modal`) is unchanged.
- Removed custom grabber-pill `<View>` from all four content components (`ConfirmSheet`,
  `RenameSheet`, `DatePickerModal`, `TimePickerModal`) — the OS drag indicator replaces it.
- Dropped `@gorhom/bottom-sheet` and `react-native-gesture-handler` from `peerDependencies`.
  Added `@expo/ui: >=56.0.0` as an optional peer.

### Breaking

- Requires `@expo/ui` in the host app (`~56.0.18` for SDK 56). A native rebuild is needed (pod
  install on iOS / Gradle on Android) because `@expo/ui` adds native modules.
- `@gorhom/bottom-sheet` is no longer required as a peer — hosts can uninstall it if nothing else
  uses it.

---

## [0.7.12] — 2026-06-30

### Internal

- Bumped all Expo peer deps from SDK 55 to SDK 56 (`expo-document-picker`, `expo-file-system`, `expo-haptics`, `expo-local-authentication`, `expo-print`, `expo-secure-store`, `expo-sharing`, `expo-sqlite`, `expo-updates`).
- Updated `react` devDep to `19.2.3`, `react-native` to `0.85.3`, and `typescript` to `^6.0.3` to match example app.
- Updated `react-native` peer dep range to `^0.85.3`.
- Tightened `react-native-reanimated` peer range from `>=3.16.0` to `>=4.3.1` to match the v4 API used in the example app.
- Hardened `scripts/check-deps.mjs` to enforce major-version alignment between peer ranges and example deps (stricter than `semver.intersects`).

---

## [0.7.11] — 2026-06-30

### Internal

- Declared `react-native-reanimated` (`>=3.16.0 || >=4.0.0-`), `react-native-gesture-handler` (`>=2.16.1`), and `react-native-worklets` (`>=0.3.0`) as explicit optional `peerDependencies`. These native singletons were already required transitively through `@gorhom/bottom-sheet` but without explicit peer ranges pnpm could resolve them to older nested copies instead of the host app's single native-backed instance, causing `BottomSheetModal.present()` to silently no-op. Marking them as peers ensures pnpm always dedupes them onto the host.

---

## [0.7.10] — 2026-06-30

### Internal

- Locked all `peerDependencies` from open `>=` ranges to `^` ranges pinned to the versions used in the example app.
- Aligned `devDependencies` in `packages/seahorse` to match `example/` versions (`react`, `react-native`, `react-native-css`, `lucide-react-native`).
- Added `scripts/check-deps.mjs` — run `node scripts/check-deps.mjs` from repo root to compare example and seahorse deps after any version bump.
- Documented release process in `CLAUDE.md`.

---

## [0.7.9] — 2026-06-29

### Added

- **`Sheet`** — public cross-platform bottom-sheet shell exported from `./components`. Accepts `visible`, `onDismiss`, and `children`. On web it renders a slide-up `Modal` (gorhom's `BottomSheetModal` does not present on `react-native-web`); on native it renders the usual `@gorhom/bottom-sheet` `BottomSheetModal`. Use this to build custom sheet content that works on all platforms.

### Internal

- Extracted `SheetShell` component from the previously uncommitted 0.7.8 work and committed it to source. All four sheet components (`ConfirmSheet`, `RenameSheet`, `DatePickerModal`, `TimePickerModal`) now delegate to `SheetShell` internally instead of repeating the `BottomSheetModal` boilerplate — no behaviour change on native, web now works.

---

## [0.7.7] — 2026-04-17

### Fixed

- **`Avatar`** — `AvatarFallbackText` no longer renders when `AvatarImage` has a valid source URI. Uses `useLayoutEffect` to track source presence in context; falls back to showing the text if the image errors. Previously, the fallback initials were always rendered (just hidden behind the absolute-positioned image), causing them to briefly appear or show through on mobile PWA.

---

## [0.7.6] — 2026-04-13

### Changed

- **`FlashList`** — `recycleItems` is now a configurable prop in `FlashListProps` (default `false`). Previously hard-coded to `true`, then removed entirely; consumers can now opt in explicitly.

---

## [0.7.3] — 2026-04-12

### Fixed

- **`tailwind-theme`** — added `@source inline(...)` directives for all Tailwind utility classes used internally by SeaHorse primitives (`bg-*`, `border-*`, `text-*` color variants). Apps that import `@drakkar.software/seahorse/tailwind-theme` now automatically get all required classes generated without needing to add a separate `@source` pointing at SeaHorse's `dist/` directory. Previously, Avatar backgrounds and other component colors could be invisible if the consuming app didn't reference those exact classes in its own source.

---

## [0.7.2] — 2026-04-11

### Added

- `isPwaStandalone()` — pure function that returns `true` when the app is running in installed PWA standalone mode. Checks `display-mode: standalone` media query + `navigator.standalone` (iOS Safari fallback). Returns `false` on native. Exported from `./utils/pwa-install` and `./utils`.

---

## [0.7.0] — 2026-04-10

### Added

**Primitives**

- `Section` — semantic `<section>` element. Native: `@expo/html-elements` `Section` with `cssInterop`. Web: renders `<section>` HTML tag. Props: `ViewProps` + `className`.
- `Nav` — semantic `<nav>` element. Native: `@expo/html-elements` `Nav` with `cssInterop`. Web: renders `<nav>` HTML tag. Props: `ViewProps` + `className`.
- `Footer` — semantic `<footer>` element. Native: `@expo/html-elements` `Footer` with `cssInterop`. Web: renders `<footer>` HTML tag. Props: `ViewProps` + `className`.
- `Main` — semantic `<main>` element. Native: `@expo/html-elements` `Main` with `cssInterop`. Web: renders `<main>` HTML tag. Props: `ViewProps` + `className`.
- `Anchor` — pressable link. Native: `Pressable` that calls `Linking.openURL(href)`. Web: renders `<a>` tag. Props: `PressableProps` + `href?`, `className`.

All five are exported from `@drakkar.software/seahorse/primitives`.

**Components**

- `FeatureCard` — icon + title + description card with optional CTA. Follows the `IconCard`/`StatCard` pattern. Props: `icon` (ReactNode), `title`, `description`, `ctaLabel?`, `onCtaPress?`, `className?`. Exported from `@drakkar.software/seahorse/components`.

**Utilities**

- `usePageMeta(meta: PageMeta)` — sets per-page SEO meta tags on web (no-op on native). Manages `document.title`, `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:type`, `og:image`), Twitter Card tags, `<link rel="canonical">`, and `hreflang` alternate links. Exported from `@drakkar.software/seahorse/utils/use-page-meta`.

---

## [0.6.1] — 2026-04-10

### Fixed

- **`FilterTabs`** — added `alignItems: "center"` to `contentContainerStyle` on the horizontal `ScrollView`. Chips now vertically center-align within their row when active (filled) and inactive (outlined) pills render at slightly different heights.

---

## [0.6.0] — 2026-04-10

### Added

**Components**

- `OnboardingFlow` — full-screen multi-step onboarding orchestrator. Renders children as horizontally-paginated screens with `Animated.ScrollView` + `pagingEnabled`, tracks active index via `onMomentumScrollEnd`, and exposes "Next", "Skip", and "Get Started" (last step) buttons. Props: `onComplete`, `onSkip?`, `nextButtonText`, `completeButtonText`, `skipButtonText`, `children`, `className`.
- `OnboardingScreen` — single presentational onboarding screen. Top flex area accepts any `illustration` ReactNode (icon, image, custom component); bottom area renders `title` and `description`. Props: `illustration`, `title`, `description`, `className`, `illustrationClassName`, `titleClassName`, `descriptionClassName`.
- `OnboardingDots` — page indicator dots. Active dot renders as a pill (`h-2 w-8 rounded-full bg-primary-500`), inactive as a circle (`h-2 w-2 rounded-full bg-outline-200`). Props: `count`, `activeIndex`, `activeClassName`, `inactiveClassName`, `className`.

All three are exported from `@drakkar.software/seahorse/components`.

---

## [0.5.1] — 2026-04-10

### Fixed

- **`BadgeIcon`** — now passes a numeric `size` prop to the icon component (derived from the size name: sm=12, md=14, lg=16), matching the `Icon` primitive's behavior. Previously relied solely on CSS `h-*`/`w-*` classes which Lucide SVG icons ignore in favour of their `size` prop.
- **`ButtonIcon`** — same fix: computes and passes numeric size (xs=14, sm=16, md/lg=18, xl=20) to the icon component, preventing SVG icons from defaulting to 24px.

---

## [0.5.0] — 2026-04-10

### Added

**Primitives**

- `FlashList` — high-performance list component wrapping `@legendapp/list`'s `LegendList` with `recycleItems` and `drawDistance` defaults. Accepts `FlatListProps<T>` + optional `estimatedItemSize`. Requires `@legendapp/list` optional peer dependency.
- `ImageBackground` — platform-split image background wrapper. Native: forwards to RN `ImageBackground` with `className` support. Web: `div` with CSS `backgroundImage`, `backgroundSize: cover`, `backgroundPosition: center`, and `overflow: hidden`. Accepts `source: { uri }`, `className`, and `style`.

**Components**

- `BackButton` — composed back-navigation button built from primitives (`Button`, `ButtonIcon`, `ButtonText`, `Box`). Props: `text`, `onPress`, optional `className`. Uses `ghost` variant with an `ArrowLeft` icon from `lucide-react-native`.

### Changed

- `@legendapp/list` added as an optional peer dependency (`>=1.0.0`).

---

## [0.4.1] — 2026-04-10

### Changed

- **All visual primitives** now import from `react-native-css/components` directly (`View`, `Text`, `Pressable`, `ScrollView`, `TextInput`, `ActivityIndicator`, `Switch`, `FlatList`, `VirtualizedList`) instead of `react-native`. This removes the dependency on NativeWind's Metro babel transform for `className` support in these components — each component from `react-native-css/components` has `className` built in via `useCssElement`. Consumers no longer need `globalClassNamePolyfill: true` in their Metro config for SeaHorse to work.
- `react-native-css` is now a **required** peer dependency (was optional). It was already listed in Requirements; this formalises it.

### Fixed

- Removed `cssInterop` calls from `Spinner` and `Switch` primitives — `react-native-css/components` already provides className-aware versions of `ActivityIndicator` and `Switch`, making the interop wrappers redundant.
- Removed expression-complexity TypeScript error (TS2590) in `ActionsheetVirtualizedList` and `ActionsheetFlatList`.

---

## [0.4.0] — 2026-04-10

### Added

- **`./primitives` export** — Full foundational UI primitives layer (37 components across 20 modules). All zero-business-logic, NativeWind v5 + Tailwind CSS v4 semantic tokens, platform-split `.web.tsx` where applicable.

**Layout & Typography**
- `Box` — `View` wrapper, web variant adds `flex flex-col min-h-0 min-w-0`
- `HStack` / `VStack` — flex row/column with `space` gap prop and `reversed` prop
- `Center` — centered flex container
- `View` — thin re-export of RN `View`
- `Divider` — `orientation` prop, `bg-background-200`, web `role="separator"`
- `Text` — `size/bold/italic/underline/strikeThrough/isTruncated/sub/highlight` props; base `text-typography-700 font-body`
- `Heading` — maps sizes to semantic H1-H6 via `@expo/html-elements` (native) or h1-h6 (web); `cssInterop` for NW v5
- `Icon` — `as` prop for lucide icons, `size` (string or number)
- `Pressable` — NW v5 `data-[focus-visible]` / `data-[disabled]` styling
- `Image` — `size` prop, `revert-layer` web guard

**Form Controls**
- `Button` + `ButtonText` + `ButtonSpinner` + `ButtonIcon` + `ButtonGroup` — 5 actions × 4 variants × 5 sizes, context-based
- `Input` + `InputField` + `InputSlot` + `InputIcon` — 3 variants × 4 sizes, dual `dataSet`/`data-*` attrs
- `Textarea` + `TextareaInput`
- `Checkbox` + `CheckboxIndicator` + `CheckboxLabel` + `CheckboxIcon` + `CheckboxGroup` — `DefaultCheckIcon` via `react-native-svg`
- `Radio` + `RadioIndicator` + `RadioLabel` + `RadioIcon` + `RadioGroup` — platform-aware (View+onClick web, Pressable native)
- `Switch` — `cssInterop` + size scale variants
- `Slider` + `SliderTrack` + `SliderFilledTrack` + `SliderThumb` — PanResponder-based, no external deps
- `Select` + `SelectTrigger` + `SelectInput` + `SelectIcon` + `SelectPortal` + `SelectItem` + all Actionsheet delegates — self-contained Actionsheet using RN Modal
- `FormControl` + `FormControlLabel` + `FormControlLabelText` + `FormControlLabelAstrick` + `FormControlHelper` + `FormControlHelperText` + `FormControlError` + `FormControlErrorText` + `FormControlErrorIcon`
- `Spinner` — `cssInterop` ActivityIndicator

**Feedback & Display**
- `Modal` + `ModalBackdrop` + `ModalContent` + `ModalHeader` + `ModalBody` + `ModalFooter` + `ModalCloseButton` — 5 sizes, RN Modal
- `AlertDialog` — same as Modal but `closeOnOverlayClick = false` default
- `Alert` + `AlertText` + `AlertIcon` — 5 actions, 2 variants
- `Badge` + `BadgeText` + `BadgeIcon` — 5 actions, 2 variants, 3 sizes
- `Avatar` + `AvatarBadge` + `AvatarFallbackText` + `AvatarImage` + `AvatarGroup` — 6 sizes
- `Skeleton` + `SkeletonText` — Animated pulse, no external deps
- `Card` — 3 sizes × 4 variants, web variant
- `NotificationDot` — positioned count badge; semantic color tokens (`bg-error-500`, `bg-success-500`, etc.)
- `Toast` + `ToastTitle` + `ToastDescription` + `ToastProvider` + `useToast` — animated queue via `@legendapp/motion`

**Utilities**
- `useBreakpointValue` / `getBreakPointValue` / `isValidBreakpoint` — exported from `./utils/use-breakpoint-value`
- `lightHaptic` / `mediumHaptic` — exported from `./utils/haptics`
- `useDebounce` — exported from `./utils/use-debounce`

### Changed

- All `cn` imports inside primitives use relative `../../utils/cn` (avoids self-referencing package import)

### New peer dependencies

- `@legendapp/motion >= 2.0.0` (optional, required by `Toast`)

---

## [0.3.1] — 2026-04-10

### Fixed

- **`./tailwind-theme` export** — added `"style"` export condition so Tailwind CSS v4's `@import` resolver can find the theme file from node_modules.

## [0.3.0] — 2026-04-10

### Added

- **`PinPad`** component — shared PIN dot indicators + number grid, extracted from `LockScreen` and `PinSetup`. Exported from `@drakkar.software/seahorse/components`. Accepts `onBiometric?` for optional biometric button in the bottom-left key slot.
- **`handlePinDigit(currentPin, digit, pinLength)`** — pure helper that appends a digit and returns `{ nextPin, isComplete }`. Exported from both the root barrel and `./components`.
- **`handlePinDelete(currentPin)`** — pure helper that removes the last PIN character. Exported from both the root barrel and `./components`.
- **`PinDigitResult`** — TypeScript type for the return value of `handlePinDigit`.

### Changed

- **Component folder structure** — source reorganized into semantic subfolders. Public API is unchanged; all components still available from `@drakkar.software/seahorse/components`.
  - `components/ui/` — 19 low-level UI primitives (StatusBadge, FilterTabs, FAB, ProgressBar, etc.)
  - `components/pin/` — PIN authentication (PinPad, LockScreen, PinSetup)
  - `components/sheets/` — bottom-sheet modals (ConfirmSheet, RenameSheet, DatePickerModal, TimePickerModal)
  - `components/form/` — form building blocks (FormSection and its named exports)
- **`LockScreen`** and **`PinSetup`** now delegate PIN dots + number grid rendering to `PinPad`. No API change.
- **`HorizontalChipSelect`** is now a thin wrapper over `FilterTabs` — same `options/activeKey/onSelect/className` API, no behavior change.
- **`ConfirmSheet`**, **`RenameSheet`**, **`DatePickerModal`**, **`TimePickerModal`** — internal refactor: `renderBackdrop` callback and present/dismiss lifecycle extracted into shared `useBottomSheetModal` hook. No API change.

### Internal

- Added `src/utils/pin-helpers.ts` for pure PIN logic (no React dependency — directly testable).
- Added `src/components/sheets/useBottomSheetModal.tsx` — internal hook, not part of public API.
- 10 new tests in `tests/pin-pad.test.ts` covering all `handlePinDigit` and `handlePinDelete` branches.
- Fixed example app prop bugs: `FilterTabs` `onPress→onSelect`, `StatusSelector` `statuses/value/onChange→options/activeKey/onSelect`, `ConfirmSheet` `onClose→onCancel`.

---

## [0.2.0] — 2026-04-10

> **Breaking**: Requires NativeWind v5 + Tailwind CSS v4. Minimum React 19, React Native 0.83.

### Added

- **`tailwind/theme.css`** — Full semantic color token system via CSS custom properties. Consumers `@import "@drakkar.software/seahorse/tailwind-theme"` and override `:root` variables for their brand. Replaces `tailwind-preset`. Tokens: `primary/secondary/tertiary/error/success/warning/info` (0-950), `typography/outline` (0-950), `background` (0-950 + error/warning/success/muted/info), `indicator` (primary/info/error), shadows (hard-1..5, soft-1..4), font families.
- **`utils/cn`** — `cn(...inputs)` — `clsx` + `tailwind-merge` utility. Import from `@drakkar.software/seahorse/utils/cn`.
- **`FilterTabs`**: extended with `icon?`, `hidden?` props (now a superset of the old chip-only API).
- New subpath exports: `./tailwind-theme`, `./utils/cn`.
- New optional peer deps: `@expo/html-elements >=55`, `react-native-svg >=15`, `expo-haptics >=14`.

### Changed

- **All 26 components**: migrated from hardcoded `bg-gray-*`/`text-gray-*`/`dark:*` class pairs to semantic token classes (`bg-background-0`, `text-typography-900`, `border-outline-100`, etc.). Dark mode is now handled automatically by the CSS token system — no more `dark:` class duplication in components.
- `ProgressBar` budget overflow: `bg-red-500` → `bg-error-500`, `bg-amber-400` → `bg-warning-400`, `bg-emerald-400` → `bg-success-400`.
- `DeadlineChip`: converted from inline `style={{ backgroundColor, color }}` to className-based semantic tokens (`bg-background-error`, `bg-background-warning`, `bg-background-info`, `bg-background-muted`).
- `EmptyState`: default `iconBgClassName` changed from `"bg-gray-100 dark:bg-gray-800"` to `"bg-background-900"`.
- `RatingStars`: default empty star color changed from `#D1D5DB` to `rgb(221, 220, 219)` (outline-200).

### Infrastructure

- Peer dep `nativewind` bumped to `>=5.0.0-0` (includes pre-release versions like `5.0.0-preview.x`).
- New peer dep `react-native-css >=3.0.0` (required by NW v5 for `cssInterop`).
- Peer dep `react` bumped to `>=19.0.0`, `react-native` to `>=0.83.0`.
- Direct deps added: `clsx ^2.1.0`, `tailwind-merge ^3.0.0`.
- Example app: removed `tailwind.config.js`, migrated to `global.css` with TW v4 `@import` syntax.

---

## [0.1.1] — 2026-04-10

### Fixed

- Add `/// <reference types="nativewind/types" />` and ambient module stubs (`expo-sqlite/kv-store`, `expo-file-system/legacy`) to fix TypeScript build for consumers

### Internal

- Restructured into pnpm monorepo (`packages/seahorse` + `example/`)
- Added test suite: 66 tests covering `crypto`, `links`, `date`, `secure-store`, `app-lock`, `kv-storage` (web + native paths via `vi.mock`)
- Added `CLAUDE.md` for contributor guidance

---

## [0.1.0] — 2026-04-10

### Initial release

#### Components (26)

**Pure building blocks** — zero project-specific imports, only React Native + NativeWind + lucide-react-native:

- `StatusBadge` — colored label badge
- `DeleteButton` — destructive action button with confirm intent
- `SaveHeaderButton` — navigation header save button (themed via `ForgeThemeProvider`)
- `SearchBar` — text input with search icon
- `FilterTabs` — horizontal tab filter bar
- `HorizontalChipSelect` — scrollable chip selector
- `SegmentedControl` — segmented option picker
- `ProgressBar` — horizontal progress indicator
- `RatingStars` — interactive star rating
- `EmptyState` — empty list placeholder with icon, title, subtitle; accepts `iconBgClassName` + `iconColor` props
- `FAB` — floating action button with primary shadow color (themed)
- `IconCard` — pressable card with leading icon
- `StatCard` — metric card with label, value, icon
- `SectionHeader` — section heading with optional count and add button
- `CollapsibleSection` — expandable/collapsible content section
- `TimelineItem` — vertical timeline entry
- `StatusSelector` — inline status picker chips
- `ToggleCard` — labeled toggle row with primary switch color (themed)

**Parameterized components** — previously i18n-coupled, now accept string props with English defaults:

- `ConfirmSheet` — confirmation bottom sheet; `confirmLabel`, `cancelLabel` props
- `RenameSheet` — rename bottom sheet; `title`, `confirmLabel`, `cancelLabel`, `placeholder` props
- `DatePickerModal` — date picker modal; `dateLocale`, `todayLabel`, `clearLabel` props
- `TimePickerModal` — time picker modal; `confirmLabel`, `clearLabel`, `hoursLabel`, `minutesLabel` props
- `FormSection` — form building blocks:
  - `SectionTitle`, `FormCard`, `InputRow`, `ToggleRow`, `ChipSelect` — as-is
  - `DateRow` — adds `dateLocale`, `selectDateLabel`, `todayLabel`, `clearLabel` props
  - `TimeRow` — adds `selectTimeLabel`, `confirmLabel`, `clearLabel`, `hoursLabel`, `minutesLabel` props
- `DeadlineChip` — deadline countdown chip; accepts `labels: { today?, overdue?, days?, months? }` with English defaults
- `LockScreen` — PIN + biometric lock screen; accepts `labels` prop object + uses `ForgeThemeProvider` for icon color
- `PinSetup` — PIN creation/confirmation modal; accepts `labels` prop object + uses `ForgeThemeProvider` for icon color

#### Utilities (9 modules)

- `secure-store` — `secureGet`, `secureSet`, `secureDelete` (expo-secure-store)
- `kv-storage` — `initStorage`, `getStorage`, `closeStorage`, `readCollection`, `writeCollection` (expo-sqlite native / localStorage web)
- `crypto` — `generateKey`, `encryptData`, `decryptData` (AES-256-GCM via Web Crypto API)
- `app-lock` — `isLockEnabled`, `setLockEnabled`, `savePin`, `verifyPin`, `hasBiometrics`, `authenticateWithBiometrics(promptMessage?, cancelLabel?)` (expo-local-authentication + secure-store)
- `pwa-install` — `usePwaInstall` hook for PWA install prompt
- `toast` — re-exports `sonner-native` (native) / `sonner` (web)
- `file-export` — `exportToPdf`, `exportToCsv`, `exportJsonWeb`, `exportJsonNative`, `importJsonWeb`, `importJsonNative`
- `links` — `parseLinks`, `serializeLinks`, `isValidUrl`
- `date` — `safeFormat` (date-fns format wrapper with invalid date fallback)
- `ota-update` — `useAutoOtaUpdate` hook (checks + applies expo-updates OTA updates, skips in dev)

#### Theming

- **Tailwind preset** (`@drakkar.software/seahorse/tailwind-preset`) — provides structural tokens only (`borderRadius`); zero color definitions. Consumer defines their own `primary` palette.
- **`ForgeThemeProvider`** + **`useForgeTheme`** — React context for inline style colors (FAB shadow, SaveHeaderButton background, ToggleCard switch, LockScreen/PinSetup icon). Defaults to blue `#3B82F6`.

#### Build

- Single package, subpath exports (`./components`, `./utils/*`, `./theme`, `./tailwind-preset`)
- `tsc --build` → ESM `.js` + `.d.ts`, no bundler
- Zero bundled runtime dependencies; all React Native / Expo packages are optional peer dependencies
