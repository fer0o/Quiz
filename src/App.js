import preguntas from './preguntas/preguntas'

import { useState, useEffect } from 'react'
function App () {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [tiempoRestante, setTiempoRestante] = useState(10)
  const [desabilitado, setDesabilitado] = useState(false)
  const [mostrarRespuestas, setMostrarRespuestas] = useState(false)
  // const correct = classNames('bg-green-500 text-white')
  // const incorrect = classNames('bg-red-500 text-white')

  const handleAnswerSubmit = (isCorrect, e) => {
    //añadir puntuacion
    if (isCorrect) setPuntuacion(puntuacion + 1)
    console.log(puntuacion)

    //añadir estilos
    //e.target.classList.add(isCorrect ? 'correct' : 'incorrect')
    //cambiar siguiente pregunta
    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true)
      } else {
        setPreguntaActual(preguntaActual + 1)
      }
    }, 1500)
  }
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante(prev => prev - 1)
      if (tiempoRestante === 0) setDesabilitado(true)
    }, 1000)
    return () => clearInterval(intervalo)
  }, [tiempoRestante])
  if (isFinished)
    return (
      <div className='container mx-auto block my-48 border-2 border-black'>
        <span className='flex justify-center'>
          Obtuviste {puntuacion} de {preguntas.length}
        </span>
        <button
          className=' border-2 border-black bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 hover:text-black w-auto '
          onClick={() => (window.location.href = '/')}
        >
          Volver a Jugar
        </button>
      </div>
    )
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 border-2 border-black m-4'>
        <div>
          {/* lado izquierdo */}
          <div>
            <span>pregunta {preguntaActual + 1} de </span> {preguntas.length}
          </div>
          <div>{preguntas[preguntaActual].titulo}</div>
          <div>
            {!desabilitado ? (
              <span>Tiempo restante {tiempoRestante}</span>
            ) : (
              <button
                onClick={() => {
                  setTiempoRestante(10)
                  setDesabilitado(false)
                  setPreguntaActual(preguntaActual + 1)
                }}
                className=' border-2 border-black bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 hover:text-black'
              >
                Continuar
              </button>
            )}
          </div>
        </div>
        {/* lado derecho */}
        <div className='border-t-2 lg:border-l-2  p-4 h-full'>
          <div className=' flex flex-col gap-5 w-96 m-auto '>
            {preguntas[preguntaActual].opciones.map((respuesta, idx) => (
              <button
                disabled={desabilitado}
                key={idx}
                className={` border-2 border-black bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 hover:text-black  `}
                onClick={e => handleAnswerSubmit(respuesta.isCorrect, e)}
              >
                {respuesta.textoRespuesta}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
