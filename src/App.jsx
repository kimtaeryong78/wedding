import Couple from './components/Couple';
import Schedule from './components/Schedule';
import RSVP from './components/RSVP';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      <Hero />
      <Couple />
      <Schedule />
      <RSVP />
      <footer className="text-center text-sm py-4 text-gray-500">
        © 2025 by Kim taeryong & Park youngsun. All rights reserved.
      </footer>
    </div>
  );
}
