import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState<boolean>();

  const { push } = useRouter();
  const location = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && query.length > 0) {
      push(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type: string) => {
    if (type === "movie") {
      push("/explore/movie");
    } else {
      push("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header
      className={`fixed translate-y-0 w-full h-16 z-10 flex items-center justify-center transition-all duration-500  ${
        mobileMenu ? "bg-black" : ""
      } ${show}`}
    >
      <ContentWrapper>
        <div className="cursor-pointer " onClick={() => push("/")}>
          <Image src={logo} alt="logo" height={50} width={50} />
        </div>
        <ul className="list-none hidden md:flex items-center">
          <li
            className="h-12 flex items-center my-4 text-white relative cursor-pointer hover:text-pink-500"
            onClick={() => navigationHandler("movie")}
          >
            Movies
          </li>
          <li
            className="h-12 items-center my-4 text-white relative cursor-pointer hover:text-pink-500"
            onClick={() => navigationHandler("tv")}
          >
            TV Shows
          </li>
          <li className="h-12 items-center my-4 text-white relative cursor-pointer hover:text-pink-500 ">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="flex items-center gap-5 md:hidden">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
