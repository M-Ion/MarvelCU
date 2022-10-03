using MarvelCU.API.Controllers;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.News;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;


namespace MarvelCU.Tests
{
    [TestClass]
    public class NewsControllerTests
    {
        private NewsController _newsController;

        public NewsControllerTests()
        {
            Mock<INewsService> newsServiceMock = new();

            newsServiceMock.Setup(c => 
            c.UpdateNews(
                It.IsAny<int>(), 
                It.IsAny<UpdateNewsDto>()
                )
            ).Returns(Task.CompletedTask);

            newsServiceMock.Setup(c => 
            c.DeleteNews(It.IsAny<int>())).Returns(Task.CompletedTask);

            _newsController = new (newsServiceMock.Object);
        }

        [TestMethod]
        public async Task ShouldReturnNoContentOnUpdate()
        {
            var result = await _newsController.UpdateNews(1, new UpdateNewsDto() { Content = "Content", Title = "Title"}) as NoContentResult;
            Assert.AreEqual((int)HttpStatusCode.NoContent, result.StatusCode);
        }

        [TestMethod]
        public async Task ShouldReturnNoContentOnDelete()
        {
            var result = await _newsController.RemoveNews(0) as NoContentResult;
            Assert.AreEqual((int)HttpStatusCode.NoContent, result.StatusCode);
        }
    }
}
