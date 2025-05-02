import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class ApiService {
  static BASE_URL = 'http://localhost:8080/api'

  static getHeader () {
    const token = localStorage.getItem('token')
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  /**AUTH */

  /* This  register a new user */
  static async registerUser (registration) {
    const response = await axios.post(
      `${this.BASE_URL}/v1/auth/register`,
      registration
    )
    return response.data
  }

  /* This  login a registered user */
  static async loginUser (loginDetails) {
    const response = await axios.post(
      `${this.BASE_URL}/v1/auth/authenticate`,
      loginDetails
    )
    return response.data
  }

  /***USERS */

  /*  This is  to get the user profile */
  static async getAllUsers () {
    const response = await axios.get(`${this.BASE_URL}/users/all`, {
      headers: this.getHeader()
    })
    return response.data
  }

  static async getUserProfile () {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-logged-in-profile-info`,
      {
        headers: this.getHeader()
      }
      )
    return response.data.user
  }

  /* This is the  to get a single user */
  static async getUser (email) {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-by-email/${email}`,
      {
        headers: this.getHeader()
      }
    )
    return response.data
  }

  /* This is the  to get user bookings by the user email */
  static async getUserBookings (email) {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-user-bookings/${email}`,
      {
        headers: this.getHeader()
      }
    )
    return response.data
  }

  /* This is to delete a user */
  static async deleteUser (email) {
    const response = await axios.delete(
      `${this.BASE_URL}/users/delete/${email}`,
      {
        headers: this.getHeader()
      }
    )
    return response.data
  }

  /**ROOM */
  /* This  adds a new room room to the database */
  static async addRoom (formData) {
    const result = await axios.post(`${this.BASE_URL}/rooms`, formData, {
      headers: {
        ...this.getHeader(),
        'Content-Type': 'multipart/form-data'
      }
    })
    return result.data
  }

  /* This  gets all availavle rooms */
  static async getAllAvailableRooms () {
    const result = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`)
    return result.data
  }

  /* This  gets all availavle by dates rooms from the database with a given date and a room type */
  static async getAvailableRoomsByDateAndType (
    checkInDate,
    checkOutDate,
    roomType
  ) {
    const result = await axios.get(
      `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
    )
    return result.data
    }
    
  /* This  gets all rooms from the database */
  static async getAllRooms () {
    const result = await axios.get(`${this.BASE_URL}/public/rooms`)
    return result.data
  }
  /* This function gets a room by the id */
  static async getRoomById (roomId) {
    const result = await axios.get(
      `${this.BASE_URL}/public/rooms/${roomId}`
    )
    return result.data
  }

  /* This  deletes a room by the Id */
  static async deleteRoom (roomId) {
    const result = await axios.delete(
      `${this.BASE_URL}/rooms/${roomId}`,
      {
        headers: this.getHeader()
      }
    )
    return result.data
  }

  /* This updates a room */
  static async updateRoom (roomId, formData) {
    const result = await axios.put(
      `${this.BASE_URL}/rooms/${roomId}`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return result.data
  }

  /**BOOKING */
  /* This  saves a new booking to the databse */
  static async bookRoom (booking) {

    const response = await axios.post(
      `${this.BASE_URL}/bookings`,
      booking,
      {
        headers: this.getHeader()
      }
    )
    return response.data
  }

  /* This  gets alll bokings from the database */
  static async getAllBookings () {
    const result = await axios.get(`${this.BASE_URL}/public/bookings`)
    return result.data
  }

  /* This is the  to cancel user booking */
  static async cancelBooking (bookingId) {
    const result = await axios.delete(
      `${this.BASE_URL}/bookings/cancel/${bookingId}`,
      {
        headers: this.getHeader()
      }
    )
    return result.data
  }

  /**AUTHENTICATION CHECKER */
  static logout () {
    localStorage.removeItem('token')
      localStorage.removeItem('role')
      Navigate('/')
  }

  static isAuthenticated () {
    const token = localStorage.getItem('token')
    return !!token
  }

  static isAdmin () {
    const role = localStorage.getItem('role')
    return role === 'ADMIN'
  }

  static isOwner () {
    const role = localStorage.getItem('role')
    return role === 'OWNER'
  }
    
  static isCustomer () {
    const role = localStorage.getItem('role')
    return role === 'CUSTOMER'
    }
    
    static async getHotels() {
        const result = await axios.get(`${this.BASE_URL}/public/hotels`)
        return result.data

    }

    static async getHotel(hotelId) {
        const result = await axios.get(`${this.BASE_URL}/public/hotel/${hotelId}`)
        return result.data.Hotel

    }

    static async getRoomWithLowestPrice (hotelId) {
    const result = await axios.get(
      `${this.BASE_URL}/public/rooms/room-with-lowest-price/${hotelId}`
        )
    return result.data.Room
    }
    
     static async getHotelReviews (hotelId) {
    const result = await axios.get(
      `${this.BASE_URL}/public/review/reviews-for-hotel/${hotelId}`
        )
    return result.data.Reviews
    }
    
    static async postReview (id, email, formData) {

    const response = await axios.post(
      `${this.BASE_URL}/review/customer-review?id=${id}&email=${email}`, formData,
        {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return response.data
  }
}

