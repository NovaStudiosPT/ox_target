import { debugData } from '../../../utils/debugData';
import { TargetData } from '../../../typings/target';

export const debugTarget = () => {
    debugData<TargetData>([
        {
            action: 'setTarget',
            data: {
                options: {
                    __global: [
                        {
                            icon: 'FaBox',
                            label: 'Debug Box',
                            name: 'debug_box'
                        },
                        {
                            icon: 'ImSphere',
                            label: 'Debug Sphere',
                            name: 'debug_sphere'
                        }
                    ],
                    vehicle: [
                        {
                            icon: 'FaCar',
                            label: 'Debug Vehicle',
                            name: 'debug_vehicle'
                        }
                    ]
                },
                zones: [
                    [
                        {
                            icon: 'GiDeathZone',
                            label: 'Debug Zone',
                            name: 'debug_zone'
                        }
                    ]
                ]
            }
        }
    ]);
};