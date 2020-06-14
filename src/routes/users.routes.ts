import { Router } from 'express';
import api from '../services/api';
import User from '../model/User';
import Repository from '../model/Repository';
import Urls from '../config/urls';
import {paginate} from "../services/paginateService";

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const autorizarion = request.get('Authorization');
  const since = Number(request.query.since);

  const resposeGitHub = await api.get('/users?per_page=200', {
    headers: {
      'Authorization': autorizarion,
    }
  });

  const users = resposeGitHub.data.map((user:User) => ({
    id: user.id,
    login: user.login,
    avatar_url: user.avatar_url
  }));

  return response.json({
    result: paginate(users,since ? since : 1,10),
    next: `${Urls.baseURL}?since=${since + 1}`
  });
});


usersRouter.get('/:userName/details', async (request, response) => {
  const autorizarion = request.get('Authorization');
  const { userName } = request.params;
  const resposeGitHub = await api.get(`/users/${ userName }`,{
    headers: {
      'Authorization': autorizarion,
    }
  });
  return response.json(resposeGitHub.data);
});

usersRouter.get('/:userName/repos', async (request, response) => {
  const autorizarion = request.get('Authorization');
  const { userName } = request.params;
  const resposeGitHub = await api.get(`/users/${ userName }/repos`,{
    headers: {
      'Authorization': autorizarion,
    }
  });
  return response.json(resposeGitHub.data.map((repo:Repository) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
  })));
});

export default usersRouter;
