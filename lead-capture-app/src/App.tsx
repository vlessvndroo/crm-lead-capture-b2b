import LeadForm from './components/LeadForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* 1. Header / Navbar */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              ⚡
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">LeadFlow B2B</span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200/60">
                Pipeline v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Make.com Webhook Active
            </div>
            <a
              href="https://github.com/vlessvndroo/crm-lead-capture-b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero & Main Section */}
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <span>🚀</span> RevOps & Speed-to-Lead Automation
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Captación, Calificación y Triaje de <span className="text-blue-600">Leads B2B</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Sistema serverless conectado a <strong className="text-slate-800 font-semibold">Make.com</strong>. Clasifica prospectos según presupuesto (criterio BANT), sincroniza con <strong className="text-slate-800 font-semibold">Google Sheets</strong> y despacha alertas push instantáneas a <strong className="text-slate-800 font-semibold">Telegram</strong> para oportunidades prioritarias.
          </p>

          {/* 3 Impact Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto text-left">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-2xl font-bold text-blue-600">⚡ &lt; 2 min</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">Speed to Lead</p>
              <p className="text-xs text-slate-500 mt-1">Alerta push en Telegram para prospectos $5,000+</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-2xl font-bold text-emerald-600">🎯 100%</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">Triaje Automático</p>
              <p className="text-xs text-slate-500 mt-1">Enrutamiento condicional por capacidad de inversión</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-2xl font-bold text-indigo-600">📊 0s</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">Latencia en CRM</p>
              <p className="text-xs text-slate-500 mt-1">Ingesta asíncrona de datos limpios a Google Sheets</p>
            </div>
          </div>
        </div>

        {/* Lead Form Component */}
        <div className="w-full">
          <LeadForm />
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">LeadFlow B2B Engine</span>
            <span>•</span>
            <span>Construido con React 19, TypeScript, Tailwind CSS & Make.com</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vlessvndroo/crm-lead-capture-b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Repositorio GitHub
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;