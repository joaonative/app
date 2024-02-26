import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar & logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={32} strokeWidth={2} color={"#FFF"} />
          <Text className="text-white text-2xl font-bold">
            <Text style={styles.text}>L</Text>
            enda <Text style={styles.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={32} strokeWidth={2} color={"#FFF"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* trending movies carousel */}
        <TrendingMovies data={trending} />

        {/* upcoming movies row*/}
        <MovieList title="Upcoming" data={upcoming} />

        {/* top rated movies row*/}
        <MovieList title="Top Rated" data={topRated} />
      </ScrollView>
    </View>
  );
}
