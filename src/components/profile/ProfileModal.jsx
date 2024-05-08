"use client";

import { Button, Checkbox, Label, Modal, TextInput, Datepicker, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { updateUserRequest } from "../../api/profile";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import SelectComponent from "../inputs/SelectComponent";
import { getCountriesRequest } from "../../api/otherData";

function ProfileModal({ isOpen, onClose }) {

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [t, i18n] = useTranslation("global")
    const [email, setEmail] = useState('');

    const { user, updateUserAndToken } = useAuth();

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
    }

    const updateUser = async (id, values) => {
        try {

            Cookies.remove('token')
            const dataUser = await updateUserRequest(id, values)
            console.log(values)
            if (dataUser.status === 200) {
                const newToken = dataUser.data.token; // Asegúrate de que la respuesta contenga el nuevo token

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
        location: user.location
    });

    const handleDateChange = (value) => {
        const formattedDate = new Date(value).toLocaleDateString('es-ES');
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            birthday: formattedDate
        }));
    };

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            location: selectedOption.label
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(event)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUser(user.id, updatedUserInfo);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    const getCountries = async () => {
        try {

            const dataCountries = await getCountriesRequest()
            if (dataCountries.status === 200) {
                const data = dataCountries.data.map(item => ({
                    value: item.id,
                    label: item.name
                }));
                setOptions(data);
            }

        } catch (error) {
            console.error('Error al obtener paises:', error);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <div>
            <Modal show={isOpen} size="xl" onClose={onClose} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="first_name" value={t("account.first_name")} />
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
                                    <Label htmlFor="last_name" value={t("account.last_name")} />
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
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="countries" value="Select your country" />
                                </div>
                                <Select id="countries" required>
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>France</option>
                                    <option>Germany</option>
                                </Select>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="web" value={t("account.location")} />
                                </div>
                                <SelectComponent
                                   
                                    value={updatedUserInfo.location}
                                    options={options}
                                    onChange={handleSelectChange}
                                    selectedOption={selectedOption}
                                    placeholder="Selecciona una país..." />

                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value={t("account.email")} />
                                </div>
                                <TextInput
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


                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember">Remember me</Label>
                                </div>
                                <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                                    Lost Password?
                                </a>
                            </div>
                            <div className="w-full">
                                <Button type="submit">Log in to your account</Button>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered?&nbsp;
                                <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                    Create account
                                </a>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProfileModal