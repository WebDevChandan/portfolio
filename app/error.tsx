"use client";
import './styles/error.scss';

export default function error({ error }: { error: Error }) {
  return (
    <div className="error container">

        <h1>Opps!, We've enocunter some error</h1>
        <p>Error: {error.message}</p>
    </div>
  )
}
