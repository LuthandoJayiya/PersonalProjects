import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Img1 from '../assets/images/16660516681_8e0fcb131f_k.jpg'
import Img2 from '../assets/images/16635965046_b2d93ce3c2_k.jpg'
import Img3 from '../assets/images/16681976888_1539c483aa_k.jpg'
import Img4 from '../assets/images/9552062566_5f946c2cb2_k.jpg'
import Img5 from '../assets/images/15098547324_e583a06f71_k.jpg'
// import Img6 from '../assets/images/15471603459_c78150330b_k.jpg'
// import Img7 from '../assets/images/16293832454_d7d8573af2_k.jpg'
// import Img8 from '../assets/images/16415688600_a030e3e8dd_k.jpg'
import Img9 from '../assets/images/visitor-avatar-1.jpg'
import Img10 from '../assets/images/hotel-logo.jpg'
import Img11 from '../assets/images/top-destination-1.jpg'
import Img12 from '../assets/images/hotel-4-notinclude.jpg'
import Img13 from '../assets/images/83890-Web1.jpg'
import Img14 from '../assets/images/5053563227_ee0db21ca5_b.jpg'
import Img15 from '../assets/images/5690083711_44634c54f8_b.jpg'
import Img16 from '../assets/images/top-destination-2.jpg'
import Img17 from '../assets/images/visitor-avatar-1-1.jpg'
import Img18 from '../assets/images/icon-flag-ukraine.png'
import ApiService from '../components/services/ApiService'

