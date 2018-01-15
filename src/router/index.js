import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import HelloWorld from '@/components/HelloWorld'



import Lesson from '@/pages/Course/Lesson'
import Open from '@/pages/Course/Open'
import Boutique from '@/pages/Course/Boutique'
import All from '@/pages/Course/All'


import Course from 'pages/Course/Course'
import AudioList from 'pages/Course/AudioList'
import Teacher from 'pages/Teacher/Teacher'
import Login from 'pages/Login/Login'

import User from 'pages/User/User'
import MySelf from 'pages/User/MySelf'
import About from 'pages/User/About'
import UserInfo from 'pages/User/UserInfo'
import FeedBack from 'pages/User/FeedBack'
import Terms from 'pages/User/Terms'

import Pay from 'pages/Pay/Pay'

import Entry from 'pages/Entry/Entry'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      component: Entry
    },
    {
      path: '/lesson',
      name: 'Lesson',
      component: Lesson,
      redirect: '/lesson/all',
      children:[
          {path: 'open',component: Open,
          	  meta: {
		        	keepAlive: false // 需要被缓存
		     	 	}		
          },
          {path: 'boutique',component: Boutique,
	          meta:{
			        keepAlive:false // 需要被缓存
			      }		
          },
          {path: 'all',component: All,     
          	meta:{
		        keepAlive: false // 需要被缓存
		      }}			    
      ]
    },
    {
      path: '/course/:id',
      name: 'course',
      component: Course,
    },  
    {
      path: '/audiolist',
      name: 'audiolist',
      component: AudioList
    },
    {
      path: '/teacher/:id',
      name: 'teacher',
      component: Teacher
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      redirect: '/user/myself',
      children: [
        {
          path: 'myself',
          name: 'myself',
          component: MySelf
        },
        {
          path: 'model',
          name: 'model',
          component: (resolve) => {
            require(['pages/User/Model'], resolve)
          }
        },
        {
          path: 'about',
          name: 'about',
          component: About
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: UserInfo
        },
        {
          path: 'mylearned',
          name: 'mylearned',
          component: (resolve) => {
            require(['pages/User/MyLearned'], resolve)
          }
        },
        {
          path: 'mypurchase',
          name: 'mypurchase',
          component: (resolve) => {
            require(['pages/User/MyPurchase'], resolve)
          }
        },
        {
          path: 'mycollection',
          name: 'mycollection',
          component: (resolve) => {
            require(['pages/User/MyCollection'], resolve)
          }
        },
        {
          path: 'myPlayed',
          name: 'myPlayed',
          component: (resolve) => {
            require(['pages/User/MyPlayed'], resolve)
          }
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: (resolve) => {
            require(['pages/User/FeedBack'], resolve)
          }
        },
        {
          path: 'terms',
          name: 'terms',
          component: (resolve) => {
            require(['pages/User/Terms'], resolve)
          }
        }        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    }  
  ]
})
