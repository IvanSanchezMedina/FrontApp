"use client";

import { Button, Label, Modal, TextInput, Datepicker, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import { updateUserRequest } from "../../api/profile";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import SelectComponent from "../inputs/SelectComponent";
import { getCountriesRequest, getSeriesRequest} from "../../api/otherData";
import { HiMail } from "react-icons/hi";
import SwitchComponent from "../inputs/SwitchComponent";
import {getSeriesNameById} from "../../api/helpers/series.js"

function ProfileModal({ isOpen, onClose, serieId }) {
    const [serieName, setSerieName] = useState(null);
    // Initialize state variables for country and series options, selected country and series options, and user information
    const [optionsCountries, setOptionsCountries] = useState([]);
    const [optionsSeries, setOptionsSeries] = useState([]);
    const [selectedCountryOption, setSelectedCountriesOptions] = useState(null);
    const [selectedSerieOption1, setSelectedSerieOption1] = useState(null);
    const [selectedSerieOption2, setSelectedSerieOption2] = useState(null);
    const [selectedSerieOption3, setSelectedSerieOption3] = useState(null);
    const [t, i18n] = useTranslation("global")
    const { user, updateUserAndToken } = useAuth();
    const [switchAdultContent, setSwitchAdultContent] = useState(user.adult_content);
    const [switchActivity, setSwitchActivity] = useState(user.profile_with_activity);

    // Function to update user information
    const updateUser = async (id, values) => {
        try {
            // Remove the token from cookies
            Cookies.remove('token')
            // Send a request to update user information
            const dataUser = await updateUserRequest(id, values)

            // If the request is successful, update the token and user information
            if (dataUser.status === 200) {
                const newToken = dataUser.data.token;

                Cookies.set('token', newToken);
                updateUserAndToken(dataUser.data);
                onClose();
            }

        } catch (error) {
            console.error('Error in update user:', error);
        }
    }

    const [updatedUserInfo, setUpdatedUserInfo] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        birthday: user.birthday,
        email: user.email,
        facebook: user.facebook,
        twitter: user.twitter,
        instagram: user.instagram,
        web: user.web,
        tagline: user.tagline,
        location: user.location,
        bio: user.bio,
        fav_serie_1: user.fav_serie_1
    });

    const handleDateChange = (value) => {
        const formattedDate = new Date(value).toLocaleDateString('es-ES');
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            birthday: formattedDate
        }));
    };

    const handleSwitchChange = (isChecked, switchType) => {
        // Utiliza un switch para determinar qué switch se está cambiando
        switch (switchType) {
            case "adult_content":
                // Actualiza el estado del switch de contenido para adultos
                setSwitchAdultContent(isChecked);
                // Actualiza el estado del usuario para contenido para adultos
                setUpdatedUserInfo(prevState => ({
                    ...prevState,
                    adult_content: isChecked
                }));
                break;
            case "profile_with_activity":
                // Actualiza el estado del switch de actividad
                setSwitchActivity(isChecked);
                // Actualiza el estado del usuario para perfil con actividad
                setUpdatedUserInfo(prevState => ({
                    ...prevState,
                    profile_with_activity: isChecked
                }));
                break;
            // Agrega más casos según sea necesario para manejar más switches
            default:
                break;
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getCountries = async () => {
        try {

            const dataCountries = await getCountriesRequest()
            if (dataCountries.status === 200) {
                const data = dataCountries.data.map(item => ({
                    value: item.id,
                    label: item.name
                }));
                setOptionsCountries(data);
            }

        } catch (error) {
            console.error('Error al obtener paises:', error);
        }
    };

    const handleSelectCountriesChange = (selectedCountryOption) => {
        setSelectedCountriesOptions(selectedCountryOption);
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            location: selectedCountryOption.label
        }));
    };

    const getSeries = async () => {
        try {

            const dataSeries = await getSeriesRequest()
            if (dataSeries.status === 200) {
                const data = dataSeries.data.map(item => ({
                    value: item.id,
                    label: item.name
                }));
                setOptionsSeries(data);
            }

        } catch (error) {
            console.error('Error al obtener series:', error);
        }
    };

    const handleSelectSeriesChange1 = (selectedSerieOption) => {
        setSelectedSerieOption1(selectedSerieOption);
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            fav_serie_1: selectedSerieOption.value
        }));
    };

    const handleSelectSeriesChange2 = (selectedSerieOption) => {
        setSelectedSerieOption2(selectedSerieOption);
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            fav_serie_2: selectedSerieOption.value
        }));
    };

    const handleSelectSeriesChange3 = (selectedSerieOption) => {
        setSelectedSerieOption3(selectedSerieOption);
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            fav_serie_3: selectedSerieOption.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUser(user.id, updatedUserInfo);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    useEffect(() => {
        getCountries();
        getSeries();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            if (user.location) {
                setSelectedCountriesOptions({ value: user.location, label: user.location });
                setUpdatedUserInfo(prevState => ({
                    ...prevState,
                    location: user.location
                }));
            }
            if (user.fav_serie_1) {
                const seriesName = await getSeriesNameById(user.fav_serie_1);
                setSelectedSerieOption1({ value: user.fav_serie_1, label: seriesName });
                setUpdatedUserInfo(prevState => ({
                    ...prevState,
                    fav_serie_1: user.fav_serie_1
                }));
            }
            if (user.fav_serie_2) {
                const seriesName = await getSeriesNameById(user.fav_serie_2);
                setSelectedSerieOption2({ value: user.fav_serie_2, label:seriesName  });
                setUpdatedUserInfo(prevState => ({
                    ...prevState,
                    fav_serie_2: user.fav_serie_2
                }));
            }
            if (user.fav_serie_3) {
                const seriesName = await getSeriesNameById(user.fav_serie_3);
                setSelectedSerieOption3({ value: user.fav_serie_3, label: seriesName  });
                setUpdatedUserInfo(prevState => ({
                    ...prevState,
                    fav_serie_3: user.fav_serie_3
                }));
            }
            getCountries();
            getSeries();
        };
        loadData();
    }, [user.location, user.fav_serie_1, user.fav_serie_2, user.fav_serie_3,serieId]);

    return (
        <div>
            <Modal show={isOpen} size="4xl" onClose={onClose} popup className="dark:bg-slate-700">
                <Modal.Header className="dark:bg-slate-900" />
                <Modal.Body className="dark:bg-slate-900">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6" >
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white ">{t("account.update-profile")}</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="first_name" value={t("account.first-name")} />
                                </div>
                                <TextInput
                                    id="first_name"
                                    name="first_name"
                                    value={updatedUserInfo.first_name}
                                    onChange={handleInputChange}
                                    required
                                    type="text"
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="last_name" value={t("account.last-name")} />
                                </div>
                                <TextInput
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    value={updatedUserInfo.last_name}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="username" value={t("account.username")} />
                                </div>
                                <TextInput
                                    addon="@"
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={updatedUserInfo.username}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="birthday" value={t("account.birthday")} />
                                </div>
                                <Datepicker
                                    id="birthday"
                                    name="birthday"
                                    language="es"
                                    labelTodayButton="Hoy"
                                    labelClearButton="Limpar"
                                    value={updatedUserInfo.birthday}
                                    onSelectedDateChanged={handleDateChange}
                                    required />
                            </div>
                            <div>

                                <div className="mb-2 block">
                                    <Label htmlFor="birthday" value={t("account.biography")} />
                                </div>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    placeholder={t("account.biography")}
                                    required
                                    value={updatedUserInfo.bio}
                                    onChange={handleInputChange}
                                    rows={4} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="web" value={t("account.location")} />
                                </div>
                                <SelectComponent
                                    value={updatedUserInfo.location}
                                    options={optionsCountries}
                                    onChange={handleSelectCountriesChange}
                                    selectedOption={selectedCountryOption}
                                    placeholder={t("account.select") + ' ' + t("account.select-country")} />

                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value={t("account.email")} />
                                </div>
                                <TextInput
                                    icon={HiMail}
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={updatedUserInfo.email}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="facebook" value={t("account.facebook")} />
                                </div>
                                <TextInput
                                    addon="@"
                                    id="facebook"
                                    name="facebook"
                                    type="text"
                                    value={updatedUserInfo.facebook}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="twitter" value={t("account.twitter")} />
                                </div>
                                <TextInput
                                    addon="@"
                                    id="twitter"
                                    name="twitter"
                                    type="text"
                                    value={updatedUserInfo.twitter}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="instagram" value={t("account.instagram")} />
                                </div>
                                <TextInput
                                    addon="@"
                                    id="instagram"
                                    name="instagram"
                                    type="text"
                                    value={updatedUserInfo.instagram}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="web" value={t("account.web")} />
                                </div>
                                <TextInput
                                    id="web"
                                    name="web"
                                    type="text"
                                    value={updatedUserInfo.web}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            {user.type == 'author' ?
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="web" value={t("account.tagline")} />
                                    </div>
                                    <TextInput
                                        id="tagline"
                                        name="tagline"
                                        type="text"
                                        value={updatedUserInfo.tagline}
                                        onChange={handleInputChange}
                                        required />
                                </div>
                                : <></>}
                            <div className="md:flex">
                                <div className="w-1/2 md:w-1/2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="web" value={t("account.adult-content")} />
                                    </div>
                                    <SwitchComponent
                                        checked={switchAdultContent}
                                        onChange={(isChecked) => handleSwitchChange(isChecked, "adult_content")}
                                        placeholder={t("account.adult-content")}
                                    />
                                </div>
                                <div className="w-1/2 md:w-1/2 ml-10">
                                    <div className="mb-2 block">
                                        <Label htmlFor="web" value={t("account.profile-with-activity")} />
                                    </div>
                                    <SwitchComponent
                                        checked={switchActivity}
                                        onChange={(isChecked) => handleSwitchChange(isChecked, "profile_with_activity")}
                                        placeholder={t("account.profile-with-activity")}
                                    />

                                </div>

                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="web" value={t("account.series") + '1'} />
                                </div>
                                <SelectComponent
                                    value={updatedUserInfo.fav_serie_1}
                                    options={optionsSeries}
                                    onChange={handleSelectSeriesChange1}
                                    selectedOption={selectedSerieOption1}
                                    placeholder={t("account.select") + ' ' + t("account.select-serie") + '1'} />

                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="web" value={t("account.series") + '2'} />
                                </div>
                                <SelectComponent
                                    value={updatedUserInfo.fav_serie_2}
                                    options={optionsSeries}
                                    onChange={handleSelectSeriesChange2}
                                    selectedOption={selectedSerieOption2}
                                    placeholder={t("account.select") + ' ' + t("account.select-serie") + '2'} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="web" value={t("account.series") + '3'} />
                                </div>
                                <SelectComponent
                                    value={updatedUserInfo.fav_serie_3}
                                    options={optionsSeries}
                                    onChange={handleSelectSeriesChange3}
                                    selectedOption={selectedSerieOption3}
                                    placeholder={t("account.select") + ' ' + t("account.select-serie") + '3'} />
                            </div>
                            <div className="w-full">
                                <Button className="w-full  " type="submit">{t("account.button-submit")}</Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProfileModal