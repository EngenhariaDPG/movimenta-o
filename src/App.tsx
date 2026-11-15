import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, ClipboardList, Crane,
  Download, FileText, HardHat, Info, Layers3, Plus, ShieldCheck,
  Truck, Weight, Wrench
} from "lucide-react";

type Category = "mobile" | "fixed";
type Step = 0 | 1 | 2 | 3 | 4;

type Project = {
  title: string;
  client: string;
  location: string;
  equipmentType: string;
  equipmentModel: string;
  capacity: string;
  loadName: string;
  loadWeight: string;
  length: string;
  width: string;
  height: string;
  centerOfGravity: string;
  liftHeight: string;
  radius: string;
  route: string;
  ground: string;
  accessories: string;
  notes: string;
};

const initialProject: Project = {
  title: "", client: "", location: "", equipmentType: "", equipmentModel: "",
  capacity: "", loadName: "", loadWeight: "", length: "", width: "", height: "",
  centerOfGravity: "", liftHeight: "", radius: "", route: "", ground: "",
  accessories: "", notes: "",
};

const steps = ["Modalidade", "Projeto", "Carga", "Operação", "Resumo"];

function App() {
  const [step, setStep] = useState<Step>(0);
  const [category, setCategory] = useState<Category | null>(null);
  const [project, setProject] = useState<Project>(initialProject);

  const update = (key: keyof Project, value: string) =>
    setProject((current) => ({ ...current, [key]: value }));

  const equipmentOptions = category === "mobile"
    ? ["Guindaste telescópico sobre pneus", "Guindaste veicular (Munck)", "Guindaste sobre esteiras"]
    : ["Ponte rolante", "Pórtico rolante", "Guindaste de coluna", "Guindaste de parede"];

  const canContinue = useMemo(() => {
    if (step === 0) return category !== null;
    if (step === 1) return Boolean(project.title.trim() && project.location.trim() && project.equipmentType);
    if (step === 2) return Boolean(project.loadName.trim() && Number(project.loadWeight) > 0);
    if (step === 3) return true;
    return true;
  }, [step, category, project]);

  const changeCategory = (value: Category) => {
    setCategory(value);
    setProject((p) => ({ ...p, equipmentType: "", equipmentModel: "", capacity: "" }));
  };

  const printPlan = () => window.print();

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setStep(0); }}>
          <span className="brand-mark"><Layers3 size={21} /></span>
          <span>MOVIMENTA<span className="brand-dot">.</span><small>ENGENHARIA DE IÇAMENTO</small></span>
        </a>
        <div className="topbar-right"><span className="status-dot" /> MVP • VERSÃO 0.1</div>
      </header>

      <main className="main-wrap">
        <section className="hero">
          <div className="eyebrow"><span /> PLANEJAMENTO DE MOVIMENTAÇÃO DE CARGAS</div>
          <h1>Planeje com método.<br /><em>Movimente com segurança.</em></h1>
          <p>Configure a operação, organize os dados técnicos e estruture seu plano de movimentação em um único lugar.</p>
        </section>

        <section className="workspace">
          <aside className="sidebar">
            <div className="sidebar-label">NOVO PLANO</div>
            <div className="step-list">
              {steps.map((label, index) => (
                <button key={label} className={`step-link ${step === index ? "active" : ""} ${step > index ? "done" : ""}`}
                  onClick={() => { if (index <= step || (index === 0 && category)) setStep(index as Step); }}>
                  <span className="step-number">{step > index ? <Check size={14} /> : `0${index + 1}`}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="sidebar-note">
              <ShieldCheck size={18} />
              <div><strong>Rastreabilidade técnica</strong><span>Dados e premissas organizados para análise do responsável técnico.</span></div>
            </div>
          </aside>

          <section className="form-panel">
            <div className="panel-head">
              <div>
                <div className="panel-kicker">ETAPA {step + 1} DE 5</div>
                <h2>{["Escolha a modalidade", "Identificação do projeto", "Caracterização da carga", "Condições da operação", "Revisão do plano"][step]}</h2>
                <p>{[
                  "Selecione o grupo de equipamento que será utilizado na movimentação.",
                  "Identifique a operação e informe o equipamento principal.",
                  "Informe as características fundamentais da carga a ser movimentada.",
                  "Registre os parâmetros de execução e os acessórios previstos.",
                  "Confira as informações reunidas antes de imprimir o resumo técnico."
                ][step]}</p>
              </div>
              <div className="panel-icon">{[<Crane />, <ClipboardList />, <Weight />, <Wrench />, <FileText />][step]}</div>
            </div>

            {step === 0 && <div className="category-grid">
              <button className={`category-card ${category === "mobile" ? "selected" : ""}`} onClick={() => changeCategory("mobile")}>
                <div className="category-art mobile-art"><Truck size={42} strokeWidth={1.4} /></div>
                <div className="category-content"><span className="category-tag">CATEGORIA A</span><h3>Guindastes móveis</h3><p>Equipamentos posicionados no local da operação, com configuração variável de lança e apoio.</p>
                  <ul><li>Guindaste telescópico</li><li>Munck / guindauto</li><li>Guindaste sobre esteiras</li></ul>
                </div><span className="select-indicator">{category === "mobile" ? <Check size={16} /> : <Plus size={16} />}</span>
              </button>
              <button className={`category-card ${category === "fixed" ? "selected" : ""}`} onClick={() => changeCategory("fixed")}>
                <div className="category-art fixed-art"><Crane size={42} strokeWidth={1.4} /></div>
                <div className="category-content"><span className="category-tag">CATEGORIA B</span><h3>Guindastes fixos</h3><p>Equipamentos instalados em posição definida, com trajetória de movimentação determinada.</p>
                  <ul><li>Ponte rolante</li><li>Pórtico rolante</li><li>Coluna / parede</li></ul>
                </div><span className="select-indicator">{category === "fixed" ? <Check size={16} /> : <Plus size={16} />}</span>
              </button>
            </div>}

            {step === 1 && <div className="fields">
              <div className="field full"><label>Nome do plano / operação *</label><input value={project.title} onChange={(e) => update("title", e.target.value)} placeholder="Ex.: Içamento de conjunto motobomba" /></div>
              <div className="field"><label>Empresa / cliente</label><input value={project.client} onChange={(e) => update("client", e.target.value)} placeholder="Nome da empresa" /></div>
              <div className="field"><label>Local da operação *</label><input value={project.location} onChange={(e) => update("location", e.target.value)} placeholder="Cidade, unidade ou endereço" /></div>
              <div className="field"><label>Tipo de equipamento *</label><select value={project.equipmentType} onChange={(e) => update("equipmentType", e.target.value)}><option value="">Selecione...</option>{equipmentOptions.map((x) => <option key={x}>{x}</option>)}</select><ChevronDown className="select-chevron" size={15} /></div>
              <div className="field"><label>Fabricante / modelo</label><input value={project.equipmentModel} onChange={(e) => update("equipmentModel", e.target.value)} placeholder="Ex.: fabricante e modelo" /></div>
              <div className="field"><label>Capacidade nominal (t)</label><input type="number" min="0" value={project.capacity} onChange={(e) => update("capacity", e.target.value)} placeholder="Ex.: 30" /></div>
              <div className="field-hint"><Info size={15} /> A capacidade nominal não representa, isoladamente, a capacidade disponível na configuração real de trabalho. Consulte os dados do fabricante.</div>
            </div>}

            {step === 2 && <div className="fields">
              <div className="field full"><label>Identificação da carga *</label><input value={project.loadName} onChange={(e) => update("loadName", e.target.value)} placeholder="Ex.: Transformador, máquina, estrutura metálica..." /></div>
              <div className="field"><label>Peso total (kg) *</label><input type="number" min="0" value={project.loadWeight} onChange={(e) => update("loadWeight", e.target.value)} placeholder="Peso conhecido da carga" /></div>
              <div className="field"><label>Centro de gravidade</label><input value={project.centerOfGravity} onChange={(e) => update("centerOfGravity", e.target.value)} placeholder="Posição / referência conhecida" /></div>
              <div className="field"><label>Comprimento (m)</label><input type="number" min="0" value={project.length} onChange={(e) => update("length", e.target.value)} placeholder="0,00" /></div>
              <div className="field"><label>Largura (m)</label><input type="number" min="0" value={project.width} onChange={(e) => update("width", e.target.value)} placeholder="0,00" /></div>
              <div className="field"><label>Altura (m)</label><input type="number" min="0" value={project.height} onChange={(e) => update("height", e.target.value)} placeholder="0,00" /></div>
              <div className="field full"><label>Pontos de içamento / observações sobre a carga</label><textarea value={project.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Informe pontos de pega, olhais, restrições, fragilidade ou outras características relevantes." rows={3} /></div>
            </div>}

            {step === 3 && <div className="fields">
              <div className="field"><label>Altura de içamento (m)</label><input type="number" min="0" value={project.liftHeight} onChange={(e) => update("liftHeight", e.target.value)} placeholder="0,00" /></div>
              <div className="field"><label>Raio de operação (m)</label><input type="number" min="0" value={project.radius} onChange={(e) => update("radius", e.target.value)} placeholder="0,00" /></div>
              <div className="field full"><label>Percurso / destino da carga</label><textarea value={project.route} onChange={(e) => update("route", e.target.value)} placeholder="Descreva origem, destino, interferências e trajetória prevista." rows={3} /></div>
              <div className="field full"><label>Condições do piso / estrutura de apoio</label><textarea value={project.ground} onChange={(e) => update("ground", e.target.value)} placeholder="Piso, terreno, patolamento, estrutura de sustentação, nivelamento etc." rows={3} /></div>
              <div className="field full"><label>Acessórios de içamento previstos</label><textarea value={project.accessories} onChange={(e) => update("accessories", e.target.value)} placeholder="Cintas, cabos, correntes, manilhas, balancim, ganchos..." rows={3} /></div>
              <div className="field-hint"><Info size={15} /> Os parâmetros informados serão organizados no relatório. A validação das capacidades e condições de uso exige documentação técnica aplicável.</div>
            </div>}

            {step === 4 && <div className="review">
              <div className="review-banner"><ShieldCheck size={22} /><div><strong>Dados reunidos para revisão</strong><span>Este resumo é um registro preliminar, não uma autorização de içamento.</span></div></div>
              <div className="review-section"><h4>MODALIDADE E PROJETO</h4><div className="review-grid">
                <Review label="Modalidade" value={category === "mobile" ? "Guindaste móvel" : "Guindaste fixo"} />
                <Review label="Operação" value={project.title} /><Review label="Cliente" value={project.client} /><Review label="Local" value={project.location} />
                <Review label="Equipamento" value={project.equipmentType} /><Review label="Fabricante / modelo" value={project.equipmentModel} /><Review label="Capacidade nominal" value={project.capacity ? project.capacity + " t" : ""} />
              </div></div>
              <div className="review-section"><h4>CARACTERIZAÇÃO DA CARGA</h4><div className="review-grid">
                <Review label="Carga" value={project.loadName} /><Review label="Peso" value={project.loadWeight ? Number(project.loadWeight).toLocaleString("pt-BR") + " kg" : ""} />
                <Review label="Dimensões (C × L × A)" value={[project.length, project.width, project.height].some(Boolean) ? [project.length, project.width, project.height].map(v => v || "—").join(" × ") + " m" : ""} />
                <Review label="Centro de gravidade" value={project.centerOfGravity} />
              </div></div>
              <div className="review-section"><h4>CONDIÇÕES DA OPERAÇÃO</h4><div className="review-grid">
                <Review label="Altura de içamento" value={project.liftHeight ? project.liftHeight + " m" : ""} /><Review label="Raio de operação" value={project.radius ? project.radius + " m" : ""} />
                <Review label="Percurso / destino" value={project.route} /><Review label="Piso / estrutura" value={project.ground} /><Review label="Acessórios" value={project.accessories} />
              </div></div>
              <div className="technical-warning"><Info size={18} /><p><strong>Limite desta versão:</strong> o Movimenta ainda não executa dimensionamento, cálculo de capacidade ou validação automática de estabilidade. Nenhum resultado deste protótipo deve ser utilizado para liberar uma operação. A análise deve ser realizada por profissional legalmente habilitado, com consulta aos manuais, tabelas de carga, normas e condições reais do local.</p></div>
            </div>}

            <div className="form-footer">
              <button className="btn-ghost" onClick={() => setStep((Math.max(0, step - 1)) as Step)} disabled={step === 0}><ArrowLeft size={16} /> Voltar</button>
              {step < 4 ? <button className="btn-primary" disabled={!canContinue} onClick={() => setStep((step + 1) as Step)}>Continuar <ArrowRight size={16} /></button> :
                <button className="btn-primary" onClick={printPlan}><Download size={16} /> Imprimir / salvar PDF</button>}
            </div>
          </section>
        </section>

        <footer className="page-footer"><span>© 2026 MOVIMENTA • PLATAFORMA DE ENGENHARIA</span><span>Estruturação técnica de planos de movimentação</span></footer>
      </main>
    </div>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return <div className="review-item"><span>{label}</span><strong>{value || "Não informado"}</strong></div>;
}

export default App;