"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicTablesService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const lodash_1 = require("lodash");
const DIRECTORY_PATH = './tables';
let DynamicTablesService = exports.DynamicTablesService = class DynamicTablesService {
    async createTable(table_name, columns, ownerId) {
        const tablePath = `${DIRECTORY_PATH}/db_${table_name}.json`;
        if (fs.existsSync(tablePath)) {
            throw new common_1.InternalServerErrorException(`Table with name ${table_name} already exists!`);
        }
        if ((0, lodash_1.uniqBy)(columns, 'name').length !== columns.length) {
            throw new common_1.InternalServerErrorException(`Cannot insert multiple columns with the same name`);
        }
        const db = {
            schema: {
                table_name,
                ownerId,
                columns,
            },
            data: [],
        };
        try {
            fs.writeFileSync(tablePath, JSON.stringify(db));
            console.log(`Table '${table_name}' created successfully.`);
        }
        catch (e) {
            console.error(e);
        }
        return table_name;
    }
    async dropTable(tableName) {
        const tablePath = `${DIRECTORY_PATH}/db_${tableName}.json`;
        if (!fs.existsSync(tablePath)) {
            throw new common_1.InternalServerErrorException(`No table with the name ${tableName} exists.`);
        }
        fs.rmSync(tablePath);
        return 'tablePath';
    }
    async getAllTables() {
        const files = fs.readdirSync('./tables');
        return files.map((file) => {
            const buffer = fs.readFileSync(`${DIRECTORY_PATH}/${file}`, 'utf-8');
            const data = JSON.parse(buffer);
            return data;
        });
    }
    async getTablesByOwnerId(ownerId) {
        console.log('ownerId: ', ownerId);
        const files = fs.readdirSync('./tables');
        console.log(files);
        return files
            .filter((file) => file !== 'db_users.json')
            .map((file) => {
            const buffer = fs.readFileSync(`${DIRECTORY_PATH}/${file}`, 'utf-8');
            const data = JSON.parse(buffer);
            return data;
        })
            .filter((data) => data['schema']['ownerId'] === ownerId);
    }
    async getTable(tableName) {
        try {
            const tablePath = `${DIRECTORY_PATH}/db_${tableName}.json`;
            if (!fs.existsSync(tablePath)) {
                throw new common_1.NotFoundException(`Table with name ${tableName} does not exist.`);
            }
            return await fs.readFileSync(tablePath, 'utf-8');
        }
        catch (error) {
            console.error('Error reading or parsing file:', error);
            return [];
        }
    }
    async insertRow(tableName, row) {
        try {
            const tablePath = `${DIRECTORY_PATH}/db_${tableName}.json`;
            if (!fs.existsSync(tablePath)) {
                throw new common_1.NotFoundException(`No table with the name ${tableName} exists.`);
            }
            const fileData = await fs.readFileSync(tablePath, 'utf-8');
            const jsonData = JSON.parse(fileData);
            if (!jsonData) {
                throw new common_1.NotFoundException(`No table with the name ${tableName} exists.`);
            }
            jsonData.data.push(row);
            fs.writeFileSync(tablePath, JSON.stringify(jsonData));
            console.log('Row successfully inserted');
            return 'success';
        }
        catch (error) {
            throw new Error(`Error reading or parsing file: ${error}`);
        }
    }
};
exports.DynamicTablesService = DynamicTablesService = __decorate([
    (0, common_1.Injectable)()
], DynamicTablesService);
//# sourceMappingURL=dynamic-tables.service.js.map