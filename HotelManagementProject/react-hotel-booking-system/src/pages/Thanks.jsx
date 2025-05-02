import React, { Component } from 'react'
import Img1 from '../assets/images/mail_icon.jpg'
import { Link } from 'react-router-dom'

export class Thanks extends Component {
  render() {
    return (
      <div>
        <div className='container'>
  <main id='htlfndr-main-content' className='htlfndr-main-content' role='main'>
    <article className='htlfndr-thanks-page text-center'>
      <h1>Thank You!</h1>
      <h3>
        for choosing
        <Link to='/'>
          <span className='htlfndr-logo-text'>
            {' '}
            hotel <span>finder</span>
          </span>
        </Link>
      </h3>
      <img src={Img1} alt='mail' />
      <div>
        <h4>
          We have just sent to you E-mail a letter with complete information
          about your booking
        </h4>
      </div>
      <Link className='htlfndr-more-link text-center' to='/'>
        homepage
      </Link>
      <Link className='htlfndr-more-link text-center' to='/blog-index'>
        visit the blog
      </Link>
    </article>
  </main>
</div>

      </div>
    )
  }
}

export default Thanks