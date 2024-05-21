import { HttpException } from '@nestjs/common';
export type User = any;
export declare class UsersService {
    findOne(username: string): Promise<User | undefined>;
    findOrganizations(): Promise<User[] | undefined>;
    pushOne(username: string, password: string, role: string, selected_organization?: string): Promise<string | HttpException>;
}
