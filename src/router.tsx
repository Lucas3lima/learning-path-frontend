import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// aqui depois você pode injetar auth, api, etc
export const router = createRouter({
  routeTree,
  context: {},
})

// necessário para tipagem global
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
