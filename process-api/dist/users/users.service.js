"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const usersPath = './tables/db_users.json';
let UsersService = exports.UsersService = class UsersService {
    async findOne(username) {
        try {
            const buffer = fs.readFileSync(usersPath, 'utf-8');
            const obj = JSON.parse(buffer);
            return obj.users?.find((user) => user.username === username);
        }
        catch (e) {
            console.error(e);
            return;
        }
    }
    async findOrganizations() {
        if (!fs.existsSync(usersPath)) {
            throw new common_1.InternalServerErrorException(`No users table exists.`);
        }
        try {
            const buffer = fs.readFileSync(usersPath, 'utf-8');
            const obj = JSON.parse(buffer);
            return obj.users
                ?.filter((user) => user.role === 'organization')
                .map((user) => ({
                username: user.username,
                userId: user.userId,
            }));
        }
        catch (e) {
            console.error(e);
            return;
        }
    }
    async pushOne(username, password, role, selected_organization) {
        if (!fs.existsSync(usersPath)) {
            throw new common_1.InternalServerErrorException(`No users table exists.`);
        }
        try {
            const buffer = fs.readFileSync(usersPath, 'utf-8');
            const obj = JSON.parse(buffer);
            const userWithSameUsername = obj.users.find((user) => user.username === username);
            if (userWithSameUsername) {
                return new common_1.HttpException({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    error: `There already exists a user with username: ${username}, please enter something else.`,
                }, common_1.HttpStatus.CONFLICT);
            }
            const userId = crypto.randomUUID();
            obj.users.push({
                username,
                password,
                userId,
                role,
                selected_organization,
            });
            fs.writeFileSync(usersPath, JSON.stringify(obj));
            console.log('User successfully added!');
            return userId;
        }
        catch (e) {
            console.error(e);
            return;
        }
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map