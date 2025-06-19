"use client";
import { Content } from "@prismicio/client";
import WordMark from "./WordMark";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export const NavBar = ({ settings }: NavBarProps) => {
  return (
    <nav className="px-4 py-4 md:px-6 md-:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center ">
        <Link href={"/"}>
          <WordMark />
          <span className="sr-only">Glisten.ai Home Page</span>
        </Link>
        <ul className="flex gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.label}>
              <PrismicNextLink
                className="inline-flex max-h-11 items-center"
                field={item.link}
              >
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
