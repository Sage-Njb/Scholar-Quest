// components/ScholarshipList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('/api/scholarships');
        setScholarships(response.data);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div>
      <h2>Scholarships</h2>
      <ul>
        {scholarships.map((scholarship) => (
          <li key={scholarship.id}>
            <h3>{scholarship.name}</h3>
            <p><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
            <p><strong>Amount:</strong> {scholarship.amount}</p>
            <p><strong>Eligibility:</strong> {JSON.stringify(scholarship.eligibility)}</p>
            <p><strong>Category:</strong> {scholarship.category}</p>
            <p><strong>Description:</strong> {scholarship.description}</p>
            <a href={scholarship.application_url} target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScholarshipList;
