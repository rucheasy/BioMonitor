import React, { useState, useEffect } from 'react';
import { Heart, Thermometer, Droplet, Wind } from 'lucide-react';
import Navbar from './components/Navbar';
import MetricCard from './components/MetricCard';
import HealthChart from './components/HealthChart';
import StatusAlert from './components/StatusAlert';
import './App.css';

// Mock Data Generator
const generateMockData = () => {
  const timeLabels = ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'];
  return timeLabels.map(time => ({
    time,
    heartRate: Math.floor(Math.random() * (90 - 65 + 1) + 65),
    temperature: (Math.random() * (37.5 - 36.5) + 36.5).toFixed(1),
  }));
};

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentMetrics, setCurrentMetrics] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = () => {
      setTimeout(() => {
        const historyData = generateMockData();
        const latest = historyData[historyData.length - 1];
        
        setData(historyData);
        setCurrentMetrics({
          heartRate: latest.heartRate,
          temperature: latest.temperature,
          spo2: 98,
          respiration: 16
        });

        // Mock alerts logic
        const newAlerts = [];
        if (latest.heartRate > 85) {
          newAlerts.push({ type: 'warning', title: 'Elevated Heart Rate', message: 'Heart rate is slightly above resting average.' });
        }
        setAlerts(newAlerts);
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <Navbar />
        <div className="state-container">
          <div className="spinner"></div>
          <p>Fetching health data...</p>
        </div>
      </div>
    );
  }

  if (!currentMetrics) {
    return (
      <div className="app-container">
        <Navbar />
        <div className="state-container">
          <p>No health data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1 className="text-h1">Overview</h1>
            <p className="text-muted">Real-time health monitoring metrics</p>
          </div>
        </header>

        <StatusAlert alerts={alerts} />

        <div className="metrics-grid">
          <MetricCard 
            title="Heart Rate" 
            value={currentMetrics.heartRate} 
            unit="bpm" 
            icon={Heart} 
            status={currentMetrics.heartRate > 85 ? 'warning' : 'normal'}
          />
          <MetricCard 
            title="Temperature" 
            value={currentMetrics.temperature} 
            unit="°C" 
            icon={Thermometer} 
            status="normal"
          />
          <MetricCard 
            title="SpO2" 
            value={currentMetrics.spo2} 
            unit="%" 
            icon={Droplet} 
            status="normal"
          />
          <MetricCard 
            title="Respiration" 
            value={currentMetrics.respiration} 
            unit="rpm" 
            icon={Wind} 
            status="normal"
          />
        </div>

        <div className="charts-grid">
          <HealthChart 
            title="Heart Rate Trend" 
            data={data} 
            dataKey="heartRate" 
            color="var(--status-red)" 
            unit="bpm"
          />
          <HealthChart 
            title="Temperature Trend" 
            data={data} 
            dataKey="temperature" 
            color="var(--status-yellow)" 
            unit="°C"
          />
        </div>
      </main>

      <footer className="footer">
        <p className="text-small text-muted">Health Monitor © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
