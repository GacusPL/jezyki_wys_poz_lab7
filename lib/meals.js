import sql from 'better-sqlite3';
import { error } from 'console';
import path from 'path';

const dbPath = path.join(process.cwd(), 'meals.db');
const db = sql(dbPath, { readonly: true })

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //throw new error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}