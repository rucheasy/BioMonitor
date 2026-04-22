import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import './StatusAlert.css';

const StatusAlert = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="status-alert success">
        <CheckCircle className="alert-icon" size={20} />
        <div className="alert-content">
          <h4 className="alert-title">All Systems Normal</h4>
          <p className="alert-message">No critical health alerts at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="alerts-container">
      {alerts.map((alert, index) => (
        <div key={index} className={`status-alert ${alert.type}`}>
          {alert.type === 'critical' ? (
            <AlertTriangle className="alert-icon" size={20} />
          ) : (
            <Info className="alert-icon" size={20} />
          )}
          <div className="alert-content">
            <h4 className="alert-title">{alert.title}</h4>
            <p className="alert-message">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusAlert;
