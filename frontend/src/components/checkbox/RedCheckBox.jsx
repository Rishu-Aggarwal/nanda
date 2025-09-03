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
                className="form-checkbox h-4 w-4 rounded-sm text-[#be7be8] border-[#be7be8] border-[2px] cursor-pointer focus:ring-0"
            />
            <label htmlFor="myRedCheckbox" className="mx-2 text-gray-700 text-sm">
                {label}
            </label>
        </div>
    );
}

export default RedCheckbox;