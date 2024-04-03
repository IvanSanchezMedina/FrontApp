"use client";

import { useAuth } from "../context/AuthContext"
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

const customTheme = {
    button: {
        color: {
            primary: "bg-red-500 hover:bg-red-600",
        },
    },
};


function NavbarComponent() {
    const { isAuthenticated, logout, user } = useAuth();
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <Navbar fluid rounded>
                <Navbar.Brand href="https://flowbite-react.com">
                    <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="" />
                    {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span> */}
                </Navbar.Brand>
                <div className="flex md:order-2">
                    {
                        isAuthenticated ? (
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                                }
                            >
                                <Dropdown.Header>

                                    <span className="block text-sm">{user.first_name} {user.last_name}</span>
                                    <span className="block truncate text-sm font-medium">{user.email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => {
                                    logout();
                                }}>Sign out</Dropdown.Item>
                            </Dropdown>
                        ) :
                            (
                                <>  </>

                            )
                    }

                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse >
                    <Navbar.Link className="mt-2" href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link className="mt-2" href="#">About</Navbar.Link>
                    <Navbar.Link className="mt-2" href="#">Services</Navbar.Link>
                    <Navbar.Link className="mt-2" href="#">Pricing</Navbar.Link>
                    <Navbar.Link className="mt-2" href="#">Contact</Navbar.Link>
                    <DarkThemeToggle />
                    {isAuthenticated ? (
                        <></>
                    ) : (
                        <Navbar.Link className="mt-2" href="/login">Sing In</Navbar.Link>

                    )}

                </Navbar.Collapse>
            </Navbar>
            
        </Flowbite>

    )
}

export default NavbarComponent