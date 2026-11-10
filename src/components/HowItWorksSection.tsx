import { WORKFLOW_STAGES } from '../data/landingContent';

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      data-reveal-section
      className="section section-tinted"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        <div className="section-header">
          <p className="section-kicker">How it works</p>
          <h2 id="how-it-works-heading" className="section-title">
            From the department timetable to the centre declaration
          </h2>
          <p className="section-lead">
            Eight planned stages link departmental curriculum planning,
            technician preparation, classroom observation and pupil reflection.
          </p>
        </div>

        <ol className="workflow-grid">
          {WORKFLOW_STAGES.map((stage) => (
            <li key={stage.step} className="workflow-card">
              <div className="workflow-card-top">
                <span className="workflow-step-badge" aria-hidden="true">
                  {String(stage.step).padStart(2, '0')}
                </span>
                <span className="workflow-step-rule" aria-hidden="true" />
              </div>

              <h3 className="workflow-title">
                <span className="sr-only">Stage {stage.step}: </span>
                {stage.title}
              </h3>

              <p className="workflow-role-line">
                <span className="workflow-role-label">Role:</span>{' '}
                <span className="workflow-role-name">{stage.role}</span>
              </p>

              <p className="workflow-description">{stage.description}</p>

              {stage.note ? (
                <p className="workflow-note">{stage.note}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
