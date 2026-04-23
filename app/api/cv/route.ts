import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "cv", "Ignacio_Hemmings_CV.pdf");
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Ignacio_Hemmings_CV.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: "CV not available yet",
        message:
          "Place your CV file at public/cv/Ignacio_Hemmings_CV.pdf to enable the download.",
      },
      { status: 404 },
    );
  }
}
