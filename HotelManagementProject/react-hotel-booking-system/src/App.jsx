// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Home,
  Error,
  Landing,
  Elements,
  About,
  Blog,
  BlogSingle,
  ContactUs,
  HotelV1,
  HotelV2,
  HotelV3,
  HotelV4,
  HotelRoom,
  HotelRoomSpecialOffer,
  Payment,
  SearchResult,
  SearchResultV2,
  SearchResultV3,
  SearchRooms,
  Thanks,
  UserProfile,
  SignIn,
  SignUp,
  Login,
  Register,
  Hotels,
  Hotel
} from './pages'
import AdminPage from './pages/Admin'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem('token')
)

useEffect(() => {
  const token = localStorage.getItem('token')
  if (token) {
    setIsLoggedIn(true)
  }
  else {
    setIsLoggedIn(false)
  }
}, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home isLoggedIn={isLoggedIn} />,
    //  errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Landing />
        },
        {
          path: 'hotels',
          element: <Hotels />
        },
        {
          path: 'hotel',
          element: <Hotel />
        },
        {
          path: 'elements',
          element: <Elements />
        },
        {
          path: 'about-us',
          element: <About />
        },
        {
          path: 'blog-index',
          element: <Blog />
        },
        {
          path: 'blog-single',
          element: <BlogSingle />
        },
        {
          path: 'contact-us',
          element: <ContactUs />
        },
        {
          path: 'hotel-page-v1',
          element: <HotelV1 />
        },
        {
          path: 'hotel-page-v2',
          element: <HotelV2 />
        },
        {
          path: 'hotel-page-v3',
          element: <HotelV3 />
        },
        {
          path: 'hotel-page-v4',
          element: <HotelV4 />
        },
        {
          path: 'hotel-room-page',
          element: <HotelRoom />
        },
        {
          path: 'hotel-room-page-special-offer',
          element: <HotelRoomSpecialOffer />
        },
        {
          path: 'payment',
          element: <Payment />
        },
        {
          path: 'search-result',
          element: <SearchResult />
        },
        {
          path: 'search-result-v-2',
          element: <SearchResultV2 />
        },
        {
          path: 'search-result-v-3',
          element: <SearchResultV3 />
        },
        {
          path: 'search-rooms',
          element: <SearchRooms />
        },
        {
          path: 'thanks-page',
          element: <Thanks />
        },
        {
          path: 'user-page',
          element: <UserProfile />
        },
        {
          path: 'sign-in',
          element: <SignIn />
        },
        {
          path: 'sign-up',
          element: <SignUp  />
        },
        {
          path: 'login',
          element: <Login setIsLoggedIn={setIsLoggedIn} />
        },
        {
          path: 'register',
          element: <Register setIsLoggedIn={setIsLoggedIn} />
        },
        {
          path: 'admin-page',
          element: (
            <PrivateRoute role="ADMIN">
              <AdminPage />
            </PrivateRoute>
          )
        },
        {
          path: '404-page',
          element: <Error />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
