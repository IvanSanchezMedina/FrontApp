"use client";

import { Label, Avatar } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function ProfileForm() {

    const { isAuthenticated, logout, user } = useAuth();
    console.log(user)
    const [t, i18n] = useTranslation("global")

    return (
        <div className="flex-col flex items-center justify-center">
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
                        <div className="md:mr-3 md:mb-0 sm:mb-3 mb-3">
                            <p className="font-light text-sm  text-gray-700 dark:text-gray-400">
                                {t("account.email")}
                            </p>
                            <div className="mb-2 block">
                                <Label className="text-lg" value={user.email} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pl-10 pr-10 pt-10 pb-10">
                    <div className="mb-2 block">
                        <Label className="text-xl" value={t("account.password")} />
                    </div>
                    <div className="md:flex mt-5">
                        <div className="md:mr-3 md:mb-0 sm:mb-3 mb-3">
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
                        <div className="w-1/2 md:w-1/2  md:mr-3 md:mb-0 sm:mb-3 mb-3">
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

