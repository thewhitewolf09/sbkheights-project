import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// GET — list all uploaded files
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'sbkheights/',
      max_results: 100,
    });

    const files = result.resources.map((file: any) => ({
      name: file.public_id.split('/').pop() + '.' + file.format,
      url: file.secure_url,
      size: file.bytes,
      type: file.resource_type === 'video' ? 'video' : 'image',
      uploadedAt: file.created_at,
    }));

    // Sort newest first manually since api.resources doesn't natively guarantee desc order
    files.sort((a: any, b: any) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    return NextResponse.json({ files: [] });
  }
}

// POST — upload a file
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const uploadedFiles = formData.getAll("files") as File[];

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadedOutputs: string[] = [];

    for (const file of uploadedFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadPromise = new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "sbkheights",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
          }
        );
        stream.end(buffer);
      });

      const url = await uploadPromise;
      uploadedOutputs.push(url);
    }

    return NextResponse.json({ uploaded: uploadedOutputs });
  } catch (err: any) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
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

  try {
    const ext = filename.lastIndexOf('.');
    const cleanName = ext > -1 ? filename.substring(0, ext) : filename;
    const publicId = `sbkheights/${cleanName}`;
    
    await cloudinary.uploader.destroy(publicId, { invalidate: true });
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video', invalidate: true });

    return NextResponse.json({ deleted: filename });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
