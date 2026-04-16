import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure upload directory exists
function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

// GET — list all uploaded files
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  ensureUploadDir();

  const files = fs.readdirSync(UPLOAD_DIR).map((filename) => {
    const filePath = path.join(UPLOAD_DIR, filename);
    const stat = fs.statSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    const isVideo = [".mp4", ".webm", ".mov", ".avi", ".mkv"].includes(ext);
    return {
      name: filename,
      url: `/uploads/${filename}`,
      size: stat.size,
      type: isVideo ? "video" : "image",
      uploadedAt: stat.mtime.toISOString(),
    };
  });

  // Sort newest first
  files.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  return NextResponse.json({ files });
}

// POST — upload a file
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  ensureUploadDir();

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const uploaded: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename: replace spaces with dashes, keep extension
    const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(UPLOAD_DIR, safeName);

    fs.writeFileSync(filePath, buffer);
    uploaded.push(`/uploads/${safeName}`);
  }

  return NextResponse.json({ uploaded });
}

// DELETE — remove a file
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename } = await req.json();

  if (!filename || typeof filename !== "string") {
    return NextResponse.json({ error: "No filename provided" }, { status: 400 });
  }

  // Security: prevent path traversal
  const safeName = path.basename(filename);
  const filePath = path.join(UPLOAD_DIR, safeName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  fs.unlinkSync(filePath);

  return NextResponse.json({ deleted: safeName });
}
