import { useState } from 'react'

export const useForm = ( init={} ) => {

    const [formState, setFormState] = useState(init);

    const handleInputChange = ({target}) => {
        setFormState({
            ...formState,
            [target.name]: target.value
        });
    }

    const handleResetForm = () => setFormState(init);

    return [ formState, handleInputChange, setFormState, handleResetForm ];
}
