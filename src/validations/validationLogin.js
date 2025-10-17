//! Validaciones para el formulario de login

// Validación usuario
export const validateUsername = (username) => {
    if (!username.trim()) {
        return 'El usuario es requerido';
    }
    if (username.length < 3) {
        return 'El usuario debe tener al menos 3 caracteres';
    }
    if (username.length > 20) {
        return 'El usuario no puede exceder 20 caracteres';
    }
    return null;
};

// Validación contraseña
export const validatePassword = (password) => {
    if (!password) {
        return 'La contraseña es requerida';
    }
    if (password.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (password.length > 30) {
        return 'La contraseña no puede exceder 30 caracteres';
    }
    return null;
};

// Validación genérica de campo
export const validateField = (fieldName, value) => {
    switch (fieldName) {
        case 'username':
            return validateUsername(value);
        case 'password':
            return validatePassword(value);
        default:
            return null;
    }
};

// Validación del formulario completo
// El objeto formData presenta los datos del formulario > {username, password}
export const validateLoginForm = (formData) => {
    // Creamos un obj que permita el almacenamiento de errores
    const errors = {};
    const usernameError = validateUsername(formData.username);
    if (usernameError) {
        errors.username = usernameError;
    }
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
        errors.password = passwordError;
    }
    return errors;
};

// Verifica si el formulario es válido (sin errores) => true/false
export const isFormValid = (formData) => {
    const errors = validateLoginForm(formData);
    return Object.keys(errors).length === 0;
};

/**
    Descripción de Handler que obtuve de Reddit para que captes lo que es y cómo funciona:
    Un 'handler' es como un término genérico para 'código que maneja algo'. 
    Un ejemplo clásico es un 'event handler' (manejador de eventos). 
    Podrías registrar un manejador de eventos para eventos de "clic de ratón" en una aplicación de interfaz de usuario, 
    por ejemplo; en ese caso, cuando se hace clic con el ratón, tu código del manejador se invoca para 'manejar' ese evento 
    (es decir, responder de alguna manera a que se haya hecho clic con el ratón). 
    La mayoría de los programas de interfaz de usuario se implementan de esta manera asíncrona, 
    donde la interfaz de usuario responde a eventos como "se hizo clic en el botón A" y luego se invoca tu manejador de eventos 
    que registraste al inicio de la aplicación para hacer algo en respuesta a que se haya hecho clic en el botón.
 */

// Handler que permite validar un campo en tiempo real
export const handleFieldValidation = (fieldName, value, currentErrors, setErrors) => {
    const newErrors = { ...currentErrors };
    const errorMessage = validateField(fieldName, value);
    
    if (errorMessage) {
        newErrors[fieldName] = errorMessage;
    } else {
        delete newErrors[fieldName];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

// Handler para blur de campo
export const handleFieldBlur = (field, formValues, currentTouched, currentErrors, setTouched, setErrors) => {
    setTouched({ ...currentTouched, [field]: true });
    const value = formValues[field];
    handleFieldValidation(field, value, currentErrors, setErrors);
};

// Handler para cambio de campo
export const handleFieldChange = (fieldName, newValue, isTouched, currentErrors, setValue, setErrors) => {
    setValue(newValue);
    if (isTouched) {
        handleFieldValidation(fieldName, newValue, currentErrors, setErrors);
    }
};

export const handleLoginSubmit = async ({
    formValues,
    rememberMe,
    currentErrors,
    setTouched,
    setErrors,
    setIsLoading,
    onLoginSuccess,
    clearForm
}) => {
    // Marcar todos los campos como tocados
    setTouched({ username: true, password: true });

    setIsLoading(true);

    try {
        // Simular delay de autenticación, como la corrutina en kotlin, cacha, aprendiendo nuevamente
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Importar aquí para evitar dependencias circulares
        const { authenticateUser } = await import('../data/db_Users.js');

        // Verificar credenciales comparando con la BD simulada
        const authenticatedUser = authenticateUser(formValues.username, formValues.password);

        if (!authenticatedUser) {
            setErrors({ submit: 'Usuario o contraseña incorrectos.' });
            setIsLoading(false);
            return;
        }

        // Guardar usuario si "Recordarme" está activado
        // Como cuando inicia sesión en el LOL y te recuerda el usuario
        if (rememberMe) {
            localStorage.setItem('rememberedUsername', formValues.username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }

        const userData = {
            username: authenticatedUser.username,
            email: authenticatedUser.email,
            timestamp: new Date().toISOString()
        };

        onLoginSuccess(userData);

        // Limpiar el formulario
        clearForm();
    } catch (error) {
        setErrors({ submit: 'Error al iniciar sesión. Intenta nuevamente.' });
    } finally {
        setIsLoading(false);
    }
};


export const clearFormState = (setUsername, setPassword, setErrors, setTouched, setShowPassword) => {
    setUsername('');
    setPassword('');
    setErrors({});
    setTouched({});
    if (setShowPassword) setShowPassword(false);
};
