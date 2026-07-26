export function useAppInfo(): {
  appName: string;
  appNameCapital: string;
} {
  const appName = "Song Print";
  const appNameCapital = appName.toUpperCase();

  return {
    appName,
    appNameCapital,
  };
}
