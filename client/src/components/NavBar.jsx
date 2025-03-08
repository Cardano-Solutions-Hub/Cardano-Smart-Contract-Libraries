import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu, NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { lable: "Home", link: "/" },
    { label: "Contract Library", link: "/contract-library" },
    { label: "Documentation", link: "/documentation" },
    { label: "Help?", link: "/help" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-xl text-black">
            Forg<b>eS</b>mith
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/" className="text-black">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contract-library" className="text-black">
            Contract Library
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/documentation" className="text-black">
            Documentation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/help" className="text-black">
            Help?
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={`${item.link}`}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBar;