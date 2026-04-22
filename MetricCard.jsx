import React from 'react';
import './MetricCard.css';

const getStatusColor = (status) => {
  switch (status) {
    case 'critical': return 'status-indicator-red';
    case 'warning': return 'status-indicator-yellow';
    default: return 'status-indicator-green';
  }
};

const MetricCard = ({ title, value, unit, icon: Icon, status = 'normal' }) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        {Icon && <Icon size={20} className="metric-icon" />}
      </div>
      <div className="metric-content">
        <div className="metric-value-container">
          <span className="metric-value">{value}</span>
          <span className="metric-unit">{unit}</span>
        </div>
        <div className={`status-indicator ${getStatusColor(status)}`} title={`Status: ${status}`}></div>
      </div>
    </div>
  );
};

export default MetricCard;
