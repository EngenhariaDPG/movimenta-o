import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowRight, Bell, BookOpen, Check,
  ChevronDown, ChevronRight, CircleHelp, ClipboardCheck, Clock3, Command,
  Crane, Download, FilePlus2, FileText, FolderKanban, Gauge, HardHat,
  LayoutDashboard, LifeBuoy, MapPin, Menu, MoreHorizontal, Plus, Search,
  Settings2, ShieldCheck, SlidersHorizontal, Truck, Weight, Wrench, X
} from "lucide-react";

type Category = "mobile" | "fixed";
type View = "dashboard" | "projects" | "equipment";
type Project = {
  id: string;
  name: string;
  client: string;
  location: string;
  category: Category;
  equipment: string;
  load: string;
  weight: string;
  date: string;
  status: "Rascunho" | "Em análise" | "Concluído";
};

const equipmentGroups = {
  mobile: [
    { name: "Guindaste telescópico", detail: "Sobre pneus • lança telescópica", icon: "crane" },
    { name: "Munck / guindauto", detail: "Guindaste articulado veicular", icon: "truck" },
    { name: "Guindaste sobre esteiras", detail: "Configuração sobre esteiras", icon: "crane" },
  ],
  fixed: [
    { name: "Ponte rolante", detail: "Monoviga ou dupla viga", icon: "crane" },
    { name: "Pórtico rolante", detail: "Pórtico apoiado ou semi-pórtico", icon: "crane" },
    { name: "Guindaste de coluna", detail: "Instalação fixa em coluna", icon: "wrench" },
    { name: "Guindaste de parede", detail: "Instalação fixa em parede", icon: "wrench" },
  ],
};

const demoProjects: Project[] = [
  { id: "MOV-024", name: "Içamento de conjunto motobomba", client: "Hidrovale Industrial", location: "Juiz de Fora, MG", category: "mobile", equipment: "Guindaste telescópico", load: "Conjunto motobomba", weight: "2.850", date: "Hoje", status: "Em análise" },
  { id: "MOV-023", name: "Movimentação de estrutura metálica", client: "Estrutural Minas", location: "Matias Barbosa, MG", category: "fixed", equipment: "Ponte rolante", load: "Módulo estrutural", weight: "1.200", date: "Ontem", status: "Rascunho" },
  { id: "MOV-022", name: "Descarga de gerador", client: "Energia Sul", location: "Lima Duarte, MG", category: "mobile", equipment: "Munck / guindauto", load: "Grupo gerador", weight: "980", date: "12 nov, 2026", status: "Concluído" },
];

const initialForm = {
  name: "", client: "", location: "", equipment: "", manufacturer: "", model: "",
  load: "", weight: "", length: "", width: "", height: "", cog: "",
  liftHeight: "", radius: "", route: "", support: "", accessories: "", notes: ""
};

type FormData = typeof initialForm;

