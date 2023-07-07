import Icon from "react-native-paper/src/components/Icon";
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

// TODO: use paper bottom nav
// https://callstack.github.io/react-native-paper/docs/components/BottomNavigation/
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beats',
          tabBarIcon: ({ color }) => <Icon color={color} size={25} source="playlist-music" />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Icon
                    source="information-outline"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="beat-tracker"
        options={{
          title: 'Beat Tracker',
          tabBarIcon: ({ color }) => <Icon color={color} size={25} source="music-box" />,
        }}
      />
        <Tabs.Screen
          name="auto-scroller"
          options={{
            title: 'Auto Scroller',
            tabBarIcon: ({ color }) => <Icon color={color} size={25} source="bullhorn-outline" />,
          }}
        />
    </Tabs>
  );
}
