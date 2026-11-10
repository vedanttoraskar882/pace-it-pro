import { NAV_ITEMS } from '../data/landingContent';

type FooterProps = {
  onOpenPilotModal: (triggerEl: HTMLElement | null) => void;
};

const CURRENT_YEAR = new Date().getFullYear();

export function Footer({ onOpenPilotModal }: FooterProps) {
  return (
    <footer id="footer" className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a className="wordmark footer-wordmark" href="#home">
            Practi<span className="footer-wordmark-accent">Trace</span>
          </a>
          <p className="footer-tagline">
            Practical science evidence and readiness for GCSE departments.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <ul className="footer-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a className="footer-nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-cta">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => onOpenPilotModal(e.currentTarget)}
          >
            Request a Pilot
          </button>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-copyright">© {CURRENT_YEAR} PractiTrace</p>
      </div>
    </footer>
  );
}
