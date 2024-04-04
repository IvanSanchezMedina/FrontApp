"use client";

import { useAuth } from "../context/AuthContext"
import {
    Avatar, Dropdown, Navbar,
    TextInput, Button, Modal,
    DarkThemeToggle, Flowbite
}
    from "flowbite-react";
import { HiSearch, HiCursorClick, HiBookmark, HiUser } from "react-icons/hi";
import { IoLanguage } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const customTheme = {
    button: {
        color: {
            primary: "bg-red-500 hover:bg-red-600",
        },
    },
};


function NavbarComponent() {
    const { isAuthenticated, logout, user } = useAuth();
    const [t, i18n] = useTranslation("global")
    const [openModal, setOpenModal] = useState(false);
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setOpenModal(false)
    };
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
                                <Dropdown.Item>{t("navbar.dashboard")}</Dropdown.Item>
                                <Dropdown.Item>{t("navbar.configuration")}</Dropdown.Item>
                                <Dropdown.Item>{t("navbar.profile")}</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => {
                                    logout();
                                }}>{t("navbar.logout")}</Dropdown.Item>
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
                        <HiBookmark size={24} />
                    </Navbar.Link>
                    <Navbar.Link className="mt-2" href="/profile" >
                        <HiUser size={24} />
                    </Navbar.Link>
                    <Navbar.Link className="mt-2" href="#" onClick={() => setOpenModal(true)} >
                        <IoLanguage size={24} />      
                        
                    </Navbar.Link>
                    <DarkThemeToggle />
                    {isAuthenticated ? (
                        <></>
                    ) : (
                        <Navbar.Link className="mt-2" href="/login">Sing In</Navbar.Link>
                    )}
                </Navbar.Collapse>
            </Navbar>
            <Modal  size="sm" show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>{t("navbar.select_language")}</Modal.Header>
                <Modal.Body> 
                    <div className="space-y-6 ">
                        <Button  className="mx-auto" color="light" onClick={() => changeLanguage('es')}>
                            <span className={"fi fis fi-mx mr-2 fiCircle "} />ES
                        </Button>
                        <Button  className="mx-auto" color="light" onClick={() => changeLanguage('en')}>
                            <span className={"fi fis fi-us mr-2 fiCircle "} />EN
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </Flowbite>

    )
}

export default NavbarComponent