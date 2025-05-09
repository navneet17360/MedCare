"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../styles/header.module.css";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Log the user's email when the user is loaded and signed in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log(
        "Authenticated user email:",
        user.primaryEmailAddress?.emailAddress
      );
    }
  }, [isLoaded, isSignedIn, user]);

  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Explore", path: "/explore" },
    { id: 3, name: "Contact Us", path: "/contact-us" },
    isSignedIn && { id: 4, name: "Appointments", path: "/appointments" },
  ].filter(Boolean);

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("Please log in first to explore!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setIsLoading(true);
      router.push("/explore", { scroll: false });
    }
  };

  const handleNavigation = (path) => {
    setIsLoading(true);
    router.push(path, { scroll: false });
  };

  // Handle route change events with minimal timeout
  useEffect(() => {
    const handleRouteChangeStart = () => {
      console.log("Route change started");
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      console.log("Route change completed");
      setIsLoading(false);
    };

    const handleRouteChangeError = () => {
      console.log("Route change error");
      setIsLoading(false);
    };

    // Minimal timeout (2 seconds) to prevent spinner from persisting
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Loading timeout reached (2s), hiding spinner.");
        setIsLoading(false);
      }
    }, 2000);

    router.events?.on("routeChangeStart", handleRouteChangeStart);
    router.events?.on("routeChangeComplete", handleRouteChangeComplete);
    router.events?.on("routeChangeError", handleRouteChangeError);

    return () => {
      clearTimeout(timeout);
      router.events?.off("routeChangeStart", handleRouteChangeStart);
      router.events?.off("routeChangeComplete", handleRouteChangeComplete);
      router.events?.off("routeChangeError", handleRouteChangeError);
    };
  }, [router, isLoading]);

  return (
    <div
      className="d-flex align-items-center justify-content-between p-4 position-relative"
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Loading Spinner Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay} aria-busy="true">
          <div className={styles.spinner}></div>
        </div>
      )}

      <div className="d-flex align-items-center gap-6">
        <Link
          href="/"
          prefetch={true}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/");
          }}
        >
          <Image src="/logo.svg" alt="logo" width={180} height={80} priority />
        </Link>
        <ul className="d-none d-md-flex gap-3 list-unstyled">
          {Menu.map((item) => (
            <li className={styles.listItem} key={item.id}>
              <Link
                href={item.path}
                className={styles.linkText}
                prefetch={item.path !== "/appointments"}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.name === "Explore") {
                    handleExploreClick(e);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.authContainer}>
        {isLoaded ? (
          <>
            <SignedOut>
              <SignInButton mode="modal">
                <button className={styles.getStarted}>Get Started</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </>
        ) : (
          <button className={styles.getStarted} disabled>
            Get Started
          </button>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Header;
