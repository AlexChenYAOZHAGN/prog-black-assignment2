export const deliveryOptions = [
    {
        id: "1",
        name: "Pick up the goods yourself",
        price: 0
    },
    {
        id: "2",
        name: "Pick up goods from merchant",
        price: 1
    },
    {
        id: "3",
        name: "Home delivery",
        price: 3
    }
];

export function getDeliveryOption(deliveryId) {
    return deliveryOptions.find(option => option.id === deliveryId);
}
