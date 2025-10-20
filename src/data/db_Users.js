// Usuario de ejemplo
export const users = [
    {
        id: 1,
        username: 'IGOD',
        email: 'igod@god.com',
        password: 'God123'
    }
];

// Agregar usuario
export const addUser = (userData) => {
    const newUser = {
        id: users.length + 1,
        username: userData.username,
        email: userData.email,
        password: userData.password,
    };
    users.push(newUser);
    return newUser;
};

// Función para encontrar usuario por username
export const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
};

// Función para encontrar usuario por email
export const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

// Verificar login
export const authenticateUser = (username, password) => {
    const user = users.find(user =>
        (user.username === username || user.email === username) &&
        user.password === password
    );
    return user || null;
};

// Verificar si existe username
export const isUsernameTaken = (username) => {
    return users.some(user => user.username === username);
};

// Verificar si existe email
export const isEmailTaken = (email) => {
    return users.some(user => user.email === email);
};