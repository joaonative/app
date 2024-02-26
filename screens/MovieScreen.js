import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";

import { styles, theme } from "../theme";
import Cast from "../components/cast";
import MovieList from "../components/movieList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  let movieName = "Avengers EndGame";

  const { params: item } = useRoute();
  const [isFavourite, toogleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    //call movie details api
  }, [item]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
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
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : "#FFF"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require("../assets/images/moviePoster2.png")}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          ></LinearGradient>
        </View>
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold">
          {movieName}
        </Text>
        {/* status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released 2019 170 min
        </Text>

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          After the devastating events of Avengers: Infinity War (2018), the
          universe is in ruins due to the efforts of the Mad Titan, Thanos. With
          the help of remaining allies, the Avengers must assemble once more in
          order to undo Thanos's actions and undo the chaos to the universe, no
          matter what consequences may be in store, and no matter who they
          face...
        </Text>
      </View>

      {/* cast */}
      <Cast cast={cast} navigation={navigation} />

      {/* similar movies */}
      <MovieList title={"Similar Movies"} hideSeeAll data={similarMovies} />
    </ScrollView>
  );
}
