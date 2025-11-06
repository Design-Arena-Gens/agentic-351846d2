import { useEffect, useState } from 'react';

export default function Home({ pwa }) {
  const [isiOS, setIsiOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const safari = /^((?!chrome|android).)*safari/i.test(ua);
    setIsiOS(iOS);
    setIsSafari(safari);
  }, []);

  const handleInstallClick = async () => {
    if (pwa?.deferredPrompt) {
      pwa.deferredPrompt.prompt();
      await pwa.deferredPrompt.userChoice;
    }
  };

  return (
    <main className="container">
      <h1>Mobile App (PWA)</h1>
      <p>Install this app on Android and iOS for a native-like experience.</p>

      {pwa?.isInstallable && (
        <button className="primary" onClick={handleInstallClick}>Install on Android</button>
      )}

      {isiOS && isSafari && (
        <div className="card">
          <h2>Install on iOS</h2>
          <ol>
            <li>Open in Safari.</li>
            <li>Tap the Share icon.</li>
            <li>Select <strong>Add to Home Screen</strong>.</li>
          </ol>
        </div>
      )}

      <div className="card">
        <h2>Offline Support</h2>
        <p>This app caches pages for offline usage after first load.</p>
      </div>

      <footer>
        <span>Agentic PWA ? Works on Android & iOS</span>
      </footer>
    </main>
  );
}
