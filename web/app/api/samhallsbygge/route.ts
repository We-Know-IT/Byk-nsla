import { NextRequest, NextResponse } from "next/server";

const getBackendBaseUrl = () => process.env.BACKEND_URL ?? "http://localhost:4000";

export async function GET(request: NextRequest) {
  try {
    const backendUrl = new URL(`${getBackendBaseUrl()}/api/samhallsbygge`);
    const area = request.nextUrl.searchParams.get("area");
    if (area) {
      backendUrl.searchParams.set("area", area);
    }

    const response = await fetch(backendUrl.toString(), { cache: "no-store" });
    const payload: unknown = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { message: "Kunde inte ansluta till backend för samhällsbygge." },
      },
      { status: 502 },
    );
  }
}
