
import Select from 'react-select'

function SelectComponent({ options, onChange, selectedOption, placeholder }) {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgb(249, 250, 251)',
            borderRadius: '10px',
            border: '1px solid rgb(209 213 219 / 1)',
            fontSize: '0.875rem',
            ':focus-within': {
                ...provided[':focus-within'],
                border: '2px solid #06b6d4',
                boxShadow: 'none'
            },
            // ':hover': {
            //     ...provided[':hover'],
            //     border: '1px solid rgb(209 213 219 / 1)',
            //     boxShadow: 'none'
            // },

        }),
        option: (provided, { isSelected }) => ({
            ...provided,
            backgroundColor: isSelected ? '#06b6d4' : '',
            ':active': {
                ...provided[':active'],
                backgroundColor: isSelected ? '' : '#06b6d4'
            },
            ':hover': {
                backgroundColor: '#06b6d4',
                color: 'white'
            },

        })
    };

    const isDarkTheme = document.documentElement.classList.contains('dark');

    function adjustStylesForTheme(theme) {
        if (isDarkTheme) {
            return {
                ...customStyles,
                control: (provided) => ({
                    ...provided,
                    backgroundColor: '#374151',
                    borderRadius: '10px',
                    border: '1px solid rgb(75 85 99 / 1)',
                    fontSize: '0.875rem',
                    ':focus-within': {
                        ...provided[':focus-within'],
                        border: '2px solid #06b6d4',
                        boxShadow: 'none'
                    },
                    ':hover': {
                        ...provided[':hover'],
                        border: '1px solid rgb(75 85 99 / 1)',
                        boxShadow: 'none'
                    },

                }),
                input: (provided) => ({
                    ...provided,
                    color: 'white',
                }),
                option: (provided, { isSelected }) => ({
                    ...provided,
                    color: 'white',
                    background: isSelected ? '#06b6d4' : '#64748b',
                    ':active': {
                        ...provided[':active'],
                        color: 'white',
                        backgroundColor: isSelected ? '' : '#06b6d4'
                    },
                    ':hover': {
                        ...provided[':hover'],
                        backgroundColor: '#06b6d4',
                    },

                }),
                singleValue: (provided, { isSelected }) => ({
                    ...provided,
                    color: 'white',
                }),
                placeholder: (provided, { isSelected }) => ({
                    ...provided,
                    color: 'white',
                })
            };
        } else {
            return customStyles;
        }
    }
    const adjustedStyles = adjustStylesForTheme('dark');

    const handleChange = (selectedOption) => {
        onChange(selectedOption);
    };

    return (
        <div>
            <Select
                className="selectReact"
                options={options}
                onChange={handleChange}
                value={selectedOption}
                isSearchable
                placeholder={placeholder}
                styles={adjustedStyles}
            />
        </div>
    )
}

export default SelectComponent