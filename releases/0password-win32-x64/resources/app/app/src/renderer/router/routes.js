const Login = resolve => {
  import('@/views/login').then(module => {
    resolve(module)
  })
}

const Index = resolve => {
  import('@/views/index/index').then(module => {
    resolve(module)
  })
}

const Signup = resolve => {
  import('@/views/signup').then(module => {
    resolve(module)
  })
}

const routes = [
  {
    // path: '/main',
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signup_page',
    name: 'signup_page',
    component: Signup
  },
  {
    path: '*',
    redirect: '/computer'
  }
]

export default routes
