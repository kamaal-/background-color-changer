import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useColorChange from "@/hooks/useColorChange";
import "../../lib/web.css";
import RangeSlider from "@/components/range-slider";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import AllColors from "@/components/all-colors";
import { IntRange } from "@/lib/types";

export default function TabLayout() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const colorScheme = useColorScheme();
  const {
    handleColorChange,
    hslColorString,
    textColor,
    setSaturate,
    saturate,
    light,
    setLight,
    colors,
    setCurrentColorIndex,
    currentColorIndex,
  } = useColorChange();

  const [fontsLoaded] = useFonts({ Inter_400Regular });
  if (!fontsLoaded) {
    return null;
  }

  const handleClick = (event: React.MouseEvent) => {
    if (!ref.current) return;
    event.stopPropagation();
    const light = ((event.clientY / ref.current?.offsetHeight) *
      100) as IntRange<0, 100>;
    const saturate = ((event.clientX / ref.current?.offsetWidth) *
      100) as IntRange<0, 100>;
    handleColorChange(saturate, light);
  };

  return Platform.OS === "web" ? (
    <div
      ref={ref}
      onClick={handleClick}
      className={"screen-h screen-w flex main-content relative"}
      style={{
        backgroundColor: hslColorString,
        fontFamily: "Inter_400Regular",
      }}
    >
      <AllColors
        colors={colors}
        selectedIndex={currentColorIndex}
        setSelectedIndex={setCurrentColorIndex}
      />

      <div className={"absolute settings flex"}>
        <RangeSlider
          label={"Saturation"}
          name={"saturate"}
          value={saturate}
          setValue={setSaturate}
        />
        <RangeSlider
          label={"Brightness"}
          name={"brightness"}
          value={light}
          setValue={setLight}
        />
      </div>
      <div
        className={"text-lg"}
        style={{ color: textColor, userSelect: "none" }}
      >
        Hello there
      </div>
    </div>
  ) : (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
