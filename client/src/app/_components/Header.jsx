"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser, // 👈 Import useUser
} from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../styles/header.module.css";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser(); // 👈 Get user from useUser
  const router = useRouter();

  // Log the user's email when the user is loaded and signed in
  React.useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log("Authenticated user email:", user.primaryEmailAddress?.emailAddress);
    }
  }, [isLoaded, isSignedIn, user]); // Dependencies for useEffect

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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      router.push("/explore");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between p-4"
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="d-flex align-items-center gap-6">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={180} height={80} />
        </Link>
        <ul className="d-none d-md-flex gap-3 list-unstyled">
          {Menu.map((item) => (
            <li className={styles.listItem} key={item.id}>
              <Link
                href={item.path}
                className={styles.linkText}
                onClick={item.name === "Explore" ? handleExploreClick : null}
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