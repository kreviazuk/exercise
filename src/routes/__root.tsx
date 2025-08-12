import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>
          首页
        </Link>
        <Link to="/about" style={{ marginRight: '1rem' }}>
          关于我们
        </Link>
        <Link to="/products" style={{ marginRight: '1rem' }}>
          产品
        </Link>
        <Link to="/contact" style={{ marginRight: '1rem' }}>
          联系我们
        </Link>
      </nav>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  )
}