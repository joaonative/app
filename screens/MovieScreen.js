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
import Loading from "../components/loading";
import {
  fallBackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  let movieName = "Avengers EndGame";

  const { params: item } = useRoute();
  const [isFavourite, toogleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    //console.log("itemid:", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    //console.log("movie_details:", data);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    //console.log("movie_credits:", data);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    //console.log("similar_movies:", data);
    if (data && data.results) setSimilarMovies(data.results);
  };

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

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/images/moviePoster2.png")}
              source={{
                uri: image500(movie.poster_path) || fallBackMoviePoster,
              }}
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
        )}
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold">
          {movie.title}
        </Text>
        {/* status, release, runtime */}
        {movie.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie.status} · {movie.release_date.split("-")[0]} ·{" "}
            {movie.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.slice(0, 3).map((genre, index) => {
            let showDot = index < movie.genres.length - 1;
            return (
              <Text
                className="text-neutral-400 font-semibold text-base text-center"
                key={index}
              >
                {genre.name} {showDot ? "·" : null}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}
      <Cast cast={cast} navigation={navigation} />

      {/* similar movies */}
      <MovieList title={"Similar Movies"} hideSeeAll data={similarMovies} />
    </ScrollView>
  );
}
