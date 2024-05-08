
import Select from 'react-select'


function SelectComponent({ options, onChange, selectedOption, placeholder }) {


    const handleChange = (selectedOption) => {
        onChange(selectedOption);
    };

    return (
        <div>
            <Select
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50   border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                options={options}
                onChange={handleChange}
                value={selectedOption}
                isSearchable
                placeholder={placeholder}
            />
        </div>
    )
}

export default SelectComponent