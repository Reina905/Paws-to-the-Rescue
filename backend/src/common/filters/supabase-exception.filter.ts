import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class SupabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SupabaseExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // If it's already a NestJS HttpException, let it pass through with its own format
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        response.status(status).json(exceptionResponse);
      } else {
        response.status(status).json({
          statusCode: status,
          message: exceptionResponse,
          error: exception.name,
        });
      }
      return;
    }

    // For all unhandled errors (including Supabase errors), log internally and return generic 500
    this.logger.error(
      'Unhandled exception',
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: 'Internal Server Error',
    });
  }
}
