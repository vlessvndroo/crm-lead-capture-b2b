import LeadForm from './components/LeadForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto w-full text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Potencia tus Ventas B2B
        </h1>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
          Integramos automatización y estrategias de crecimiento para escalar tu negocio sin esfuerzo manual.
        </p>
      </div>
      
      <div className="w-full">
        <LeadForm />
      </div>
    </div>
  );
}

export default App;