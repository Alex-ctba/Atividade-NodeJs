const request = require("supertest");
const app = require("../app");

describe("Likes", () => {
  it("deve ser capaz de dar um like no repositório", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    let response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 1
    });

    response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 2
    });
  });

  it("não deve ser capaz de gostar de um repositório que não existe", async () => {
    await request(app)
      .post(`/repositories/123/like`)
      .expect(400);
  });
});
