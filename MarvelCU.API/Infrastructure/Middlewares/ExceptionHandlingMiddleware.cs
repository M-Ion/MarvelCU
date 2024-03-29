﻿using MarvelCU.Common.Exceptions;
using MarvelCU.Common.Models;
using Stripe;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace MarvelCU.API.Infrastructure.Middlewares;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";

        var errDetails = new ErrorDetails()
        {
            StatusCode = (int)HttpStatusCode.InternalServerError,
            Type = "Failure",
            Message = ex.Message
        };

        switch (ex)
        {
            case IdNotFoundException:
                errDetails.StatusCode = (int)HttpStatusCode.NotFound;
                errDetails.Type = "Not Found";
                break;
            case InvalidRefreshTokenException:
                errDetails.StatusCode = (int)HttpStatusCode.BadRequest;
                errDetails.Type = "Token";
                errDetails.Message = "You are not logged in!";
                break;
            case ValidationException:
                errDetails.StatusCode = (int)HttpStatusCode.BadRequest;
                break;
            case StripeException:
                errDetails.StatusCode = (int)HttpStatusCode.BadRequest;
                break;
            default:
                break;
        }

        context.Response.StatusCode = errDetails.StatusCode;

        return context.Response.WriteAsync(errDetails.ToString());
    }
}

