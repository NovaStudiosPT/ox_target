import React, { useState } from 'react';
import { Box, Stack, Group, Text, Center, Transition } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { Option, TargetData, VisibilityData } from '../../typings/target';
import * as Io5Icons from 'react-icons/io5';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as Si from 'react-icons/si';
import * as Ti from 'react-icons/ti';
import * as Wi from 'react-icons/wi';
import * as Di from 'react-icons/di';

const iconSets = {
    fa: FaIcons,
    fa6: Fa6Icons,
    md: MdIcons,
    ri: RiIcons,
    ai: AiIcons,
    bi: BiIcons,
    bs: BsIcons,
    fi: FiIcons,
    gi: GiIcons,
    hi: HiIcons,
    im: ImIcons,
    si: Si,
    ti: Ti,
    wi: Wi,
    di: Di,
    io5: Io5Icons,
    io: IoIcons
};

const Target: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState<Array<{
        type: string;
        option: Option;
        id: number;
        zoneId?: number;
    }>>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useNuiEvent<VisibilityData>('visible', ({ state }) => {
        setVisible(state);
        if (!state) {
            setOptions([]);
            setSelectedIndex(null);
        }
    });

    useNuiEvent('leftTarget', () => {
        setOptions([]);
        setSelectedIndex(null);
    });

    useNuiEvent<TargetData>('setTarget', (data) => {
        if (!data) return;

        const newOptions: Array<{
            type: string;
            option: Option;
            id: number;
            zoneId?: number;
        }> = [];

        if (data.options) {
            Object.entries(data.options).forEach(([type, typeOptions]) => {
                if (Array.isArray(typeOptions)) {
                    typeOptions.forEach((option, index) => {
                        if (!option.hide) {
                            newOptions.push({
                                type,
                                option,
                                id: index + 1
                            });
                        }
                    });
                }
            });
        }

        if (Array.isArray(data.zones)) {
            data.zones.forEach((zoneOptions, zoneIndex) => {
                if (Array.isArray(zoneOptions)) {
                    zoneOptions.forEach((option, optionIndex) => {
                        if (!option.hide) {
                            newOptions.push({
                                type: 'zones',
                                option,
                                id: optionIndex + 1,
                                zoneId: zoneIndex + 1
                            });
                        }
                    });
                }
            });
        }

        setOptions(newOptions);
        setVisible(true);
        setSelectedIndex(null);
    });

    const handleSelect = async (type: string, id: number, zoneId?: number) => {
        try {
            const selectData = zoneId ? [type, id, zoneId] : [type, id];
            await fetchNui('select', selectData);
            setOptions([]);
            setVisible(false);
            setSelectedIndex(null);
        } catch (error) {}
    };

    const getIcon = (iconName: string) => {
        const prefix = iconName.substring(0, 2).toLowerCase();
        const selectedSet = iconSets[prefix as keyof typeof iconSets];
        return (selectedSet?.[iconName as keyof typeof selectedSet] || Io5Icons.IoEllipsisHorizontalOutline) as React.ComponentType<{ size?: number }>;
    };

    if (!visible) return null;

    return (
        <Box w="100%" h="100%" style={{ userSelect: 'none', position: 'relative' }}>
            <Center style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Box 
                    style={{ 
                        color: options.length > 0 ? '#FF2442' : '#000000',
                        opacity: 0.8,
                        transition: 'all 0.2s ease',
                        transform: options.length > 0 ? 'scale(1.1)' : 'scale(1)',
                        filter: options.length > 0 ? 'drop-shadow(0 0 8px rgba(255, 36, 66, 0.3))' : 'none'
                    }}
                >
                    <Io5Icons.IoEyeOutline size={36} />
                </Box>
            </Center>

            <Transition mounted={options.length > 0} transition="slide-left" duration={200}>
                {(styles) => (
                    <Box
                        style={{
                            position: 'absolute',
                            top: 'calc(48.4%)',
                            left: 'calc(50% + 18pt)',
                            minWidth: 290,
                            maxWidth: 400,
                            zIndex: 100,
                            overflow: 'hidden'
                        }}
                    >
                        <Stack gap={2} p={4}>
                            {options.map(({ type, option, id, zoneId }, index) => {
                                if (option.hide) return null;
                                const IconComponent = getIcon(option.icon);
                                const isSelected = selectedIndex === index;

                                return (
                                    <Box
                                        key={`${type}-${id}-${zoneId || ''}`}
                                        onClick={() => handleSelect(type, id, zoneId)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        style={{
                                            width: '100%',
                                            height: '40px',
                                            transition: 'all 0.2s ease',
                                            background: 'rgba(255, 36, 66, 0.1)',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0 12px',
                                            border: isSelected ? '1px solid rgba(255, 36, 66, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
                                        }}
                                        >
                                        <Group gap={12} style={{ flex: 1, margin: 0 }}>
                                            <Box 
                                                style={{ 
                                                    color: isSelected ? '#FF2442' : '#cfd2da',
                                                    transition: 'all 0.2s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <IconComponent size={16} />
                                            </Box>
                                            <Text 
                                                style={{ 
                                                    color: isSelected ? '#FF2442' : '#cfd2da',
                                                    fontFamily: 'Nunito, sans-serif',
                                                    fontWeight: isSelected ? 600 : 500,
                                                    fontSize: '13px',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                {option.label}
                                            </Text>
                                        </Group>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Box>
                )}
            </Transition>
        </Box>
    );
};

export default Target;