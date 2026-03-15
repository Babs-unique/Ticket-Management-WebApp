/**
 * Fake Protected Routes Service - for development/testing purposes
 * This module contains the legacy local storage based authentication check
 */

export const fakeProtectedAuth = {
    checkAuthentication: () => {
        const authenticated = localStorage.getItem("user");
        return !!authenticated; // Returns true if user exists in localStorage
    }
}
