import apiClient from "../apiClient";

export const signin = async (data: FormData) => {
    const response = await apiClient.post("api/users/signin", data);
    const info = JSON.parse(response.data.info);

    localStorage.setItem('userInfo', JSON.stringify(response.data));

    const userInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo') as string)
        : null;
    console.log(userInfo)
    if (userInfo) {
        const newUserInfo = { ...userInfo, isVerified: response.data.isVerified };
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    }
    console.log(localStorage.getItem('userInfo'))         

    localStorage.setItem('currentValute', JSON.stringify(info.preferences.valute));
    localStorage.setItem('currentLanguage', JSON.stringify(info.preferences.language));
    localStorage.setItem('cartItems', JSON.stringify(info.cart.cartItems));
    localStorage.setItem('favoritesItems', JSON.stringify(info.cart.favoritesItems));
    localStorage.setItem('currentValuteList', JSON.stringify(info.preferences.valuteList));
    localStorage.setItem('currentLanguageList', JSON.stringify(info.preferences.languageList));
    setTimeout(() => window.location.reload(), 600)

    return response;
};
