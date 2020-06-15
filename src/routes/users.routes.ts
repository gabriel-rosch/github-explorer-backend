import { Router } from 'express';
import User from '../model/User';
import Repository from '../model/Repository';
import { paginate } from '../services/paginateService';
import { allUsers,userDetails,userRepositories} from '../repository/gitHub/users'
const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const token = request.get('Authorization');
  const since = Number(request.query.since);

  const users = await allUsers(token);

  users.map((user:User) => ({
    id: user.id,
    login: user.login,
    avatar_url: user.avatar_url
  }));
  if(!users.length) {
    return response.status(403).json({message: 'Error request to github'})
  }
  let pageNumber = (since ? since : 1);
  return response.json({
    result: paginate(users,pageNumber,10),
    nextPageQuery: `?since=${pageNumber + 1}`
  });
});


usersRouter.get('/:userName/details', async (request, response) => {
  const token = request.get('Authorization');
  const { userName } = request.params;
  const user = await userDetails(token, userName);
  if(!user) {
    return response.status(403).json({message: 'Error request to github'})
  }
  return response.json(user);
});

usersRouter.get('/:userName/repos', async (request, response) => {
  const token = request.get('Authorization');
  const { userName } = request.params;
  const repositories = await userRepositories(token,userName);
  return response.json(repositories.map((repo:Repository) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
  })));
});

export default usersRouter;
