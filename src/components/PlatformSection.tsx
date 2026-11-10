import { EVIDENCE_STREAMS, MODULE_GROUPS } from '../data/landingContent';

export function PlatformSection() {
  return (
    <section
      id="platform"
      data-reveal-section
      className="section"
      aria-labelledby="platform-heading"
    >
      <div className="container">
        <div className="section-header">
          <p className="section-kicker">Platform architecture</p>
          <h2 id="platform-heading" className="section-title">
            One practical, four kinds of evidence
          </h2>
          <p className="section-lead">
            Every practical is structured around four complementary evidence
            streams linked inside one versioned record.
          </p>
        </div>

        <div className="evidence-grid" aria-label="Four evidence streams">
          {EVIDENCE_STREAMS.map((stream, index) => (
            <div key={stream.name} className="evidence-card">
              <div className="evidence-card-top">
                <span className="evidence-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="evidence-name">{stream.name}</h3>
              </div>
              <p className="evidence-question">{stream.question}</p>
              <p className="evidence-detail">{stream.detail}</p>
            </div>
          ))}
        </div>

        <div className="evidence-graph-banner">
          <div className="evidence-graph-copy">
            <p className="card-kicker">Underlying data model</p>
            <h3 className="evidence-graph-title">
              Sealed Practical Evidence Graph
            </h3>
            <p className="evidence-graph-text">
              Each pupil’s evidence is linked to a particular practical and exam
              specification version. Entries are dated. Corrections add a new
              version and preserve the original, so teachers and Heads of Science
              can inspect how a record developed over the Key Stage 4 programme.
            </p>
          </div>

          <div
            className="evidence-graph-diagram"
            aria-hidden="true"
          >
            <div className="version-node">
              <span className="version-tag">v1 · Dated entry</span>
              <span className="version-meta">Original record preserved</span>
            </div>
            <div className="version-connector">
              <span className="version-line" />
            </div>
            <div className="version-node version-node-updated">
              <span className="version-tag">v2 · Dated correction</span>
              <span className="version-meta">Traceable update appended</span>
            </div>
          </div>
        </div>

        <div className="modules-intro">
          <h3 className="subsection-title">Ten planned initial modules</h3>
          <p className="subsection-subtitle">
            Designed to support planning, practical delivery, pupil capture and
            departmental sign-off from one shared record.
          </p>
        </div>

        <div className="module-groups">
          {MODULE_GROUPS.map((group) => (
            <section
              key={group.code}
              className="module-group-panel"
              aria-labelledby={`module-group-${group.code}`}
            >
              <div className="module-group-header">
                <span className="module-phase-badge">Phase {group.code}</span>
                <h4
                  id={`module-group-${group.code}`}
                  className="module-group-heading"
                >
                  <span className="module-group-code">{group.code}.</span>{' '}
                  {group.title}
                </h4>
              </div>

              <ol className="module-list" start={group.modules[0].number}>
                {group.modules.map((mod) => (
                  <li key={mod.number} className="module-item">
                    <span className="module-number" aria-hidden="true">
                      {String(mod.number).padStart(2, '0')}
                    </span>
                    <div className="module-content">
                      <h5 className="module-title">{mod.title}</h5>
                      <p className="module-description">{mod.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="roadmap-note" role="note" aria-labelledby="roadmap-heading">
          <div className="roadmap-header">
            <span className="roadmap-badge">Year 2 roadmap</span>
            <h3 id="roadmap-heading" className="roadmap-title">
              Planned developments
            </h3>
          </div>
          <p className="roadmap-text">
            The roadmap includes class-level diagnosis of recurring experimental
            errors, analysis of where pupils lose marks, and automated grouping
            of catch-up sessions around technician availability. The live
            catch-up list is part of the initial scope. Automated catch-up
            grouping is planned for Year 2.
          </p>
        </div>
      </div>
    </section>
  );
}
