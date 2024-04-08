import { join } from "path";
import { promises as fs } from "fs";
import { Event } from "../events/event.model";

const filePath = join(__dirname, "db.json");

interface Data {
  events: Event[];
}

async function readData() {
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading from file:", error);
    return [];
  }
}

async function writeData(data: Array<Event>) {
  try {
    const jsonData = JSON.stringify(data, null, 2); // Pretty print JSON
    await fs.writeFile(filePath, jsonData, "utf-8");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
}

async function resetData() {
  const emptyData: Event[] = [];
  await writeData(emptyData);
}

export { readData, writeData, resetData };
