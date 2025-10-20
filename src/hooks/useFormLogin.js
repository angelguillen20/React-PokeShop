import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    validateLoginForm,
    isFormValid as isFormValidUtil,
    handleFieldBlur as handleFieldBlurUtil,
    handleFieldChange as handleFieldChangeUtil,
    handleLoginSubmit as handleLoginSubmitUtil,
    clearFormState
} from '../validations/validationLogin';

export const useLoginForm = ({ show, onClose, onLoginSuccess }) => {
    // Estado unificado del formulario
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        showPassword: false,
        rememberMe: false,
        errors: {},
        isLoading: false,
        touched: {}
    });

    // Cargar usuario guardado al montar
    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            setFormState(prev => ({
                ...prev,
                username: savedUsername,
                rememberMe: true
            }));
        }
    }, []);

    // Actualizar estado individual optimizado
    const updateFormState = useCallback((updates) => {
        setFormState(prev => ({ ...prev, ...updates }));
    }, []);

    // Handler unificado para cambios con validaciones integradas
    const handleChange = useCallback((field, value) => {
        const { touched, errors } = formState;
        
        if (field === 'username' || field === 'password') {
            // Usar tu función handleFieldChange existente
            handleFieldChangeUtil(
                field, 
                value, 
                touched[field], 
                errors, 
                (newValue) => updateFormState({ [field]: newValue }),
                (newErrors) => updateFormState({ errors: newErrors })
            );
        } else if (field === 'rememberMe') {
            updateFormState({ rememberMe: value });
        } else if (field === 'showPassword') {
            updateFormState({ showPassword: value });
        }
    }, [formState, updateFormState]);

    // Handler para blur optimizado
    const handleBlur = useCallback((field) => {
        const { username, password, touched, errors } = formState;
        const formValues = { username, password };
        
        // Usar tu función handleFieldBlur existente
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
        
        const { username, password, rememberMe, errors } = formState;
        const formValues = { username, password };

        // Marcar todos los campos como touched para mostrar errores
        const allFieldsTouched = { username: true, password: true };
        updateFormState({ touched: allFieldsTouched });

        // Validación inmediata usando tu función existente
        const validationErrors = validateLoginForm(formValues);
        if (Object.keys(validationErrors).length > 0) {
            updateFormState({ errors: validationErrors });
            return;
        }

        // Configurar clearForm para el submit
        const clearForm = () => {
            updateFormState({
                username: "",
                password: "",
                errors: {},
                touched: {},
                showPassword: false
            });
        };

        await handleLoginSubmitUtil({
            formValues,
            rememberMe,
            currentErrors: errors,
            setTouched: (newTouched) => updateFormState({ touched: newTouched }),
            setErrors: (newErrors) => updateFormState({ errors: newErrors }),
            setIsLoading: (loading) => updateFormState({ isLoading: loading }),
            onLoginSuccess,
            clearForm
        });
    }, [formState, updateFormState, onLoginSuccess]);

    // Handler para cerrar modal
    const handleClose = useCallback(() => {
        // Usar función clearFormState actualizada
        clearFormState(
            (username) => updateFormState({ username }),
            (password) => updateFormState({ password }),
            (errors) => updateFormState({ errors }),
            (touched) => updateFormState({ touched }),
            (showPassword) => updateFormState({ showPassword })
        );
        onClose?.();
    }, [onClose, updateFormState]);

    // Handlers específicos para campos
    const handleUsernameChange = useCallback((e) => {
        handleChange('username', e.target.value);
    }, [handleChange]);

    const handlePasswordChange = useCallback((e) => {
        handleChange('password', e.target.value);
    }, [handleChange]);

    const handleRememberMeChange = useCallback((e) => {
        handleChange('rememberMe', e.target.checked);
    }, [handleChange]);

    const handleShowPasswordToggle = useCallback(() => {
        handleChange('showPassword', !formState.showPassword);
    }, [formState.showPassword, handleChange]);

    // Validación del formulario usando tu función existente
    const isFormValid = useMemo(() => {
        const { username, password } = formState;
        return isFormValidUtil({ username, password });
    }, [formState.username, formState.password]);

    // Estado individual para facilitar desestructuración
    const { username, password, showPassword, rememberMe, errors, isLoading, touched } = formState;

    return {
        // Estado completo
        formState,
        
        // Handlers
        handleUsernameChange,
        handlePasswordChange,
        handleRememberMeChange,
        handleShowPasswordToggle,
        handleBlur,
        handleSubmit,
        handleClose,
        
        // Estados derivados
        isFormValid,
        
        // Estado individual (para facilitar desestructuración)
        username,
        password,
        showPassword,
        rememberMe,
        errors,
        isLoading,
        touched
    };
};