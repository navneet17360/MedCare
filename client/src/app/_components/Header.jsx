"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import styles from "../../styles/header.module.css";

function Header() {
  const { isLoaded } = useAuth(); // Check if auth state is loaded
  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Explore", path: "/" },
    { id: 3, name: "Contact Us", path: "/" },
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
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
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
                <button className={styles.getStarted}>Get started</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </>
        ) : (
          <button className={styles.getStarted} disabled>
            Loading...
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;