import sql from 'better-sqlite3';
import fs from 'node:fs';
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

export async function saveMeal(meal) {

  meal.slug = meal.title.toLowerCase().replace(/\s+/g, '-'); 

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}