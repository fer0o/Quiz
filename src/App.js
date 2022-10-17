import preguntas from './preguntas/preguntas'

import { useState, useEffect } from 'react'
function App () {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [tiempoRestante, setTiempoRestante] = useState(60)
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
    }, 100)
  }
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante(prev => prev - 1)
      if (tiempoRestante === 0) setDesabilitado(true)
    }, 1000)
    return () => clearInterval(intervalo)
  }, [tiempoRestante])
  //finish de las preguntas, mostrar el marcador
  if (isFinished)
    return (
      <div className=' grid grid-rows-2 border-2 border-black p-8 m-8 gap-5'>
        <span className='flex justify-center text-3xl font-bold'>
          Obtuviste {puntuacion} de {preguntas.length}
        </span>
        <div className='space-y-4 lg: flex flex-col items-center'>
          <button
            className=' border-2 border-black bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 hover:text-black w-full  lg:w-96  '
            onClick={() => (window.location.href = '/')}
          >
            Volver a Jugar
          </button>
          <button
            className=' border-2 border-black bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 hover:text-black w-full lg:w-96 '
            onClick={() => {
              setIsFinished(false)
              setMostrarRespuestas(true)
              setPreguntaActual(0)
            }}
          >
            Ver Respuestas
          </button>
        </div>
      </div>
    )
  //return de mostrar respuestas
  if (mostrarRespuestas)
    return (
      <div className='grid grid-rows-3 border-2 border-black p-8 m-8 gap-5'>
        <span className='block text-center text-2xl font-semibold'>
          pregunta {preguntaActual + 1} de {preguntas.length}{' '}
        </span>
        <span className='block text-center text-3xl'>
          {preguntas[preguntaActual].titulo}
        </span>
        <div>
          <span className='block text-center text-2xl font-extrabold'>
            {
              preguntas[preguntaActual].opciones.filter(
                opcion => opcion.isCorrect
              )[0].textoRespuesta
            }
          </span>
        </div>
        <div className='flex justify-center'>
          <button
            className='border-2 border-black bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 hover:text-black w-full lg:w-96 '
            onClick={() => {
              if (preguntaActual === preguntas.length - 1) {
                window.location.href = '/'
              } else {
                setPreguntaActual(preguntaActual + 1)
              }
            }}
          >
            {preguntaActual === preguntas.length - 1
              ? 'Voler a jugar'
              : 'Siguiente'}
          </button>
        </div>
      </div>
    )
  return (
    //return principal
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 border-2 border-black border-l-2 m-8 p-8'>
        {/* lado izquierdo */}
        <div className='block text-center mx-auto space-y-8 p-4'>
          <span>Tienes Tiempo limitado para responder todas las preguntas</span>
          <span className='text-2xl font-bold block text-center '>
            pregunta {preguntaActual + 1} de {preguntas.length}
          </span>

          <div className='text-3xl block text-center'>
            {preguntas[preguntaActual].titulo}
          </div>
          <div>
            {!desabilitado ? (
              <span className='text-xl font-extrabold'>
                Tiempo restante: {tiempoRestante}
              </span>
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
        <div className=' p-4 h-full'>
          <div className=' flex flex-col gap-5 lg:w-96 m-auto '>
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
