import { useEffect, useState } from 'react';
import { Thermometer, Droplets, Sprout, Sun, Wind, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightIntensity: number;
  co2: number;
}

interface Parameter {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: typeof Thermometer;
  optimal: { min: number; max: number };
  gradient: string;
  glowColor: string;
}

export function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 24,
    humidity: 65,
    soilMoisture: 55,
    lightIntensity: 78,
    co2: 420,
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 2)),
        lightIntensity: Math.max(0, Math.min(100, prev.lightIntensity + (Math.random() - 0.5) * 5)),
        co2: Math.max(300, Math.min(600, prev.co2 + (Math.random() - 0.5) * 10)),
      }));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const parameters: Parameter[] = [
    {
      id: 'temperature',
      label: 'Temperature',
      value: sensorData.temperature,
      unit: '°C',
      icon: Thermometer,
      optimal: { min: 20, max: 28 },
      gradient: 'from-orange-500 to-red-500',
      glowColor: 'shadow-orange-500/20',
    },
    {
      id: 'humidity',
      label: 'Humidity',
      value: sensorData.humidity,
      unit: '%',
      icon: Droplets,
      optimal: { min: 50, max: 70 },
      gradient: 'from-blue-500 to-cyan-500',
      glowColor: 'shadow-blue-500/20',
    },
    {
      id: 'soilMoisture',
      label: 'Soil Moisture',
      value: sensorData.soilMoisture,
      unit: '%',
      icon: Sprout,
      optimal: { min: 40, max: 60 },
      gradient: 'from-green-600 to-emerald-500',
      glowColor: 'shadow-green-500/20',
    },
    {
      id: 'lightIntensity',
      label: 'Light Intensity',
      value: sensorData.lightIntensity,
      unit: '%',
      icon: Sun,
      optimal: { min: 60, max: 85 },
      gradient: 'from-yellow-500 to-amber-500',
      glowColor: 'shadow-yellow-500/20',
    },
    {
      id: 'co2',
      label: 'CO₂ Level',
      value: sensorData.co2,
      unit: 'ppm',
      icon: Wind,
      optimal: { min: 400, max: 500 },
      gradient: 'from-purple-500 to-violet-500',
      glowColor: 'shadow-purple-500/20',
    },
  ];

  const getStatus = (value: number, optimal: { min: number; max: number }) => {
    if (value < optimal.min) return { status: 'Low', variant: 'destructive' as const, trend: 'down' };
    if (value > optimal.max) return { status: 'High', variant: 'destructive' as const, trend: 'up' };
    return { status: 'Optimal', variant: 'default' as const, trend: null };
  };

  const alertCount = parameters.filter(p => {
    const { status } = getStatus(p.value, p.optimal);
    return status !== 'Optimal';
  }).length;

  return (
    <div className="p-4 pb-6 min-h-full bg-gradient-to-b from-green-50/50 to-white">
      {/* Header Info */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-gray-900 text-2xl">Dashboard</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
              <Activity className="size-4 text-green-600 animate-pulse" />
              Real-time monitoring
            </p>
          </div>
          <div className="text-right bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400">Last update</p>
            <p className="text-sm text-gray-700 font-medium">{lastUpdate.toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Alert Summary */}
        {alertCount > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-red-500/10">
            <div className="size-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">
                {alertCount} parameter{alertCount > 1 ? 's' : ''} need attention
              </p>
              <p className="text-xs text-red-600 mt-0.5">Values outside optimal range</p>
            </div>
          </div>
        )}
      </div>

      {/* Parameter Cards */}
      <div className="space-y-4">
        {parameters.map((param) => {
          const Icon = param.icon;
          const { status, variant, trend } = getStatus(param.value, param.optimal);
          const isOptimal = status === 'Optimal';
          
          return (
            <Card 
              key={param.id} 
              className={`p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:scale-[1.02] ${
                isOptimal ? 'border-green-200 bg-gradient-to-br from-white to-green-50/30' : 'border-red-200 bg-gradient-to-br from-white to-red-50/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`bg-gradient-to-br ${param.gradient} p-4 rounded-2xl shadow-lg ${param.glowColor} relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                    <Icon className="size-7 text-white relative z-10 drop-shadow-md" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{param.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-gray-900">
                        {param.value.toFixed(1)}
                      </p>
                      <span className="text-lg text-gray-500">{param.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge 
                    variant={variant}
                    className={`${
                      isOptimal 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-md' 
                        : 'bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-md'
                    } px-3 py-1`}
                  >
                    {status}
                  </Badge>
                  {trend && (
                    <div className="flex items-center gap-1 bg-red-100 rounded-lg px-2 py-1">
                      {trend === 'up' ? (
                        <TrendingUp className="size-4 text-red-600" />
                      ) : (
                        <TrendingDown className="size-4 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Optimal: {param.optimal.min}-{param.optimal.max} {param.unit}</span>
                  <span className="font-medium">{((param.value / (param.optimal.max * 1.5)) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOptimal 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-red-500 to-orange-500'
                    } shadow-lg`}
                    style={{
                      width: `${Math.min(100, (param.value / (param.optimal.max * 1.5)) * 100)}%`
                    }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* System Status */}
      <Card className="mt-6 p-5 bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-xl shadow-green-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-100">System Status</p>
            <p className="text-white text-lg font-medium mt-1">All sensors online</p>
          </div>
          <div className="relative">
            <div className="size-4 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" />
            <div className="absolute inset-0 size-4 bg-white rounded-full animate-ping" />
          </div>
        </div>
      </Card>
    </div>
  );
}
