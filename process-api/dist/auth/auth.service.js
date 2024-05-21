"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        if (!user?.username) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'No username provided',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!user?.password) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'No password provided',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = { username: user.username, sub: user.userId };
        const userFound = await this.usersService.findOne(user.username);
        if (!userFound) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'No user with such credentials exists! Please provide valid username and password!',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (user?.password !== userFound?.password) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: `Wrong password for ${userFound?.username}. Please try again!`,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const role = userFound?.role;
        if (!role) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'User has no role attached! Please contact your administrator!',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const userId = userFound?.userId;
        if (!userId) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'User has no userId! Please contact your administrator!',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const selected_organization = userFound?.selected_organization;
        return {
            access_token: this.jwtService.sign(payload),
            role,
            selected_organization,
            userId,
        };
    }
    async register(user) {
        console.log(user);
        if (!user?.username) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'No username provided!',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!user?.password) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'No password provided!',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!user?.role) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: 'No role provided!',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.role === 'regular_user' && !user.selected_organization) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'A regular user has to have an organization attached to him/her!',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const response = this.usersService.pushOne(user.username, user.password, user.role, user?.selected_organization);
        return response;
    }
    async getAllOrganizations() {
        return await this.usersService.findOrganizations();
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map