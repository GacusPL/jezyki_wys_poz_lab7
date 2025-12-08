import Link from 'next/link';

export default function MealsPage() {
  return (
    <main>
      <h1>Meals Page</h1>
      <p><Link href="/meals/share">Share a meal</Link></p>
      <p><Link href="/meals/spaghetti">Spaghetti (Dynamic Test)</Link></p>
    </main>
  );
}