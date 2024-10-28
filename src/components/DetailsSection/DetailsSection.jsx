import React from 'react';

const details = [
  { title: "Create Diaries", description: "Make travel journals for each of your trips." },
  { title: "Add Multiple Places", description: "Add details about various spots within your diary." },
  { title: "Share with Friends", description: "Share your travel experiences with others." }
];

const DetailsSection = () => {
  return (
    <section className="details-section" id="features">
      <h2>Why Choose Travel Log?</h2>
      <div className="details-grid">
        {details.map((item, index) => (
          <div key={index} className="detail-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailsSection;
