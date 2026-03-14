import { setupWorker } from 'msw/browser'

// Handlers
import { handlerAuth } from '@db/auth/index'

// export default function () {
//   // Ensure handlerAuth is an array
//   const handlers = Array.isArray(handlerAuth) ? handlerAuth : [handlerAuth]

//   const worker = setupWorker(...handlers)

//   const workerUrl = `${import.meta.env.BASE_URL.replace(/build\/$/g, '') ?? '/'}mockServiceWorker.js`

//   worker.start({
//     serviceWorker: {
//       url: workerUrl,
//     },
//     onUnhandledRequest: 'bypass',
//   })
// }

const worker = setupWorker(
  ...handlerAuth,
)

export default function () {
  const workerUrl = `${import.meta.env.BASE_URL.replace(/build\/$/g, '') ?? '/'}mockServiceWorker.js`

  worker.start({
    serviceWorker: {
      url: workerUrl,
    },
    onUnhandledRequest: 'bypass',
  })
}
