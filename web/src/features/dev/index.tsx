import {useState} from "react";
import {AspectRatio, ActionIcon, Drawer, Stack, Divider, Button, Image, Text, Group, Box, ThemeIcon} from "@mantine/core";
import {IoSettingsSharp, IoClose, IoCodeSlash, IoBug, IoScanOutline} from "react-icons/io5";
import {debugTarget} from "./debug/target";

const Dev: React.FC = () => {
    const [opened, setOpened] = useState(false);
    
    return (
        <>
            <ActionIcon onClick={() => setOpened(true)} variant="subtle" color="#FF2442" size="xl" radius="xl" aria-label="Settings" style={{position: "absolute", bottom: 20, right: 20, width: 50, height: 50, backdropFilter: "blur(14px)", background: "rgba(0, 0, 0, 0.05)", border: "2px solid rgba(255, 255, 255, 0.1)"}}>
                <IoSettingsSharp style={{width: "50%", height: "50%"}} size={20}/>
            </ActionIcon>
            <Drawer onClose={() => setOpened(false)} opened={opened} title={<Group><ThemeIcon size="lg" variant="light" color="#FF2442" radius="xl"><IoCodeSlash size={20}/></ThemeIcon><Text fw={700} size="lg">Nova Studios Developer</Text></Group>} closeButtonProps={{icon: <IoClose size={20}/>}} offset={8} radius="md" size="sm" styles={{header: {display: "none"}, content: {backdropFilter: "blur(14px)", background: "rgba(0, 0, 0, 0.05)", padding: 0, border: "2px solid rgba(255, 255, 255, 0.1)"}}}>
                <Box p={20}>
                    <Group justify="space-between" align="center">
                        <Group><ThemeIcon size="lg" variant="light" color="#FF2442" radius="xl"><IoCodeSlash size={20}/></ThemeIcon><Text fw={700} size="lg">Nova Studios Developer</Text></Group>
                        <ActionIcon onClick={() => setOpened(false)} variant="subtle" size="lg" color="#FF2442">
                            <IoClose size={20}/>
                        </ActionIcon>
                    </Group>
                </Box>
                <Box p="0 20px 20px 20px">
                    <Box mb={30}>
                        <AspectRatio ratio={16/9} mb={20}>
                            <Image radius="md" fit="contain" src="https://media.discordapp.net/attachments/1327728617320484954/1337806594557345822/NovaStudiosType3.png?ex=67a8c8fb&is=67a7777b&hm=bf1b81a78ff3f642d03441c8e7a21cdbe0c320ff3a4a0040b158c7d02feff0a2&=&format=webp&quality=lossless&width=456&height=211"/>
                        </AspectRatio>
                        <Text c="dimmed" size="sm" ta="center">Development Tools & Debug Interface</Text>
                    </Box>
                    <Stack gap="md">
                        <Divider label={<Group gap="xs"><IoBug size={16}/><Text fw={500}>Debug Tools</Text></Group>} labelPosition="center"/>
                        <Button 
                            variant="light" 
                            color="#FF2442" 
                            fullWidth 
                            leftSection={<IoScanOutline size={16}/>} 
                            onClick={() => debugTarget()}
                        >
                            Open Target Menu
                        </Button>
                    </Stack>
                    <Text c="dimmed" size="xs" ta="center" mt={30}>Version 1.0.0 • Nova Studios © 2024</Text>
                </Box>
            </Drawer>
        </>
    );
};

export default Dev;