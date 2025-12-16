import { useState, useEffect } from 'react';
import useReservationStore from '@/Stores/reservationStore';
import { reservationItem } from '@/types';

// Restaurant hours
const OPENING_HOUR = 11;
const CLOSING_HOUR = 22;

interface TimeSlot {
  time: string;
  timeLabel: string;
  available: boolean;
}

export default function Reservation() {
  const selectedTable = useReservationStore((state) => state.selectedTable);
  const addReservation = useReservationStore((state) => state.addReservation);
  const reservationItems = useReservationStore((state) => state.reservationItem);

  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);

  // Listen for showAvailableTimes events from the sandbox
  useEffect(() => {
    const handleShowReservations = (event: CustomEvent<{ table: string }>) => {
      console.log('Received showReservations event:', event.detail);
      if (event.detail && event.detail.table) {
        useReservationStore.getState().setSelectedTable(event.detail.table);
      }
    };

    window.addEventListener('showReservations', handleShowReservations as EventListener);
    return () => window.removeEventListener('showReservations', handleShowReservations as EventListener);
  }, []);

  // Helper function to check if time is available
  const isTimeAvailable = (table: string, date: string, time: string): boolean => {
    return !reservationItems.some(
      (res) => res.date === date && res.times.includes(time)
    );
  };

  // Generate available times for selected table and date
  useEffect(() => {
    if (selectedTable && date) {
      const times: TimeSlot[] = [];
      for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
        for (let min of ['00', '30']) {
          const time = `${hour.toString().padStart(2, '0')}:${min}`;
          const available = isTimeAvailable(selectedTable, date, time);
          
          // Convert to AM/PM format
          const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const timeLabel = `${hour12}:${min} ${ampm}`;
          
          times.push({ time, timeLabel, available });
        }
      }
      setAvailableTimes(times);
    }
  }, [selectedTable, date, reservationItems]);

  const handleTimeClick = (time: string, available: boolean) => {
    if (!available) return;
    
    setSelectedTimes((prev) => {
      if (prev.includes(time)) {
        return prev.filter((t) => t !== time);
      } else {
        return [...prev, time];
      }
    });
  };

  const handleMakeReservation = () => {
    if (selectedTimes.length === 0 || !name) {
      alert('Please select at least one time slot and enter your name');
      return;
    }

    // Create reservation with all selected times
    const reservation: reservationItem = {
      name,
      guests,
      date,
      times: selectedTimes,
    };
    addReservation(reservation);

    const timesList = selectedTimes.map(t => {
      const slot = availableTimes.find(at => at.time === t);
      return slot ? slot.timeLabel : t;
    }).join(', ');

    alert(
      `Reservation confirmed!\n${selectedTable}\n${date}\nTimes: ${timesList}\n${name} - ${guests} guests`
    );

    setSelectedTimes([]);
    setName('');
    setGuests(2);
  };

  if (!selectedTable) {
    return (
      <div style={styles.emptyContainer}>
        <h2 style={styles.emptyTitle}>No Table Selected</h2>
        <p style={styles.emptyText}>
          Click "Show Available Times" on a table in the tour.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{selectedTable}</h2>
        <p style={styles.subtitle}>Book Your Reservation</p>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>
          Available Times (11:00 AM - 10:00 PM) - Click to select multiple:
        </label>
        <div style={styles.timesGrid}>
          {availableTimes.map(({ time, timeLabel, available }) => (
            <button
              key={time}
              onClick={() => handleTimeClick(time, available)}
              style={{
                ...styles.timeSlot,
                ...(available ? styles.timeAvailable : styles.timeUnavailable),
                ...(selectedTimes.includes(time) ? styles.timeSelected : {}),
              }}
              disabled={!available}
            >
              {timeLabel}
              <br />
              <small style={{ fontSize: '11px' }}>
                {available ? '✓' : '✗'}
              </small>
            </button>
          ))}
        </div>
      </div>

      {selectedTimes.length > 0 && (
        <div style={styles.formSection}>
          <div style={styles.selectedTime}>
            Selected ({selectedTimes.length}): {selectedTimes.map(t => {
              const slot = availableTimes.find(at => at.time === t);
              return slot ? slot.timeLabel : t;
            }).join(', ')}
          </div>

          <label style={styles.label}>Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={styles.input}
          />

          <label style={styles.label}>Number of Guests:</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            style={styles.input}
          >
            <option value="2">2 guests</option>
            <option value="4">4 guests</option>
            <option value="6">6 guests</option>
            <option value="8">8 guests</option>
          </select>

          <button onClick={handleMakeReservation} style={styles.confirmButton}>
            Confirm Reservation
          </button>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  header: {
    borderBottom: '3px solid #007bff',
    paddingBottom: '15px',
    marginBottom: '25px',
  },
  title: {
    margin: '0 0 5px 0',
    color: '#2d3748',
    fontSize: '28px',
  },
  subtitle: {
    margin: 0,
    color: '#718096',
    fontSize: '14px',
  },
  section: {
    marginBottom: '25px',
  },
  formSection: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#4a5568',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  },
  timesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
    gap: '10px',
    marginTop: '10px',
  },
  timeSlot: {
    padding: '10px 6px',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  timeAvailable: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    color: '#155724',
  },
  timeUnavailable: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
    color: '#721c24',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  timeSelected: {
    backgroundColor: '#cce5ff',
    borderColor: '#0056b3',
    color: '#003d82',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 123, 255, 0.4)',
  },
  selectedTime: {
    padding: '12px',
    backgroundColor: '#cce5ff',
    color: '#003d82',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: '15px',
    fontSize: '16px',
  },
  confirmButton: {
    width: '100%',
    padding: '15px',
    background: '#d4edda',
    color: '#155724',
    border: '2px solid #28a745',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
  },
  emptyContainer: {
    padding: '60px 20px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto',
  },
  emptyTitle: {
    color: '#2d3748',
    marginBottom: '10px',
  },
  emptyText: {
    color: '#718096',
    fontSize: '16px',
  },
};