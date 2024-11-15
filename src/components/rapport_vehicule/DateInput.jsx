import React, { useState } from 'react';

const DateInput = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    // Crée un objet Date avec l'input de type "date"
    const date = new Date(event.target.value + 'T00:00:00'); // Force l'heure à minuit pour éviter le décalage de fuseau horaire

    const formattedDate = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setSelectedDate(formattedDate);
  };

  return (
    <div>
      <input type="date" onChange={handleDateChange} />
      {selectedDate && <p>{selectedDate}</p>}
    </div>
  );
};

export default DateInput;
