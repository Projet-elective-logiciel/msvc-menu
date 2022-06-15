//TODO Redefinir le schema pour qu'il soit compatible avec le model

interface Menu {
    name: string,
    articles: [string],
    idRestaurant: string,
    description: string,
}

export default Menu;
