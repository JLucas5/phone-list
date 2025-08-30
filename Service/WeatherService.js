import 'dotenv/config'
import axios from 'axios'

class WeatherService {

    static apiurl = `https://api.hgbrasil.com/weather?format=json-cors&key=${process.env.WEATHER_API_KEY}&city_name=`

    /**
     * Fetches weather data for a given city and provides a suggestion message
     * @param {string} city - City name to fetch weather for
     * @returns {Object} - { temperature: number, condition: string, message: string }
     */
    static async getWeather(city){
        try {
            const response = await axios.get(this.apiurl + encodeURIComponent(city))

            const temperature = response.data.results.temp
            const condition = response.data.results.description
            let message = ''

            switch (true) {
                case temperature <= 18:
                    message = 'Ofereça um chocolate quente ao seu contato...'
                    break
                case temperature > 18 && temperature < 30:
                    message = condition.toLowerCase().includes('ensolarado')
                        ? 'Convide seu contato para fazer alguma atividade ao ar livre'
                        : 'Convide seu contato para ver um filme'
                    break
                case temperature >= 30:
                    message = condition.toLowerCase().includes('ensolarado')
                        ? 'Convide seu contato para ir à praia com esse calor!'
                        : 'Convide seu contato para tomar um sorvete'
                    break
                default:
                    message = 'Tenha um ótimo dia!'
            }

            return {
                temperature,
                condition,
                message
            };

        } catch (error) {
                return {temperature: null, 
                        condition: null,
                        message: 'Não foi possível obter a previsão do tempo para este endereço.'}
        }
    }

}

export default WeatherService