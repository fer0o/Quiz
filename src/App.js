import preguntas from './preguntas/preguntas'
import { useState, useEffect } from 'react'
function App () {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  // const answer = classNames ({
  //   'bg-green-500 text-white':correct
  //   'bg-red-500 text-white':incorrect
  // })

  const handleAnswerSubmit = (isCorrect, e) => {
    //añadir puntuacion
    if (isCorrect) setPuntuacion(puntuacion + 1)

    //añadir estilos
    // e.target.classList.add(isCorrect ? 'correct' : 'incorrect')
    //cambiar siguiente pregunta
  }
  return (
    <div>
      <div className='grid grid-cols-2 border-2 border-black m-4'>
        <div>
          {/* lado izquierdo */}
          <div>
            <span>pregunta {preguntaActual + 1} de </span> {preguntas.length}
          </div>
          <div>{preguntas[preguntaActual].titulo}</div>
        </div>
        {/* lado derecho */}
        <div className='border-l-2 border-black p-4'>
          <div className=' flex flex-col gap-5 w-96 m-auto '>
            {preguntas[preguntaActual].opciones.map((respuesta, idx) => (
              <button
                key={idx}
                className=' border-2 border-black bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 hover:text-black  '
                onClick={e => handleAnswerSubmit(e, respuesta.isCorrect)}
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
