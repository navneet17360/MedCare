"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import styles from "../../styles/header.module.css";

function Header() {
  const { isLoaded } = useAuth();
  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Explore", path: "/explore" },
    { id: 3, name: "Contact Us", path: "/contact-us" },
  ];

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
              <Link href={item.path} className={styles.linkText}>
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
      </div>
    </div>
  );
}

export default Header;
