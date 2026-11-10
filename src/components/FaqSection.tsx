import { useRef, useState } from 'react';
import { FAQ_ITEMS } from '../data/landingContent';
import { ChevronDownIcon } from './Icons';

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = FAQ_ITEMS.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowDown') {
      nextIndex = (index + 1) % total;
    } else if (event.key === 'ArrowUp') {
      nextIndex = (index - 1 + total) % total;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = total - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      id="faq"
      data-reveal-section
      className="section section-tinted"
      aria-labelledby="faq-heading"
    >
      <div className="container faq-container">
        <div className="section-header">
          <p className="section-kicker">Questions and answers</p>
          <h2 id="faq-heading" className="section-title">
            Frequently asked questions
          </h2>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = Boolean(openIds[item.id]);
            const buttonId = `${item.id}-trigger`;
            const panelId = `${item.id}-panel`;

            return (
              <div
                key={item.id}
                className={isOpen ? 'faq-item is-open' : 'faq-item'}
              >
                <h3 className="faq-question-heading">
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    type="button"
                    id={buttonId}
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <ChevronDownIcon
                      className={
                        isOpen ? 'faq-chevron is-rotated' : 'faq-chevron'
                      }
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={isOpen ? 'faq-panel-wrap is-open' : 'faq-panel-wrap'}
                >
                  <div className="faq-panel-inner">
                    <div className="faq-panel">
                      <p className="faq-answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
