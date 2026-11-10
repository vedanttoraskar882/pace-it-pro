import { AlertTriangleIcon, ArrowDownIcon } from './Icons';

type HeroSectionProps = {
  onOpenPilotModal: (triggerEl: HTMLElement | null) => void;
};

export function HeroSection({ onOpenPilotModal }: HeroSectionProps) {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-heading" className="hero-title">
            Can your pupils explain the experiments they’ve done?
          </h1>
          <p className="hero-description">
            PractiTrace is being developed for GCSE science departments to track
            required practicals, capture pupils’ results and turn those results
            into questions. See who needs a catch-up, whose technique still
            needs observing and who needs help explaining their data.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => onOpenPilotModal(e.currentTarget)}
            >
              Request a Pilot
            </button>
            <a className="btn btn-secondary btn-with-icon" href="#how-it-works">
              <span>See how it works</span>
              <ArrowDownIcon className="btn-arrow-down" />
            </a>
          </div>

          <dl className="hero-pillars" aria-label="Core programme alignment">
            <div className="hero-pillar">
              <dt>Initial specification scope</dt>
              <dd>AQA &amp; Pearson Edexcel GCSE Combined Science</dd>
            </div>
            <div className="hero-pillar">
              <dt>Evidence structure</dt>
              <dd>Do · Show · Own Data · Explain</dd>
            </div>
            <div className="hero-pillar">
              <dt>Department focus</dt>
              <dd>Two-year Key Stage 4 programme</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual-wrap">
          <div className="graph-axis-label" aria-hidden="true">
            <span>SPECIMEN RECORD · EXAMPLE DATA ONLY</span>
            <span>30°C</span>
          </div>

          <div
            className="record-card"
            role="region"
            aria-labelledby="illustrative-record-title"
          >
            <div className="record-card-header">
              <div>
                <p id="illustrative-record-title" className="record-card-kicker">
                  Illustrative pupil record
                </p>
                <p className="record-card-subtitle">
                  Rates of reaction at 30°C · Example measurements
                </p>
              </div>
              <span className="record-example-badge">Illustrative example</span>
            </div>

            <div className="record-table-wrap">
              <table className="record-table">
                <caption className="sr-only">
                  Example measurements for a rates-of-reaction practical at 30°C
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Attempt</th>
                    <th scope="col">Time at 30°C</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Repeat 1</td>
                    <td className="mono-cell">42 s</td>
                    <td>
                      <span className="status-tag status-neutral">Recorded</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Repeat 2</td>
                    <td className="mono-cell">43 s</td>
                    <td>
                      <span className="status-tag status-neutral">Recorded</span>
                    </td>
                  </tr>
                  <tr className="row-attention">
                    <td>Repeat 3</td>
                    <td className="mono-cell">
                      <strong>61 s</strong>
                    </td>
                    <td>
                      <span className="status-tag status-attention">
                        <AlertTriangleIcon className="status-icon" />
                        <span>Attention required</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="record-plot" aria-hidden="true">
              <div className="record-plot-header">
                <span>Repeat dispersion (35 s – 65 s)</span>
                <span className="record-plot-legend">Repeat 3 flagged</span>
              </div>
              <svg
                className="record-plot-svg"
                viewBox="0 0 360 54"
                role="img"
                aria-label="Scale showing Repeat 1 at 42 seconds, Repeat 2 at 43 seconds, and Repeat 3 at 61 seconds"
              >
                <line x1="20" y1="30" x2="340" y2="30" className="plot-axis" />
                <line x1="20" y1="25" x2="20" y2="35" className="plot-tick" />
                <line x1="180" y1="25" x2="180" y2="35" className="plot-tick" />
                <line x1="340" y1="25" x2="340" y2="35" className="plot-tick" />
                <text x="20" y="48" textAnchor="middle" className="plot-label">
                  35 s
                </text>
                <text x="180" y="48" textAnchor="middle" className="plot-label">
                  50 s
                </text>
                <text x="340" y="48" textAnchor="middle" className="plot-label">
                  65 s
                </text>

                {/* Range connector between Repeats 1-2 (42s, 43s) and Repeat 3 (61s) */}
                <line
                  x1="105"
                  y1="30"
                  x2="297"
                  y2="30"
                  className="plot-gap-line"
                />

                {/* 42 s => 20 + (7/30)*320 = 94.7 */}
                <circle cx="95" cy="30" r="5" className="plot-point-normal" />
                <text x="90" y="16" textAnchor="middle" className="plot-val-normal">
                  42 s
                </text>

                {/* 43 s => 20 + (8/30)*320 = 105.3 */}
                <circle cx="110" cy="30" r="5" className="plot-point-normal" />
                <text x="118" y="16" textAnchor="middle" className="plot-val-normal">
                  43 s
                </text>

                {/* 61 s => 20 + (26/30)*320 = 297.3 */}
                <circle cx="297" cy="30" r="9" className="plot-point-halo" />
                <circle cx="297" cy="30" r="5.5" className="plot-point-alert" />
                <text x="297" y="15" textAnchor="middle" className="plot-val-alert">
                  61 s
                </text>
              </svg>
            </div>

            <div className="record-question-box">
              <p className="record-question-label">
                Illustrative follow-up question
              </p>
              <p className="record-question-text">
                “Which repeat would you investigate, and what would you check
                before repeating the experiment?”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
