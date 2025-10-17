import { useState, useCallback, useMemo } from 'react';
import {
    validateRegisterForm,
    isFormValid as isFormValidUtil,
    handleFieldBlur as handleFieldBlurUtil,
    handleFieldChange as handleFieldChangeUtil,
    handleRegisterSubmit as handleRegisterSubmitUtil,
    clearFormState
} from '../validations/validationRegistro';

export const useRegisterForm = ({ show, onClose, onRegisterSuccess }) => {
    // Estado unificado del formulario
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        errors: {},
        isLoading: false,
        touched: {}
    });

    // Actualizar estado individual optimizado
    const updateFormState = useCallback((updates) => {
        setFormState(prev => ({ ...prev, ...updates }));
    }, []);

    // Handler unificado para cambios con validaciones integradas
    const handleChange = useCallback((field, value) => {
        const { touched, errors } = formState;

        if (field === 'username' || field === 'email' || field === 'password' || field === 'confirmPassword') {
            // Usar función handleFieldChange existente
            handleFieldChangeUtil(
                field,
                value,
                touched[field],
                errors,
                (newValue) => updateFormState({ [field]: newValue }),
                (newErrors) => updateFormState({ errors: newErrors }),
                formState
            );
        } else if (field === 'showPassword') {
            updateFormState({ showPassword: value });
        } else if (field === 'showConfirmPassword') {
            updateFormState({ showConfirmPassword: value });
        }
    }, [formState, updateFormState]);

    // Handler para blur optimizado
    const handleBlur = useCallback((field) => {
        const { username, email, password, confirmPassword, touched, errors } = formState;
        const formValues = { username, email, password, confirmPassword};

        // Usar función handleFieldBlur existente
        handleFieldBlurUtil(
            field,
            formValues,
            touched,
            errors,
            (newTouched) => updateFormState({ touched: newTouched }),
            (newErrors) => updateFormState({ errors: newErrors })
        );
    }, [formState, updateFormState]);

    // Handler para submit optimizado
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword, errors } = formState;
        const formValues = { username, email, password, confirmPassword};

        // Marcar todos los campos como touched para mostrar errores
        const allFieldsTouched = {
            username: true,
            email: true,
            password: true,
            confirmPassword: true,
        };
        updateFormState({ touched: allFieldsTouched });

        // Validación inmediata usando función existente
        const validationErrors = validateRegisterForm(formValues);
        if (Object.keys(validationErrors).length > 0) {
            updateFormState({ errors: validationErrors });
            return;
        }

        // Configurar clearForm para el submit
        const clearForm = () => {
            updateFormState({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                errors: {},
                touched: {},
                showPassword: false,
                showConfirmPassword: false
            });
        };

        // Usar función handleRegisterSubmit existente
        await handleRegisterSubmitUtil({
            formValues,
            currentErrors: errors,
            setTouched: (newTouched) => updateFormState({ touched: newTouched }),
            setErrors: (newErrors) => updateFormState({ errors: newErrors }),
            setIsLoading: (loading) => updateFormState({ isLoading: loading }),
            onRegisterSuccess,
            clearForm
        });
    }, [formState, updateFormState, onRegisterSuccess]);

    // Handler para cerrar modal
    const handleClose = useCallback(() => {
        clearFormState(
            (username) => updateFormState({ username }),
            (email) => updateFormState({ email }),
            (password) => updateFormState({ password }),
            (confirmPassword) => updateFormState({ confirmPassword }),
            (errors) => updateFormState({ errors }),
            (touched) => updateFormState({ touched })
        );
        onClose?.();
    }, [onClose, updateFormState]);

    // Mantención de compatibilidad con el JSX
    const handleUsernameChange = useCallback((e) => {
        handleChange('username', e.target.value);
    }, [handleChange]);

    const handleEmailChange = useCallback((e) => {
        handleChange('email', e.target.value);
    }, [handleChange]);

    const handlePasswordChange = useCallback((e) => {
        handleChange('password', e.target.value);
    }, [handleChange]);

    const handleConfirmPasswordChange = useCallback((e) => {
        handleChange('confirmPassword', e.target.value);
    }, [handleChange]);

    const handleShowPasswordToggle = useCallback(() => {
        handleChange('showPassword', !formState.showPassword);
    }, [formState.showPassword, handleChange]);

    const handleShowConfirmPasswordToggle = useCallback(() => {
        handleChange('showConfirmPassword', !formState.showConfirmPassword);
    }, [formState.showConfirmPassword, handleChange]);

    // Validación del formulario, podría dejarlo en validatiopns, pero a estas alturas solo me importa que funcione xd
    const isFormValid = useMemo(() => {
        const { username, email, password, confirmPassword} = formState;
        return isFormValidUtil({ username, email, password, confirmPassword});
    }, [formState.username, formState.email, formState.password, formState.confirmPassword]);

    const {
        username,
        email,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        errors,
        isLoading,
        touched
    } = formState;

    return {
        formState,

        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleShowPasswordToggle,
        handleShowConfirmPasswordToggle,
        handleBlur,
        handleSubmit,
        handleClose,

        isFormValid,
        username,
        email,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        errors,
        isLoading,
        touched
    };
};