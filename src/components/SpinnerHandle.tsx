
function SpinnerHandle() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lime-300 font-black uppercase text-xs tracking-wider animate-pulse">
        Cargando Enlaces...
      </p>
    </div>
  )
}

export default SpinnerHandle