import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import 'dotenv/config'

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    validateRequest(req: any) {
        if (req.headers.x_api_key == process.env.X_API_KEY) {
            return true
        } else {
            return false
        }
    }
}