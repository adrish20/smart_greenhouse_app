import { useState } from 'react';
import { Fan, Droplet, Lightbulb, Power, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface Actuator {
  id: string;
  name: string;
  description: string;
  icon: typeof Fan;
  status: boolean;
  intensity?: number;
  hasIntensity: boolean;
  gradient: string;
  glowColor: string;
}

export function Controls() {
  const [actuators, setActuators] = useState<Actuator[]>([
    {
      id: 'ventilation',
      name: 'Ventilation Fan',
      description: 'Controls air circulation',
      icon: Fan,
      status: false,
      intensity: 60,
      hasIntensity: true,
      gradient: 'from-blue-500 to-cyan-500',
      glowColor: 'shadow-blue-500/30',
    },
    {
      id: 'pump',
      name: 'Water Pump',
      description: 'Irrigation system',
      icon: Droplet,
      status: false,
      hasIntensity: false,
      gradient: 'from-cyan-500 to-teal-500',
      glowColor: 'shadow-cyan-500/30',
    },
    {
      id: 'lights',
      name: 'Grow Lights',
      description: 'Supplemental lighting',
      icon: Lightbulb,
      status: true,
      intensity: 75,
      hasIntensity: true,
      gradient: 'from-yellow-500 to-orange-500',
      glowColor: 'shadow-yellow-500/30',
    },
  ]);

  const toggleActuator = (id: string) => {
    setActuators(prev => 
      prev.map(actuator => {
        if (actuator.id === id) {
          const newStatus = !actuator.status;
          toast.success(
            `${actuator.name} turned ${newStatus ? 'ON' : 'OFF'}`,
            {
              description: newStatus ? 'Device is now running' : 'Device has been stopped',
            }
          );
          return { ...actuator, status: newStatus };
        }
        return actuator;
      })
    );
  };

  const updateIntensity = (id: string, value: number[]) => {
    setActuators(prev =>
      prev.map(actuator =>
        actuator.id === id ? { ...actuator, intensity: value[0] } : actuator
      )
    );
  };

  const turnOffAll = () => {
    setActuators(prev => prev.map(actuator => ({ ...actuator, status: false })));
    toast.success('All devices turned OFF');
  };

  const activeCount = actuators.filter(a => a.status).length;

  return (
    <div className="p-4 pb-6 min-h-full bg-gradient-to-b from-blue-50/50 to-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-gray-900 text-2xl mb-1">Controls</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <Zap className="size-4 text-blue-600" />
          Manage greenhouse devices
        </p>
      </div>

      {/* Status Summary */}
      <Card className="p-5 mb-6 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-lg shadow-blue-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Active Devices</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {activeCount} <span className="text-lg text-gray-500">/ {actuators.length}</span>
              </p>
              <span className="text-sm text-gray-500">running</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={turnOffAll}
            disabled={activeCount === 0}
            className="text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 rounded-xl shadow-sm"
          >
            <Power className="size-4 mr-2" />
            Turn Off All
          </Button>
        </div>
      </Card>

      {/* Actuator Controls */}
      <div className="space-y-4">
        {actuators.map((actuator) => {
          const Icon = actuator.icon;
          
          return (
            <Card 
              key={actuator.id} 
              className={`p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                actuator.status 
                  ? 'border-green-300 bg-gradient-to-br from-white to-green-50/50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`bg-gradient-to-br ${actuator.gradient} p-4 rounded-2xl shadow-lg ${actuator.glowColor} relative overflow-hidden ${
                    actuator.status ? 'ring-4 ring-green-400 ring-offset-2' : ''
                  }`}>
                    <div className={`absolute inset-0 bg-white/20 ${actuator.status ? 'animate-shimmer' : ''}`} />
                    <Icon className={`size-7 text-white relative z-10 drop-shadow-md ${actuator.status ? 'animate-pulse' : ''}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900 text-lg">{actuator.name}</h3>
                      {actuator.status && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-100 px-3 py-1 rounded-full font-medium shadow-sm">
                          <div className="size-2 bg-green-600 rounded-full animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{actuator.description}</p>
                  </div>
                </div>

                <Switch
                  checked={actuator.status}
                  onCheckedChange={() => toggleActuator(actuator.id)}
                  className="ml-2 data-[state=checked]:bg-green-500"
                />
              </div>

              {/* Intensity Control */}
              {actuator.hasIntensity && actuator.status && (
                <div className="mt-5 pt-5 border-t-2 border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Intensity Level</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-lg shadow-md">
                        <span className="font-bold">{actuator.intensity}%</span>
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[actuator.intensity || 50]}
                    onValueChange={(value) => updateIntensity(actuator.id, value)}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      Low
                    </span>
                    <span className="flex items-center gap-1">
                      High
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </span>
                  </div>
                </div>
              )}

              {/* Status Message when OFF */}
              {!actuator.status && (
                <div className="mt-4 pt-4 border-t-2 border-gray-100">
                  <p className="text-xs text-gray-400 flex items-center gap-2">
                    <div className="size-2 bg-gray-400 rounded-full" />
                    Device is currently off
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-gray-900 text-lg mb-4 flex items-center gap-2">
          <Zap className="size-5 text-yellow-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-3 border-2 border-blue-200 hover:border-blue-300 bg-gradient-to-br from-white to-blue-50 hover:to-blue-100 rounded-2xl shadow-md hover:shadow-lg transition-all"
            onClick={() => {
              setActuators(prev => prev.map(a => 
                a.id === 'ventilation' || a.id === 'pump' ? { ...a, status: true } : a
              ));
              toast.success('Cooling mode activated');
            }}
          >
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
              <Fan className="size-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900">Cool Down</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-3 border-2 border-cyan-200 hover:border-cyan-300 bg-gradient-to-br from-white to-cyan-50 hover:to-cyan-100 rounded-2xl shadow-md hover:shadow-lg transition-all"
            onClick={() => {
              setActuators(prev => prev.map(a => 
                a.id === 'pump' ? { ...a, status: true } : a
              ));
              toast.success('Watering system activated');
            }}
          >
            <div className="bg-gradient-to-br from-cyan-500 to-teal-500 p-3 rounded-xl shadow-lg">
              <Droplet className="size-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900">Water Now</span>
          </Button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl shadow-md">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-sm font-medium text-amber-900 mb-1">Pro Tip</p>
            <p className="text-xs text-amber-700">
              Monitor the dashboard while adjusting controls to ensure optimal conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
