type PricingSectionProps = {
  onOpenPilotModal: (triggerEl: HTMLElement | null) => void;
};

export function PricingSection({ onOpenPilotModal }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      data-reveal-section
      className="section"
      aria-labelledby="pricing-heading"
    >
      <div className="container">
        <div className="section-header">
          <p className="section-kicker">Planned commercial offer</p>
          <h2 id="pricing-heading" className="section-title">
            Pricing for schools and trusts
          </h2>
          <p className="section-lead">
            PractiTrace is designed initially for UK secondary science
            departments, starting in the West Midlands. The planned commercial
            offer includes an annual department subscription and a multi-school
            trust licence.
          </p>
        </div>

        <div className="pricing-primary-grid">
          <article className="pricing-card" aria-labelledby="offer-uk-dept">
            <div className="pricing-card-header">
              <p className="pricing-offer-label">Main offer 1</p>
              <h3 id="offer-uk-dept" className="pricing-card-title">
                UK school department
              </h3>
            </div>

            <div className="pricing-formula-box">
              <p className="pricing-block-label">Annual subscription formula</p>
              <p className="pricing-formula-value">
                £600 base fee + £3.50 per Key Stage 4 science pupil per year
              </p>
              <p className="pricing-meta-note">Billed annually in advance.</p>
            </div>

            <dl className="pricing-details-list">
              <div className="pricing-detail-row">
                <dt>Worked subscription example (360 KS4 science pupils)</dt>
                <dd>
                  <span className="mono-inline">£600 + (£3.50 × 360)</span> ={' '}
                  <strong>£1,860 per year</strong>
                  <span className="pricing-detail-subtext">
                    Calculated using the per-pupil formula above rather than a
                    flat school fee.
                  </span>
                </dd>
              </div>
              <div className="pricing-detail-row">
                <dt>Implementation and calibration (one-off setup)</dt>
                <dd>
                  <strong>£1,000 per school, once</strong>
                  <span className="pricing-detail-subtext">
                    Includes an audit of the practical scheme, MIS connection
                    and a teacher technique-calibration workshop.
                  </span>
                </dd>
              </div>
            </dl>

            <div className="pricing-total-callout">
              <p className="pricing-total-text">
                <strong>
                  Example first paid year for 360 pupils: £2,860 including
                  implementation.
                </strong>
              </p>
              <p className="pricing-meta-note">
                £1,860 annual subscription + £1,000 one-off setup. Optional
                reviews are extra.
              </p>
            </div>
          </article>

          <article className="pricing-card" aria-labelledby="offer-mat">
            <div className="pricing-card-header">
              <p className="pricing-offer-label">Main offer 2</p>
              <h3 id="offer-mat" className="pricing-card-title">
                Multi-academy trust
              </h3>
            </div>

            <div className="pricing-formula-box">
              <p className="pricing-block-label">Trust licence terms</p>
              <p className="pricing-formula-value">
                15% discount on the department subscription
              </p>
              <p className="pricing-meta-note">
                Three-year agreement covering several schools.
              </p>
            </div>

            <dl className="pricing-details-list">
              <div className="pricing-detail-row">
                <dt>Example price per school (360 KS4 science pupils)</dt>
                <dd>
                  <span className="mono-inline">£1,860 × 85%</span> ={' '}
                  <strong>£1,581 per year per school</strong>
                  <span className="pricing-detail-subtext">
                    Example subscription price for one trust school, not a
                    trust-wide fee. Based on the standard formula of £600 base
                    fee + £3.50 per KS4 pupil.
                  </span>
                </dd>
              </div>
              <div className="pricing-detail-row">
                <dt>Implementation and calibration (one-off setup)</dt>
                <dd>
                  <strong>£750 per school, once</strong>
                  <span className="pricing-detail-subtext">
                    One-off setup fee per school; the 15% subscription discount
                    does not apply to the £750 setup charge.
                  </span>
                </dd>
              </div>
            </dl>

            <div className="pricing-total-callout pricing-total-neutral">
              <p className="pricing-total-text">
                <strong>
                  Subscription discount applies per trust school (£1,581 per year
                  at 360 pupils).
                </strong>
              </p>
              <p className="pricing-meta-note">
                Implementation remains £750 once per school.
              </p>
            </div>
          </article>
        </div>

        <div className="pricing-secondary-grid">
          <div
            className="pricing-secondary-card"
            aria-labelledby="optional-services-heading"
          >
            <p className="pricing-offer-label">Add-on support</p>
            <h3 id="optional-services-heading" className="pricing-secondary-title">
              Optional services
            </h3>
            <dl className="pricing-compact-list">
              <div className="pricing-compact-row">
                <dt>Practical health review</dt>
                <dd>£450 per termly review</dd>
              </div>
              <div className="pricing-compact-row">
                <dt>Trust continuing professional development (CPD)</dt>
                <dd>£1,200 per day</dd>
              </div>
            </dl>
          </div>

          <div
            className="pricing-secondary-card pricing-international-card"
            aria-labelledby="international-offer-heading"
          >
            <p className="pricing-offer-label">Planned international offer</p>
            <h3
              id="international-offer-heading"
              className="pricing-secondary-title"
            >
              British-curriculum schools overseas
            </h3>
            <p className="pricing-international-price">
              £2,400 per school per year
            </p>
            <p className="pricing-meta-note">
              Planned from Year 3, with remote onboarding. Offered separately
              from the initial UK programme.
            </p>
          </div>
        </div>

        <aside className="pilot-callout" aria-labelledby="free-pilot-heading">
          <div className="pilot-callout-copy">
            <p className="card-kicker">Proposed free pilot</p>
            <h3 id="free-pilot-heading" className="pilot-callout-title">
              West Midlands pilot cohort
            </h3>
            <p className="pilot-callout-text">
              The proposed free pilot is designed for five West Midlands
              secondary schools, with two Year 10 classes per school.
            </p>
          </div>
          <div className="pilot-callout-action">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => onOpenPilotModal(e.currentTarget)}
            >
              Request a Pilot
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
