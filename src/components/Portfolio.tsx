import { useState, useEffect } from "react";
import { 
  ArrowUpRight, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Terminal, 
  Layers, 
  Cpu, 
  Database, 
  ChevronRight, 
  Activity, 
  Globe, 
  BarChart3,
  X,
  Sparkles,
  MapPin
} from "lucide-react";
import { DataScene } from "./DataScene";

interface Project {
  id: string;
  title: string;
  category: "AI / ML" | "Data Analytics";
  metric: string;
  metricLabel: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: "geopolitics-rag",
    title: "Geopolitical News Chatbot",
    category: "AI / ML",
    metric: "24h Auto-Reindex",
    metricLabel: "Knowledge Freshness",
    description: "A RAG chatbot built over 100 geopolitical news articles. Uses Microsoft GraphRAG to build a knowledge graph for context-aware retrieval — going beyond flat keyword or vector search — paired with Gemini 2.0 Flash for generation and a 24-hour auto-reindexing pipeline to keep the knowledge base current.",
    tech: ["Microsoft GraphRAG", "Gemini 2.0 Flash", "MongoDB", "Streamlit"],
    githubUrl: "https://github.com/Talalwaheed/Geopolitical-News-chatbot",
    liveUrl: "https://geopolitical-news-chatbot-57akafju98twpexdypwkzg.streamlit.app/"
  },
  {
    id: "telecom-retention",
    title: "Telecom Customer Retention Dashboard",
    category: "Data Analytics",
    metric: "87% Accuracy",
    metricLabel: "Model Performance",
    description: "SQL and Python turned raw telecom billing and service records into analysis-ready data; a Power BI dashboard tracks revenue at risk, tenure trends, and flags high-churn-risk customers for the retention team.",
    tech: ["Power BI", "SQL", "Python"],
    githubUrl: undefined
  },
  {
    id: "advance-data-assistant",
    title: "Intelligent Data Assistant",
    category: "AI / ML",
    metric: "Zero-Code ML",
    metricLabel: "Final Year Capstone",
    description: "A no-code app: upload a CSV or Excel file and it runs automated cleaning, Sentence-Transformer text clustering with t-SNE visualization, and one-click Random Forest training with feature importance — no Python needed on the user's end.",
    tech: ["Streamlit", "Scikit-learn", "Sentence-Transformers"],
    githubUrl: "https://github.com/Talalwaheed/Data-Assistant-for-MS-Excel",
    liveUrl: "https://data-assistant-for-ms-excel-4f8u3vr2mya7auewrcx7k7.streamlit.app/"
  },
  {
    id: "falcon9-landing",
    title: "Applied ML Benchmarks",
    category: "AI / ML",
    metric: "92.3% Falcon 9 | R² ≈ 0.99",
    metricLabel: "Classification & Regression",
    description: "A set of applied modeling exercises: a SpaceX Falcon 9 landing-outcome classifier at 92.3% accuracy, a coffee-shop profit regression model at R² ≈ 0.99, and a text-based spam/ham email classifier.",
    tech: ["Classification", "Regression", "Feature Engineering"],
    githubUrl: "https://github.com/Talalwaheed"
  },
  {
    id: "collaborative-kanban",
    title: "Collaborative Kanban Board",
    category: "Data Analytics",
    metric: "Multi-User",
    metricLabel: "Real-Time Boards",
    description: "A drag-and-drop task board for organizing work across boards, lists, and cards — built as a practical exercise in structuring and shipping a real multi-user tool end to end.",
    tech: ["Drag & drop", "Real-time boards"],
    githubUrl: "https://github.com/Talalwaheed/Collaborative-Kanban-Board"
  }
];