const Hotel = () => {
  const [activeTab, setActiveTab] = useState(1)

  const [reviewCleanliness, setReviewCleanliness] = useState('5')
  const [reviewService, setReviewService] = useState('4')
  const [reviewComfort, setReviewComfort] = useState('4')
  const [reviewCondition, setReviewCondition] = useState('3')

  const handleTabClick = index => {
    setActiveTab(index)
  }

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isStartDatePickerOpen, setStartDatePickerOpen] = useState(false)
  const [isEndDatePickerOpen, setEndDatePickerOpen] = useState(false)

  const [numberOfPersons, setNumberOfPersons] = useState('1 adult')

  const handleSubmit = e => {
    e.preventDefault()
  }

  const [activeTabPhotoMap, setActiveTabPhotoMap] = useState('photo')

  const [images, setImages] = useState([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Handle click event for the thumbnails
  const handleThumbnailClick = index => {
    setSelectedImageIndex(index) // Change the main image to the selected thumbnail
  }

  // Handle next and previous thumbnail navigation
  const handleThumbnailNav = direction => {
    if (direction === 'prev') {
      setSelectedImageIndex(prevIndex =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      )
    } else if (direction === 'next') {
      setSelectedImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }
  }

    const [error, setError] = useState('')
const [searchParams, setSearchParams] = useSearchParams()
const navigate = useNavigate()
const id = searchParams.get('id') || ''

    useEffect(() => {
        if (!id) {
     navigate('/hotels')
 }
  
}, [id, navigate])


const [hotel, setHotel] = useState([])
const [reviews, setReviews] = useState([])
const [availability, setAvailability] = useState(null) // null, true, or false
const [reviewForm, setReviewForm] = useState({
  title: '',
  rating: 5,
  comment: ''
})
const [submitError, setSubmitError] = useState('')

useEffect(() => {
  setActiveTabPhotoMap('photo') 
}, [id])


useEffect(() => {
  const fetchHotel = async () => {
    try {
      const response = await ApiService.getHotel(id)
      setImages([response.pictureURL]) // Initialize images array

      const roomResponse = await ApiService.getRoomWithLowestPrice(id)
      const reviewsResponse = await ApiService.getHotelReviews(id)

      setHotel({
        ...response,
        room: roomResponse,
        reviews: reviewsResponse,
        reviewCount: reviewsResponse.length
      })
      setReviews(reviewsResponse)
    } catch (error) {
      console.error('Error fetching hotel data:', error)
    }
  }

  fetchHotel()
}, [id])

const handlePhotoMapTabClick = tab => {
  setActiveTabPhotoMap(tab)
  // Preserve existing search params
  setSearchParams({ id, tab })
}


// Handle review form input changes
const handleReviewInputChange = e => {
  const { name, value } = e.target
  setReviewForm(prevForm => ({
    ...prevForm,
    [name]: value
  }))
}

// Handle review form submission
const handleReviewSubmit = async e => {
  e.preventDefault()
  if (!reviewForm.title || !reviewForm.comment) {
    setSubmitError('Please fill in all fields.')
    return
  }
  if (reviewForm.rating < 1 || reviewForm.rating > 5) {
    setSubmitError('Rating must be between 1 and 5.')
    return
  }

  try {
    await ApiService.submitReview(id, reviewForm)
    // Refresh reviews
    const updatedReviews = await ApiService.getHotelReviews(id)
    setReviews(updatedReviews)
    setHotel(prevHotel => ({
      ...prevHotel,
      reviews: updatedReviews,
      reviewCount: updatedReviews.length
    }))
    // Reset form
    setReviewForm({
      title: '',
      rating: 5,
      comment: ''
    })
    setSubmitError('')
    alert('Review submitted successfully!')
  } catch (error) {
    console.error('Error submitting review:', error)
    setSubmitError('Failed to submit review. Please try again later.')
  }
    }
    
    const [availableRooms, setAvailableRooms] = useState([])
const [availabilityError, setAvailabilityError] = useState('')

const handleCheckAvailability = async () => {
  if (startDate && endDate) {
    try {
      const formattedCheckIn = startDate.toISOString().split('T')[0]
      const formattedCheckOut = endDate.toISOString().split('T')[0]
      const availableRoomsResponse = await ApiService.getAvailableRooms(
        id,
        formattedCheckIn,
        formattedCheckOut
      )
      setAvailableRooms(availableRoomsResponse)
      setAvailabilityError('')
    } catch (error) {
      console.error('Error fetching available rooms:', error)
      setAvailabilityError('Failed to fetch available rooms.')
    }
  } else {
    setAvailabilityError('Please select both check-in and check-out dates.')
  }
}


  return (
    <div>
      <div className='container'>
        <div className='htlfndr-steps'>
          <ul className='htlfndr-progress'>
            <li>
              <Link to='/search-result'>
                {' '}
                <span className='htlfndr-step-number'>1</span>{' '}
                <span className='htlfndr-step-description'>results</span>
              </Link>{' '}
            </li>
            <li className='htlfndr-active-step'>
              {' '}
              <span className='htlfndr-step-number'>2</span>{' '}
              <span className='htlfndr-step-description'>hotel</span>{' '}
            </li>
            <li>
              {' '}
              <span className='htlfndr-step-number'>3</span>{' '}
              <span className='htlfndr-step-description'>payment</span>
            </li>
          </ul>
        </div>
        <div className='row htlfndr-page-content'>
          <main
            id='htlfndr-main-content'
            className='col-sm-12 col-md-8 col-lg-9 post htlfndr-hotel-single-content'
            role='main'
          >
            <section
              id='htlfndr-gallery-and-map-tabs'
              className='ui-tabs ui-widget ui-widget-content ui-corner-all'
            >
              <ul
                className='ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'
                role='tablist'
              >
                <li
                  className={`ui-state-default ui-corner-top ${
                    activeTabPhotoMap === 'photo'
                      ? 'ui-tabs-active ui-state-active'
                      : ''
                  }`}
                  role='tab'
                  tabIndex='0'
                  aria-controls='htlfndr-gallery-tab-1'
                  aria-labelledby='ui-id-1'
                  aria-selected={activeTabPhotoMap === 'photo'}
                  aria-expanded={activeTabPhotoMap === 'photo'}
                >
                  <Link
                    to='#htlfndr-gallery-tab-1'
                    className='ui-tabs-anchor'
                    role='presentation'
                    tabIndex='-1'
                    id='ui-id-1'
                    onClick={e => {
                      e.preventDefault()
                        setActiveTabPhotoMap('photo')
                        setSearchParams({ id })
                    }}
                  >
                    photo
                  </Link>
                </li>
                <li
                  className={`ui-state-default ui-corner-top ${
                    activeTabPhotoMap === 'map'
                      ? 'ui-tabs-active ui-state-active'
                      : ''
                  }`}
                  role='tab'
                  tabIndex='-1'
                  aria-controls='htlfndr-gallery-tab-2'
                  aria-labelledby='ui-id-2'
                  aria-selected={activeTabPhotoMap === 'map'}
                  aria-expanded={activeTabPhotoMap === 'map'}
                >
                  <Link
                    to='#htlfndr-gallery-tab-2'
                    className='ui-tabs-anchor'
                    role='presentation'
                    tabIndex='-1'
                    id='ui-id-2'
                    onClick={e => {
                      e.preventDefault()
                        setActiveTabPhotoMap('map')
                        setSearchParams({ id })
                    }}
                  >
                    map
                  </Link>
                </li>
              </ul>

              <div
                id='htlfndr-gallery-tab-1'
                className='htlfndr-hotel-gallery ui-tabs-panel ui-widget-content ui-corner-bottom'
                aria-labelledby='ui-id-1'
                role='tabpanel'
                aria-hidden={activeTabPhotoMap !== 'photo'}
                style={{
                  display: activeTabPhotoMap === 'photo' ? 'block' : 'none'
                }}
              >
                {/* Main Image Carousel */}
                <div
                  id='htlfndr-gallery-synced-1'
                  className='htlfndr-gallery-carousel owl-carousel owl-theme'
                  style={{ opacity: 1, display: 'block' }}
                >
                  <div className='owl-wrapper-outer'>
                    <div
                      className='owl-wrapper'
                      style={{ display: 'block', transition: '800ms' }}
                    >
                      <div className='owl-item' style={{ width: '848px' }}>
                        <div className='htlfndr-gallery-item'>
                          <img
                            src={images[selectedImageIndex]} // Display the selected image
                            alt={`hotel img ${selectedImageIndex + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Nav buttons for main image */}
                  <div className='owl-controls clickable'>
                    <div className='owl-buttons'>
                      <div
                        className='owl-prev'
                        onClick={() => handleThumbnailNav('prev')}
                      >
                        <i className='fa fa-angle-left'></i>
                      </div>
                      <div
                        className='owl-next'
                        onClick={() => handleThumbnailNav('next')}
                      >
                        <i className='fa fa-angle-right'></i>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Thumbnail Carousel */}
                <div
                  id='htlfndr-gallery-synced-2'
                  className='htlfndr-gallery-carousel owl-carousel owl-theme'
                  style={{ opacity: 1, display: 'block' }}
                >
                  <div className='owl-wrapper-outer'>
                    <div
                      className='owl-wrapper'
                      style={{ display: 'flex', transition: '200ms' }}
                    >
                      {images.map((img, index) => (
                        <div
                          className={`owl-item ${
                            index === selectedImageIndex ? 'synced' : ''
                          }`}
                          key={index}
                          style={{
                            width: '158px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleThumbnailClick(index)} // On thumbnail click
                        >
                          <div className='htlfndr-gallery-item'>
                            <img src={img} alt={`thumbnail ${index + 1}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                id='htlfndr-gallery-tab-2'
                aria-labelledby='ui-id-2'
                className='ui-tabs-panel ui-widget-content ui-corner-bottom'
                role='tabpanel'
                aria-hidden={activeTabPhotoMap !== 'map'}
                style={{
                  display: activeTabPhotoMap === 'map' ? 'block' : 'none'
                }}
              >
                <div className='htlfndr-iframe-wrapper'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4461.6570805764695!2d-122.42764988684334!3d37.74624140010288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2z0KHQsNC9LdCk0YDQsNC90YbQuNGB0LrQviwg0JrQsNC70LjRhNC-0YDQvdC40Y8sINCh0KjQkA!5e0!3m2!1sru!2sua!4v1438339854639'
                    allowFullScreen=''
                  ></iframe>
                </div>
              </div>
            </section>

            <section id='htlfndr-hotel-description-tabs' className='r-tabs'>
              {/* Tab Navigation */}
              <ul className='r-tabs-nav'>
                <li
                  className={`r-tabs-tab ${
                    activeTab === 0
                      ? 'r-tabs-state-active active'
                      : 'r-tabs-state-default'
                  }`}
                  data-number='0'
                  onClick={() => handleTabClick(0)}
                >
                  <Link
                    to='#htlfndr-hotel-description-tab-1'
                    className='r-tabs-anchor'
                    onClick={e => {
          e.preventDefault(); 

          setSearchParams({ id,});
        }}
                  >
                    Description
                  </Link>
                </li>
                <li
                  className={`r-tabs-tab ${
                    activeTab === 1
                      ? 'r-tabs-state-active active'
                      : 'r-tabs-state-default'
                  }`}
                  data-number='1'
                  onClick={() => handleTabClick(1)}
                >
                  <Link
                    to='#htlfndr-hotel-description-tab-2'
                    className='r-tabs-anchor'
                    onClick={e => {
          e.preventDefault(); 

          setSearchParams({ id,});
        }}
                  >
                    Availability
                  </Link>
                </li>
                <li
                  className={`r-tabs-tab ${
                    activeTab === 2
                      ? 'r-tabs-state-active active'
                      : 'r-tabs-state-default'
                  }`}
                  data-number='2'
                  onClick={() => handleTabClick(2)}
                >
                  <Link
                    to='#htlfndr-hotel-description-tab-3'
                    className='r-tabs-anchor'
                    onClick={e => {
          e.preventDefault(); 

          setSearchParams({ id,});
        }}
                  >
                    Amenities
                  </Link>
                </li>
                <li
                  className={`r-tabs-tab ${
                    activeTab === 3
                      ? 'r-tabs-state-active active'
                      : 'r-tabs-state-default'
                  }`}
                  data-number='3'
                  onClick={() => handleTabClick(3)}
                >
                  <Link
                    to='#htlfndr-hotel-description-tab-4'
                    className='r-tabs-anchor'
                    onClick={e => {
          e.preventDefault(); 

          setSearchParams({ id,});
        }}
                  >
                    Reviews
                  </Link>
                </li>
                <li
                  className={`r-tabs-tab ${
                    activeTab === 4
                      ? 'r-tabs-state-active active'
                      : 'r-tabs-state-default'
                  }`}
                  data-number='4'
                  onClick={() => handleTabClick(4)}
                >
                  <Link
                    to='#htlfndr-hotel-description-tab-5'
                    className='r-tabs-anchor'
                    onClick={e => {
          e.preventDefault(); 

          setSearchParams({ id,});
        }}
                  >
                    Write a Review
                  </Link>
                </li>
              </ul>
              {/* Tab Content */}
              <div
                id='htlfndr-hotel-description-tab-1'
                className={`htlfndr-hotel-description-tab ${
                  activeTab === 0 ? 'active' : ''
                }`}
                style={{ display: activeTab === 0 ? 'block' : 'none' }}
              >
                <div className='row'>
                  <div className='col-md-5 htlfndr-description-table'>
                    <table>
                      <tbody>
                        <tr>
                          <th className='htlfndr-scope-row'>Type:</th>
                          <td>Hotel</td>
                        </tr>
                        <tr>
                          <th className='htlfndr-scope-row'>Rating Stars:</th>
                          <td>{hotel.starRating} stars</td>
                        </tr>
                        <tr>
                          <th className='htlfndr-scope-row'>Country:</th>
                          <td>South Africa</td>
                        </tr>
                        <tr>
                          <th className='htlfndr-scope-row'>City:</th>
                          <td>{hotel.city}</td>
                        </tr>
                        <tr>
                          <th className='htlfndr-scope-row'>Address:</th>
                          <td>Giudeca 810 St.</td>
                        </tr>
                        <tr>
                          <th className='htlfndr-scope-row'>Phone No:</th>
                          <td>1-800-123-0000</td>
                        </tr>
                        <tr>
                          <th className='htlfndr-scope-row'>Check In:</th>
                          <td>12:00 PM</td>
                        </tr>
                        <tr>
                          <th className='htlfndr-scope-row'>Check Out:</th>
                          <td>12:00 AM</td>
                        </tr>
                        <tr>
                          <th className='htlfndr-scope-row'>Minimum Stay:</th>
                          <td>2 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='col-md-7 htlfndr-description-right-side'>
                    <div className='media'>
                      <div className='media-left'>
                        <img
                          className='media-object'
                          src={Img9}
                          alt='Hotel Manager'
                        />
                      </div>
                      <div className='media-body'>
                        <h5>Hotel Manager</h5>
                        <h4 className='media-heading'>Jessica Brown</h4>
                      </div>
                    </div>
                    <blockquote>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Aspernatur, dolores eveniet laboriosam maxime
                        molestias nulla quidem similique. Amet asperiores at
                        esse expedita iusto magni, nam perferendis sequi?
                        Molestias possimus, quasi. Amet asperiores at esse
                        expedita iusto magni, nam perferendis sequi? Molestias
                        possimus, quasi.
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div
                id='htlfndr-hotel-description-tab-2'
                className={`htlfndr-hotel-description-tab ${
                  activeTab === 1 ? 'active r-tabs-state-active' : ''
                }`}
                style={{ display: activeTab === 1 ? 'block' : 'none' }}
              >
                <aside className='htlfndr-sidebar-in-top htlfndr-short-form'>
    <form
      name='search-hotel'
      id='search-hotel'
      className='htlfndr-search-form'
      onSubmit={e => {
        e.preventDefault();
        handleCheckAvailability();
      }}
    >
      <div
        id='htlfndr-input-date-in'
        className='htlfndr-input-wrapper'
      >
        <label htmlFor='htlfndr-date-in' className='sr-only'>
          Date In
        </label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          className='search-hotel-input'
          placeholderText='Date in'
          dateFormat='yyyy/MM/dd'
        />
      </div>
      <div
        id='htlfndr-input-date-out'
        className='htlfndr-input-wrapper'
      >
        <label htmlFor='htlfndr-date-out' className='sr-only'>
          Date Out
        </label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          className='search-hotel-input'
          placeholderText='Date out'
          dateFormat='yyyy/MM/dd'
        />
      </div>
      <div id='htlfndr-input-5' className='htlfndr-input-wrapper'>
        <button type='submit' className='btn-default'>
          Check Availability
        </button>
      </div>
      {availabilityError && (
        <p className='error-message'>{availabilityError}</p>
      )}
    </form>
  </aside>
  <section className='htlfndr-available-rooms-section'>
    <header>
      <h3>Available Rooms</h3>
    </header>
    {availableRooms.length > 0 ? (
      <article className='htlfndr-tab-article htlfndr-second-tab-post'>
        {availableRooms.map(room => (
          <div key={room.id} className='htlfndr-available-room'>
            <div className='htlfndr-post-thumbnail'>
              <img src={room.pictureURL || Img11} alt='Room Pic' />
            </div>
            <div className='htlfndr-post-wrapper'>
              <header>
                <h2 className='htlfndr-post-title'>{room.name}</h2>
              </header>
              <h6 className='htlfndr-post-info'>
                Max Guests: <span className='htlfndr-guests'>{room.maxGuests}</span> | Max Kids: <span className='htlfndr-kids'>{room.maxKids}</span>
              </h6>
              <p className='htlfndr-post-excerpt'>
                {room.description}
              </p>
              <p className='htlfndr-button-block'>
                <Link
                  className='htlfndr-select-hotel-button'
                  role='button'
                  to={`/hotel-room-page?roomId=${room.id}&hotelId=${id}&checkIn=${startDate.toISOString().split('T')[0]}&checkOut=${endDate.toISOString().split('T')[0]}`}
                >
                  Select
                </Link>
              </p>
            </div>
          </div>
        ))}
      </article>
    ) : (
      <p>No available rooms for the selected dates.</p>
    )}
    {/* Optionally, add a link to view all rooms */}
    {availableRooms.length > 0 && (
      <Link to={`/search-rooms?hotelId=${id}&checkIn=${startDate.toISOString().split('T')[0]}&checkOut=${endDate.toISOString().split('T')[0]}`}>
        <i className='fa fa-eye'></i> View all available rooms
      </Link>
    )}
  </section>
              </div>
              <div
                id='htlfndr-hotel-description-tab-3'
                className={`htlfndr-hotel-description-tab ${
                  activeTab === 2 ? 'active' : ''
                }`}
                style={{ display: activeTab === 2 ? 'block' : 'none' }}
              >
                <article className='htlfndr-tab-article htlfndr-third-tab-post'>
                  <header>
                    <h3>Amenities of Hilton</h3>
                  </header>
                  <p className='htlfndr-post-excerpt'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusantium amet, animi consequatur deleniti dignissimos
                    eligendi error esse ex illum iusto officia quos unde! Dolore
                    illum iusto optio, porro rerum voluptates! Lorem ipsum dolor
                    sit amet, consectetur adipisicing elit. Debitis dolorem
                    expedita impedit laboriosam minus nemo nulla numquam
                    similique voluptatem! Distinctio magnam nesciunt sequi.
                    Error eum molestias neque sunt veritatis voluptates!
                  </p>
                  <footer className='row htlfndr-amenities'>
                    <div className='col-md-4 col-sm-6 col-xs-6'>
                      <div className='htlfndr-amenities-icon'>
                        <i className='fa fa-wifi'></i>
                      </div>
                      <p>Wi-Fi Internet</p>
                    </div>
                    <div className='col-md-4 col-sm-6 col-xs-6'>
                      <div className='htlfndr-amenities-icon'>
                        <i className='fa fa-gamepad'></i>
                      </div>
                      <p>Game Zone</p>
                    </div>
                    <div className='col-md-4 col-sm-6 col-xs-6'>
                      <div className='htlfndr-amenities-icon'>
                        <i className='fa fa-life-ring'></i>
                      </div>
                      <p>Pool</p>
                    </div>
                    <div className='col-md-4 col-sm-6 col-xs-6'>
                      <div className='htlfndr-amenities-icon'>
                        <i className='fa fa-cutlery'></i>
                      </div>
                      <p>Room Service</p>
                    </div>
                    <div className='col-md-4 col-sm-6 col-xs-6'>
                      <div className='htlfndr-amenities-icon'>
                        <i className='fa fa-wheelchair'></i>
                      </div>
                      <p>Wheelchair Access</p>
                    </div>
                    <div className='col-md-4 col-sm-6 col-xs-6'>
                      <div className='htlfndr-amenities-icon'>
                        <i className='fa fa-spoon'></i>
                      </div>
                      <p>Kitchen</p>
                    </div>
                  </footer>
                </article>
              </div>
              <div
                id='htlfndr-hotel-description-tab-4'
                className={`htlfndr-hotel-description-tab ${
                  activeTab === 3 ? 'active' : ''
                }`}
                style={{ display: activeTab === 3 ? 'block' : 'none' }}
              >
                <div className='htlfndr-hotel-marks'>
                  <div className='htlfndr-overview-rating'>
                    <div className='htlfndr-rating-stars'>
                      <i className='fa fa-star htlfndr-star-color'></i>
                      <i className='fa fa-star htlfndr-star-color'></i>
                      <i className='fa fa-star htlfndr-star-color'></i>
                      <i className='fa fa-star htlfndr-star-color'></i>
                      <i className='fa fa-star htlfndr-star-color'></i>
                    </div>
                    <dl>
                      <dt>
                        <span>4.8</span> out of 5
                      </dt>
                      <dd>
                        based on <span>123</span> Reviews
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className='clearfix'></div>
                <div className='htlfndr-visitor-review'>
                  <div className='htlfndr-review-left-side'>
                    <div className='htlfndr-visitor-avatar'>
                      <img src={Img17} alt='Visitor Photo' />
                    </div>
                    <div className='htlfndr-visitor-flag'>
                      <img src={Img18} alt='Visitor Flag' />
                    </div>
                    <dl>
                      <dt>John Doe</dt>
                      <dd>Kiev, Ukraine</dd>
                    </dl>
                  </div>
                  <div className='htlfndr-review-right-side'>
                    <article className='htlfndr-visitor-post'>
                      <header>
                        <h3>
                          &quot;Tempus vestibulum mus imperdiet nibh sem&quot;
                        </h3>
                        <h6>Posted 12 May 2015</h6>
                      </header>
                      <div className='htlfndr-rating-stars'>
                        <i className='fa fa-star htlfndr-star-color'></i>
                        <i className='fa fa-star htlfndr-star-color'></i>
                        <i className='fa fa-star htlfndr-star-color'></i>
                        <i className='fa fa-star htlfndr-star-color'></i>
                        <i className='fa fa-star htlfndr-star-color'></i>
                      </div>
                      <p>
                        Pharetra quis netus vel vehicula class vestibulum nisl
                        donec hendrerit fermentum magna sed amet purus sit nec
                        class sit fringilla tellus volutpat per eget molestie
                        Platea suspendisse eget tortor pharetra magna nam
                        senectus tristique cursus ut odio sollicitudin venenatis
                        natoque dis maecenas magna dignissim sociosqu et sociis
                        accumsan interdum dictum netus quis enim phasellus
                        suscipit nunc donec purus dui himenaeos nulla sociosqu
                        rhoncus dictumst fusce ultricies congue sapien porttitor
                        maecenas fringilla ipsum nam lorem aliquam rhoncus elit
                        himenaeos
                      </p>
                    
                    </article>
                  </div>
                </div>
              </div>
              <div
                id='htlfndr-hotel-description-tab-5'
                className={`htlfndr-hotel-description-tab ${
                  activeTab === 4 ? 'active' : ''
                }`}
                style={{ display: activeTab === 4 ? 'block' : 'none' }}
              >
                ;<form
  method='post'
  className='htlfndr-review-form'
  onSubmit={async e => {
    e.preventDefault()
    const form = e.target
    const reviewTitle = form['review-title'].value.trim()
    const reviewRating = parseInt(form['review-rating'].value)
    const reviewText = form['review-text'].value.trim()

    if (!reviewTitle || !reviewText || !reviewRating) {
      setError('Please fill in all fields.')
      return
    }

    const reviewData = {
      title: reviewTitle,
      rating: reviewRating,
      comment: reviewText
    }

      try {
          const user = await ApiService.getUserProfile();
      await ApiService.postReview(id, user.email, reviewData)
      const reviewsResponse = await ApiService.getHotelReviews(id)
      setHotel(prevHotel => ({
        ...prevHotel,
        review: reviewsResponse,
        reviewCount: reviewsResponse.length
      }))
      form.reset()
      setError('')
      alert('Review submitted successfully!')
    } catch (error) {
      console.error('Error submitting review:', error)
      setError('Failed to submit review. Please try again later.')
    }
  }}
>
  <div className='htlfndr-form'>
    <label htmlFor='review-title'>Review Title</label>
    <input
      type='text'
      name='review-title'
      id='review-title'
      className='htlfndr-review-form-input'
      required
    />
    <label htmlFor='review-rating'>Review Rating</label>
    <select
      name='review-rating'
      id='review-rating'
      className='htlfndr-review-form-input'
      required
    >
      <option value=''>Select rating</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
    <label htmlFor='review-text'>Review Comment</label>
    <textarea
      name='review-text'
      id='review-text'
      className='htlfndr-review-form-input'
      required
    ></textarea>
  </div>

  {error && <p className='error-message'>{error}</p>}

  <div className='clearfix'></div>
  <input type='submit' value='Leave a Review' className='btn-default' />
</form>

              </div>
              {/* Button to Top */}
              {activeTab === 3 || activeTab === 4 ? (
                <button
                  className='htlfndr-button-to-top'
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                >
                  ↑ Top
                </button>
              ) : null}
            </section>
          </main>
          <aside
            id='htlfndr-right-sidebar'
            className='col-sm-12 col-md-4 col-lg-3 htlfndr-sidebar htlfndr-sidebar-in-right'
            role='complementary'
          >
            <p className='htlfndr-add-to-wishlist'>
              <Link to='#'>
                <i className='fa fa-plus'></i> Add to Wishlist
              </Link>
            </p>
            <div className='widget htlfndr-hotel-visit-card'>
              <div className='htlfndr-widget-main-content htlfndr-widget-padding'>
                <div className='htlfndr-hotel-description'>
                  <h2>{hotel.name}</h2>
                  <div className='htlfndr-rating-stars'>
                    {[...Array(5)].map((_, index) => (
                            <i
                              key={index}
                              className={`fa fa-star ${
                                index < hotel.starRating
                                  ? 'htlfndr-star-color'
                                  : ''
                              }`}
                            ></i>
                          ))}
                  </div>
                  <h5 className='htlfndr-hotel-location'>
                    <Link to='#'>
                      <i className='fa fa-map-marker'></i>{hotel.city}
                    </Link>
                  </h5>
                </div>
                <div className='htlfndr-hotel-price'>
                  <span className='htlfndr-from'>from</span>{' '}
                  <span className='htlfndr-cost'>$ {hotel.room ? hotel.room.price : 'N/A'}</span>
                  <span className='htlfndr-per-night'>/ night</span>
                </div>
              </div>
              <div className='htlfndr-widget-padding'>
                <div className='htlfndr-hotel-contacts'>
                  <p className='htlfndr-mail'>
                    <Link to='#'>
                      <span
                        className='__cf_email__'
                      >
                        [email&#160;protected]
                      </span>
                    </Link>
                  </p>
                  <p className='htlfndr-url'>
                    <Link to='#'>example.com</Link>
                  </p>
                  <p className='htlfndr-phone'>
                    <Link to='#'>000-000-000-000</Link>
                  </p>
                  <p className='htlfndr-reviews'>{hotel.reviewCount} Reviews</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Hotel
