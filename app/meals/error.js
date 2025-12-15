'use client';

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>An Error Occurred!</h1>
      <p>We failed to load the meal data. Please try again later.</p>
      <p>Details: {error.message}</p>
    </main>
  );
}