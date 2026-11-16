const fallbackCallbackUrl = "/dashboard";
const validationOrigin = "http://localhost";

function isApplicationPath(pathname: string): boolean {
  return pathname.startsWith("/") && !pathname.startsWith("//");
}

export function getSafeCallbackUrl(
  value: string | string[] | undefined,
): string {
  const callbackUrl = Array.isArray(value) ? value[0] : value;

  if (!callbackUrl || !isApplicationPath(callbackUrl)) {
    return fallbackCallbackUrl;
  }

  try {
    const parsedUrl = new URL(callbackUrl, validationOrigin);

    if (
      parsedUrl.origin !== validationOrigin ||
      !isApplicationPath(parsedUrl.pathname)
    ) {
      return fallbackCallbackUrl;
    }

    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch {
    return fallbackCallbackUrl;
  }
}
