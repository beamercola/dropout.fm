import React from 'react'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'

import Layout from '../components/Layout'
const IndexPage = ({ data }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-screen h-screen p-4">
        <div class="w-full sm:w-96 sm:mt-10">
          <h1 class="text-4xl px-3">dropout.fm</h1>
          <p class="mb-12 mt-2 px-3 text-lg">a small weekly music blog</p>
          <label className="text-xs px-3 mb-2 block">join the newsletter, saturday mornings</label>
          <Subscribe />
          <Footer />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
