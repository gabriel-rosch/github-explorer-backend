import api from "../../services/api";
import User from "../../model/User";
import Repository from "../../model/Repository";

export async function allUsers(token: string | undefined) : Promise<User[]>{
    let users : User[] = [];
    await api.get('/users?per_page=200', {
        headers: {
            'Authorization': token,
        }
    }).then(response => {
        users = response.data;
        return users;
    }).catch(function(error) {
        return [];
    });
    return users;
}
export async function userDetails(token: string | undefined, userName: string) : Promise<User>{
    let user = <User>{};
    await api.get(`/users/${ userName }`,{
        headers: {
            'Authorization': token,
        }
    }).then(response => {
        user = response.data;
        return user;
    }).catch(function(error) {
        return {};
    });
    return user;
}

export async function userRepositories(token: string | undefined, userName: string) : Promise<Repository[]>{
    let repositories : Repository[] = [];
    await api.get(`/users/${ userName }/repos`,{
        headers: {
            'Authorization': token,
        }
    }).then(response => {
        repositories = response.data;
        return repositories;
    }).catch(function(error) {
        return [];
    });
    return repositories;
}