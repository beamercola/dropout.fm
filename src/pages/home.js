import React from "react";
import Footer from "../components/Footer";

import Layout from "../components/Layout";
const Home = ({ data }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-screen h-screen p-4">
        <div class="w-full sm:w-96 sm:mt-10 dark:text-gray-600">
          <h1 class="text-4xl px-3 dark:text-white">dropout.fm</h1>
          <p class="mb-12 mt-2 px-3 text-lg dark:text-white">
            a small weekly music blog
          </p>
          <label className="text-xs px-3 mb-2 block">
            join the newsletter, saturday mornings
          </label>
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
