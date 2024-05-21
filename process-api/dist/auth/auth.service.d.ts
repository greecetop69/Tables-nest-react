import { HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        role: any;
        selected_organization: any;
        userId: any;
    }>;
    register(user: any): Promise<string | HttpException>;
    getAllOrganizations(): Promise<any[]>;
}
