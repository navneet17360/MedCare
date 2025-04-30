import React from "react";
import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";

function Header() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/",
    },
  ];

  return (
    <div
      className="d-flex align-items-center justify-content-between p-4"
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Light shadow below
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Light border at the bottom
      }}
    >
      <div className="d-flex align-items-center gap-6">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
        <ul className="d-none d-md-flex gap-3 list-unstyled">
          {Menu.map((item, index) => (
            <li className={styles.listItem} key={index}>
              <Link href={item.path} className={styles.linkText}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.getStarted}>Get started</button>
    </div>
  );
}

export default Header;
