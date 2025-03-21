import React, {useState, ChangeEvent, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {CountryFlag, defaultFlag, getSupportedCountries} from "../languages";


const FlagSelect = ({currentLocale}: {currentLocale:string}) => {
    const supportedCountries = getSupportedCountries();
    const defaultCountryFlag: CountryFlag = (supportedCountries.find(country => country.code === currentLocale)) ?? defaultFlag ;
    const [selectedCountry, setSelectedCountry] = useState(defaultCountryFlag);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSelectedCountry(defaultCountryFlag)
    }, [currentLocale]);

    const handleCountryChange = (event : ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryCode = event.target.value;
        const selectedCountry = supportedCountries.find(country => country.code === selectedCountryCode);

        if (selectedCountry) {
            setSelectedCountry(selectedCountry);


            // Extract current path and replace country code
            const pathSegments = location.pathname.split('/').filter(Boolean); // Remove empty segments

            if (pathSegments.length > 0) {
                if(pathSegments[0].length !== 2) //if for whatever reason we dont already have lang code, insert it
                    pathSegments.unshift( selectedCountry.code)
                else
                    pathSegments[0] = selectedCountry.code; // Replace country code
            }

            navigate(`/${pathSegments.join('/')}`);     
        }
    };

    return (
        <div className="select-wrap">
            <label className="visually-hidden" htmlFor="country_select">Select language</label>
            <select onChange={handleCountryChange} id="country_select" value={selectedCountry.code}>
                {supportedCountries.map(country => (
                    <option key={country.code} value={country.code}>
                        {country.flag}
                    </option>
                ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" aria-hidden="true" fill="#000"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
        </div>
    );
};

export default FlagSelect;