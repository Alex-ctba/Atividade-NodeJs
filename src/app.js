const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => { 
   const { title, url, techs } = request.body;
    const repository = {
      id: uuid(),
      title, 
      url, 
      techs, 
      likes: 0,
    }
    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
 const { id } = request.params;
 const { title, url, techs } = request.body;

 const Index = repositories.findIndex(indice => indice.id == id)

 if(!isUuid(id)){
   return response.status(400).json({ error:'Não localizado' })
 }

 const upate ={
   id, 
   title,
   url,
   techs,
   likes: repositories[Index].likes
 }
 
 repositories[Index] = upate;

return response.json(upate)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repo =>{
    repo.id == id
  });

  if(!isUuid(id)){
   return response.status(400).json({ error:'Erro - Id inexistente' })
  }else{
    repositories.splice(findRepositoryIndex, 1);
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const findRepositoryIndex = repositories.findIndex(repo => repo.id == id);

        if(!isUuid(id)){
          return response.status(400).json({ error:'Erro - Id inexistente' });
          }

      repositories[findRepositoryIndex].likes++;
     

    return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