const toolkitCategories = [
  {
    id: "orbit-1",
    title: "ML & NLP",
    icon: Cpu,
    skills: ["Sentence-Transformers", "GraphRAG", "BERT", "Scikit-learn", "PyTorch", "LightGBM", "SMOTE", "Random Forest", "K-Means", "PCA", "t-SNE"]
  },
  {
    id: "orbit-2",
    title: "Analytics & BI",
    icon: BarChart3,
    skills: ["Power BI", "KPI Tracking", "Churn Profiling", "EDA", "Data Cleaning", "Excel"]
  },
  {
    id: "orbit-3",
    title: "Data Pipelines",
    icon: Database,
    skills: ["Python", "Pandas", "NumPy", "SQL", "Airflow", "REST APIs", "ETL", "MongoDB"]
  },
  {
    id: "orbit-4",
    title: "Tools & Delivery",
    icon: Terminal,
    skills: ["Streamlit", "Git & GitHub", "Gemini API", "Microsoft GraphRAG", "Linux Shell"]
  }
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [showIntroModal, setShowIntroModal] = useState<boolean>(false);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "projects", "experience", "toolkit", "contact"];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="portfolio-shell">
      {/* Global 3D Canvas Background */}
      <DataScene />

      {/* Fixed Header */}
      <header className="site-header">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="wordmark">
          <span>●</span>
          <span>Muhammad Talal Bin Waheed</span>
        </button>

        <div className="availability">
          <i /> Available for Data Science & Analyst Roles
        </div>

        <div className="header-cv-group">
          <a href="/Talal__Ai_ML_.pdf" download className="cv-pill-btn">
            <Download size={13} />
            <span>AI / ML CV</span>
          </a>
          <a href="/Talal_CV_DA_.pdf" download className="cv-pill-btn">
            <Download size={13} />
            <span>Analytics CV</span>
          </a>
        </div>
      </header>

      {/* Floating Right Navigation */}
      <nav className="rail-nav">
        {[
          { id: "hero", label: "Intro", idx: "01" },
          { id: "projects", label: "Projects", idx: "02" },
          { id: "experience", label: "Experience", idx: "03" },
          { id: "toolkit", label: "Toolkit", idx: "04" },
          { id: "contact", label: "Contact", idx: "05" }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
            className={activeSection === item.id ? "is-active" : ""}
          >
            <span>{item.idx}</span>
            <b>{item.label}</b>
          </button>
        ))}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-profile-badge">
            <div className="pfp-wrapper">
              <img 
                src="/talal-pfp.png" 
                alt="Muhammad Talal Bin Waheed" 
                className="hero-pfp"
              />
              <span className="pfp-online-indicator" />
            </div>
            <div className="hero-profile-meta">
              <span className="profile-name">Muhammad Talal Bin Waheed</span>
              <span className="profile-role">Data Science & Machine Learning Specialist</span>
            </div>
          </div>

          <div className="kicker">
            <span>01 // PORTFOLIO</span> Applied Data Science & Machine Learning
          </div>

          <h1 className="hero-title-two-line">
            <span>Turning messy data into decisions</span>
            <span>through <em>applied machine learning</em> and <em>analytics</em>.</span>
          </h1>

          <div className="hero-actions">
            <button 
              onClick={() => setShowIntroModal(true)}
              className="action-btn-secondary"
            >
              <Sparkles size={15} />
              View Intro
            </button>
            <button 
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="action-btn-primary"
            >
              Explore Projects
            </button>
            <a href="#contact" className="text-link">
              Get in touch <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <button 
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="scroll-cue"
        >
          Scroll to explore <ChevronRight size={14} className="rotate-90" />
        </button>
      </section>

      {/* Rectangular Landscape Intro Modal Popup */}
      {showIntroModal && (
        <div className="intro-modal-backdrop" onClick={() => setShowIntroModal(false)}>
          <div className="intro-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowIntroModal(false)} aria-label="Close modal">
              <X size={18} />
            </button>

            <div className="intro-modal-grid">
              {/* Left Column: Your Custom Bio Text */}
              <div className="intro-modal-left">
                <div className="intro-badge-pill">
                  <Sparkles size={13} />
                  <span>About Me</span>
                </div>

                <h3 className="intro-title">Muhammad Talal Bin Waheed</h3>
                <span className="intro-subtitle">Data Scientist & Analyst</span>

                <div className="intro-body-paragraphs">
                  <p>
                    I’m a Data Science graduate focused on turning messy data into clear, practical insights. I work with Python, SQL, Power BI, and modern data tools to analyze information, uncover patterns, and build solutions that support better decisions.
                  </p>
                  <p>
                    Through internships and projects, I’ve worked on data analytics, predictive modeling, ETL pipelines, telecom customer data, and interactive dashboards. I enjoy solving real-world problems, learning continuously, and creating work that turns data into meaningful results.
                  </p>
                </div>

                <div className="intro-highlight-row">
                  <div className="highlight-item">
                    <b>87%</b>
                    <span>Model Accuracy</span>
                  </div>
                  <div className="highlight-item">
                    <b>30%</b>
                    <span>ETL Workload Cut</span>
                  </div>
                  <div className="highlight-item">
                    <b>End-to-End</b>
                    <span>Pipelines & BI</span>
                  </div>
                </div>

                <div className="intro-modal-actions">
                  <a href="/Talal__Ai_ML_.pdf" download className="cv-pill-btn">
                    <Download size={13} />
                    <span>AI / ML CV</span>
                  </a>
                  <a href="/Talal_CV_DA_.pdf" download className="cv-pill-btn">
                    <Download size={13} />
                    <span>Analytics CV</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Clear, Prominent Portrait Photo */}
              <div className="intro-modal-right">
                <div className="intro-photo-card">
                  <img 
                    src="/talal-pfp.png" 
                    alt="Muhammad Talal Bin Waheed" 
                    className="intro-photo-img" 
                  />
                  <div className="intro-photo-overlay">
                    <span className="photo-caption-name">Talal Waheed</span>
                    <span className="photo-caption-meta">
                      <MapPin size={12} /> Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="section-heading">
          <div>
            <div className="section-index">02 // PORTFOLIO BENCHMARKS</div>
            <h2>Featured Projects</h2>
          </div>
          <p>
            Applied machine learning implementations, production RAG architectures, and statistical intelligence platforms with reproducible source code.
          </p>
        </div>

        <div className="project-controls">
          <div className="filters">
            {["All", "AI / ML", "Data Analytics"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? "is-active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="project-gallery">
          {filteredProjects.map((p) => (
            <article key={p.id} className="project-card">
              <div className="project-topline">
                <span>{p.category}</span>
                <Activity size={16} />
              </div>

              <div className="project-visual">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="project-screenshot" />
                ) : (
                  <div className="project-ui-preview">
                    <div className="ui-header-bar">
                      <div className="ui-dots">
                        <span /><span /><span />
                      </div>
                      <span className="ui-address">{p.id}.app/analytics</span>
                    </div>
                    <div className="ui-body-mock">
                      {p.id === "geopolitics-rag" && (
                        <div className="mock-graph">
                          <svg viewBox="0 0 200 80" className="viz-graph">
                            <line x1="20" y1="40" x2="80" y2="20" stroke="currentColor" />
                            <line x1="80" y1="20" x2="140" y2="60" stroke="currentColor" />
                            <line x1="80" y1="20" x2="180" y2="30" stroke="currentColor" />
                            <circle cx="20" cy="40" r="6" fill="var(--primary)" />
                            <circle cx="80" cy="20" r="9" fill="var(--primary)" />
                            <circle cx="140" cy="60" r="7" fill="var(--primary)" />
                            <circle cx="180" cy="30" r="8" fill="var(--primary)" />
                          </svg>
                          <span className="mock-caption">Microsoft GraphRAG Entity Map</span>
                        </div>
                      )}
                      {p.id === "telecom-retention" && (
                        <div className="mock-bars">
                          <div style={{ height: "45%" }} />
                          <div style={{ height: "80%" }} />
                          <div style={{ height: "65%" }} />
                          <div style={{ height: "87%" }} />
                          <div style={{ height: "54%" }} />
                        </div>
                      )}
                      {p.id === "advance-data-assistant" && (
                        <div className="mock-scatter">
                          {[...Array(14)].map((_, i) => (
                            <span 
                              key={i} 
                              style={{ 
                                left: `${(i * 19) % 85 + 6}%`, 
                                top: `${(i * 27) % 70 + 12}%` 
                              }} 
                            />
                          ))}
                        </div>
                      )}
                      {p.id === "falcon9-landing" && (
                        <div className="mock-orbit-viz">
                          <div className="orbit-line-mock" />
                          <div className="orbit-core-mock" />
                        </div>
                      )}
                      {p.id === "collaborative-kanban" && (
                        <div className="mock-kanban">
                          <div className="k-col"><div /><div /></div>
                          <div className="k-col"><div /><div /><div /></div>
                          <div className="k-col"><div /></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="project-copy">
                <div>
                  <span className="project-metric">{p.metric}</span>
                  <span className="project-metric-label">{p.metricLabel}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tool-row">
                  {p.tech.map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="project-links">
                {p.githubUrl ? (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={15} /> Source Code
                  </a>
                ) : (
                  <span style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
                    <Github size={15} /> Repo coming soon
                  </span>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Globe size={15} /> Live Demo <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience-section">
        <div className="section-heading compact">
          <div className="section-index">03 // CAREER TRAJECTORY</div>
          <h2>Work Experience</h2>
          <p>
            Internship track record spanning predictive modeling, retention automation, and applied enterprise analytics.
          </p>
        </div>

        <div className="experience-cards-3d">
          <div className="exp-card-3d">
            <div className="exp-card-header">
              <span className="timeline-date">JUL – AUG 2025</span>
              <span className="exp-badge">Islamabad</span>
            </div>
            <h3>Data Science & Network Engineering Intern</h3>
            <div className="role">Cybernet (Pvt.) Ltd</div>
            <ul>
              <li>Trained and validated churn-prediction models (logistic regression, random forest, K-means) on FTTH-GPON customer data, reaching <strong>87% accuracy</strong> to support retention strategy.</li>
              <li>Automated ETL pipelines with Python, SQL, APIs, and Airflow, <strong>cutting recurring reporting workload by 30%</strong>.</li>
              <li>Integrated CRM records with backend databases and Huawei OLT telemetry, reducing operational discrepancies.</li>
            </ul>
          </div>

          <div className="exp-card-3d">
            <div className="exp-card-header">
              <span className="timeline-date">JUN – JUL 2025</span>
              <span className="exp-badge">Remote</span>
            </div>
            <h3>Data Science Intern</h3>
            <div className="role">Digital Empowerment Network</div>
            <ul>
              <li>Built and evaluated ML classifiers predicting SpaceX Falcon 9 landing outcomes, reaching <strong>92.3% accuracy</strong> on a public benchmark.</li>
              <li>Built an NLP spam/ham email classifier using text preprocessing and standard ML techniques.</li>
              <li>Developed a profit-prediction model for coffee-shop sales through feature engineering (<strong>R² ≈ 0.99</strong>).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Toolkit Section */}
      <section id="toolkit" className="section">
        <div className="section-heading">
          <div>
            <div className="section-index">04 // TECHNICAL COMPETENCY</div>
            <h2>Skills & Toolkit</h2>
          </div>
          <p>
            Domain tools and technologies across ML/NLP, analytics, data pipelines, and delivery systems.
          </p>
        </div>

        <div className="skill-stage">
          <div className="skill-core">
            <Layers />
            <span>DATA</span>
            <small>CORE STACK</small>
          </div>

          {toolkitCategories.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.id} className={`skill-orbit ${group.id}`}>
                <div className="orbit-header">
                  <Icon />
                  <b>{group.title}</b>
                </div>
                <div className="capsule-grid">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-capsule">{skill}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <div className="section-index">05 // GET IN TOUCH</div>
          <div>
            <h2>Let's build something insightful together.</h2>
          </div>
          <div className="contact-copy">
            <p>
              I'm looking for Data Analyst and Data Scientist roles where I can turn analytical thinking and applied ML into decisions a team can actually act on.
            </p>
          </div>
        </div>

        <div className="contact-links">
          <a href="mailto:waheedtalal733@gmail.com">
            <Mail />
            <div className="contact-info">
              <span className="contact-type">Email</span>
              <b>waheedtalal733@gmail.com</b>
            </div>
            <ArrowUpRight />
          </a>

          <a href="tel:+923230986543">
            <Phone />
            <div className="contact-info">
              <span className="contact-type">Phone</span>
              <b>+92 323 0986543</b>
            </div>
            <ArrowUpRight />
          </a>

          <a href="https://www.linkedin.com/in/muhammad-talal-bin-waheed" target="_blank" rel="noopener noreferrer">
            <Linkedin />
            <div className="contact-info">
              <span className="contact-type">LinkedIn</span>
              <b>Talal Waheed</b>
            </div>
            <ArrowUpRight />
          </a>

          <a href="https://github.com/Talalwaheed" target="_blank" rel="noopener noreferrer">
            <Github />
            <div className="contact-info">
              <span className="contact-type">GitHub</span>
              <b>Talalwaheed</b>
            </div>
            <ArrowUpRight />
          </a>
        </div>

        <footer>
          <span>© {new Date().getFullYear()} Muhammad Talal Bin Waheed</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top ↑
          </button>
        </footer>
      </section>
    </div>
  );
}