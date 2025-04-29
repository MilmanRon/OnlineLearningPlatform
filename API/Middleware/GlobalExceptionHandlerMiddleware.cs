using API.Application;
using API.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Net;
using System.Text.Json;

namespace API.Middleware
{
    public class GlobalExceptionHandlerMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                Log.Error(e, "An unhandled exception occurred.");
                await HandleExceptionAsync(context, e);
            }


        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = exception switch
            {
                KeyNotFoundException => HttpStatusCode.NotFound,
                InvalidOperationException => HttpStatusCode.Conflict,
                _ => HttpStatusCode.InternalServerError
            };

            var problem = new ProblemDetails
            {
                Status = (int)statusCode,
                Title = GetExceptionTitle(exception),
                Detail = statusCode == HttpStatusCode.InternalServerError
                    ? "An unexpected error occurred. Please try again later."
                    : exception.Message
            };

            Log.Warning("Exception handled: {Title} - {Detail}", problem.Title, problem.Detail);

            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(problem));
        }

        private static string GetExceptionTitle(Exception exception)
        {
            return exception switch
            {
                KeyNotFoundException => "Resource Not Found",
                InvalidOperationException => "Resource Already Exists",
                _ => "Application Error"
            };
        }
    }
}
