import { useState } from 'react';
const RedCheckbox = ({label}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id="myRedCheckbox"
                checked={isChecked}
                onChange={handleChange}
                className="form-checkbox 2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 lg:h-4 lg:w-4 md:h-4 md:w-4 sm:h-4 sm:w-4 h-3 w-3 rounded-sm text-[#be7be8] border-[#be7be8] border-[2px] cursor-pointer focus:ring-0"
            />
            <label htmlFor="myRedCheckbox" className="mx-2 text-gray-700 2xl:text-xl xl:text-sm lg:text-sm md:text-sm sm:text-sm text-sm">
                {label}
            </label>
        </div>
    );
}

export default RedCheckbox;