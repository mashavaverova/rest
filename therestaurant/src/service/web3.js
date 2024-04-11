import Web3 from 'web3';
import ABI from '../contracts/ABI';



const rpcUrl = 'http://localhost:8545';  
export const web3instance = new Web3(rpcUrl);

export const restContract = new web3instance.eth.Contract(ABI, '0x5FbDB2315678afecb367f032d93F642f64180aa3');

const executeMethod = async ({ method, params = [], fromAddress = null, readOnly = false }) => {
    try {
        const resultInstance = restContract.methods[method](...params);
        if (readOnly) {
            const data = await resultInstance.call();
            return data;
        } else {
            const receipt = await resultInstance.send({ from: fromAddress });
            if (receipt.status) {
                for (let eventName in receipt.events) {
                    let event = receipt.events[eventName];
                    console.log(`${eventName} details:`, event.returnValues);
                }
            }
            return receipt;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Wrapped contract functions
const createRestaurant = async (restaurantName, fromAddress) => executeMethod({ method: 'createRestaurant', params: [restaurantName], fromAddress });
const createBooking = async (numberOfGuests, name, date, time, restaurantId, fromAddress) => executeMethod({ method: 'createBooking', params: [numberOfGuests, name, date, time, restaurantId], fromAddress });
const getBookings = async (restaurantId) => executeMethod({ method: 'getBookings', params: [restaurantId], readOnly: true });
const editBooking = async (id, numberOfGuests, name, date, time, fromAddress) => executeMethod({ method: 'editBooking', params: [id, numberOfGuests, name, date, time], fromAddress });
const removeBooking = async (id, fromAddress) => executeMethod({ method: 'removeBooking', params: [id], fromAddress });

export {
    createRestaurant,
    createBooking,
    getBookings,
    editBooking,
    removeBooking
};
