import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/movieList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavourite, toogleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={
          " z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color={"#FFF"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toogleFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? "red" : "#FFF"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      <View
        className="flex-row justify-center"
        style={{
          shadowColor: "grey",
          shadowRadius: 40,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
        }}
      >
        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
          <Image
            source={require("../assets/images/actor1.jpg")}
            style={{ height: height * 0.43, width: width * 0.74 }}
          />
        </View>
      </View>
      <View className="mt-6">
        <Text className="text-3xl text-white font-bold text-center">
          Keanu Reeves
        </Text>
        <Text className="text-base text-neutral-500 text-center">
          London, UK
        </Text>
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 items-center px-2">
            <Text className="text-white font-semibold text-xs">Gender</Text>
            <Text className="text-neural-300 text-xs">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 items-center px-2">
            <Text className="text-white font-semibold text-xs">Birthday</Text>
            <Text className="text-neural-300 text-xs">1982-09-02</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 items-center px-2">
            <Text className="text-white font-semibold text-xs">Known for</Text>
            <Text className="text-neural-300 text-xs">Acting</Text>
          </View>
          <View className="items-center px-2">
            <Text className="text-white font-semibold text-xs">Popularity</Text>
            <Text className="text-neural-300 text-xs">74.24</Text>
          </View>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Keanu Charles Reeves (born September 2, 1964) is a Canadian actor.
            Born in Beirut and raised in Toronto, Reeves began acting in theatre
            productions and in television films before making his feature film
            debut in Youngblood (1986).
          </Text>
        </View>

        {/* movies */}
        <MovieList title={"Movies"} hideSeeAll data={personMovies} />
      </View>
    </ScrollView>
  );
}
