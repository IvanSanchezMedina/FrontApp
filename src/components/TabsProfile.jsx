// TabsProfile.js

import React from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ProfileForm from "./profile/ProfileForm";

function TabsProfile() {
  const [t, i18n] = useTranslation("global")
  return (
    <div className="rounded-md shadow-xl pl-10 pr-10 pt-10 pb-10">
      <Tabs aria-label="Default tabs" style="underline">
        <Tabs.Item title={t("tabs.my-series")} icon={HiUserCircle}>

        </Tabs.Item>
        <Tabs.Item title={t("tabs.my-wall")} icon={MdDashboard}>

        </Tabs.Item>
        <Tabs.Item active title={t("tabs.my-profile")} icon={HiAdjustments}>
          <ProfileForm />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}

export default TabsProfile;
