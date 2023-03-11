import React, { useState, useMemo, ChangeEvent } from 'react'
import Select, { OptionsOrGroups, SingleValue } from 'react-select'
import countryList from 'react-select-country-list'
import getCountryISO3 from 'country-iso-2-to-3';


type CountrySelectorProps = {

}

function CountrySelector() {
    const [value, setValue] = useState('ISL')

    const changeHandler = (e : React.ChangeEvent)=> {
        if(value){
            setValue(value)
        }
    }

    return <select defaultValue={value} onChange={changeHandler}>
        {
            countryList().getData().map(country => <option key={country.value} value={getCountryISO3(country.value)}>
                {country.label}
            </option>)
        }
    </select>
}

export default CountrySelector