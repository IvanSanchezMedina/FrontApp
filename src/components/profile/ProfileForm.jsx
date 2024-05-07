"use client";

import { Label, Avatar } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from 'react';
import { updateUserRequest } from "../../api/profile";
import Cookies from "js-cookie";

function ProfileForm() {
  
    const { user, updateUserAndToken } = useAuth();
  
    const [t, i18n] = useTranslation("global")

    const updateUser = async (id, values) => {
        try {

            Cookies.remove('token')
            const dataUser = await updateUserRequest(id, values)

            if (dataUser.status === 200) {
                const newToken = dataUser.data.token; // Asegúrate de que la respuesta contenga el nuevo token

                Cookies.set('token', newToken);
                updateUserAndToken(dataUser.data);
            }

        } catch (error) {
            console.error('Error in update user:', error);
        }
    }

    const [updatedUserInfo, setUpdatedUserInfo] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username
        // Otros campos que desees actualizar
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Controlador de evento para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        try {
            // Llamar a la función updateUser con los valores actualizados del usuario
            await updateUser(user.id, updatedUserInfo);
            // Actualizar la información del usuario en la interfaz o mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };


    return (
        <div className="flex-col flex items-center justify-center">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    value={updatedUserInfo.first_name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="last_name"
                    value={updatedUserInfo.last_name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="username"
                    value={updatedUserInfo.username}
                    onChange={handleInputChange}
                />
                {/* Otros campos que desees actualizar */}
                <button type="submit">Actualizar</button>
            </form>
            <div className="shadow-xl rounded-xl portada" style={{
                background: `center / cover url(${user.header_img})`
            }}>
            </div>

            <div className="shadow-xl rounded-xl bg-white bottom-20 relative w-11/12" >

                <div className="pl-5 pr-5 pt-5 pb-5 ">
                    <div className="md:flex">
                        <div className="md:flex ">
                            <div className="w-1/2 md:w-1/2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Avatar img={`https://api.akayamedia.com/content/${user.avatar}`} size="lg" rounded />
                                </div>
                            </div>
                            <div className="w-1/2 md:w-1/2 ">
                                <div className="block">
                                    <Label className="text-lg" value={user.first_name + ' ' + user.last_name} />

                                </div>
                                <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                    {user.username}
                                </p>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="pl-10 pr-10 pt-10 pb-10">
                    <div className="mb-2 block">
                        <Label className="text-xl" value={t("account.personal-information")} />
                    </div>
                    <div className="md:flex mt-10">
                        <div className="w-1/2 md:w-1/2  md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.first_name")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.first_name} />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/2 md:ml-3  md:mt-0 sm:mt-3 mt-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.last_name")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.last_name} />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mt-5">
                        <div className="w-1/2 md:w-1/2  md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.username")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.username} />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/2 md:ml-3  md:mt-0 sm:mt-3 mt-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.birthday")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.birthday} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pl-10 pr-10 pt-10 pb-10">
                    <div className="mb-2 block">
                        <Label className="text-xl" value={t("account.email-information")} />
                    </div>
                    <div className="md:flex mt-5">
                        <div className="w-1/2 md:w-1/2 md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.email")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.email} />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/2 md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.password")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value="******" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pl-10 pr-10 pt-10 pb-10">
                    <div className="mb-2 block">
                        <Label className="text-xl" value={t("account.other-information")} />
                    </div>
                    <div className="md:flex mt-10">
                        <div className="w-1/2 md:w-1/2 md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.facebook")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.facebook} />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/2 md:ml-3  md:mt-0 sm:mt-3 mt-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.twitter")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.twitter} />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mt-10">
                        <div className="w-1/2 md:w-1/2  md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.instagram")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.instagram} />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/2 md:ml-3  md:mt-0 sm:mt-3 mt-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.tagline")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.tagline} />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mt-10">
                        <div className="  md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.web")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.web} />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mt-10">
                        <div className="w-1/2 md:w-1/2  md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.fav_serie_1")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.fav_serie_1} />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/2 md:ml-3  md:mt-0 sm:mt-3 mt-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.fav_serie_1")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.fav_serie_1} />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mt-10">
                        <div className="w-1/2 md:w-1/2  md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.fav_serie_3")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.fav_serie_3} />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/2 md:ml-3  md:mt-0 sm:mt-3 mt-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.adult_content")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.adult_content} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileForm

