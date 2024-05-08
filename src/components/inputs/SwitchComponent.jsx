import { ToggleSwitch } from "flowbite-react";

function SwitchComponent({ 
    onChange,
    checked,
  }) {

    return (
        <div>
            <ToggleSwitch
                checked={checked}// Usamos el placeholder como label
                onChange={onChange}
            />
        </div>
    )
}

export default SwitchComponent