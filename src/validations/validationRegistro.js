//! Validaciones para el formulario de registro

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
    // Restringe los caracteres del username a letras, números y guiones bajos
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        return 'El usuario solo puede contener letras, números y guiones bajos';
    }
    return null;
};

// Validación email
export const validateEmail = (email) => {
    if (!email.trim()) {
        return 'El email es requerido';
    }
    // caracteres OBLIGATORIOS a la hora de escribir un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Ingresa un email válido';
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
    // Restringe los caracteres de la contraseña a mayúscula, minúscula y números
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
        return 'La contraseña debe contener al menos una mayúscula, minúscula y número';
    }
    return null;
};

// Validación confirmación de contraseña
export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
        return 'La confirmación de contraseña es requerida';
    }
    if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden';
    }
    return null;
};

// Validación del formulario completo
export const validateRegisterForm = (formData) => {
    const errors = {};
    const usernameError = validateUsername(formData.username);
    if (usernameError) errors.username = usernameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    return errors;
};

// Verifica si el formulario es válido (sin errores) => retorna booleano
export const isFormValid = (formData) => {
    const errors = validateRegisterForm(formData);
    return Object.keys(errors).length === 0;
};


// Handler blur de campo, le da un efecto "touched" y valida el campo (se ve pro)
export const handleFieldBlur = (field, formValues, currentTouched, currentErrors, setTouched, setErrors) => {
    setTouched({ ...currentTouched, [field]: true });
    const value = formValues[field];
    handleFieldValidation(field, value, currentErrors, setErrors, formValues);
};

// Handler para el cambio de valor de un campo, lo actualiza y si está "touched" valida
// touched = tocado, onda, cuando uno hace click sobre el campo y luego sale de él, explicación simple, porque no cachai inglés JOJO
export const handleFieldChange = (fieldName, newValue, isTouched, currentErrors, setValue, setErrors, formData = {}) => {
    setValue(newValue);
    if (isTouched) {
        handleFieldValidation(fieldName, newValue, currentErrors, setErrors, { ...formData, [fieldName]: newValue });
    }
};


// Handler para el submit del formulario de registro
export const handleRegisterSubmit = async ({
    formValues,
    currentErrors,
    setTouched,
    setErrors,
    setIsLoading,
    onRegisterSuccess,
    clearForm
}) => {
    // Marcar todos los campos como tocados => tocado=touched, aprendiendo inglés poco a poco, Ángel promedio 7 inglés intermedio 2026
    setTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
    });

    setIsLoading(true);

    try {
        const { isUsernameTaken, isEmailTaken, addUser } = await import('../data/db_Users.js');

        // Verifica si el usuario ya existe
        if (isUsernameTaken(formValues.username)) {
            setErrors({ submit: 'Este nombre de usuario ya está registrado.' });
            setIsLoading(false);
            return;
        }

        // Verifica si el email ya existe
        if (isEmailTaken(formValues.email)) {
            setErrors({ submit: 'Este correo electrónico ya está registrado.' });
            setIsLoading(false);
            return;
        }

        // Simular delay de registro [tutorial OP] - funciona como la corrutina en kotlin xd
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Agregar usuario a la base de datos utilizando la función importada de db_Users.js
        const newUser = addUser({
            username: formValues.username,
            email: formValues.email,
            password: formValues.password
        });

        const userData = {
            username: newUser.username,
            email: newUser.email,
        };

        onRegisterSuccess(userData);

        // Limpiar el formulario
        clearForm();
    } catch (error) {
        setErrors({ submit: 'Error al registrarse. Intenta nuevamente.' });
    } finally {
        setIsLoading(false);
    }
};

export const clearFormState = (setUsername, setEmail, setPassword, setConfirmPassword, setErrors, setTouched) => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setTouched({});
};