import React from 'react'
import './StockAlgoItem.scss'
import { Link } from 'react-router-dom'
import RatingStars from '../RatingStars/RatingStars'

const StockAlgoItem = ({ to, chart, title, username, price, ratings, tags = [] }) => (
  <Link to={to} className='__StockAlgo-Item __lightgrey-2 __p __block __relative'>
  <img src={chart} alt='' />
  <div className='__title __bold __mt-1'>
    {title}
  </div>
  <div className='__dark-grey-text __mb-sm'>
    {username}
  </div>
  <div className='__title __bold'>
    $
    {price}
  </div>
  <div className='__flex'>
    {tags.map((tag, index) => <span className='__chip __primary __small __p-1' key={index}>{tag}</span>)}
  </div>
  <div className='__flex __mt-sm'>
    <RatingStars ratings={ratings} small />
    <span className='__rating-no __ml-s'>{ratings}</span>
  </div>
  </Link>
)

export default StockAlgoItem
