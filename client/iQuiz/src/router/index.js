import Vue from 'vue'
import Router from 'vue-router'

// import AddEvent from '@/components/AddEvent'
// import ShowAllEvents from '@/components/ShowAllEvents/index'
// import ShowEvent from '@/components/ShowEvent'

import ShowAllQuestions from '@/components/Admin/QuestionManagement/QuestionAdmin'
// import EditQuestion from '@/components/QuestionForm/EditQuestion'

// import AddQuiz from '@/components/AddQuiz'
// import Qrcode from '@/components/modules/qrcode'

import About from '@/components/About'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Register from '@/components/Register'

import Dashboard from '@/components/Admin/Dashboard'
import ShowAllUsers from '@/components/Admin/UserManagement/UserAdmin'

import AccessDenied from '@/components/Errors/AccessDenied'
import Error404 from '@/components/Errors/Error404'
import RequestTimedOut from '@/components/Errors/RequestTimedOut'
import Error from '@/components/Errors/Error'

import Feedback from '@/components/User/Feedback/Feedback'
import Quiz from '@/components/User/Quiz/Quiz'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '*',
      redirect: '404'
    },
    {
      path:'/404',
      name:'Error404',
      component: Error404
    },
    {
      path: '/timedout',
      name: 'RequestTimedOut',
      component: RequestTimedOut
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },

    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      }
    },   
    {
      path: '/about',
      name: 'About',
      component: About
    },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { 
        requiresAuth: true,
        is_admin : true
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: ShowAllUsers,
      meta: { 
        requiresAuth: true,
        is_admin : true
      }
    },
    {
      path: '/questions',
      name: 'Questions',
      component: ShowAllQuestions,
      meta: { 
        requiresAuth: true,
        is_admin : true
      }
    },

    // {
    //   path: '/questions/edit/:id',
    //   name: 'EditQuestion',
    //   component: EditQuestion,
    //   meta: { 
    //     requiresAuth: true,
    //     is_admin : true
    //   }
    // },
    
    // {
    //   path: '/addevent',
    //   name: 'AddEvent',
    //   component: AddEvent,
    //   meta: { 
    //     requiresAuth: true,
    //     is_admin : true
    //   }      
    // },
    // {
    //   path: '/events',
    //   name: 'ShowAllEvents',
    //   component: ShowAllEvents,
    //   meta: { 
    //     requiresAuth: true,
    //     is_admin : true
    //   }  
    // },
    
    // {
    //   path: '/event/:id',
    //   name: 'ShowEvent',
    //   component: ShowEvent
    // },

    // {
    //   path: '/event/:id/addquiz',
    //   name: 'AddQuiz',
    //   component: AddQuiz
    // },
    // {
    //   path: '/qrcode',
    //   name: 'Qrcode',
    //   component: Qrcode
    // },
    {
      path: '/validate/:quizID/:id',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/quiz/:id',
      name: 'Quiz',
      component: Quiz,      
      meta: { 
        requiresAuth: true
      }
    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { 
        requiresAuth: true
      }
    },

    {
      path: '/denied',
      name: 'Denied',
      component: AccessDenied
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
        next({path: '/login'})
    } 
    else {
      let user = JSON.parse(localStorage.getItem('user'))
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.admin == true){
          next()
        }
        else{
          next({ name: 'Denied'})
        }
      }
      else {
        next()
      }
    }
  }
  else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('jwt') === null){
      next()
    }
    else{
      next({ name: 'ShowAllEvents'})
    }
  }
  else {
    next() 
  }
})

export default router