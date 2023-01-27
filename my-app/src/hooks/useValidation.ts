import { useEffect, useState } from "react";

export const useValidation = (value, validation) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLenghtError, setMinLenghtError] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for(const valid in validation) {
            switch(valid) {
                case 'minLenght':
                    value.length < validation[valid] ? setMinLenghtError(true) : setMinLenghtError(false);
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                default:
                    break;
            }
        }
    }, [value, validation]);

    useEffect(() => {
        if(isEmpty || minLenghtError) {
            setInputValid(false);
        }
        else {
            setInputValid(true);
        }
    }, [isEmpty, minLenghtError]);

    return {
        isEmpty,
        minLenghtError,
        inputValid
    }
}