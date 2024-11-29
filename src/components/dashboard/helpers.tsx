export const getGreeting = (): string => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return "Good morning";
    } else if (currentHour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

export const toTitle = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const getStatusClass = (status: string) => {
    switch (status) {
        case 'available':
            return 'bg-green-50 border-green-300 text-green-700';
        case 'unavailable':
            return 'bg-gray-200 border-gray-300 text-stone-600';
        case 'out of stock':
            return 'bg-yellow-50 border-yellow-300 text-yellow-700';
        default:
            return 'bg-green-50 border-green-300 text-green-700'; // Default classes for unknown statuses
    }
};