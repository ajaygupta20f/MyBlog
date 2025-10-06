import Hero from '@/components/Hero'
import React from 'react'
import RecentBlog from '@/components/RecentBlog'
import PopularAuthors from '@/components/PopularAuthors'

const Home = () => {
    {/* add */}
  return (
    <div className='pt-20'>
      <Hero/>
      <RecentBlog/>
      <PopularAuthors/>
    </div>
  )
}

export default Home
