import apiClient from "../apiClient";

interface FormData {
    name: string;
    email: string;
    password: string;
}

export const signup = async (data: FormData ) => {
    const response = await apiClient.post("api/users/signup", {...data, info: 
        JSON.stringify({
            preferences: {
                valute: 'USD',
                valuteList: ['EUR', 'GBP'],
                language: 'English',
                languageList: ['Polish', 'Ukrainian']
              },
              cart: {
                cartItems: [],
                favoritesItems: [],
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
        })
    });
    return response
}