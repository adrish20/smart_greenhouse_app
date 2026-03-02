import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Fan, Droplet, Thermometer, Wind, X, Clock, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  action: string;
  icon: typeof AlertTriangle;
  timestamp: Date;
  resolved: boolean;
}

export function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'High Temperature Alert',
      description: 'Temperature has exceeded 30°C. Plants may experience heat stress.',
      action: 'Turn ON exhaust fan',
      icon: Thermometer,
      timestamp: new Date(Date.now() - 5 * 60000),
      resolved: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Low Soil Moisture',
      description: 'Soil moisture below 35%. Plants need watering soon.',
      action: 'Start irrigation',
      icon: Droplet,
      timestamp: new Date(Date.now() - 15 * 60000),
      resolved: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'High Humidity Level',
      description: 'Humidity at 78%. Risk of fungal growth.',
      action: 'Increase ventilation',
      icon: Wind,
      timestamp: new Date(Date.now() - 30 * 60000),
      resolved: false,
    },
    {
      id: '4',
      type: 'info',
      title: 'Temperature Normalized',
      description: 'Temperature returned to optimal range (24°C).',
      action: 'No action required',
      icon: CheckCircle2,
      timestamp: new Date(Date.now() - 60 * 60000),
      resolved: true,
    },
  ]);

  const executeAction = (alert: Alert) => {
    toast.success('Action executed', {
      description: alert.action,
    });
    
    // Mark alert as resolved
    setAlerts(prev =>
      prev.map(a => (a.id === alert.id ? { ...a, resolved: true } : a))
    );
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    toast.info('Alert dismissed');
  };

  const clearResolved = () => {
    setAlerts(prev => prev.filter(a => !a.resolved));
    toast.success('Resolved alerts cleared');
  };

  const getAlertStyle = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return {
          gradient: 'from-red-500 to-orange-500',
          bg: 'from-red-50 to-orange-50',
          border: 'border-red-300',
          glowColor: 'shadow-red-500/20',
        };
      case 'warning':
        return {
          gradient: 'from-amber-500 to-yellow-500',
          bg: 'from-amber-50 to-yellow-50',
          border: 'border-amber-300',
          glowColor: 'shadow-amber-500/20',
        };
      case 'info':
        return {
          gradient: 'from-green-500 to-emerald-500',
          bg: 'from-green-50 to-emerald-50',
          border: 'border-green-300',
          glowColor: 'shadow-green-500/20',
        };
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const activeAlerts = alerts.filter(a => !a.resolved);
  const resolvedAlerts = alerts.filter(a => a.resolved);
  const criticalCount = activeAlerts.filter(a => a.type === 'critical').length;

  return (
    <div className="p-4 pb-6 min-h-full bg-gradient-to-b from-orange-50/50 to-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-gray-900 text-2xl mb-1">Alerts & Actions</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <Bell className="size-4 text-orange-600" />
          Monitor and respond to system alerts
        </p>
      </div>

      {/* Summary Card */}
      <Card className={`p-5 mb-6 shadow-xl border-2 ${
        criticalCount > 0 
          ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300 shadow-red-500/20' 
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-green-500/20'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">Active Alerts</p>
            <div className="flex items-center gap-3">
              <p className={`text-2xl font-bold ${
                criticalCount > 0 ? 'text-red-700' : 'text-green-700'
              }`}>
                {activeAlerts.length}
              </p>
              {criticalCount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-lg px-3 py-1">
                  {criticalCount} Critical
                </Badge>
              )}
            </div>
          </div>
          {resolvedAlerts.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearResolved}
              className="text-xs text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-xl"
            >
              Clear Resolved
            </Button>
          )}
        </div>
      </Card>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-900 text-lg mb-4 flex items-center gap-2">
            Active Alerts
            {criticalCount > 0 && (
              <div className="relative">
                <div className="size-2.5 bg-red-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 size-2.5 bg-red-500 rounded-full animate-ping" />
              </div>
            )}
          </h3>
          <div className="space-y-4">
            {activeAlerts.map((alert) => {
              const Icon = alert.icon;
              const style = getAlertStyle(alert.type);
              
              return (
                <Card 
                  key={alert.id} 
                  className={`p-5 bg-gradient-to-br ${style.bg} border-2 ${style.border} shadow-lg ${style.glowColor} hover:shadow-xl transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${style.gradient} p-3 rounded-2xl shadow-lg relative overflow-hidden shrink-0`}>
                      <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                      <Icon className="size-6 text-white relative z-10 drop-shadow-md" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-gray-900 font-medium">{alert.title}</h4>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg p-1 transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{alert.description}</p>
                      
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/50 rounded-lg px-2 py-1">
                          <Clock className="size-3" />
                          {formatTime(alert.timestamp)}
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => executeAction(alert)}
                          className={`bg-gradient-to-r ${style.gradient} hover:opacity-90 text-white border-0 h-9 text-xs rounded-xl shadow-md`}
                        >
                          {alert.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div>
          <h3 className="text-gray-900 text-lg mb-4 flex items-center gap-2">
            <CheckCircle2 className="size-5 text-green-600" />
            Resolved
          </h3>
          <div className="space-y-3">
            {resolvedAlerts.map((alert) => {
              const Icon = alert.icon;
              
              return (
                <Card key={alert.id} className="p-4 bg-gray-50/50 border-2 border-gray-200 opacity-75 hover:opacity-90 transition-opacity">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-white border-2 border-gray-200 shrink-0">
                      <Icon className="size-5 text-gray-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-gray-700 font-medium">{alert.title}</h4>
                        <Badge variant="outline" className="text-xs bg-white border-green-200 text-green-700">
                          <CheckCircle2 className="size-3 mr-1" />
                          Resolved
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">{alert.description}</p>
                      
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="size-3" />
                        {formatTime(alert.timestamp)}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl mb-4 shadow-xl shadow-green-500/30">
            <CheckCircle2 className="size-10 text-white" />
          </div>
          <h3 className="text-gray-900 text-xl mb-2">All Clear!</h3>
          <p className="text-sm text-gray-500">No alerts at this time</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl shadow-lg shadow-blue-500/10">
        <h4 className="text-blue-900 mb-3 flex items-center gap-2 font-medium">
          <div className="size-2 bg-blue-600 rounded-full" />
          Recommended Actions
        </h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300 rounded-xl shadow-sm h-auto py-3"
            onClick={() => toast.success('Starting ventilation system')}
          >
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg mr-3">
              <Fan className="size-4 text-white" />
            </div>
            <span className="font-medium">Optimize ventilation</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300 rounded-xl shadow-sm h-auto py-3"
            onClick={() => toast.success('Checking irrigation schedule')}
          >
            <div className="bg-gradient-to-br from-cyan-500 to-teal-500 p-2 rounded-lg mr-3">
              <Droplet className="size-4 text-white" />
            </div>
            <span className="font-medium">Check irrigation schedule</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
