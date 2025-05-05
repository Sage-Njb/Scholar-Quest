// pages/index.tsx
import Head from 'next/head';
import ScholarshipList from '../components/ScholarshipList';

const Home = () => {
  return (
    <div>
      <Head>
        <title>ScholarQuest</title>
        <meta name="description" content="Find scholarships and prepare for exams with AI assistance." />
      </Head>

      <main>
        <h1>Welcome to ScholarQuest</h1>
        <p>Explore scholarships, improve essays, and practice interviews.</p>

        {/* Display Local Scholarships */}
        <h2>Scholarships</h2>
        <ScholarshipList />

        {/* Link to International Scholarships */}
        <p>
          <a href="/international-scholarships">View International Scholarships</a>
        </p>

        {/* Add more features here */}
      </main>
    </div>
  );
};

export default Home;
