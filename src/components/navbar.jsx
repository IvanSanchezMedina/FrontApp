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
import i18next from 'i18next'

const customTheme = {
    button: {
        color: {
            primary: "bg-red-500 hover:bg-red-600",
        },
    },
};

i18next.init()

function NavbarComponent() {

    const { isAuthenticated, logout, user } = useAuth();
    const [t, i18n] = useTranslation("global")
    const [openModal, setOpenModal] = useState(false);
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', i18next.language);
        setOpenModal(false)
    };

    return (
        <Flowbite theme={{ theme: customTheme }}>
            <Navbar fluid >
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
                                <Dropdown.Item href="/profile">{t("navbar.profile")}</Dropdown.Item>
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
                    <div className="max-w-100">
                        <TextInput className="w-100" id="email4" type="email" icon={HiSearch} rightIcon={HiCursorClick} placeholder="Search" />
                    </div>
                    <Navbar.Link className="mt-2" href="/" active >
                        <HiBookmark size={24} />
                    </Navbar.Link>
                    <Dropdown
                        className="marginLeftNone"
                        arrowIcon={false}
                        inline
                        label={<HiUser size={24} className="block py-2 pl-3 pr-4 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white" />}
                    >

                        <Dropdown.Item href="/dashboard" >{t("navbar.dashboard")}</Dropdown.Item>
                        <Dropdown.Item href="/myaccount" >{t("navbar.myaccount")}</Dropdown.Item>
                        <Dropdown.Item href="/help" >{t("navbar.help")}</Dropdown.Item>
                     
                    </Dropdown>
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
            <Modal size="sm" show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>{t("navbar.select_language")}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 ">
                        <Button className="mx-auto" color="light" onClick={() => changeLanguage('es')}>
                            <span className={"fi fis fi-mx mr-2 fiCircle "} />ES
                        </Button>
                        <Button className="mx-auto" color="light" onClick={() => changeLanguage('en')}>
                            <span className={"fi fis fi-us mr-2 fiCircle "} />EN
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </Flowbite>

    )
}

export default NavbarComponent