function App() {
  const [view, setView] = useState<View>("dashboard");
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);
  const [form, setForm] = useState<FormData>(initialForm);
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("movimenta-projects");
      return saved ? JSON.parse(saved) as Project[] : demoProjects;
    } catch { return demoProjects; }
  });
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("movimenta-projects", JSON.stringify(projects));
  }, [projects]);

  const update = (key: keyof FormData, value: string) => setForm((old) => ({ ...old, [key]: value }));
  const openWizard = () => {
    setForm(initialForm);
    setCategory(presetCategory ?? null);
    setStep(0);
    setShowWizard(true);
  };
  const closeWizard = () => setShowWizard(false);
  const options = category ? equipmentGroups[category] : [];
  const canContinue = step === 0 ? !!category
    : step === 1 ? !!(form.name.trim() && form.location.trim() && form.equipment)
    : step === 2 ? !!(form.load.trim() && Number(form.weight) > 0)
    : true;

  const saveProject = () => {
    const item: Project = {
      id: "MOV-" + String(Math.max(25, ...projects.map((p) => Number(p.id.split("-")[1]) || 0)) + 1).padStart(3, "0"),
      name: form.name, client: form.client || "Cliente não informado",
      location: form.location, category: category || "mobile", equipment: form.equipment,
      load: form.load, weight: Number(form.weight).toLocaleString("pt-BR"),
      date: new Date().toLocaleDateString("pt-BR"), status: "Rascunho"
    };
    setProjects((old) => [item, ...old]);
    setSelectedProject(item);
    setShowWizard(false);
    setView("projects");
  };

  const filteredProjects = useMemo(() => projects.filter((p) =>
    [p.id, p.name, p.client, p.location, p.equipment].join(" ").toLowerCase().includes(search.toLowerCase())
  ), [projects, search]);

  const nav = (next: View) => { setView(next); setMobileMenu(false); };

  return (
    <div className="app">
      <aside className={"sidebar " + (mobileMenu ? "sidebar-open" : "")}>
        <div className="brand">
          <div className="brand-symbol"><Crane size={22} strokeWidth={1.8} /></div>
          <div className="brand-name">movimenta<span>.</span><small>ENGINEERING WORKSPACE</small></div>
          <button className="mobile-close" onClick={() => setMobileMenu(false)}><X size={18} /></button>
        </div>
        <div className="workspace-switch">
          <div className="workspace-avatar">M</div>
          <div><strong>Meu escritório</strong><span>Plano profissional</span></div>
          <ChevronDown size={15} />
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav className="main-nav">
          <button className={view === "dashboard" ? "active" : ""} onClick={() => nav("dashboard")}><LayoutDashboard size={17} /> Visão geral</button>
          <button className={view === "projects" ? "active" : ""} onClick={() => nav("projects")}><FolderKanban size={17} /> Meus planos <span className="nav-count">{projects.length}</span></button>
          <button className={view === "equipment" ? "active" : ""} onClick={() => nav("equipment")}><Crane size={17} /> Equipamentos</button>
        </nav>
        <div className="nav-label second-label">GESTÃO</div>
        <nav className="main-nav">
          <button onClick={() => nav("equipment")}><ClipboardCheck size={17} /> Biblioteca técnica</button>
          <button onClick={() => nav("projects")}><Activity size={17} /> Histórico de operações</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><LifeBuoy size={16} /></div><strong>Precisa de ajuda?</strong><p>Consulte o guia de utilização do Movimenta.</p><button onClick={() => alert("O guia de utilização será disponibilizado nas próximas versões.")}>Acessar central <ArrowRight size={13} /></button></div>
          <button className="profile-row"><div className="profile-avatar">DP</div><div><strong>Denys Pinto</strong><span>Engenheiro • Administrador</span></div><MoreHorizontal size={18} /></button>
        </div>
      </aside>

      {mobileMenu && <button className="mobile-backdrop" aria-label="Fechar menu" onClick={() => setMobileMenu(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu-button" onClick={() => setMobileMenu(true)}><Menu size={19} /></button>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{view === "dashboard" ? "Visão geral" : view === "projects" ? "Meus planos" : "Equipamentos"}</strong></div>
          <div className="top-actions">
            <div className="search-box"><Search size={15} /><input placeholder="Buscar planos..." value={search} onChange={(e) => { setSearch(e.target.value); if (view !== "projects") setView("projects"); }} /><kbd>⌘ K</kbd></div>
            <button className="icon-button" title="Notificações"><Bell size={17} /><i /></button>
            <div className="top-avatar">DP</div>
          </div>
        </header>

        <div className="content">
          {view === "dashboard" && <Dashboard projects={projects} onCreate={openWizard} onViewAll={() => nav("projects")} onOpen={setSelectedProject} />}
          {view === "projects" && <Projects projects={filteredProjects} onCreate={openWizard} onOpen={setSelectedProject} search={search} />}
          {view === "equipment" && <Equipment />}
        </div>
        <footer className="app-footer"><span>© 2026 Movimenta Engenharia</span><span><span className="footer-dot" /> Sistema em desenvolvimento <span className="footer-sep">•</span> MVP 0.2.0</span></footer>
      </main>

      {showWizard && (
        <div className="modal-backdrop" role="presentation">
          <div className="wizard-modal" role="dialog" aria-modal="true" aria-label="Criar novo plano">
            <div className="wizard-top"><div className="wizard-brand"><span className="mini-brand"><Crane size={17} /></span><div><strong>Novo plano de movimentação</strong><small>Configure os dados da operação</small></div></div><button className="icon-button" onClick={closeWizard}><X size={18} /></button></div>
            <div className="wizard-progress">{["Modalidade", "Projeto", "Carga", "Operação", "Revisão"].map((label, i) => <div key={label} className={"progress-step " + (i === step ? "current" : i < step ? "complete" : "")}><span>{i < step ? <Check size={12} /> : i + 1}</span><small>{label}</small></div>)}</div>
            <div className="wizard-body">
              <div className="wizard-heading"><div className="eyebrow">ETAPA 0{step + 1} / 05</div><h2>{["Qual equipamento será utilizado?", "Identificação do projeto", "Caracterização da carga", "Condições da operação", "Revise as informações"][step]}</h2><p>{["Escolha a categoria principal para personalizar as próximas etapas.", "Identifique a operação e selecione o equipamento de movimentação.", "Informe as características conhecidas da carga.", "Descreva as condições de execução e os acessórios previstos.", "Confira os dados cadastrados antes de criar o plano."][step]}</p></div>
              {step === 0 && <div className="choice-grid">
                <button className={"choice-card " + (category === "mobile" ? "chosen" : "")} onClick={() => { setCategory("mobile"); update("equipment", ""); }}>
                  <div className="choice-image mobile-choice"><Truck size={44} strokeWidth={1.4} /><span className="image-caption">MOBILE LIFTING</span></div>
                  <div className="choice-text"><span className="choice-tag">CATEGORIA 01</span><h3>Guindastes móveis</h3><p>Equipamentos posicionados no local da operação, com configuração variável de lança e apoio.</p><div className="choice-types">Telescópico <i /> Munck <i /> Esteiras</div></div><span className="choice-check">{category === "mobile" && <Check size={15} />}</span>
                </button>
                <button className={"choice-card " + (category === "fixed" ? "chosen" : "")} onClick={() => { setCategory("fixed"); update("equipment", ""); }}>
                  <div className="choice-image fixed-choice"><Crane size={44} strokeWidth={1.4} /><span className="image-caption">FIXED LIFTING</span></div>
                  <div className="choice-text"><span className="choice-tag">CATEGORIA 02</span><h3>Guindastes fixos</h3><p>Equipamentos instalados em posição definida, com trajetória de movimentação determinada.</p><div className="choice-types">Ponte rolante <i /> Pórtico <i /> Coluna / parede</div></div><span className="choice-check">{category === "fixed" && <Check size={15} />}</span>
                </button>
              </div>}
              {step === 1 && <div className="form-grid">
                <Field label="Nome do plano / operação" required><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ex.: Içamento de conjunto motobomba" /></Field>
                <Field label="Empresa / cliente"><input value={form.client} onChange={(e) => update("client", e.target.value)} placeholder="Nome da empresa" /></Field>
                <Field label="Local da operação" required><input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Cidade, unidade ou endereço" /></Field>
                <Field label="Tipo de equipamento" required><select value={form.equipment} onChange={(e) => update("equipment", e.target.value)}><option value="">Selecione o equipamento</option>{options.map((o) => <option key={o.name}>{o.name}</option>)}</select></Field>
                <Field label="Fabricante"><input value={form.manufacturer} onChange={(e) => update("manufacturer", e.target.value)} placeholder="Fabricante" /></Field>
                <Field label="Modelo"><input value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Modelo / identificação" /></Field>
              </div>}
              {step === 2 && <div className="form-grid">
                <Field label="Identificação da carga" required wide><input value={form.load} onChange={(e) => update("load", e.target.value)} placeholder="Ex.: Transformador, máquina, estrutura metálica..." /></Field>
                <Field label="Peso total (kg)" required><input type="number" min="0" value={form.weight} onChange={(e) => update("weight", e.target.value)} placeholder="Peso conhecido da carga" /></Field>
                <Field label="Centro de gravidade"><input value={form.cog} onChange={(e) => update("cog", e.target.value)} placeholder="Posição / referência conhecida" /></Field>
                <Field label="Comprimento (m)"><input type="number" min="0" value={form.length} onChange={(e) => update("length", e.target.value)} placeholder="0,00" /></Field>
                <Field label="Largura (m)"><input type="number" min="0" value={form.width} onChange={(e) => update("width", e.target.value)} placeholder="0,00" /></Field>
                <Field label="Altura (m)"><input type="number" min="0" value={form.height} onChange={(e) => update("height", e.target.value)} placeholder="0,00" /></Field>
                <Field label="Pontos de içamento / observações" wide><textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Pontos de pega, olhais, restrições ou características relevantes..." /></Field>
              </div>}
              {step === 3 && <div className="form-grid">
                <Field label="Altura de içamento (m)"><input type="number" min="0" value={form.liftHeight} onChange={(e) => update("liftHeight", e.target.value)} placeholder="0,00" /></Field>
                <Field label="Raio de operação (m)"><input type="number" min="0" value={form.radius} onChange={(e) => update("radius", e.target.value)} placeholder="0,00" /></Field>
                <Field label="Percurso / destino da carga" wide><textarea rows={3} value={form.route} onChange={(e) => update("route", e.target.value)} placeholder="Origem, destino, interferências e trajetória prevista..." /></Field>
                <Field label={category === "mobile" ? "Condições do terreno / patolamento" : "Condições da estrutura de sustentação"} wide><textarea rows={3} value={form.support} onChange={(e) => update("support", e.target.value)} placeholder="Piso, terreno, apoios, estrutura, nivelamento e condições locais..." /></Field>
                <Field label="Acessórios de içamento previstos" wide><textarea rows={2} value={form.accessories} onChange={(e) => update("accessories", e.target.value)} placeholder="Cintas, cabos, correntes, manilhas, balancim, ganchos..." /></Field>
              </div>}
              {step === 4 && <div className="review-content">
                <div className="review-callout"><ShieldCheck size={20} /><div><strong>Informações reunidas para análise</strong><span>Este cadastro é preliminar e não representa liberação técnica da operação.</span></div></div>
                <ReviewGroup title="PROJETO E EQUIPAMENTO"><ReviewItem label="Modalidade" value={category === "mobile" ? "Guindaste móvel" : "Guindaste fixo"} /><ReviewItem label="Operação" value={form.name} /><ReviewItem label="Cliente" value={form.client} /><ReviewItem label="Local" value={form.location} /><ReviewItem label="Equipamento" value={form.equipment} /><ReviewItem label="Fabricante / modelo" value={[form.manufacturer, form.model].filter(Boolean).join(" / ")} /></ReviewGroup>
                <ReviewGroup title="CARGA E OPERAÇÃO"><ReviewItem label="Carga" value={form.load} /><ReviewItem label="Peso" value={form.weight ? Number(form.weight).toLocaleString("pt-BR") + " kg" : ""} /><ReviewItem label="Dimensões (C × L × A)" value={[form.length, form.width, form.height].some(Boolean) ? [form.length || "—", form.width || "—", form.height || "—"].join(" × ") + " m" : ""} /><ReviewItem label="Altura / raio" value={[form.liftHeight && form.liftHeight + " m", form.radius && form.radius + " m"].filter(Boolean).join(" / ")} /><ReviewItem label="Acessórios" value={form.accessories} /><ReviewItem label="Apoio / estrutura" value={form.support} /></ReviewGroup>
                <div className="engineering-disclaimer"><CircleHelp size={17} /><p><strong>Importante:</strong> esta versão organiza os dados da operação, mas ainda não executa cálculos de capacidade, estabilidade ou dimensionamento de acessórios. O plano deve ser complementado com documentação do fabricante, verificações aplicáveis e validação de profissional legalmente habilitado.</p></div>
              </div>}
            </div>
            <div className="wizard-footer"><button className="btn-secondary" onClick={() => step === 0 ? closeWizard() : setStep((s) => s - 1)}><ArrowLeft size={15} /> {step === 0 ? "Cancelar" : "Voltar"}</button>{step < 4 ? <button className="btn-primary" disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>Continuar <ArrowRight size={15} /></button> : <button className="btn-primary" onClick={saveProject}><Check size={16} /> Criar plano</button>}</div>
          </div>
        </div>
      )}

      {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

function Field({ label, required, wide, children }: { label: string; required?: boolean; wide?: boolean; children: React.ReactNode }) {
  return <label className={"field " + (wide ? "field-wide" : "")}><span>{label}{required && <b> *</b>}</span>{children}</label>;
}

function Dashboard({ projects, onCreate, onViewAll, onOpen }: { projects: Project[]; onCreate: (presetCategory?: Category) => void; onViewAll: () => void; onOpen: (p: Project) => void }) {
  const inProgress = projects.filter((p) => p.status !== "Concluído").length;
  const today = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(new Date()).toUpperCase();
  return <div className="page">
    <div className="page-heading"><div><div className="eyebrow">{today}</div><h1>Visão geral</h1><p>Bem-vindo ao seu espaço de planejamento de movimentação.</p></div><button className="btn-primary create-button" onClick={onCreate}><Plus size={17} /> Novo plano</button></div>
    <section className="welcome-banner"><div className="welcome-copy"><span className="banner-eyebrow">MOVIMENTAÇÃO COM INTELIGÊNCIA</span><h2>Engenharia organizada.<br /><em>Operações planejadas.</em></h2><p>Centralize dados, equipamentos e documentação técnica das suas operações de içamento.</p><button onClick={onCreate}>Começar um plano <ArrowRight size={15} /></button></div><div className="banner-graphic"><div className="graphic-circle circle-one" /><div className="graphic-circle circle-two" /><div className="graphic-line line-one" /><div className="graphic-line line-two" /><Crane className="banner-crane" size={168} strokeWidth={0.8} /><div className="graphic-tag"><span className="graphic-tag-dot" /> WORKSPACE ONLINE</div></div></section>
    <div className="section-title-row"><div><h2>Seu workspace</h2><p>Acompanhe o andamento dos seus projetos.</p></div><button className="text-button" onClick={onViewAll}>Ver todos os planos <ArrowRight size={14} /></button></div>
    <div className="stats-grid">
      <Stat icon={<FolderKanban size={18} />} label="Planos cadastrados" value={String(projects.length).padStart(2,"0")} change="Total no workspace" tone="blue" />
      <Stat icon={<Activity size={18} />} label="Em andamento" value={String(inProgress).padStart(2,"0")} change="Rascunhos e análises" tone="amber" />
      <Stat icon={<ShieldCheck size={18} />} label="Concluídos" value={String(projects.length-inProgress).padStart(2,"0")} change="Status registrado" tone="green" />
      <Stat icon={<Gauge size={18} />} label="Categorias" value="02" change="Móveis e fixos" tone="slate" />
    </div>
    <div className="dashboard-columns">
      <section className="surface recent-panel"><div className="surface-heading"><div><h3>Planos recentes</h3><p>Últimas operações registradas</p></div><button className="more-button" onClick={onViewAll}><MoreHorizontal size={19} /></button></div>
        <div className="project-table"><div className="table-head"><span>OPERAÇÃO</span><span>EQUIPAMENTO</span><span>STATUS</span><span /></div>
          {projects.slice(0,4).map((p) => <button className="project-row" key={p.id} onClick={() => onOpen(p)}><div className="project-name"><span className={"project-icon " + p.category}>{p.category === "mobile" ? <Truck size={16} /> : <Crane size={16} />}</span><span><strong>{p.name}</strong><small>{p.id} <i /> {p.client}</small></span></div><span className="equipment-cell">{p.equipment}</span><span><Status status={p.status} /></span><ChevronRight size={16} className="row-chevron" /></button>)}
          {projects.length === 0 && <div className="empty-state"><FolderKanban size={28} /><strong>Nenhum plano cadastrado</strong><span>Crie seu primeiro plano para começar.</span></div>}
        </div><div className="demo-footnote">Os registros iniciais são exemplos demonstrativos e podem ser substituídos pelos seus projetos.</div><button className="table-footer" onClick={onViewAll}>Acessar todos os planos <ArrowRight size={14} /></button>
      </section>
      <section className="surface quick-panel"><div className="surface-heading"><div><h3>Acesso rápido</h3><p>Comece por uma categoria</p></div><SlidersHorizontal size={17} className="muted-icon" /></div>
        <button className="quick-item" onClick={() => onCreate("mobile")}><span className="quick-icon mobile"><Truck size={19} /></span><span><strong>Guindastes móveis</strong><small>Telescópico, Munck e esteiras</small></span><ArrowRight size={15} /></button>
        <button className="quick-item" onClick={() => onCreate("fixed")}><span className="quick-icon fixed"><Crane size={19} /></span><span><strong>Guindastes fixos</strong><small>Ponte rolante, pórtico e coluna</small></span><ArrowRight size={15} /></button>
        <div className="quick-tip"><div><BookOpen size={16} /></div><p><strong>Biblioteca técnica</strong><br />Organize manuais, tabelas de carga e documentos dos equipamentos.</p></div>
      </section>
    </div>
    <div className="bottom-note"><ShieldCheck size={16} /><span>O Movimenta organiza informações e documentação. A validação técnica de cada operação deve ser realizada por profissional legalmente habilitado.</span></div>
  </div>;
}

function Stat({ icon, label, value, change, tone }: { icon: React.ReactNode; label: string; value: string; change: string; tone: string }) {
  return <div className="stat-card"><div className={"stat-icon " + tone}>{icon}</div><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><span className="stat-change">{change}</span></div>;
}

function Status({ status }: { status: Project["status"] }) {
  return <span className={"status-pill " + (status === "Concluído" ? "done" : status === "Em análise" ? "review" : "draft")}><i />{status}</span>;
}

function Projects({ projects, onCreate, onOpen, search }: { projects: Project[]; onCreate: () => void; onOpen: (p: Project) => void; search: string }) {
  return <div className="page">
    <div className="page-heading"><div><div className="eyebrow">GESTÃO DE OPERAÇÕES</div><h1>Meus planos</h1><p>Gerencie seus projetos de movimentação de cargas.</p></div><button className="btn-primary create-button" onClick={onCreate}><Plus size={17} /> Novo plano</button></div>
    <div className="list-toolbar"><div className="toolbar-title"><FolderKanban size={18} /><strong>Todos os planos</strong><span>{projects.length} registros</span></div><div className="toolbar-filter"><SlidersHorizontal size={15} /> Todos os status <ChevronDown size={14} /></div></div>
    <div className="surface projects-list"><div className="list-head"><span>IDENTIFICAÇÃO</span><span>MODALIDADE</span><span>EQUIPAMENTO</span><span>CARGA</span><span>STATUS</span><span /></div>
      {projects.map((p) => <button className="list-row" key={p.id} onClick={() => onOpen(p)}><div className="list-project"><span className={"project-icon " + p.category}>{p.category === "mobile" ? <Truck size={17} /> : <Crane size={17} />}</span><span><strong>{p.name}</strong><small>{p.id} · {p.client}</small></span></div><span className="modality-text">{p.category === "mobile" ? "Guindaste móvel" : "Guindaste fixo"}</span><span>{p.equipment}</span><span>{p.load}<small className="sub-value">{p.weight} kg</small></span><Status status={p.status} /><ChevronRight size={16} className="row-chevron" /></button>)}
      {projects.length === 0 && <div className="empty-state"><Search size={27} /><strong>{search ? "Nenhum resultado encontrado" : "Seu workspace está vazio"}</strong><span>{search ? "Tente buscar por outro termo." : "Crie seu primeiro plano de movimentação."}</span>{!search && <button className="btn-primary" onClick={onCreate}>Criar primeiro plano</button>}</div>}
    </div>
  </div>;
}

function Equipment() {
  return <div className="page">
    <div className="page-heading"><div><div className="eyebrow">CADASTRO E DOCUMENTAÇÃO</div><h1>Equipamentos</h1><p>Biblioteca inicial de categorias atendidas pelo Movimenta.</p></div><button className="btn-primary" onClick={() => alert("O cadastro detalhado de equipamentos será habilitado em uma próxima etapa.")}><Plus size={16} /> Adicionar equipamento</button></div>
    <div className="equipment-intro"><div><div className="intro-icon"><HardHat size={21} /></div><h2>Biblioteca de equipamentos</h2><p>Organize os equipamentos por modalidade. O cadastro de modelos, tabelas de carga e documentos do fabricante será desenvolvido na próxima etapa.</p></div><span className="library-badge">ESTRUTURA INICIAL</span></div>
    <div className="equipment-section"><div className="equipment-section-title"><div><span className="section-number">01</span><div><h3>Guindastes móveis</h3><p>Equipamentos com posicionamento e configuração variáveis.</p></div></div><span>03 CATEGORIAS</span></div><div className="equipment-cards">{equipmentGroups.mobile.map((e) => <EquipmentCard key={e.name} name={e.name} detail={e.detail} icon={e.icon} />)}</div></div>
    <div className="equipment-section"><div className="equipment-section-title"><div><span className="section-number">02</span><div><h3>Guindastes fixos</h3><p>Equipamentos instalados em posição de operação definida.</p></div></div><span>04 CATEGORIAS</span></div><div className="equipment-cards">{equipmentGroups.fixed.map((e) => <EquipmentCard key={e.name} name={e.name} detail={e.detail} icon={e.icon} />)}</div></div>
    <div className="bottom-note"><BookOpen size={16} /><span>Os equipamentos listados representam categorias de cadastro. A capacidade operacional depende da identificação e documentação específica de cada equipamento.</span></div>
  </div>;
}

function EquipmentCard({ name, detail, icon }: { name: string; detail: string; icon: string }) {
  return <div className="equipment-card"><div className="equipment-card-icon">{icon === "truck" ? <Truck size={21} /> : icon === "wrench" ? <Wrench size={21} /> : <Crane size={21} />}</div><div><strong>{name}</strong><span>{detail}</span></div><span className="equipment-card-arrow"><ChevronRight size={16} /></span></div>;
}

function ReviewGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="review-group"><h4>{title}</h4><div className="review-grid">{children}</div></div>;
}
function ReviewItem({ label, value }: { label: string; value: string }) {
  return <div className="review-item"><span>{label}</span><strong>{value || "Não informado"}</strong></div>;
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return <div className="modal-backdrop detail-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><div className="detail-modal"><div className="detail-header"><div><span className="eyebrow">DETALHES DO PROJETO · {project.id}</span><h2>{project.name}</h2></div><button className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="detail-status"><Status status={project.status} /><span>Criado em {project.date}</span></div><div className="detail-grid"><ReviewItem label="Cliente" value={project.client} /><ReviewItem label="Local" value={project.location} /><ReviewItem label="Modalidade" value={project.category === "mobile" ? "Guindaste móvel" : "Guindaste fixo"} /><ReviewItem label="Equipamento" value={project.equipment} /><ReviewItem label="Carga" value={project.load} /><ReviewItem label="Peso informado" value={project.weight + " kg"} /></div><div className="engineering-disclaimer"><ShieldCheck size={17} /><p>Registro de dados preliminares. Este cadastro não substitui o plano técnico validado, os cálculos aplicáveis ou a documentação do fabricante.</p></div><div className="detail-actions"><button className="btn-secondary" onClick={onClose}>Fechar</button><button className="btn-primary" onClick={() => window.print()}><Download size={15} /> Imprimir resumo</button></div></div></div>;
}

export default App;
