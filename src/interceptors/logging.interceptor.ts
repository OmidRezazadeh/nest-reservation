import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
intercept(context: ExecutionContext, next: CallHandler):  Observable<any>{
   const now = Date.now();
   console.log(`Request started at: ${new Date(now).toISOString()}`);
   return next.handle().pipe(
    tap(() => console.log(`Request completed in: ${Date.now() - now}ms`)),

   )
}
}