import apiClient from "../apiClient";

interface FormData {
    email: string;
    info: string
}
export const signout = async (data: FormData) => {
    const response = await apiClient.post("api/users/signout", {
        ...data,
        info: JSON.stringify({
            preferences: {
                valute: localStorage.getItem('currentValute')
                ? JSON.parse(localStorage.getItem('currentValute') as string)
                : 'USD',
                valuteList: localStorage.getItem('currentValuteList')
                ? JSON.parse(localStorage.getItem('currentValuteList') as string)
                : ['EUR', 'GBP'],
                language: localStorage.getItem('currentLanguage')
                ? JSON.parse(localStorage.getItem('currentLanguage') as string)
                :'English',
                languageList: localStorage.getItem('currentLanguageList')
                ? JSON.parse(localStorage.getItem('currentLanguageList') as string)
                : ['Polish', 'Ukrainian']
              },
              cart: {
                cartItems: localStorage.getItem('cartItems')
                ? JSON.parse(localStorage.getItem('cartItems') as string)
                : [],
                favoritesItems: localStorage.getItem('favoritesItems')
                ? JSON.parse(localStorage.getItem('favoritesItems') as string)
                : [],
                paymentMethod: 'PayPal',
                shippingAddress: {
                  fullName: '',
                  address: '',
                  postalCode: '',
                  city: '',
                  country: '',
                },
                itemsPrice: 0,
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: 0,
              },
        }),
    });
    return response;
};
