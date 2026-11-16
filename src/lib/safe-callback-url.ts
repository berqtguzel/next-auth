const fallbackCallbackUrl = "/dashboard";
const validationOrigin = "http://localhost";

export function getSafeCallbackUrl(
  value: string | string[] | undefined,
): string {
  const callbackUrl = Array.isArray(value) ? value[0] : value;

  if (!callbackUrl || !callbackUrl.startsWith("/")) {
    return fallbackCallbackUrl;
  }

  try {
    const parsedUrl = new URL(callbackUrl, validationOrigin);

    if (parsedUrl.origin !== validationOrigin) {
      return fallbackCallbackUrl;
    }

    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch {
    return fallbackCallbackUrl;
  }
}
