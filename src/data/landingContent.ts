export type NavItem = {
  label: string;
  href: string;
};

export type EvidenceStream = {
  name: string;
  question: string;
  detail: string;
};

export type PlatformModule = {
  number: number;
  title: string;
  description: string;
};

export type ModuleGroup = {
  code: string;
  title: string;
  modules: PlatformModule[];
};

export type WorkflowStage = {
  step: number;
  title: string;
  role: string;
  description: string;
  note?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const EVIDENCE_STREAMS: EvidenceStream[] = [
  {
    name: 'Do',
    question: 'Did the pupil complete the practical?',
    detail: 'Attendance and teacher confirmation per required practical.',
  },
  {
    name: 'Show',
    question: 'Which techniques did the teacher observe?',
    detail: 'Practical-specific technique indicators recorded during the lesson.',
  },
  {
    name: 'Own Data',
    question: 'What measurements, graph and conclusion did the pupil record?',
    detail: 'The pupil’s dated laboratory record and traceable revisions.',
  },
  {
    name: 'Explain',
    question: 'Can the pupil interpret their own results?',
    detail: 'Follow-up questions built from the pupil’s own recorded values.',
  },
];

export const MODULE_GROUPS: ModuleGroup[] = [
  {
    code: 'A',
    title: 'Plan and run the lesson',
    modules: [
      {
        number: 1,
        title: 'Specification-mapped practical library',
        description:
          'Maps required practicals to exam specification statements, apparatus and techniques. Initial coverage is AQA and Pearson Edexcel GCSE Combined Science.',
      },
      {
        number: 2,
        title: 'One-tap completion register',
        description:
          'Uses class rosters and attendance from the school’s management information system (MIS). Teachers confirm completion per pupil and can see absences.',
      },
      {
        number: 3,
        title: 'Technician console',
        description:
          'Generates weekly preparation and requisition lists by laboratory and day, scales quantities to class sizes and flags capacity pressures.',
      },
    ],
  },
  {
    code: 'B',
    title: 'Capture what each pupil did',
    modules: [
      {
        number: 4,
        title: 'Sealed digital lab record',
        description:
          'Records the method, results table, automatic graph, optional apparatus photograph and conclusion. Later corrections remain traceable.',
      },
      {
        number: 5,
        title: 'Technique observation',
        description:
          'Teachers rate three to five practical-specific indicators as “secure”, “developing” or “not yet observed”, for a sample of pupils or the whole class.',
      },
      {
        number: 6,
        title: 'Own-Data Explain Engine',
        description:
          'Teacher-written question templates use each pupil’s recorded values. When results meet a trigger condition, a question is issued within 48 hours and revisited at spaced intervals.',
      },
    ],
  },
  {
    code: 'C',
    title: 'Act on gaps and prepare evidence',
    modules: [
      {
        number: 7,
        title: 'Live catch-up list',
        description:
          'Shows outstanding practicals by pupil, class and teacher, with suggested consolidation slots.',
      },
      {
        number: 8,
        title: 'Practical Readiness Index and gap map',
        description:
          'A score from 0 to 100 per pupil and practical combines the four evidence streams. A range shows the uncertainty around the score, helping teachers see where sparse evidence can indicate a need for another observation.',
      },
      {
        number: 9,
        title: 'Evidence pack export',
        description:
          'Creates PDF and CSV evidence packs per candidate to support the school’s internal sign-off.',
      },
      {
        number: 10,
        title: 'Role-based dashboards',
        description:
          'Teachers, technicians, Heads of Science, senior leaders and trust leads see information relevant to their responsibilities.',
      },
    ],
  },
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: 1,
    title: 'Configure',
    role: 'Head of Science',
    description:
      'Select exam boards and routes, import the scheme of work and map practicals to teaching weeks.',
  },
  {
    step: 2,
    title: 'Prepare',
    role: 'Technician',
    description:
      'Review the following week’s laboratories, equipment and consumables, with quantities calculated for each class.',
  },
  {
    step: 3,
    title: 'Deliver and register',
    role: 'Teacher',
    description:
      'Run the practical, confirm completion and flag pupils who were absent.',
  },
  {
    step: 4,
    title: 'Record',
    role: 'Pupil',
    description:
      'Enter the method and measurements, review the graph, add a conclusion and seal the record during or shortly after the lesson.',
  },
  {
    step: 5,
    title: 'Observe',
    role: 'Teacher',
    description:
      'Record evidence of technique. For example, during chromatography, observe whether the pupil draws the start line in pencil above the solvent level.',
  },
  {
    step: 6,
    title: 'Explain',
    role: 'Pupil',
    description:
      'Answer a teacher-authored question based on the pupil’s own results, then revisit the concept at spaced intervals.',
  },
  {
    step: 7,
    title: 'Close gaps',
    role: 'Teacher and Head of Science',
    description:
      'Use catch-up lists and gap maps to decide who needs a repeat session, a technique observation or further explanation practice.',
    note: 'Automated catch-up session grouping is planned for Year 2.',
  },
  {
    step: 8,
    title: 'Declare and review',
    role: 'Head of Science',
    description:
      'Export candidate evidence ahead of the school’s internal sign-off. Use a practical health review to inform future teaching. The school retains responsibility for the centre declaration.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-exam-boards',
    question: 'Which exam boards are included first?',
    answer:
      'The initial product is planned for AQA and Pearson Edexcel GCSE Combined Science. OCR, WJEC Eduqas and separate sciences are planned for Year 2.',
  },
  {
    id: 'faq-missed-practical',
    question: 'What happens if a pupil misses a practical?',
    answer:
      'The planned register uses attendance information to flag the absence. The practical then appears on the catch-up list so the teacher can identify exactly what the pupil missed.',
  },
  {
    id: 'faq-follow-up-questions',
    question: 'How are follow-up questions created?',
    answer:
      'Teachers write or review the question templates. When a feature of the pupil’s results triggers a template, the platform inserts the pupil’s own values. An unusual repeat can therefore become a question about that pupil’s experiment.',
  },
  {
    id: 'faq-readiness-index',
    question: 'What does the Practical Readiness Index show?',
    answer:
      'It combines completion, observed technique, recorded results and written understanding into a score for one pupil on one practical. The accompanying range helps teachers judge how much evidence supports that score.',
  },
  {
    id: 'faq-sealed-record',
    question: 'Can a sealed lab record be corrected?',
    answer:
      'Yes. The design allows a correction to be added as a dated version, so the teacher can review both the original entry and the update.',
  },
  {
    id: 'faq-centre-declaration',
    question: 'Who signs the centre declaration?',
    answer:
      'The school remains responsible for review and sign-off. PractiTrace is designed to prepare PDF and CSV candidate evidence packs to support that process.',
  },
  {
    id: 'faq-360-pupils-price',
    question: 'How much would a school with 360 KS4 science pupils pay?',
    answer:
      'At the planned UK department list price, the annual subscription is £1,860. A one-off £1,000 implementation fee brings the first paid year to £2,860 before optional services.',
  },
  {
    id: 'faq-free-pilot',
    question: 'Who is the proposed free pilot for?',
    answer:
      'The plan is to pilot PractiTrace with five West Midlands secondary schools, involving two Year 10 classes per school.',
  },
];
