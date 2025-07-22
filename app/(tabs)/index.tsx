import React, { useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CalendarWidget from "@/components/CalendarWidget";
import WorkoutCard from "@/components/WorkoutCard";
import StatusCard from "@/components/StatusCard";
import {
  faDroplet,
  faFaceLaugh,
  faPersonWalking,
} from "@fortawesome/pro-solid-svg-icons";
import { SheetManager } from "react-native-actions-sheet";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // Get current time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning,";
    } else if (hour < 17) {
      return "Good afternoon,";
    } else {
      return "Good evening,";
    }
  };

  // Header animation values
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const topBarOpacity = scrollY.interpolate({
    inputRange: [60, 120],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const topBarTranslateY = scrollY.interpolate({
    inputRange: [60, 120],
    outputRange: [-60, 0],
    extrapolate: "clamp",
  });

  // SheetManager.show("mood-sheet");
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        {/* Animated Top Bar */}
        <Animated.View
          style={[
            styles.topBar,
            {
              paddingTop: insets.top,
              height: 60 + insets.top,
              opacity: topBarOpacity,
              transform: [{ translateY: topBarTranslateY }],
            },
          ]}
        >
          <Text style={styles.topBarText}>20th June</Text>
        </Animated.View>

        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Animated Header */}
          <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.username}>Molly!</Text>
          </Animated.View>
          {/* Header with Calendar */}
          <CalendarWidget currentDate={new Date()} />
          <View style={styles.contentPadding}>
            {/* Today's Workout Section */}
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#E3E3E3",
                marginHorizontal: 16,
                marginBottom: 32,
                marginTop: 0,
              }}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Todays Workout</Text>
              <WorkoutCard
                title="Low Impact Workout"
                difficulty="Medium"
                duration="45min"
                exercises={8}
                onPress={() => {
                  // Handle workout press
                  console.log("Workout pressed");
                }}
              />
            </View>

            {/* How are you feeling today section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                How are you feeling today?
              </Text>

              <View style={styles.cardsGrid}>
                <View style={styles.cardRow}>
                  <View style={styles.halfCard}>
                    <StatusCard
                      type="Period"
                      title="Light"
                      subtitle="Day 1"
                      status="completed"
                      color="#E29A96"
                      onPress={() => console.log("Period log pressed")}
                      icon={faDroplet}
                    />
                  </View>
                  <View style={styles.halfCard}>
                    <StatusCard
                      type="Mood"
                      title="Happy"
                      subtitle="-"
                      status="add"
                      color="#D196E2"
                      onPress={() => {
                        SheetManager.show("mood-sheet");
                      }}
                      icon={faFaceLaugh}
                    />
                  </View>
                </View>

                <View style={styles.fullCard}>
                  <StatusCard
                    type="Workout"
                    title="Logged"
                    subtitle="Moderate"
                    status="add"
                    color="#ECCD97"
                    onPress={() => console.log("Workout log pressed")}
                    icon={faPersonWalking}
                  />
                </View>
              </View>
            </View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F1",
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F2F2F1",
    zIndex: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 12,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B2E46",
  },
  scrollView: {
    flex: 1,
    paddingTop: 30,
  },
  contentPadding: {
    paddingTop: 20,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "700",
    color: "#614178",
    marginBottom: 4,
  },
  username: {
    fontSize: 32,
    fontWeight: "300",
    color: "#9294AC",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#614178",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  cardsGrid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfCard: {
    flex: 1,
  },
  fullCard: {
    width: "100%",
  },
});
