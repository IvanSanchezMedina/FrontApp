"use client";

import { useAuth } from "../context/AuthContext"
import { Avatar, Dropdown, Navbar, Label, TextInput } from "flowbite-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { HiSearch, HiCursorClick, HiBookmark,HiUser } from "react-icons/hi";
import { IoLanguage } from "react-icons/io5";
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
                    <img src="https://stage.akayamedia.com/img/logo%20blanco.png" className="mr-3 h-6 sm:h-9" alt="" />
                    {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span> */}
                </Navbar.Brand>
                <div className="flex md:order-2">
                    {
                        isAuthenticated ? (
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    user.avatar === ''
                                        ?
                                        <Avatar rounded>
                                            <div className="space-y-1 font-medium dark:text-white">
                                                <div >{user.first_name} {user.last_name} {user.avatar}</div>
                                                {/* <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div> */}
                                            </div>
                                        </Avatar>
                                        :
                                        <Avatar img={`https://api.akayamedia.com/content/${user.avatar}`} rounded>
                                            <div className="space-y-1 font-medium dark:text-white">
                                                <div >{user.first_name} {user.last_name}</div>
                                                {/* <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div> */}
                                            </div>
                                        </Avatar>
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
                    <div className="max-w-md">
                        <TextInput id="email4" type="email" icon={HiSearch} rightIcon={HiCursorClick} placeholder="Search" required />
                    </div>
                    <Navbar.Link className="mt-2" href="/" active >
                        <HiBookmark size={24}/>
                    </Navbar.Link>
                    <Navbar.Link className="mt-2" href="/profile" >
                        <HiUser size={24}/>
                    </Navbar.Link>
                    <Navbar.Link className="mt-2" href="/profile" >
                        <IoLanguage size={24}/>
                    </Navbar.Link>
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