import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "DB", "db.json");

async function readDB() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

async function writeDB(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json(db.tasks || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read database" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const newTask = await req.json();
    const db = await readDB();

    const id = Date.now().toString();
    const taskWithId = { ...newTask, id };

    db.tasks = [...(db.tasks || []), taskWithId];
    await writeDB(db);

    return NextResponse.json(taskWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
