// pages/[category].tsx
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryPage = ({ category }) => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('/api/international-scholarships', {
          params: { category },
        });
        setScholarships(response.data);
      } catch (error) {
        console.error(`Error fetching ${category} scholarships:`, error);
      }
    };

    fetchScholarships();
  }, [category]);

  return (
    <div>
      <Head>
        <title>{`${category} Scholarships`}</title>
        <meta name="description" content={`Find ${category.toLowerCase()} scholarships for global opportunities.`} />
      </Head>

      <main>
        <h1>{`${category} Scholarships`}</h1>
        <ul>
          {scholarships.map((scholarship) => (
            <li key={scholarship.id}>
              <h3>{scholarship.name}</h3>
              <p><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> {scholarship.amount}</p>
              <p><strong>Category:</strong> {scholarship.category}</p>
              <p><strong>Description:</strong> {scholarship.description}</p>
              <a href={scholarship.application_url} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { category } = context.params; // Get the category from the URL
  return { props: { category } };
}

export default CategoryPage;
