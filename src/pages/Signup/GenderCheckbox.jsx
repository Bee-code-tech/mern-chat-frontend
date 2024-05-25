import React from 'react'

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-2 flex items-center">
                <input id="gender_male" name="gender" type="radio" className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" value="male" checked={selectedGender === "male"}
                    onChange={() => onCheckboxChange("male")} />
                <label for="gender_male" className={`label gap-2 ml-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}> Male</label>

                <input id="gender_female" name="gender" type="radio" checked={selectedGender === "female"}
                    onChange={() => onCheckboxChange("female")}
                    className="ml-8 form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" value="female" />
                <label for="gender_female" className={`label gap-2 ml-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>Female</label>
            </div>
        </div>
    )
}

export default GenderCheckbox