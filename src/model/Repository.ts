class Repository {
    id: number;

    name: string;

    html_url: string;

    constructor(id: number, name: string, html_url: string) {
        this.id = id;
        this.name = name;
        this.html_url = html_url
    }
}

export default Repository;