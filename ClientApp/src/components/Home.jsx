import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [message, setMessage] = useState('')
  const [secondMessage, setSecondMessage] = useState('')

  useEffect(() => {
    axios.get('/api/flower/name/FeaturedArrangements').then(resp => {
      setFeatured(resp.data)
    })
  }, [])

  const onClick = flower => {
    axios
      .post(`api/cart`, {
        cartNumber: localStorage.getItem('cartNumber'),
        flowerId: flower.id
      })
      .then(resp => {
        console.log(resp.data.cartNumber)
        localStorage.setItem('cartNumber', resp.data.cartNumber)
      })
    setMessage(flower.description)
    setSecondMessage('was added to cart')
  }

  return (
    <section className="featured-section">
      <h1 className="featured-arrangements">Featured Arrangements</h1>
      <p className="message">
        {message} {secondMessage}
      </p>
      <ul className="featured-list">
        {featured.map(flower => {
          return (
            <li key={flower.id}>
              <img className="list-img" src={flower.url} alt="" />
              <p>{flower.description}</p>
              <p>${flower.price}</p>
              <button onClick={() => onClick(flower)}>Add to Cart</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
