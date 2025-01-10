function greeting(): string {
    const currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 12) {
        return "Bom dia";
    } else if (currentTime >= 12 && currentTime < 18) {
        return "Boa tarde";
    } else if (currentTime >= 18 && currentTime < 24) {
        return "Boa tarde";
    } else {
        return "Boa madrugada";
    }
}

export default greeting;
