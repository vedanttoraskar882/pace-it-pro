export function AboutSection() {
  return (
    <section
      id="about"
      data-reveal-section
      className="section section-tinted"
      aria-labelledby="about-heading"
    >
      <div className="container about-grid">
        <div className="about-narrative">
          <p className="section-kicker">About PractiTrace</p>
          <h2 id="about-heading" className="section-title">
            Built around the questions science teachers ask after a practical
          </h2>

          <div className="prose-stack">
            <p>
              PractiTrace is a planned GCSE practical science evidence and
              readiness platform for secondary school science departments,
              designed around the two-year Key Stage 4 programme. It is being
              developed to connect the department’s practical calendar, the
              technician’s preparation lists, the teacher’s observations, each
              pupil’s laboratory record and the department’s evidence for
              internal sign-off.
            </p>
            <p>
              In many departments, practical evidence becomes scattered across
              attendance registers, exercise books, technician requests and
              spreadsheets. A register may show that a pupil attended a
              chromatography lesson, yet the Head of Science still needs to know
              whether that pupil handled the apparatus correctly, recorded usable
              measurements and can explain the result.
            </p>
            <p>
              By bringing those pieces of evidence together into one shared,
              versioned record for each pupil and practical, PractiTrace is
              designed to help a department distinguish a missed lesson from a
              technique that needs observing or a result a pupil struggles to
              explain.
            </p>
          </div>

          <dl className="distinction-strip" aria-label="What a shared record distinguishes">
            <div className="distinction-item">
              <dt>01 · Missed lesson</dt>
              <dd>Attendance gaps surfaced directly for departmental catch-up.</dd>
            </div>
            <div className="distinction-item">
              <dt>02 · Unobserved technique</dt>
              <dd>Practical apparatus skills rated as secure, developing or not yet observed.</dd>
            </div>
            <div className="distinction-item">
              <dt>03 · Explanation gap</dt>
              <dd>Follow-up prompts tied to the measurements each pupil recorded.</dd>
            </div>
          </dl>
        </div>

        <aside className="founder-card" aria-labelledby="founder-heading">
          <div className="founder-header">
            <p className="card-kicker">Founder profile</p>
            <h3 id="founder-heading" className="founder-name">
              Priyanka Jhanji
            </h3>
            <p className="founder-role">Founder and Chief Executive</p>
          </div>

          <p className="founder-bio">
            Priyanka Jhanji is a former Science Teacher and Science Lead with
            more than five years of science teaching experience in India. At
            Innocent Hearts School, she coordinated science curriculum planning
            with Heads of Science across four schools and led its implementation
            for Years 6–10 at her school. She also led hands-on Science Club
            activities. Priyanka holds a B.Ed. in Mathematics and Science, a
            B.Sc. covering Physics, Mathematics and Chemistry, and an MA in
            Business Management from Newcastle College in the UK.
          </p>

          <ul className="founder-credentials" aria-label="Qualifications and teaching background">
            <li>5+ years science teaching experience</li>
            <li>B.Ed. Mathematics and Science</li>
            <li>B.Sc. Physics, Mathematics and Chemistry</li>
            <li>MA Business Management, Newcastle College (UK)</li>
          </ul>

          <p className="founder-tech-note">
            PractiTrace is at the technical design stage. The in-house software
            build is planned to be led by a Technical Co-Founder and Chief
            Technology Officer.
          </p>
        </aside>
      </div>
    </section>
  );
}
