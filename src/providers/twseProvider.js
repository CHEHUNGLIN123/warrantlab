const TWSE_WARRANT_DAILY_URL =
  "https://openapi.twse.com.tw/v1/opendata/t187ap42_L";

export async function fetchListedWarrantDailyRows() {
  try {
    const response = await fetch(TWSE_WARRANT_DAILY_URL);

    if (!response.ok) {
      throw new Error(`TWSE API Error: ${response.status}`);
    }

    const rows = await response.json();
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("TWSE warrant provider failed:", error);
    return [];
  }
}