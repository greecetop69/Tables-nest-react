import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        role: any;
        selected_organization: any;
        userId: any;
    }>;
    register(req: any): Promise<string | import("@nestjs/common").HttpException>;
    getProfile(req: any): any;
    getAllOrganizations(): Promise<any[]>;
}
