"use client";

import Footer from "@/components/UI_components/footer/Footer";
import Header from "@/components/UI_components/header/Header";
import { getApiConfiguration, getGenres } from "@/redux/homeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchDataFromApi } from "@/utils/api";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  // const { url } = useAppSelector((state) => state.home);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises: any = [];
    let endPoints = ["tv", "movie"];
    let allGenres: any = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item: any) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
