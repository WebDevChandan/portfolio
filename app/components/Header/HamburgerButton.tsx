"use client";
import { useEffect } from 'react';
import { activateSideLink } from "../Sidebar/SideMenuLinks";

export const toggleMainMenuBar = (currentElement?: HTMLElement) => {
  const mainMenu = document.querySelector('.nav-menu');
  mainMenu?.classList.toggle("open");

  if (currentElement && !currentElement?.classList.contains('active')) {
    activateNavLink(currentElement.getAttribute('href')?.replace(/[/]/g, ""));
  }
}

export const activateNavLink = (pathName?: string | null) => {
  const linkList = document.querySelector('.nav-menu-inner ul')?.childNodes;

  linkList?.forEach((item) => {
    const link = item.firstChild as HTMLElement;
    if (link.getAttribute('href')?.replace(/[/]/g, "") === pathName) {
      link.classList.add("active", "inner-shadow");
      link.classList.remove("outer-shadow", "hover-in-shadow");

    } else if (link.classList.contains('active')) {
      link.classList.remove("active", "inner-shadow");
      link.classList.add("outer-shadow", "hover-in-shadow");
    }
  })

  activateSideLink(pathName);
}

export default function HamburgerButton() {

  useEffect(() => {
    const pathName = window.location.pathname.replace(/[/]/g, "") as string;
    activateNavLink(pathName);
  });

  return (
    <div className="hamburger-btn outer-shadow hover-in-shadow" onClick={() => toggleMainMenuBar()}>
      <span>
      </span>
    </div>
  )
}
