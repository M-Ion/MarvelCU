using MarvelCU.API.Controllers;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Dal;
using MarvelCU.Domain;
using MarvelCU.Tests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace MarvelCU.Tests
{
    [TestClass]
    public class ActorsControllerTests
    {
        private readonly HttpClient _httpClient;
        private ActorsController _actorsController;

        public ActorsControllerTests()
        {
            _httpClient = new TestApp().CreateClient();

            Mock<IActorService> actorServiceMock = new();

            actorServiceMock.Setup(c => c.GetAllActors()).ReturnsAsync(
                    new List<GetActorDto>()
                    {
                        new GetActorDto()
                        {
                            FirstName = "Robert",
                            LastName = "Downey",
                            MiddleName = "Junior"
                        },
                        new GetActorDto()
                        {
                            FirstName = "Chris",
                            LastName = null,
                            MiddleName = "Evans"
                        },
                    });

            actorServiceMock.Setup(c => c.GetActorDetails(It.Is<int>(x => x == 1))).ReturnsAsync(
                new ActorDto()
                {
                    FirstName = "Robert",
                    LastName = "Downey",
                    MiddleName = "Junior"
                });

            _actorsController = new ActorsController(actorServiceMock.Object);
        }

        [TestMethod]
        public async Task GetActors_ShouldReturnActorsList()
        {
            var result = (await _actorsController.GetActors()).Result as ObjectResult;
            var actors = result.Value as List<GetActorDto>;

            Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);
            Assert.AreEqual(2, actors.Count);
        }

        [TestMethod]
        public async Task GetActor_ShouldReturnOneActor()
        {
            var result = (await _actorsController.GetActor(1)).Result as ObjectResult;
            var actor = result.Value as ActorDto;

            Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);
            Assert.AreEqual("Robert", actor.FirstName);
        }

        // Integration Testing
        [TestMethod]
        public async Task GetOkStatusCode()
        {
            var response = await _httpClient.GetAsync("/api/Actors");

            response.EnsureSuccessStatusCode();

            Assert.AreEqual("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }

        [TestMethod]
        public async Task GetActorsList()
        {
            var response = await _httpClient.GetFromJsonAsync<List<GetActorDto>>("/api/Actors");
            Assert.AreEqual(true, response.Any());
        }

        [TestMethod]
        public async Task ReturnNotFoundOnNonExistingId()
        {
            var response = await _httpClient.GetAsync("/api/Actors/99");
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [DataTestMethod]
        [DataRow(1)]
        public async Task ReturnOkAndActorOnGetActor(int id)
        {
            var response = await _httpClient.GetFromJsonAsync<ActorDto>($"/api/Actors/{id}");
            Assert.AreEqual(id, response.Id);
        }
    }
}