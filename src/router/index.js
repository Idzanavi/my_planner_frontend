import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Edit from '../views/Edit.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import Register from '../views/Register.vue'
import Chats from '../views/Chats.vue'
import Chat from '../views/Chat.vue'
import ChatUsers from '../views/ChatUsers.vue'
import Task from '../views/Task.vue'
import Tasks from '../views/Tasks.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CurUser',
    component: User
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/user/:id',
    name: 'UserId',
    component: User
  },
  {
    path: '/chat',
    name: 'Chats',
    component: Chats
  },
  {
    path: '/chat/:room',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/chat-users',
    name: 'ChatUsers',
    component: ChatUsers
  },
  {
    path: '/task',
    name: 'Task',
    component: Task
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
