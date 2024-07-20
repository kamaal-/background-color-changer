import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useColorChange from "@/hooks/useColorChange";
import "../../lib/web.css"
import RangeSlider from "@/components/range-slider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { handleColorChange, hslColorString, textColor, setSaturate, saturate, light, setLight} = useColorChange();

  return (Platform.OS === 'web') ? (
      <div onClick={() => {handleColorChange()}} className={"screen-h screen-w flex main-content relative"} style={{backgroundColor: hslColorString}}>
          <div className={"absolute settings"}>
              <RangeSlider value={saturate} setValue={setSaturate} />
              <RangeSlider value={light} setValue={setLight} />
          </div>
          <div  style={{color: textColor}}>Hello there</div>
      </div>
      ) : (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
