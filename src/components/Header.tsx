import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '../data/landingContent';
import { useActiveSection } from '../hooks/useActiveSection';
import { CloseIcon, MenuIcon } from './Icons';

type HeaderProps = {
  onOpenPilotModal: (triggerEl: HTMLElement | null) => void;
};

export function Header({ onOpenPilotModal }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeId, isScrolled } = useActiveSection();
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [menuOpen]);

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
  };

  const handleMobilePilotClick = () => {
    setMenuOpen(false);
    // Return focus to the visible menu toggle button after the drawer closes.
    onOpenPilotModal(toggleBtnRef.current);
  };

  return (
    <header className={isScrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="container header-inner">
        <a className="wordmark" href="#home">
          Practi<span className="wordmark-accent">Trace</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
              const isCurrent = item.href === `#${activeId}`;
              return (
                <li key={item.href}>
                  <a
                    className={isCurrent ? 'nav-link is-active' : 'nav-link'}
                    href={item.href}
                    aria-current={isCurrent ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="btn btn-primary btn-compact"
            onClick={(e) => onOpenPilotModal(e.currentTarget)}
          >
            Request a Pilot
          </button>
        </nav>

        <button
          ref={toggleBtnRef}
          type="button"
          className="mobile-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <CloseIcon className="menu-svg-icon" />
          ) : (
            <MenuIcon className="menu-svg-icon" />
          )}
          <span className="menu-toggle-label">{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        ref={drawerRef}
        className={menuOpen ? 'mobile-drawer is-open' : 'mobile-drawer'}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation" className="container mobile-nav-inner">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => {
              const isCurrent = item.href === `#${activeId}`;
              return (
                <li key={item.href}>
                  <a
                    className={
                      isCurrent
                        ? 'mobile-nav-link is-active'
                        : 'mobile-nav-link'
                    }
                    href={item.href}
                    aria-current={isCurrent ? 'location' : undefined}
                    onClick={handleMobileLinkClick}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mobile-nav-cta">
            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={handleMobilePilotClick}
            >
              Request a Pilot
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
