import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, "db.json");

export function leerBD() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export function guardarBD(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        throw new Error("Error al guardar");
    }   
}